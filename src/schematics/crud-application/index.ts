import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  apply,
  branchAndMerge,
  chain,
  mergeWith,
  move,
  template,
  url,
} from '@angular-devkit/schematics';

import {
  normalize,
  strings,
  Path,
} from '@angular-devkit/core';

import { addImportToModule } from '@schematics/angular/utility/ast-utils';

import {
  buildRelativePath,
  findModuleFromOptions,
} from '@schematics/angular/utility/find-module';

import { InsertChange } from '@schematics/angular/utility/change';
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import { Schema as ComponentOptions } from '@schematics/angular/component/schema';

function readIntoSourceFile(host: Tree, modulePath: string): ts.SourceFile {
  const text = host.read(modulePath);
  if (text === null) {
    throw new SchematicsException(`File ${modulePath} does not exist.`);
  }
  const sourceText = text.toString('utf-8');

  return ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
}

function addImportToNgModule(options: ComponentOptions): Rule {
  return (host: Tree) => {
    if (!options.module) {
      return host;
    }

    // 変更を加えたいNgModuleのパス
    const modulePath = options.module;
    // NgModuleファイルの内容を表す、ts.SourceFile型のオブジェクト
    const source = readIntoSourceFile(host, modulePath);

    // SampleModule　のような子モジュールのクラス名
    const classifiedName = strings.classify(options.name) + 'Module';

    // 子モジュールのパス
    const childModulePath = `/${options.path}/`
      + strings.dasherize(options.name) + '/'
      + strings.dasherize(options.name)
      + '.'
      + 'module';
    // modulePathからchildModulePathへの相対パス
    const relativePath = buildRelativePath(modulePath, childModulePath);

    // 「子モジュールのimports宣言を追加する」という変更を定義
    const declarationChanges = addImportToModule(source,
                                                 modulePath,
                                                 classifiedName,
                                                 relativePath);

    // 実際にファイルに対して、定義した変更を適用
    const declarationRecorder = host.beginUpdate(modulePath);
    for (const change of declarationChanges) {
      if (change instanceof InsertChange) {
        declarationRecorder.insertLeft(change.pos, change.toAdd);
      }
    }
    host.commitUpdate(declarationRecorder);

    return host;
  };
}
  
export function crudSchematics(options: any): Rule {
  return (host: Tree, _context: SchematicContext) => {
    if (options.path === undefined) {
      options.path = 'src/app';
    }

    // 生成したコードに関する宣言を追加するNgModuleのパスを取得
    options.module = findModuleFromOptions(host, options);
    
    // コードを生成するパスの指定
    const pathToCreate: Path = normalize(options.path as string)
    options.path = pathToCreate

    return chain([
      // 生成したコードに関する宣言をNgModuleに追加する
      addImportToNgModule(options),

      // コードの生成
      branchAndMerge(
        mergeWith(
          apply(url('./template-files'), [
            template({
              ...strings,
              ...options,
            }),
            move(pathToCreate)
          ])
        )
      )
    ])
  };
}
  
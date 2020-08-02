import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  branchAndMerge,
  mergeWith,
  move,
  template,
  url,
} from '@angular-devkit/schematics';
// import { Schema as ClassOptions } from './schema';
import {
  basename,
  normalize,
  strings,
  Path,
} from '@angular-devkit/core';
  
  
  // You don't have to export the function as default. You can also have more than one rule factory
  // per file.
  export function heroSchematics(options: any): Rule {
    return (_: Tree, _context: SchematicContext) => {
      // const workspace = await getWorkspace(host);
      // const project = workspace.projects.get(options.project as string);
  
      // if (options.path === undefined && project) {
      //   options.path = buildDefaultPath(project);
      // }
      // _context.logger.error('herro');
  
      // options.module = findModuleFromOptions(host, options);
  
      // const parsedPath: Location = parseName(options.path as string, options.name);
      // options.name = parsedPath.name;
      // options.path = parsedPath.path;
      
      const nameWithoutPath = basename(normalize(options.name))
      // const pathToCreate: Path = normalize('/' + dirname(join(normalize(options.path), options.name) as Path))
      const pathToCreate: Path = normalize(normalize(options.path) as Path)
      options.name = nameWithoutPath
      options.path = pathToCreate

      return branchAndMerge(mergeWith(apply(url('./template-files'), [
          template({
            ...strings,
            ...options,
          }),
          move(pathToCreate)
        ]
      )))};
  }
  
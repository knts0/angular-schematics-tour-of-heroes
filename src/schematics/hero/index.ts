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
import {
  basename,
  normalize,
  strings,
  Path,
} from '@angular-devkit/core';
  
export function heroSchematics(options: any): Rule {
  return (_: Tree, _context: SchematicContext) => {
    if (options.path === undefined) {
      options.path = 'src/app';
    }
    
    const nameWithoutPath = basename(normalize(options.name))
    const pathToCreate: Path = normalize(options.path as string)
    options.name = nameWithoutPath
    options.path = pathToCreate

    return branchAndMerge(
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
  };
}
  
import {
    Rule,
    SchematicContext,
    // Tree,
    apply,
    branchAndMerge,
    mergeWith,
    template,
    url
  } from '@angular-devkit/schematics';
  // import { Schema as ClassOptions } from './schema';
  import { strings } from '@angular-devkit/core';
  
  
  // You don't have to export the function as default. You can also have more than one rule factory
  // per file.
  export function heroSchematics(options: any): Rule {
    return (_, _context: SchematicContext) => {
      return branchAndMerge(mergeWith(apply(url('./template-files'), [
          template({
            ...strings,
            ...options,
          }),
        ]
      )))};
  }
  
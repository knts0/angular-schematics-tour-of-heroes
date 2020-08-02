# [Tour of Heroes](https://angular.jp/tutorial) using ngxs
This software is released under the MIT License, see LICENSE.

Node version: v10.13 

## Scaffolding using Angular Schematics
```bash
npm install

# build under src/schematics
npm run build.schematics

# please specify name and namePlural in camel case
schematics .:ngxs-tour-of-heroes --dry-run=false --name=sample --namePlural=samples --japaneseName=サンプル --path=src/app/

# successfully code generated under src/app/sample!
```
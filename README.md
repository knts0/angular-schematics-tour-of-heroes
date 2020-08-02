# [Tour of Heroes](https://angular.jp/tutorial) using ngxs
This software is released under the MIT License, see LICENSE.

Node version: v10.13 

## Scaffolding using Angular Schematics
```bash
npm install

# build under src/schematics
npm run build.schematics

# please specify
# - [required] name (in camel case)
# - [required] namePlural (in camel case)
# - [optional] path (default = src/app)
schematics .:ngxs-tour-of-heroes --dry-run=false --name=sample --namePlural=samples --japaneseName=サンプル

# successfully code generated under 'src/app/sample' !
```
# [Tour of Heroes](https://angular.jp/tutorial) using ngxs
This software is released under the MIT License, see LICENSE.

Node version: v10.13 

## Scaffolding using Angular Schematics
```bash
cd src/schematics

npm install
npm run build

# please specify name and namePlural in snake case
schematics .:ngxs-tour-of-heroes --dry-run=false --name=sample --namePlural=samples --japaneseName=サンプル
```
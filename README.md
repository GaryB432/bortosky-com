# BortoskyCom

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-f8bc45.svg)](https://github.com/prettier/prettier)

[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)

## Update bortosky.com

```powershell
nx build
cd ..\GaryB432.github.io\
start .
// remove all items from . except .git
Copy-Item -Path ..\bortosky-com\packages\site\build\* -Destination . -Recurse
git status
git add -A
git status
git commit -m "update to v4"
git push
cd -
```

see the `GitHub Pages` section [here](https://github.com/sveltejs/kit/tree/master/packages/adapter-static)

see also [JamesIves/github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action)

## JSON Schema

- [JSON Schema Validator - Newtonsoft](https://www.jsonschemavalidator.net/)
- [Best JSON Formatter and JSON Validator: Online JSON Formatter](https://jsonformatter.org/)

> npx json2ts -i .\packages\site\static\cabinet\schema.json --output .\tools\cabinet.d.ts

## QR Code Notes

### zxing links

- [Online Decoder](https://zxing.org/w/decode.jspx)
- [QR Code Generator](https://zxing.appspot.com/generator)
- [Javadoc](https://zxing.github.io/zxing/apidocs/)
- [Documentation Site](https://zxing.github.io/zxing/)

## Development

Build your project:

```bash
nx build
```

Test your project:

```bash
nx test:unit --run
```

Watch your source files (typescript and scss) to rebuild the project when they change

```bash
nx generate @gb-nx/svelte:component nav --project=site --style=scss --language=ts
nx dev
```

## Regenerate tips

```powershell
npx create-nx-workspace@latest bortosky-com-kit23
cd .\bortosky-com-kit23\
ls
code .
cd .\packages\
npm create svelte@latest site
git add -A
git commit -m "stub site"
cd ..\..
nx build site
npm uninstall @sveltejs/adapter-static -D -w packages/site
npm install @sveltejs/adapter-static -D -w packages/site
nx lint site
nx format
nx build site
nx graph
```

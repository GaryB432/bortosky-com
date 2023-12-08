# BortoskyCom

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-f8bc45.svg)](https://github.com/prettier/prettier)

[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)

Family Website

## JSON Schema

- [JSON Schema Validator - Newtonsoft](https://www.jsonschemavalidator.net/)
- [Best JSON Formatter and JSON Validator: Online JSON Formatter](https://jsonformatter.org/)

> npx json2ts -i .\static\cabinet\schema.json --output .\tools\cabinet.d.ts

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
nx dev
```

## Regenerate tips

```powershell
npx create-nx-workspace@latest bortosky-com
cd .\bortosky-com\
cd .\packages\
npm create svelte@latest site
git add -A
git commit -m "stub site"
cd ..\..
npm install @gb-nx/svelte -D -w packages/site
nx generate @gb-nx/svelte:component nav --project=site --style=scss --language=ts
nx build site
npm uninstall @sveltejs/adapter-static -D -w packages/site
npm install @sveltejs/adapter-static -D -w packages/site
nx lint site
nx format
nx build site
nx graph
```

# BortoskyCom

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-f8bc45.svg)](https://github.com/prettier/prettier)

[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)

## Update bortosky.com

```powershell
npm run build
cd ..\GaryB432.github.io\
start .
// remove all items from . except .git
Copy-Item -Path ..\bortosky-com\build\* -Destination . -Recurse
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
npm run build
```

Test your project:

```bash
npm test
```

Watch your source files (typescript and scss) to rebuild the project when they change

```bash
npm run dev
```

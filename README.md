# BortoskyCom

![Styled with Prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)

![Typed with TypeScript](https://flat.badgen.net/badge/icon/Typed?icon=typescript&label&labelColor=blue&color=555555)

## Update bortosky.com

```powershell
npm run build
cd ..\GaryB432.github.io\
start .
// remove all items from . except .git
Copy-Item -Path ..\bortosky-com\dist\* -Destination . -Recurse
git status
git add .
git status
git commit -m "update to v4"
git push
cd -
```

## Development

The project uses the [gulp toolkit](https://gulpjs.com/docs/en/getting-started/quick-start) for development workflow, so install that globally

```bash
npm install --global gulp-cli
```

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
gulp watch
```

## Start command-line http server

Using [http-server](https://www.npmjs.com/package/http-server), a simple zero-configuration command-line http server

```properties
npm install -global http-server
npm run build
http-server dist -o
```

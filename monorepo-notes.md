
# Some basics for monorepo development

## Authors

- [Gary](https://www.github.com/GaryB432)

## Lessons Learned

## Lerna Notes

  
> lerna publish --include-merged-tags

> lerna publish prerelease --pre-dist-tag next [[--force publish](https://github.com/lerna/lerna/issues/2069)]

### Related

Here are some related projects

[See this issue about `include-merge-tags`](https://stackoverflow.com/questions/60180630/lerna-always-lists-all-packages-ready-to-publish-when-running-workflow-of-github/66102980?noredirect=1#comment120041007_66102980)





## NX Notes
```
D:\Users\bort1\Documents\azure\bortosky\nx-fun [popular-twitter-bots ≡]> git status
On branch popular-twitter-bots
Your branch is up to date with 'origin/popular-twitter-bots'.

nothing to commit, working tree clean
```

### some commands
```
ng g app gepcoin --routing --dry-run
ng g app gepcoin --routing
ng g component brands --project gepcoin
ng g component brand-products-modal --project …
ng g component footer --project gepcoin
ng g component home --project gepcoin
ng g component navigation --project gepcoin
ng g component payout-modal --project gepcoin
ng g component redeem --project gepcoin
ng g component scan-button --project gepcoin
ng g component wistia-embed --project gepcoin
git status
ng build
nx affected:build
npm install @fortawesome/font-awesome-free
npm install @fortawesome/fontawesome-free
nx affected:build
nx popular-twitter-bots:serve
nx run popular-twitter-bots:serve
nx run gepcoin:serve
nx run gepcoin:serve
nx run popular-twitter-bots:serve

nx run-many --all --target=test --codeCoverage --skip-nx-cache
```

### some scripts

```
"ng": "ng",
"nx": "nx",
"start": "ng serve",
"build": "ng build",
"test": "ng test",
"lint": "nx workspace-lint && ng lint",
"e2e": "ng e2e",
"affected:apps": "nx affected:apps",
"affected:libs": "nx affected:libs",
"affected:build": "nx affected:build",
"affected:e2e": "nx affected:e2e",
"affected:test": "nx affected:test",
"affected:lint": "nx affected:lint",
"affected:dep-graph": "nx affected:dep-graph",
"affected": "nx affected",
"format": "nx format:write",
"format:write": "nx format:write",
"format:check": "nx format:check",
"update": "ng update @nrwl/workspace",
"workspace-schematic": "nx workspace-schematic",
"dep-graph": "nx dep-graph",
"help": "nx help",
```

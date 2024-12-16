<script lang="ts">
  import KeywordsPanel from "$lib/components/KeywordsPanel.svelte";
  import { domains } from "$lib/project/domains";
  import type { GaryProject } from "$lib/project/project";

  let { project }: { project: GaryProject } = $props();

  let nxVersion = $derived(packageVersion(project, "nx"));
  let ngVersion = $derived(packageVersion(project, "@angular/common"));
  let depLink = $derived(encodeURI(`./dependencies/?p=${project.root.name}`));

  function packageVersion(
    project: GaryProject,
    dep: string,
  ): string | undefined {
    const rootDeps = {
      ...project.root.devDependencies,
      ...project.root.dependencies,
    };

    return rootDeps[dep];
  }

  function doms() {
    return domains.get(project.root.name) ?? [];
  }
</script>

<div class="wavy">
  <div>
    <span>
      <a href={depLink}>{project.root.name}</a>
    </span>
  </div>
</div>
<div class="description">
  {project.root.description ?? ""}
</div>
<div>
  {#if nxVersion}
    <svg role="graphics-symbol">
      <use href="#nx-logo" />
    </svg>
    <span>
      {nxVersion}
    </span>
  {/if}
  {#if ngVersion}
    <svg role="graphics-symbol">
      <use href="#ng-logo" />
    </svg>
    <span>
      {ngVersion}
    </span>
  {/if}
</div>
<KeywordsPanel {project} />
<div class="doms">
  {#each doms() as domm}
    <a href={`https://${domm}`} target="_blank">
      <span>
        {domm}
      </span>
      <svg role="graphics-symbol" stroke-width="2">
        <use href="#external-link" />
      </svg>
    </a>
  {/each}
</div>

<div class="border"></div>

<style lang="scss">
  .wavy {
    padding: 0;
    margin: 0;
    display: flex;
    padding: 7px 0;
    > div {
      overflow: hidden;
      padding: 12px 24px;
      border-radius: 7px;
      background-color: white;
      color: black;
      position: relative;
      display: inline-block;
      cursor: pointer;

      span {
        position: relative;
        transition: color 0.6s cubic-bezier(0.53, 0.21, 0, 1);
      }

      &:before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        // background: rgba(var(--fun-blue), 0.3);
        background: rgba(var(--fun-blue), 0.3);
        // background: var(--fun-blue);
        transform: scaleX(0);
        transform-origin: 100% 100%;
        transition: transform 0.6s cubic-bezier(0.53, 0.21, 0, 1);
      }

      &:hover {
        &:before {
          transform-origin: 0 0;
          transform: scaleX(1);
        }
        // span {
        //   color: white;
        // }
      }
    }
  }

  svg[role="graphics-symbol"] {
    height: 1em;
    color: currentColor;
    aspect-ratio: 1;
  }

  .border {
    grid-column: 1 / span 6;
    border-bottom: thin solid silver;
  }
</style>

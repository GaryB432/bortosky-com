<script lang="ts">
  import KeywordsPanel from "$lib/components/KeywordsPanel.svelte";
  import { domains } from "$lib/project/domains";
  import type { GaryProject } from "$lib/project/project";

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

  export let project: GaryProject = {
    root: { name: "", version: "" },
    projects: [],
  };

  $: nxVersion = packageVersion(project, "nx");
  $: ngVersion = packageVersion(project, "@angular/common");

  function doms() {
    return domains.get(project.root.name) ?? [];
  }
</script>

<div>
  {project.root.name}
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
  a {
    display: block;
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

<script lang="ts">
  import { domains } from "$lib/project/domains";
  import type { GaryProject } from "$lib/project/project";

  export let project: GaryProject = {
    root: { name: "", version: "" },
    projects: [],
  };

  function doms() {
    return domains.get(project.root.name) ?? [];
  }
</script>

<div>
  {project.root.name}
</div>
<div class="doms">
  {#each doms() as domm}
    <a href={`https://${domm}`} target="_blank">
      <span>
        {domm}
      </span>
      <svg
        fill="none"
        height="24"
        shape-rendering="geometricPrecision"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
        <path d="M15 3h6v6"></path>
        <path d="M10 14L21 3"></path>
      </svg>
    </a>
  {/each}
</div>

<style lang="scss">
  a {
    display: block;
  }
  svg {
    color: currentcolor;
    width: 1em;
    height: 1em;
  }
</style>

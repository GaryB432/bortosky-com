<script lang="ts">
  import type { LayoutOptions } from "cytoscape";
  import type { DagreLayoutOptions } from "cytoscape-dagre";

  type GLayoutOptions = LayoutOptions | DagreLayoutOptions;

  let {
    onselect,
    selected,
  }: { onselect: (lo: GLayoutOptions) => void; selected: string } = $props();

  const layoutOpts: GLayoutOptions[] = [
    {
      name: "dagre",
      // rankDir: "LR",
      animate: true,
    },
    { name: "random", animate: true },
    {
      name: "breadthfirst",
      directed: true,
      animate: true,
    },
    {
      name: "concentric",
      concentric: (node) => node.degree(false),
      levelWidth: () => 3,
      animate: true,
    },
  ];

  const keys = layoutOpts.map((lo) => lo.name);

  // selected = keys.at(0) ?? "";

  // const dispatch = createEventDispatcher<{
  //   selected: { layout: LayoutOptions };
  // }>();

  $effect(() => {
    const layout = layoutOpts.find((lo) => lo.name === selected);
    if (layout) {
      onselect(layout);
    }
  });
</script>

<select bind:value={selected}>
  {#each keys as key}
    <option value={key} selected={key === selected}>{key}</option>
  {/each}
</select>

<script lang="ts">
  import { cssDeclarations } from "$lib/project/graphs/keyword/cyto";
  import cytoscape from "cytoscape";
  import dagre from "cytoscape-dagre";

  let {
    elements,
    layout = $bindable(),
  }: {
    elements: cytoscape.ElementsDefinition;
    layout: cytoscape.LayoutOptions;
  } = $props();

  // let chartSize = $state({ x: 200, y: 200 });

  let cy: cytoscape.Core; // null????

  let cydiv: HTMLElement;

  cytoscape.use(dagre);

  // $inspect(chartSize);

  $effect(() => {
    // const sf = cydiv.parentElement;
    // if (sf) {
    //   const { height, width } = sf.getBoundingClientRect();
    //   chartSize = { x: width, y: height };
    // }
    // console.log(chartSize);
    cy = cytoscape({
      container: cydiv,
      elements: elements,
      style: cssDeclarations(),
      layout,
    });
    // cy.bind("tap", "node", (event: cytoscape.EventObjectNode) => {
    //   removeUnconnected(event.target);
    // });
    // cy.bind("tap", "node", (event: cytoscape.EventObjectNode) => {
    //   removeUnconnected(event.target);
    // });
    // cy.bind("select", "node", (e) => {
    //   console.log("select", e);
    // });
    cy.bind("tap", "node", (e) => {
      console.log(e.target.data());
    });
  });
</script>

<div id="cydiv" bind:this={cydiv}></div>

<style lang="scss">
  #cydiv {
    overflow: hidden;
    height: 100%;
    width: 100%;
    outline: thin solid silver;
  }
</style>

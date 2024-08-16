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

  let cy: cytoscape.Core; // null????

  let cydiv: HTMLElement;

  cytoscape.use(dagre);

  $effect(() => {
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

<div class="container">
  <div id="cydiv" bind:this={cydiv}></div>
</div>

<style lang="scss">
  .container {
    border: thin solid silver;
  }
  #cydiv {
    width: 80vw;
    height: 60vh;
    border: thin solid silver;
  }
</style>

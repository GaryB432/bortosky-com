<script lang="ts">
  import { cssDeclarations } from "$lib/project/graphs/keyword/cyto";
  import cytoscape from "cytoscape";
  import dagre from "cytoscape-dagre";

  let { elements }: { elements: cytoscape.ElementsDefinition } = $props();

  let cy: cytoscape.Core; // null????

  let cydiv: HTMLElement;

  let layout: cytoscape.LayoutOptions = { name: "dagre" };

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

  <pre>
  {JSON.stringify(elements, undefined, 1)}
</pre>
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

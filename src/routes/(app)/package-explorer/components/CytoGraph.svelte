<script lang="ts">
  import { cssDeclarations } from "$lib/project/graphs/keyword/cyto";
  import { selectedNode } from "$lib/states.svelte";
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
    // cy.bind("tap", "node", (event) => {
    //   removeUnconnected(event.target);
    // });
    cy.bind("mouseover", "node", (e: cytoscape.EventObjectNode) => {
      console.log(e.target, "on");
    });
    cy.bind("mouseout", "node", (e: cytoscape.EventObjectNode) => {
      console.log(e.target, "off");
    });
    cy.bind("select", "node", (e: cytoscape.EventObjectNode) => {
      selectedNode.data = e.target.data();
      // selectedNodeData.id = n.id;
      // console.log("select", selectedNode.data!.id, n);
    });
  });
  // $effect(() => {
  //   console.log("done");
  //   cy.bind("tap", "node", (e) => {
  //     const d = e.target.data();
  //     selectedNodeData.id = d.id;
  //     console.log(d);
  //   });
  // });
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

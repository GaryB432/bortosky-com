<script lang="ts">
  import LayoutSelect from "$lib/components/LayoutSelect.svelte";
  import NodeList from "$lib/components/NodeList.svelte";
  import SearchSelect from "$lib/components/SearchSelect.svelte";
  import { cssDependencyDeclarations } from "$lib/project/cyto";
  import { focusedNodes, selectedNodeName } from "$lib/states.svelte";
  import cytoscape from "cytoscape";

  let { data } = $props();

  let elements = $derived(data.elements);

  let cy: cytoscape.Core;

  let cydiv: HTMLElement | null = null;

  let layout: cytoscape.LayoutOptions = { name: "random" };

  let saved: cytoscape.NodeCollection | null;

  const FOCUSED = "focused";

  $effect(() => {
    console.log("setup cy");
    cy = cytoscape({
      container: cydiv,
      elements,
      style: cssDependencyDeclarations(),
      layout,
    });
    cy.bind("tap", "node", (event: cytoscape.EventObjectNode) => {
      removeUnconnected(event.target);
    });
    cy.bind("tap", "node", (e) => {
      console.log(e.target.data());
    });
  });

  $effect(() => {
    if (saved) {
      cy.add(saved);
      saved = null;
    }
    if (selectedNodeName.name) {
      const n = cy.$id(selectedNodeName.name);
      removeUnconnected(n);
      cy.nodes().deselect();
      n.select();
      cy.layout(layout).run();
    }
  });

  $effect(() => {
    cy.nodes().removeClass(FOCUSED);
    focusedNodes.nodes.forEach((n) => {
      if (n.data.id) {
        cy.$id(n.data.id).addClass(FOCUSED);
      }
    });
  });

  let choices = $derived(elements.nodes.map((n) => n.data.id ?? ""));

  function removeUnconnected(target: cytoscape.NodeSingular) {
    if (saved) {
      cy.add(saved);
    }
    let connected: cytoscape.NodeCollection = target;
    connected = connected.union(target.predecessors());
    connected = connected.union(target.successors());
    const notConnected: cytoscape.Collection = cy.elements().not(connected);
    saved = cy.remove(notConnected);
  }

  function restore() {
    cy.elements().remove();
    cy.add(elements);
    focusedNodes.nodes.forEach((fn) =>
      cy.$id(fn.data.id ?? "").addClass(FOCUSED),
    );
    selectedNodeName.name = undefined;
    saved = null;
    cy.layout(layout).run();
  }
</script>

<svelte:head>
  <title>site - gary/projects</title>
</svelte:head>

<h1>Projects</h1>

<section class="blocky">
  <div class="top">
    <div id="cydiv" bind:this={cydiv}></div>
    <SearchSelect {choices} />
    <NodeList {elements} />
  </div>
  <section class="buttons">
    <button class="button-a" onclick={() => restore()}> Restore</button>
    <div class="relayout">
      <LayoutSelect
        selected="breadthfirst"
        onselect={(newLayout) => {
          layout = newLayout;
          if (cy) {
            cy.layout(layout).run();
          }
        }}
      />
      <button
        aria-label="layout"
        id="btn-layout"
        class="svg-button"
        onclick={() => {
          cy.layout(layout).run();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 383.748 383.748"
          xml:space="preserve"
        >
          <g>
            <path
              d="M62.772,95.042C90.904,54.899,137.496,30,187.343,30c83.743,0,151.874,68.13,151.874,151.874h30
		C369.217,81.588,287.629,0,187.343,0c-35.038,0-69.061,9.989-98.391,28.888C70.368,40.862,54.245,56.032,41.221,73.593
		L2.081,34.641v113.365h113.91L62.772,95.042z"
            />
            <path
              d="M381.667,235.742h-113.91l53.219,52.965c-28.132,40.142-74.724,65.042-124.571,65.042
		c-83.744,0-151.874-68.13-151.874-151.874h-30c0,100.286,81.588,181.874,181.874,181.874c35.038,0,69.062-9.989,98.391-28.888
		c18.584-11.975,34.707-27.145,47.731-44.706l39.139,38.952V235.742z"
            />
          </g>
        </svg>
      </button>
    </div>
  </section>
</section>

<style lang="scss">
  :root {
    --height: 500px;
  }
  #cydiv {
    width: 100%;
    height: var(--height);
    border: thin solid var(--sand-5);
  }
  .relayout {
    display: flex;
    gap: 0.5rem;
    padding: 3px;
  }

  @media screen and (min-width: 576px) {
    /* landscape phones */
  }
  @media screen and (min-width: 768px) {
    /* tablets */
  }
  @media screen and (min-width: 992px) {
    .buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1em;
    }
    .blocky {
      // height: var(--height);
      .top {
        display: flex;
      }
    }
    /* desktops */
  }
  @media screen and (min-width: 1200px) {
    /* large desktops */
  }
  @media screen and (min-width: 1400px) {
    /* larger desktops */
  }
</style>

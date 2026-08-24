<script lang="ts">
  import ClipboardCopy from "$lib/components/ClipboardCopy.svelte";

  let sortable = $state("");
  let dedup = $state(false);
</script>

<h1>Tools</h1>
<h2>Sorter</h2>
<p>Quickly sort some strings separated by newline characters</p>
<section class="sorter">
  <textarea
    name="sortspot"
    cols="50"
    rows="10"
    bind:value={sortable}
    placeholder="enter or paste lines to sort"
  ></textarea>
  <button
    class="button-a"
    onclick={() => {
      const lines = sortable.split("\n");
      sortable = (dedup ? [...new Set(lines)] : lines).sort().join("\n");
    }}>Sort</button
  >
  <div class="dedup">
    <span>Deduplicate </span>
    <input type="checkbox" bind:checked={dedup} />
  </div>
  <ClipboardCopy
    width="5em"
    textToCopy={sortable}
    oncopied={(text) => console.log(text)}
  />
</section>

<style>
  textarea,
  input[type="checkbox"] {
    all: revert;
  }
  
  .sorter {
    display: flex;
    align-items: center;
    flex-direction: column;
    align-items: center;
  }

  .bot {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1rem;
  }

  @media screen and (min-width: 576px) {
    /* landscape phones */
  }
  @media screen and (min-width: 768px) {
    /* tablets */
    .sorter {
      flex-direction: row;
    }
  }
  @media screen and (min-width: 992px) {
    /* desktops */
  }
  @media screen and (min-width: 1200px) {
    /* large desktops */
  }
  @media screen and (min-width: 1400px) {
    /* larger desktops */
  }
</style>

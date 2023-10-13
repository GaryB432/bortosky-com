<script lang="ts">
  import ClipboradCopy from '$lib/ClipboradCopy.svelte';

  let sortable = '';
</script>

<h1>Tools</h1>
<h2>Sorter</h2>
<p>Quickly sort some strings separated by newline characters</p>
<section class="sorter">
  <textarea
    cols="50"
    rows="10"
    bind:value={sortable}
    placeholder="enter or paste lines to sort"
  />
  <button
    class="button-a"
    on:click={() => {
      sortable = sortable.split('\n').sort().join('\n');
    }}>Sort</button
  >
  <ClipboradCopy
    textToCopy={sortable}
    on:copied={(c) => console.log(c.detail.textToCopy)}
  />
</section>

<style>
  textarea {
    all: revert;
  }
  .sorter {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1em;
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

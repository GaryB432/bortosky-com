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
  textarea,
  button {
    all: revert;
  }
  .sorter {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1em;
  }
  button {
    display: inline-block;
    outline: none;
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
    border-radius: 500px;
    transition-property: background-color, border-color, color, box-shadow,
      filter;
    transition-duration: 0.3s;
    border: 1px solid transparent;
    letter-spacing: 2px;
    min-width: 160px;
    text-transform: uppercase;
    white-space: normal;
    font-weight: 700;
    text-align: center;
    padding: 17px 48px;
    color: #fff;
    background-color: var(--sand-5);
    height: 48px;
  }

  button:hover {
    transform: scale(1.04);
    background-color: var(--sand-3);
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

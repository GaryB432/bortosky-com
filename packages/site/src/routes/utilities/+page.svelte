<script lang="ts">
  let sortable = '';
</script>

<h1>Tools</h1>
<h2>Sorter</h2>
<section class="sorter">
  <textarea cols="40" rows="5" bind:value={sortable} />
  <button
    on:click={() => {
      console.log(sortable);
      sortable = sortable.split('\n').sort().join('\n');
    }}>Sort</button
  >
</section>

<style>
  textarea,
  button {
    all: revert;
  }
  @media screen and (min-width: 576px) {
    /* landscape phones */
  }
  @media screen and (min-width: 768px) {
    /* tablets */
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

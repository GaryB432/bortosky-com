<script lang="ts">
  import { page } from '$app/stores';
  import { qrs } from '$lib/shared/quick-response';

  const subject = qrs[parseInt($page.params.index, 10)];
  function qrSource(src: string): string {
    return src.startsWith('http') ? src : `../../${src}`;
  }
</script>

<svelte:head>
  <title>
    {subject.caption} Quick Response
  </title>
</svelte:head>

<article class="container">
  <img src={qrSource(subject.src)} alt="" />
  <div class="cap">
    {subject.caption}
  </div>
</article>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    border: thin solid silver;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 100%;
    align-self: center;
  }
  @media screen and (min-width: 576px) {
    /* landscape phones */
    img {
      width: 80vh;
    }
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

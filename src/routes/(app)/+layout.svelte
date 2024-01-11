<script>
  import FamilyLogo from "$lib/components/FamilyLogo.svelte";
  import SlideNav from "$lib/components/SlideNav.svelte";

</script>

<main>
  <div class="top">
    <div class="left">
      <SlideNav />
      <FamilyLogo />
      <h1>Bortosky Family</h1>
    </div>
  </div>
  <div>
    <slot />
  </div>
</main>

<style lang="scss">
  .top {
    --color-h1: white;
    background-color: var(--fun-blue);
    .left {
      display: flex;
      align-items: center;
      h1 {
        margin: 0;
      }
    }
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

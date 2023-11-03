<script>
  import FamilyLogo from "$lib/components/FamilyLogo.svelte";
  import Navigation from "$lib/components/Navigation.svelte";
</script>

<main>
  <div class="top">
    <div class="left">
      <FamilyLogo />
      <h1>Bortosky Family</h1>
    </div>
    <Navigation />
  </div>
  <div>
    <slot />
  </div>
</main>

<!-- 
<style>
  .left {
    min-width: 35ch;
  }

  .left a {
    display: flex;
    height: 5em;
    align-content: normal;
    justify-content: center;
    align-items: center;
    gap: 1em;
    border-block-end: 2px solid #283a94;
  }

  .left h1 {
    margin-bottom: 0;
  }

  @media screen and (min-width: 992px) {
    main {
      display: grid;
      grid-template-columns: 1fr 4fr;
      height: 100%;
    }
    .left a {
      padding: 1em;
      justify-content: center;
      align-items: center;
    }

    .left h1 {
      font-size: 2rem;
    }

    .right {
      border-left: 2px solid var(--sand-3);
      padding: 4em;
    }
  }
</style> -->

<style lang="scss">
  main {
    margin: 0 1rem;
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      padding: 0;
      margin: 0;
      font-size: 1.5rem;
      line-height: unset;

    }

    .left {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
  }
</style>

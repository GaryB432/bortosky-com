<script>
  import FamilyLogo from "$lib/components/FamilyLogo.svelte";
  let { children } = $props();
</script>

<main>
  <div class="top">
    <div>
      <a href="/">
        <FamilyLogo />
      </a>
      Bortosky Family
    </div>
    <a
      href="//github.com/GaryB432/bortosky-com"
      target="_blank"
      aria-label="github"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        preserveAspectRatio="xMidYMid meet"
        focusable="false"
      >
        <path
          d="M 8 0 C 3.58 0 0 3.58 0 8 c 0 3.54 2.29 6.53 5.47 7.59 c 0.4 0.07 0.55 -0.17 0.55 -0.38 c 0 -0.19 -0.01 -0.82 -0.01 -1.49 c -2.01 0.37 -2.53 -0.49 -2.69 -0.94 c -0.09 -0.23 -0.48 -0.94 -0.82 -1.13 c -0.28 -0.15 -0.68 -0.52 -0.01 -0.53 c 0.63 -0.01 1.08 0.58 1.23 0.82 c 0.72 1.21 1.87 0.87 2.33 0.66 c 0.07 -0.52 0.28 -0.87 0.51 -1.07 c -1.78 -0.2 -3.64 -0.89 -3.64 -3.95 c 0 -0.87 0.31 -1.59 0.82 -2.15 c -0.08 -0.2 -0.36 -1.02 0.08 -2.12 c 0 0 0.67 -0.21 2.2 0.82 c 0.64 -0.18 1.32 -0.27 2 -0.27 c 0.68 0 1.36 0.09 2 0.27 c 1.53 -1.04 2.2 -0.82 2.2 -0.82 c 0.44 1.1 0.16 1.92 0.08 2.12 c 0.51 0.56 0.82 1.27 0.82 2.15 c 0 3.07 -1.87 3.75 -3.65 3.95 c 0.29 0.25 0.54 0.73 0.54 1.48 c 0 1.07 -0.01 1.93 -0.01 2.2 c 0 0.21 0.15 0.46 0.55 0.38 A 8.013 8.013 0 0 0 16 8 c 0 -4.42 -3.58 -8 -8 -8 z"
        ></path>
      </svg>
    </a>
  </div>
  <div class="l-body">
    {@render children()}
  </div>
</main>

<style lang="scss">
  .top {
    --color-h1: white;
    background-color: rgb(var(--fun-blue));
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.3rem;
    div:nth-child(1) {
      gap: 0.25rem;
      display: flex;
      align-items: center;
      color: var(--color-h1);
      font-size: clamp(1.0625rem, 3vw, 1.625rem);
      line-height: clamp(1.5rem, 4vw, 2rem);
    }
    svg {
      fill: var(--color-h1);
      height: 1.625rem;
    }
  }
  .l-body {
    margin: 0.5em;
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

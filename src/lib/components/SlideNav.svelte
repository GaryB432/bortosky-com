<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";

  let checked = false;

  function uncheck() {
    checked = false;
  }
</script>

<nav>
  <label>
    <input type="checkbox" bind:checked />
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="30" />
      <path class="line--1" d="M0 40h62c13 0 6 28-4 18L35 35" />
      <path class="line--2" d="M0 50h70" />
      <path class="line--3" d="M0 60h62c13 0 6-28-4-18L35 65" />
    </svg>
  </label>
  <ul>
    <li class:active={$page.route.id === "/(app)"}>
      <a on:click={uncheck} data-sveltekit-reload href="{base}/"> Home </a>
    </li>
    <li class:active={$page.route.id === "/(app)/gary"}>
      <a on:click={uncheck} data-sveltekit-reload href="{base}/gary">
        Gary&apos;s Things
      </a>
    </li>
    <li class:active={$page.route.id === "/(app)/utilities"}>
      <a on:click={uncheck} data-sveltekit-reload href="{base}/utilities">
        Tools
      </a>
    </li>
    <li class:active={$page.route.id === "/(app)/privacy-terms"}>
      <a on:click={uncheck} data-sveltekit-reload href="{base}/privacy-terms">
        Privacy and Terms
      </a>
    </li>
  </ul>
</nav>

<style lang="scss">
  nav {
    position: relative;
  }

  ul {
    --left: 20px;
    --width: 250px;
    --xlatex: calc(-1 * calc(var(--left) + var(--width)));
    box-shadow: 0 0 10px #85888c;
    position: absolute;
    padding: 2rem;
    background-color: var(--color-document-bg);
    color: var(--color-document-text);
    font-weight: 500;
    width: var(--width);
    transform-origin: 0% 0%;
    transform: translate(var(--xlatex), 0);
    transition: transform 0.5s linear;
    top: 100px;
    left: var(--left);
    z-index: 2;
  }

  li {
    padding: 0.8rem 0;
  }

  label:has(input:checked) + ul {
    transform: none;
  }

  svg {
    height: 150px;
  }

  path {
    fill: none;
    stroke: #ffffff;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    --length: 24;
    --offset: -38;
    stroke-dasharray: var(--length) var(--total-length);
    stroke-dashoffset: var(--offset);
    transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  nav {
    background-color: #3f77e9;
    .line--1,
    .line--3 {
      --total-length: 126.64183044433594;
    }
    .line--2 {
      --total-length: 70;
    }
    input:checked + svg {
      .line--1,
      .line--3 {
        --offset: -94.1149185097;
      }
      .line--2 {
        --offset: -50;
      }
    }
  }

  nav input:checked + svg {
    .line--1,
    .line--3 {
      --length: 22.627416998;
    }
    .line--2 {
      --length: 0;
    }
  }

  circle {
    fill: #fff3;
    opacity: 0;
  }

  label:hover circle {
    opacity: 1;
  }

  a:hover {
    opacity: 0.4;
  }
</style>

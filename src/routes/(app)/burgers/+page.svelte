<script lang="ts">
  import { onMount } from "svelte";

  let autoShow: ReturnType<typeof setTimeout>;

  onMount(() => {
    let currentActive = 0;
    const checkboxes =
      document.querySelectorAll<HTMLInputElement>(".grid input");
    autoShow = setInterval(() => {
      const covert4 = currentActive % 4;
      checkboxes[covert4].checked = !checkboxes[covert4].checked;
      if (!checkboxes[covert4].checked) {
        currentActive += 1;
      }
    }, 1000);
  });
</script>

<svelte:head>
  <title>bortosky-com - burgers</title>
</svelte:head>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="grid"
  onclick={() => {
    clearInterval(autoShow);
  }}
>
  <div class="menu cross menu--1">
    <label>
      <input type="checkbox" />
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" />
        <path class="line--1" d="M0 40h62c13 0 6 28-4 18L35 35" />
        <path class="line--2" d="M0 50h70" />
        <path class="line--3" d="M0 60h62c13 0 6-28-4-18L35 65" />
      </svg>
    </label>
  </div>
  <div class="menu cross menu--2">
    <label>
      <input type="checkbox" />
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" />
        <path class="line--1" d="M0 70l28-28c2-2 2-2 7-2h64" />
        <path class="line--2" d="M0 50h99" />
        <path class="line--3" d="M0 30l28 28c2 2 2 2 7 2h64" />
      </svg>
    </label>
  </div>
  <div class="menu back menu--3">
    <label>
      <input type="checkbox" />
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" />
        <path class="line--1" d="M0 40h62c18 0 18-20-17 5L31 55" />
        <path class="line--2" d="M0 50h80" />
        <path class="line--3" d="M0 60h62c18 0 18 20-17-5L31 45" />
      </svg>
    </label>
  </div>
  <div class="menu back menu--4">
    <label>
      <input type="checkbox" />
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" />
        <path class="line--1" d="M0 55l14-10c4.7-3.3 9-5 13-5h72" />
        <path class="line--2" d="M0 50h99" />
        <path class="line--3" d="M0 45l14 10c4.7 3.3 9 5 13 5h72" />
      </svg>
    </label>
  </div>
</div>

<style lang="scss">
  input {
    display: none;
  }

  .grid {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    width: 100vw;
    height: 80vh;
    position: absolute;
  }

  .grid > * {
    position: relative;
  }

  label {
    display: block;
    cursor: pointer;
    position: absolute;
    width: 50vw;
    height: 50vw;
    max-width: 150px;
    max-height: 150px;
  }

  @media (min-aspect-ratio: 1/1) {
    label {
      width: 50vh;
      height: 50vh;
    }
  }

  .menu--1 label,
  .menu--2 label {
    bottom: 0;
  }

  .menu--3 label,
  .menu--4 label {
    top: 0;
  }

  .menu--1 label,
  .menu--3 label {
    right: 0;
  }

  .menu--2 label,
  .menu--4 label {
    left: 0;
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

  circle {
    fill: #fff3;
    opacity: 0;
  }

  label:hover circle {
    opacity: 1;
  }

  .cross input:checked + svg {
    .line--1,
    .line--3 {
      --length: 22.627416998;
    }
    .line--2 {
      --length: 0;
    }
  }

  .back input:checked + svg {
    .line--1,
    .line--3 {
      --length: 8.602325267;
    }
  }

  .menu--1 {
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

  .menu--2 {
    background-color: #0095f9;
    .line--1,
    .line--3 {
      --total-length: 111.22813415527344;
      --offset: -50.22813415527344;
    }
    .line--2 {
      --total-length: 99;
    }
    input:checked + svg {
      path {
        transform: translateX(30px);
      }
      .line--1,
      .line--3 {
        --offset: -16.9705627485;
      }
      .line--2 {
        --offset: -20;
      }
    }
  }

  .menu--3 {
    background-color: #00aef6;
    .line--1,
    .line--3 {
      --total-length: 126.38166809082031;
    }
    .line--2 {
      --total-length: 80;
    }
    input:checked + svg {
      .line--1,
      .line--3 {
        --offset: -109.1770175568;
      }
    }
  }

  .menu--4 {
    background-color: #18bee5;
    .line--1,
    .line--3 {
      --total-length: 103.35061645507812;
      --offset: -42.35061645507812;
    }
    .line--2 {
      --total-length: 99;
    }
    input:checked + svg {
      path {
        transform: translateX(31px);
      }
      .line--1,
      .line--3 {
        --offset: -8.602325267;
      }
      .line--2 {
        --offset: -7;
      }
    }
  }
</style>

<script lang="ts">
  import { selectedNodeName } from "../states.svelte";

  let { choices }: { choices: string[] } = $props();

  let value = $state("");

  let suggestions = $derived(
    choices.filter((c) => value && c.startsWith(value)),
  );

  let active = $derived(suggestions.length > 0 && value !== suggestions[0]);
</script>

<div class="container">
  <div class="searchInput" class:active>
    <input bind:value type="text" placeholder="See Package&hellip;" />
    <div class="resultBox">
      {#each suggestions as sug}
        <button
          onclick={() => {
            console.log(sug);
            value = sug;
          }}
        >
          {sug}
        </button>
      {/each}
    </div>
    <button
      aria-label="magnifying glass"
      class="icon"
      onclick={() => {
        console.log("ok", value);
        selectedNodeName.name = value;
      }}
    >
      <svg
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 390 390"
      >
        <path
          d="M379.711,326.556L265.343,212.188c30.826-54.189,23.166-124.495-23.001-170.663c-55.367-55.366-145.453-55.366-200.818,0
			c-55.365,55.366-55.366,145.452,0,200.818c46.167,46.167,116.474,53.827,170.663,23.001l114.367,114.369
			c14.655,14.655,38.503,14.654,53.157,0C394.367,365.059,394.368,341.212,379.711,326.556z M214.057,214.059
			c-39.77,39.771-104.479,39.771-144.25,0c-39.77-39.77-39.77-104.48,0-144.25c39.771-39.77,104.48-39.77,144.25,0
			C253.828,109.579,253.827,174.29,214.057,214.059z"
        />
      </svg>
    </button>
  </div>
</div>

<style lang="scss">
  .container .searchInput {
    background: #fff;
    width: 100%;
    border-radius: 5px;
    position: relative;
    box-shadow: 0 1px 5px 3px rgba(0, 0, 0, 0.12);
  }

  .searchInput input {
    height: 55px;
    width: 100%;
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 0 60px 0 20px;
    font-size: 18px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  }

  .searchInput.active input {
    border-radius: 5px 5px 0 0;
  }

  .searchInput .resultBox {
    padding: 0;
    opacity: 0;
    pointer-events: none;
    max-height: 280px;
    overflow-y: auto;
  }

  .searchInput.active .resultBox {
    padding: 10px 8px;
    opacity: 1;
    pointer-events: auto;
  }

  .resultBox button {
    list-style: none;
    padding: 8px 12px;
    display: none;
    width: 100%;
    cursor: default;
    border-radius: 3px;
  }

  .searchInput.active .resultBox button {
    display: block;
  }
  .resultBox button:hover {
    background: #efefef;
  }

  .searchInput .icon {
    position: absolute;
    right: 0;
    top: 0;
    height: 55px;
    width: 55px;
    text-align: center;
    line-height: 55px;
    color: var(--sand-5);
    cursor: pointer;
  }

  .searchInput .icon svg {
    margin: 8px;
  }
</style>

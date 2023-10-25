<script lang="ts">
  import { selectedNodeName } from "../stores";

  export let choices: string[] = [];

  $: suggestions = choices.filter((c) => value && c.startsWith(value));
  $: active = suggestions.length > 0;

  let value = "";
</script>

<div class="container">
  <div class="searchInput" class:active>
    <input bind:value type="text" placeholder="See Package&hellip;" />
    <div class="resultBox">
      {#each suggestions as sug}
        <button
          on:click={() => {
            $selectedNodeName = sug;
            value = "";
          }}
        >
          {sug}
        </button>
      {/each}
      <!-- here list are inserted from javascript -->
    </div>
    <div class="icon">F</div>
  </div>
</div>

<style lang="scss">
  // ::selection {
  //   color: #fff;
  //   background: #664aff;
  //   background: orange;
  // }

  // .container {
  //   max-width: 450px;
  //   margin: 0 auto;
  // }

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
    font-size: 20px;
    color: var(--sand-5);
    cursor: pointer;
  }
</style>

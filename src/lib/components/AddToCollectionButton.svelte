<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let checked = false;
  const dispatch = createEventDispatcher<{ change: { checked: boolean } }>();
</script>

<label class="collection">
  <input
    bind:checked
    on:change={() => {
      dispatch("change", { checked });
    }}
    type="checkbox"
  />
  <div><span></span></div>
</label>

<style lang="scss">
  $border: var(--color-document-text);

  .collection {
    input {
      display: none;
      & + div {
        position: relative;
        width: 24px;
        height: 36px;
        border-radius: 3px;
        border: 2px solid $border;
        margin: 0 0 0 8px;
        cursor: pointer;
        transition: all 0.4s ease;
        &:before,
        &:after {
          content: "";
          display: block;
          position: absolute;
          width: 2px;
          border-radius: 2px;
          background-color: $border;
          right: 100%;
          transition:
            all 0.4s ease,
            background-color 0.2s ease;
        }
        &:before {
          transform: translate(-4px, 0);
          top: 4px;
          bottom: 4px;
        }
        &:after {
          transform: translate(-8px, 0);
          top: 8px;
          bottom: 8px;
        }
        span {
          display: block;
          left: 50%;
          top: 50%;
          position: absolute;
          transition: transform 0.4s ease;
          &:before,
          &:after {
            content: "";
            display: block;
            position: absolute;
            border-radius: 2px;
            background-color: $border;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            transition: background-color 0.2s ease;
          }
          &:before {
            width: 10px;
            height: 2px;
          }
          &:after {
            height: 10px;
            width: 2px;
          }
        }
      }
      &:checked + div {
        height: 24px;
        margin: 6px 4px;
        background-color: $border;
        &:before,
        &:after {
          transform: translate(2px, 0);
          opacity: 0;
        }
        span {
          transform: rotate(-225deg);
          &:before,
          &:after {
            background-color: var(--color-document-bg);
          }
        }
      }
    }
  }
</style>

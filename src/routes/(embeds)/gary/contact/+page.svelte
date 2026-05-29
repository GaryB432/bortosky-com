<script lang="ts">
  import { resolve } from "$app/paths";

  const STAGE_SIZE = 320;
  const url = $state(resolve("/gary/contact/download"));
</script>

<svelte:head>
  <title>Contact Gary</title>
</svelte:head>

<div class="vp" style="--qr-size: {STAGE_SIZE}px;">
  <div class="stage">
    <lean-qr value={url}></lean-qr>
  </div>
  <div class="hud">
    <div class="copy">
      <h1>Snap To Add Gary</h1>
      <a class="download" href={url} target="_blank" rel="noreferrer"
        >Add to Contacts</a
      >
    </div>
  </div>
</div>

<style lang="scss">
  .copy {
    margin-top: auto;
    text-align: center;
    color: #333;
    max-width: var(--qr-size);
    animation: rise-in 0.6s ease-out both;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-weight: 900;
  }

  .download {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    padding: 0 1.5rem;
    border-radius: 999px;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    font-weight: 800;
    background: #000;
    color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:active {
      transform: translateY(1px);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
  }

  .vp {
    display: flex;
    flex-direction: column;
    background-color: var(--color-document-bg);
    align-items: center;
    justify-content: space-around;
    width: min(100%, 420px);
    min-height: calc(100dvh - 35px);
    margin: 0 auto;
  }

  .stage {
    background-color: white;
    width: var(--qr-size);
    height: var(--qr-size);
  }

  .hud {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 1rem;
  }

  @keyframes rise-in {
    from {
      transform: translateY(10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>

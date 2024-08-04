<script lang="ts">
  let {
    oncopied,
    textToCopy = "empty text",
    width = "8em",
  } = $props<{
    oncopied: (copiedText: string) => void;
    textToCopy?: string;
    width?: string;
  }>();

  const clipboardPath =
    "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2";
  const checkPath = "m-6 9l2 2 4-4";
  let copied = $state(false);
  let d = $state(clipboardPath);
  function writeClipboardText() {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => oncopied(textToCopy))
      .catch(() => alert("not copied"));
  }
</script>

<button
  type="button"
  style="width: {width}"
  aria-label="To Copy"
  onclick={() => {
    d = clipboardPath.concat(checkPath);
    copied = true;
    setTimeout(() => {
      d = clipboardPath;
      copied = false;
    }, 1500);
    writeClipboardText();
  }}
>
  <svg
    class:copied
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" {d} />
  </svg>
</button>

<style>
  :host {
    display: inline-block;
  }
  button {
    flex-shrink: 0;
  }
  svg {
    stroke: var(--sand-5);
    transition: transform 200ms;
  }
  svg.copied {
    transform: scale(1.3);
  }
</style>

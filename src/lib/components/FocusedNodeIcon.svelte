<script lang="ts">
  import { cssDeclarations } from "$lib/project/cyto";
  import type cytoscape from "cytoscape";

  let flash = $state(false);

  const styl = cssDeclarations();

  const fss = styl.find((s) => s.selector === "node.focused") ?? {
    selector: "node.focused",
    style: {
      "background-color": "blue",
      "border-width": 6,
      "border-color": "green",
    } as cytoscape.CssStyleDeclaration,
  };

  const duration = 500;
  const radius = 200;

  const focusedNodeStyle = fss.style as cytoscape.Css.Node;

  const backgroundColor = focusedNodeStyle[
    "background-color"
  ]?.valueOf() as string;
  const borderColor = focusedNodeStyle["border-color"]?.valueOf() as string;
  const borderWidth = focusedNodeStyle["border-width"]?.valueOf() as number;

  $effect(() => {
    const ftimer = setTimeout(() => {
      flash = false;
    }, duration / 2);
    flash = true;
    return () => {
      console.log("ueifuh timer killed");
      clearTimeout(ftimer);
    };
  });

</script>

<svg
  class:flash
  style="transition-duration: {duration / 2}ms"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 {radius * 2} {radius * 2}"
>
  <circle
    cx={radius}
    cy={radius}
    r={radius - borderWidth}
    stroke={borderColor}
    stroke-width={borderWidth}
    fill={backgroundColor}
  />
</svg>

<style lang="scss">
  svg {
    height: 2rem;
    transform: scale(1);
    transition: transform linear;
    &.flash {
      transform: scale(1.5);
    }
  }
</style>

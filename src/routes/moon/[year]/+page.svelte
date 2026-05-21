<script lang="ts">
  import { onMount } from "svelte";

  let { data } = $props();

  let { fullMoons } = $derived(data);

  let canvasEl: HTMLCanvasElement | null = $state(null);

  //   const f = canvasEl ? canvasEl.

  let ctx: CanvasRenderingContext2D | null = null;
  let animationId: number;

  // Animation state
  let a = 0;

  function drawMoonPhases() {
    if (!ctx || !canvasEl) return;
    const width = canvasEl.width;
    const height = canvasEl.height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Colors
    const bgColor = "#000";
    const lightColor = "#ffff4b";
    const accentColor = "#ff00ff";

    // Sizes
    const d1 = width / 4.5;
    const d2 = width / 11.25;

    // Earth position
    const earthx = width / 2 - width / 6;
    const earthy = height / 2;

    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Draw earth (half circle)
    ctx.save();
    ctx.beginPath();
    ctx.arc(earthx, earthy, d1 / 2, Math.PI / 2, (3 * Math.PI) / 2);
    ctx.closePath();
    ctx.fillStyle = lightColor;
    ctx.fill();
    ctx.restore();

    // Animate moon
    a -= 0.01;
    a %= -Math.PI * 2;
    const x = (((Math.cos(a) * d1) / 2) * 5) / 2;
    const y = (((Math.sin(a) * d1) / 2) * 5) / 2;
    const moonx = x + earthx;
    const moony = y + earthy;

    // Draw moon (half circle)
    ctx.save();
    ctx.beginPath();
    ctx.arc(moonx, moony, d2 / 2, Math.PI / 2, (3 * Math.PI) / 2);
    ctx.closePath();
    ctx.fillStyle = lightColor;
    ctx.fill();
    ctx.restore();

    // Draw moon axis line
    ctx.save();
    ctx.strokeStyle = accentColor;
    ctx.beginPath();
    ctx.moveTo(
      moonx + (d2 / 2) * Math.cos(a + Math.PI / 2),
      moony + (d2 / 2) * Math.sin(a + Math.PI / 2),
    );
    ctx.lineTo(
      moonx - (d2 / 2) * Math.cos(a + Math.PI / 2),
      moony - (d2 / 2) * Math.sin(a + Math.PI / 2),
    );
    ctx.stroke();
    ctx.restore();

    // View trajectory
    ctx.save();
    ctx.strokeStyle = accentColor;
    ctx.beginPath();
    ctx.moveTo(
      earthx + (Math.cos(a) * d1) / 2,
      earthy + (Math.sin(a) * d1) / 2,
    );
    ctx.lineTo(moonx - (Math.cos(a) * d2) / 2, moony - (Math.sin(a) * d2) / 2);
    ctx.stroke();
    ctx.restore();

    // Separation line
    ctx.save();
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(width / 2 + width / 6, 0);
    ctx.lineTo(width / 2 + width / 6, height);
    ctx.stroke();
    ctx.restore();

    // Moon phases (right side)
    const phasex = width - width / 6;
    const phasey = height / 2;

    // Phase separation line
    ctx.save();
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(phasex, 0);
    ctx.lineTo(phasex, height);
    ctx.stroke();
    ctx.restore();

    // Draw phase (simulate shadow)
    // Main moon disc
    ctx.save();
    ctx.beginPath();
    ctx.arc(phasex, phasey, d2 / 2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = lightColor;
    ctx.fill();

    // Shadow (simulate phase)
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    // The shadow width is based on the cosine of the angle
    const phaseWidth = Math.abs(Math.cos(a)) * d2;
    ctx.ellipse(phasex, phasey, phaseWidth / 2, d2 / 2 + 1, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    ctx.restore();

    // Optionally, draw phase number
    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.font = "30px sans-serif";
    let stat = "";
    if (-Math.PI / 2 < a && a < 0) {
      stat = "1";
    } else if (-Math.PI < a && a < -Math.PI / 2) {
      stat = "2";
    } else if ((-3 * Math.PI) / 2 < a && a < -Math.PI) {
      stat = "3";
    } else if (-2 * Math.PI < a && a < (-3 * Math.PI) / 2) {
      stat = "4";
    }
    ctx.fillText(stat, 200, 80);
    ctx.restore();
  }

  function animate() {
    drawMoonPhases();
    animationId = requestAnimationFrame(animate);
  }

  onMount(() => {
    if (canvasEl) {
      ctx = canvasEl.getContext("2d");
      // Set initial size
      canvasEl.width = 900;
      canvasEl.height = 600;
      animate();
    }
    return () => {
      cancelAnimationFrame(animationId);
    };
  });
</script>

<canvas bind:this={canvasEl}></canvas>

<pre>
    {JSON.stringify(fullMoons, undefined, 2)}
</pre>

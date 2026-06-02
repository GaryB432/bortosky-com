<script lang="ts">
  import { onMount } from "svelte";

  const BEAT_SECONDS = 1;
  const SCHEDULER_INTERVAL_MS = 40;
  const SCHEDULE_AHEAD_SECONDS = 0.35;
  const LATE_THRESHOLD_SECONDS = 0.08;
  const START_LEAD_THRESHOLD_MS = 150;

  type Tone = {
    amp: number;
    duration: number;
    frequency: number;
    offset?: number;
    type: OscillatorType;
  };

  const NORMAL_TONE: Tone = {
    amp: 0.08,
    duration: 0.09,
    frequency: 880,
    type: "triangle",
  };
  const TENTH_TONE_ONE: Tone = {
    amp: 0.11,
    duration: 0.09,
    frequency: 1046,
    offset: 0,
    type: "triangle",
  };
  const TENTH_TONE_TWO: Tone = {
    amp: 0.1,
    duration: 0.1,
    frequency: 659,
    offset: 0.18,
    type: "triangle",
  };
  const MINUTE_TONE: Tone = {
    amp: 0.14,
    duration: 0.3,
    frequency: 466,
    type: "sine",
  };

  let audioCtx: AudioContext | null = null;
  let masterGain: GainNode | null = null;
  let running = $state(false);
  let schedulerId: null | ReturnType<typeof setInterval> = null;
  let wakeLock: null | WakeLockSentinel = null;
  let startAudioTime = 0;
  let startEpochMs = 0;
  let nextBeatIndex = 0;
  let beatCount = $state(0);
  let accentNow = $state(false);
  let pulseMode = $state<"" | "accent" | "beat" | "minute">("");
  let pulseKey = $state(0);
  let statusTone = $state<"ok" | "stop" | "warn">("stop");
  let statusText = $state("Stopped");
  let volume = $state(0.35);
  const pulseTimeouts = new Set<ReturnType<typeof setTimeout>>();

  const cycleDisplay = $derived(
    beatCount === 0 ? "1 / 10" : `${((beatCount - 1) % 10) + 1} / 10`,
  );

  function clearPulseTimeouts() {
    for (const id of pulseTimeouts) clearTimeout(id);
    pulseTimeouts.clear();
  }

  async function ensureAudio() {
    if (!audioCtx) {
      audioCtx = new AudioContext();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = volume;
      masterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state !== "running") {
      setStatus("Resuming", "warn");
      await audioCtx.resume();
    }
  }

  function makeTone(
    time: number,
    duration: number,
    frequency: number,
    type: OscillatorType,
    amp: number,
  ) {
    if (!audioCtx || !masterGain) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, time);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(amp, time + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(time);
    osc.stop(time + duration + 0.02);
  }

  function playToneAt(baseTime: number, tone: Tone) {
    makeTone(
      baseTime + (tone.offset || 0),
      tone.duration,
      tone.frequency,
      tone.type,
      tone.amp,
    );
  }

  async function requestWakeLock() {
    if (!("wakeLock" in navigator)) return;
    try {
      wakeLock = await navigator.wakeLock.request("screen");
      wakeLock.addEventListener("release", () => {
        if (running) setStatus("Running (wake lock released)", "warn");
      });
    } catch (_) {
      setStatus("Running (wake lock unavailable)", "warn");
    }
  }

  function scheduleBeat(beatIndex: number) {
    if (!audioCtx) return;

    const beatTime = startAudioTime + beatIndex * BEAT_SECONDS;
    const beatNumber = beatIndex + 1;
    const beatEpoch = startEpochMs + beatIndex * 1000;
    const sec = new Date(beatEpoch).getSeconds();
    const isMinuteTop = sec === 0;
    const isTenAccent = beatNumber % 10 === 0;
    const pulseMode = isMinuteTop ? "minute" : isTenAccent ? "accent" : "beat";

    if (isMinuteTop) {
      playToneAt(beatTime, MINUTE_TONE);
    } else if (isTenAccent) {
      playToneAt(beatTime, TENTH_TONE_ONE);
      playToneAt(beatTime, TENTH_TONE_TWO);
    } else {
      playToneAt(beatTime, NORMAL_TONE);
    }

    const delayMs = Math.max(0, (beatTime - audioCtx.currentTime) * 1000);
    const pulseTimer = setTimeout(() => {
      pulseTimeouts.delete(pulseTimer);
      if (!running) return;

      updateCounters(beatNumber, isTenAccent);
      triggerPulse(pulseMode);
    }, delayMs);
    pulseTimeouts.add(pulseTimer);
  }

  function scheduler() {
    if (!running || !audioCtx) return;

    const now = audioCtx.currentTime;
    const expectedNextTime = startAudioTime + nextBeatIndex * BEAT_SECONDS;

    if (expectedNextTime < now - LATE_THRESHOLD_SECONDS) {
      // Re-anchor to the fixed timeline so brief stalls do not accumulate timing drift.
      nextBeatIndex = Math.floor((now - startAudioTime) / BEAT_SECONDS) + 1;
      const resumedBeatNumber = nextBeatIndex;
      updateCounters(resumedBeatNumber, resumedBeatNumber % 10 === 0);
      setStatus("Resuming", "warn");
    } else if (statusText !== "Running") {
      setStatus("Running", "ok");
    }

    const horizon = now + SCHEDULE_AHEAD_SECONDS;
    while (startAudioTime + nextBeatIndex * BEAT_SECONDS < horizon) {
      scheduleBeat(nextBeatIndex);
      nextBeatIndex++;
    }
  }

  function setStatus(text: string, tone: "ok" | "stop" | "warn" = "warn") {
    statusText = text;
    statusTone = tone;
  }

  async function start() {
    if (running) return;
    await ensureAudio();
    if (!audioCtx) return;
    await requestWakeLock();

    running = true;
    updateCounters(0, false);

    const nowMs = Date.now();
    const nextSecondMs = Math.ceil(nowMs / 1000) * 1000;
    // If the next boundary is too close, wait one extra second so first beat has safe scheduling lead time.
    const safetyPaddingMs =
      nextSecondMs - nowMs < START_LEAD_THRESHOLD_MS ? 1000 : 0;
    startEpochMs = nextSecondMs + safetyPaddingMs;
    startAudioTime = audioCtx.currentTime + (startEpochMs - nowMs) / 1000;
    nextBeatIndex = 0;

    if (schedulerId) clearInterval(schedulerId);
    schedulerId = setInterval(scheduler, SCHEDULER_INTERVAL_MS);
    scheduler();
    setStatus("Running", "ok");
  }

  async function stop() {
    if (!running) return;
    running = false;
    if (schedulerId) {
      clearInterval(schedulerId);
      schedulerId = null;
    }
    clearPulseTimeouts();

    if (masterGain && audioCtx) {
      const now = audioCtx.currentTime;
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.setTargetAtTime(0.0001, now, 0.01);
    }
    if (audioCtx?.state === "running") await audioCtx.suspend();
    if (masterGain) masterGain.gain.value = volume;

    if (wakeLock) {
      try {
        await wakeLock.release();
      } catch (_) {}
      wakeLock = null;
    }
    setStatus("Stopped", "stop");
  }

  function triggerPulse(mode: "accent" | "beat" | "minute") {
    pulseMode = mode;
    pulseKey += 1;
  }

  function updateCounters(beatNumber: number, accent = false) {
    beatCount = beatNumber;
    accentNow = accent;
  }

  $effect(() => {
    if (masterGain) masterGain.gain.value = volume;
  });

  onMount(() => {
    const handleVisibilityChange = async () => {
      if (!running) return;

      if (document.visibilityState === "visible") {
        await ensureAudio();
        await requestWakeLock();
        scheduler();
      } else {
        setStatus("Suspended", "warn");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (schedulerId) {
        clearInterval(schedulerId);
        schedulerId = null;
      }
      clearPulseTimeouts();

      if (wakeLock) {
        wakeLock.release().catch(() => {});
        wakeLock = null;
      }

      if (audioCtx && audioCtx.state !== "closed") {
        audioCtx.close().catch(() => {});
      }
    };
  });
</script>

<main class="kiosk">
  <h1>metro-clock-nome</h1>
  <p class="subtitle">
    One beat per second, playful accents at 10-beat intervals and :00
  </p>

  <div class="pulse-wrap">
    {#key pulseKey}
      <div id="pulse" class="pulse {pulseMode}"></div>
    {/key}
  </div>

  <section class="meta">
    <div class="meta-item">
      <span class="label">Beat Count</span>
      <span id="beatCount" class="value">{beatCount}</span>
    </div>
    <div class="meta-item">
      <span class="label">10-Beat Cycle</span>
      <span id="cycle" class="value" class:accent-now={accentNow}
        >{cycleDisplay}</span
      >
    </div>
  </section>

  <section class="controls">
    <button id="startBtn" class="start" onclick={start} disabled={running}
      >Start</button
    >
    <button id="stopBtn" class="stop" onclick={stop} disabled={!running}
      >Stop</button
    >
    <label class="volume">
      <span>Volume</span>
      <input
        id="volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        bind:value={volume}
      />
    </label>
  </section>

  <p class="status">
    Status: <strong id="statusText" class={statusTone}>{statusText}</strong>
  </p>
</main>

<style>
  :root {
    color-scheme: dark;
    --bg1: #0f0a2b;
    --bg2: #1f174f;
    --card: rgba(255, 255, 255, 0.08);
    --pulse: #8dfffc;
    --pulse-accent: #ffd166;
    --text: #f5f7ff;
    --muted: #c5c9e8;
    --ok: #7dff9f;
    --warn: #ffd166;
    --stop: #ff8f9f;
  }

  * {
    box-sizing: border-box;
  }
  :global {
    html,
    body {
      height: 100%;
      margin: 0;
    }
    body {
      display: grid;
      place-items: center;
      background:
        radial-gradient(circle at 30% 20%, #35237d, transparent 40%),
        linear-gradient(145deg, var(--bg1), var(--bg2));
      color: var(--text);
      font-family: "Avenir Next", "Segoe UI", Inter, system-ui, sans-serif;
    }
  }

  .kiosk {
    width: min(780px, 92vw);
    padding: clamp(20px, 3vw, 30px);
    border-radius: 24px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.12),
      rgba(255, 255, 255, 0.06)
    );
    box-shadow:
      0 20px 50px rgba(6, 5, 18, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(8px);
    text-align: center;
  }

  h1 {
    margin: 0 0 4px;
    font-size: clamp(1.6rem, 2vw, 2rem);
    letter-spacing: 0.04em;
  }
  .subtitle {
    margin: 0 0 24px;
    color: var(--muted);
    font-size: 0.95rem;
  }

  .pulse-wrap {
    display: grid;
    place-items: center;
    width: min(48vmin, 340px);
    aspect-ratio: 1;
    margin: 0 auto 26px;
    border-radius: 50%;
    background: radial-gradient(
      circle at 50% 45%,
      rgba(255, 255, 255, 0.18),
      rgba(255, 255, 255, 0.02)
    );
    border: 1px solid rgba(255, 255, 255, 0.22);
  }

  .pulse {
    width: 46%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, #ffffff, var(--pulse));
    box-shadow: 0 0 0 0 rgba(141, 255, 252, 0.9);
    transform: scale(1);
  }

  .pulse.beat {
    animation: pop 360ms cubic-bezier(0.16, 0.84, 0.28, 1);
  }
  .pulse.accent {
    animation: pop-accent 460ms cubic-bezier(0.1, 0.85, 0.2, 1);
  }
  .pulse.minute {
    animation: pop-minute 520ms cubic-bezier(0.12, 0.88, 0.2, 1);
  }

  @keyframes pop {
    0% {
      transform: scale(0.94);
      box-shadow: 0 0 0 0 rgba(141, 255, 252, 0.75);
    }
    35% {
      transform: scale(1.15);
      box-shadow: 0 0 0 24px rgba(141, 255, 252, 0.25);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 42px rgba(141, 255, 252, 0);
    }
  }
  @keyframes pop-accent {
    0% {
      transform: scale(0.88);
      box-shadow: 0 0 0 0 rgba(255, 209, 102, 0.8);
    }
    28% {
      transform: scale(1.3);
      box-shadow: 0 0 0 20px rgba(255, 209, 102, 0.35);
    }
    48% {
      transform: scale(1.08);
    }
    66% {
      transform: scale(1.24);
      box-shadow: 0 0 0 44px rgba(255, 209, 102, 0.08);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 56px rgba(255, 209, 102, 0);
    }
  }
  @keyframes pop-minute {
    0% {
      transform: scale(0.84);
      box-shadow: 0 0 0 0 rgba(222, 174, 255, 0.75);
    }
    34% {
      transform: scale(1.34);
      box-shadow: 0 0 0 26px rgba(222, 174, 255, 0.3);
    }
    68% {
      transform: scale(1.03);
      box-shadow: 0 0 0 50px rgba(222, 174, 255, 0.1);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 64px rgba(222, 174, 255, 0);
    }
  }

  .meta {
    display: flex;
    justify-content: center;
    gap: 22px;
    flex-wrap: wrap;
    margin-bottom: 18px;
    font-variant-numeric: tabular-nums;
  }
  .meta-item {
    background: var(--card);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 14px;
    min-width: 155px;
    padding: 10px 14px;
  }
  .label {
    display: block;
    color: var(--muted);
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 3px;
  }
  .value {
    font-size: 1.28rem;
    font-weight: 650;
  }
  .value.accent-now {
    color: var(--pulse-accent);
  }

  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    margin: 4px 0 12px;
  }
  button {
    border: none;
    border-radius: 999px;
    padding: 10px 18px;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition:
      transform 120ms ease,
      opacity 120ms ease;
  }
  button:active {
    transform: scale(0.97);
  }
  .start {
    background: #b6ffdc;
    color: #112326;
  }
  .stop {
    background: #ffd1d8;
    color: #311318;
  }
  button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .volume {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--card);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 999px;
    padding: 8px 12px;
  }
  input[type="range"] {
    width: 150px;
  }

  .status {
    margin-top: 10px;
    color: var(--muted);
    font-size: 0.92rem;
  }
  .status strong.ok {
    color: var(--ok);
  }
  .status strong.warn {
    color: var(--warn);
  }
  .status strong.stop {
    color: var(--stop);
  }
</style>

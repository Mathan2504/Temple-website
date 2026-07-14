// Synthesizes a temple-bell-like chime using the Web Audio API.
// Avoids bundling a binary audio asset while still giving the
// "temple bell sound" interaction requested in the brief.
let audioCtx;

function getContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

export function playTempleBell() {
  try {
    const ctx = getContext();
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;
    const partials = [1, 2.01, 3.2, 4.35]; // inharmonic partials = bell timbre
    const baseFreq = 480;

    partials.forEach((mult, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = baseFreq * mult;

      const peak = 0.28 / (i + 1);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(peak, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8 - i * 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.9);
    });
  } catch (e) {
    // Web Audio unavailable — silently ignore
  }
}

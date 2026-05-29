import { getEpochStage } from './getEpochStage';

const TWO_PI = Math.PI * 2;

// 构造确定性伪随机数，保证同一个 Epoch 每次渲染一致。
function createRandom(seed) {
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

function addBurst(signal, t, center, width, amplitude, frequency, phase = 0) {
  const envelope = Math.exp(-((t - center) ** 2) / (2 * width ** 2));
  return signal + amplitude * envelope * Math.sin(TWO_PI * frequency * t + phase);
}

function addKComplex(signal, t, center, amplitude) {
  const negative = -amplitude * Math.exp(-((t - center) ** 2) / (2 * 0.11 ** 2));
  const positive = amplitude * 0.72 * Math.exp(-((t - center - 0.34) ** 2) / (2 * 0.19 ** 2));
  return signal + negative + positive;
}

function addSlowEyeMovement(signal, t, center, amplitude) {
  const left = amplitude * Math.exp(-((t - center) ** 2) / (2 * 0.42 ** 2));
  const right = -amplitude * 0.9 * Math.exp(-((t - center - 0.7) ** 2) / (2 * 0.48 ** 2));
  return signal + left + right;
}

function addRapidEyeMovement(signal, t, center, amplitude, direction = 1) {
  const first = direction * amplitude * Math.exp(-((t - center) ** 2) / (2 * 0.08 ** 2));
  const second = -direction * amplitude * 0.82 * Math.exp(-((t - center - 0.18) ** 2) / (2 * 0.08 ** 2));
  return signal + first + second;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizeToPanel(values, scale = 1) {
  const maxAbs = Math.max(...values.map((value) => Math.abs(value)), 1);
  return values.map((value) => clamp((value / maxAbs) * 64 * scale, -72, 72));
}

function toPoints(values, targetLength = 900) {
  return values.map((value, index) => ({ x: Number(((index / (targetLength - 1)) * 750).toFixed(2)), y: Number(value.toFixed(2)) }));
}

function buildHeatSegments(events, totalSeconds, width = 750) {
  const merged = events
    .map((event) => ({
      start: clamp((event.start / totalSeconds) * width, 0, width),
      end: clamp((event.end / totalSeconds) * width, 0, width),
      intensity: event.intensity,
    }))
    .filter((event) => event.end > event.start + 2)
    .sort((a, b) => a.start - b.start);

  if (merged.length === 0) {
    return [
      { start: width * 0.18, end: width * 0.34, intensity: 0.32 },
      { start: width * 0.58, end: width * 0.76, intensity: 0.46 },
    ];
  }

  return merged;
}

function buildStageEvents(stage, rand) {
  const events = [];

  if (stage === 'N2') {
    [7.2, 16.4, 24.6].forEach((center, index) => {
      events.push({ type: 'spindle', center: center + (rand() - 0.5) * 1.2, width: 0.58 + rand() * 0.18, amplitude: 14 + rand() * 5, frequency: 12.2 + rand() * 2.2, intensity: 0.52 + index * 0.08 });
    });
    [11.8, 21.5].forEach((center) => {
      events.push({ type: 'k-complex', center: center + (rand() - 0.5) * 1.4, amplitude: 28 + rand() * 10, intensity: 0.62 });
    });
  }

  if (stage === 'N3') {
    [4.5, 8.2, 12.4, 17.5, 22.1, 26.6].forEach((center) => {
      events.push({ type: 'slow-wave', center: center + (rand() - 0.5) * 0.9, width: 0.42 + rand() * 0.18, amplitude: 34 + rand() * 14, frequency: 0.75 + rand() * 0.35, intensity: 0.68 + rand() * 0.12 });
    });
  }

  if (stage === 'REM') {
    [5.2, 6.0, 12.5, 13.1, 18.8, 19.5, 25.0, 25.7].forEach((center, index) => {
      events.push({ type: 'rapid-eye', center: center + (rand() - 0.5) * 0.35, amplitude: 28 + rand() * 14, direction: index % 2 === 0 ? 1 : -1, intensity: 0.7 + rand() * 0.16 });
    });
  }

  if (stage === 'N1') {
    [8.5, 17.8, 24.8].forEach((center) => {
      events.push({ type: 'slow-eye', center: center + (rand() - 0.5) * 1.2, amplitude: 16 + rand() * 8, intensity: 0.44 + rand() * 0.1 });
    });
  }

  if (stage === 'WAKE') {
    [6.5, 14.2, 23.5].forEach((center) => {
      events.push({ type: 'alpha-run', center: center + (rand() - 0.5) * 1.8, width: 0.9 + rand() * 0.35, amplitude: 11 + rand() * 5, frequency: 9.5 + rand() * 1.4, intensity: 0.38 + rand() * 0.12 });
    });
    [10.2, 20.4].forEach((center, index) => {
      events.push({ type: 'blink', center: center + (rand() - 0.5) * 1.1, amplitude: 26 + rand() * 10, direction: index % 2 === 0 ? 1 : -1, intensity: 0.56 });
    });
  }

  return events;
}

// 生成演示用 EEG / EOG 波形数据。保留静态演示属性，但使用阶段相关事件让波形更接近睡眠 PSG 形态。
export function generateEpochSignal(epochId) {
  const stage = getEpochStage(epochId);
  const length = 900;
  const duration = 30;
  const rand = createRandom(epochId * 97 + stage.charCodeAt(0) * 13);
  const events = buildStageEvents(stage, rand);
  const eegRaw = [];
  const eogRaw = [];

  let eegDrift = 0;
  let eogDrift = 0;

  for (let i = 0; i < length; i += 1) {
    const t = (i / (length - 1)) * duration;
    const noise = (rand() - 0.5);
    eegDrift = eegDrift * 0.96 + noise * 1.1;
    eogDrift = eogDrift * 0.98 + (rand() - 0.5) * 0.75;

    let eeg = eegDrift;
    let eog = eogDrift;

    if (stage === 'WAKE') {
      eeg += 8.5 * Math.sin(TWO_PI * 10.2 * t + 0.3) + 4.2 * Math.sin(TWO_PI * 19.5 * t) + 2.5 * Math.sin(TWO_PI * 4.2 * t);
      eog += 4.5 * Math.sin(TWO_PI * 0.18 * t) + 1.5 * Math.sin(TWO_PI * 1.1 * t);
    } else if (stage === 'N1') {
      eeg += 9 * Math.sin(TWO_PI * 5.2 * t) + 4.5 * Math.sin(TWO_PI * 7.4 * t + 0.6) + 2.2 * Math.sin(TWO_PI * 12.8 * t);
      eog += 8 * Math.sin(TWO_PI * 0.32 * t + 0.4);
    } else if (stage === 'N2') {
      eeg += 6.5 * Math.sin(TWO_PI * 4.8 * t) + 3.5 * Math.sin(TWO_PI * 7.2 * t + 0.8) + 1.8 * Math.sin(TWO_PI * 18 * t);
      eog += 2.4 * Math.sin(TWO_PI * 0.22 * t) + 1.8 * Math.sin(TWO_PI * 0.7 * t);
    } else if (stage === 'N3') {
      eeg += 30 * Math.sin(TWO_PI * 0.85 * t + 0.7) + 13 * Math.sin(TWO_PI * 1.35 * t) + 2.4 * Math.sin(TWO_PI * 8.6 * t);
      eog += 2.2 * Math.sin(TWO_PI * 0.18 * t) + 1.6 * Math.sin(TWO_PI * 0.55 * t);
    } else if (stage === 'REM') {
      eeg += 6.5 * Math.sin(TWO_PI * 6.2 * t + 0.8) + 4.5 * Math.sin(TWO_PI * 9.5 * t) + 3.2 * Math.sin(TWO_PI * 18.2 * t);
      eog += 4.2 * Math.sin(TWO_PI * 0.42 * t) + 2.4 * Math.sin(TWO_PI * 1.1 * t);
    }

    events.forEach((event) => {
      if (event.type === 'spindle') {
        eeg = addBurst(eeg, t, event.center, event.width, event.amplitude, event.frequency, 0.4);
      }
      if (event.type === 'k-complex') {
        eeg = addKComplex(eeg, t, event.center, event.amplitude);
      }
      if (event.type === 'slow-wave') {
        eeg = addBurst(eeg, t, event.center, event.width, event.amplitude, event.frequency, 0.8);
      }
      if (event.type === 'rapid-eye') {
        eog = addRapidEyeMovement(eog, t, event.center, event.amplitude, event.direction);
      }
      if (event.type === 'slow-eye') {
        eog = addSlowEyeMovement(eog, t, event.center, event.amplitude);
      }
      if (event.type === 'alpha-run') {
        eeg = addBurst(eeg, t, event.center, event.width, event.amplitude, event.frequency, 0.2);
      }
      if (event.type === 'blink') {
        eog = addRapidEyeMovement(eog, t, event.center, event.amplitude, event.direction);
      }
    });

    eeg += (rand() - 0.5) * (stage === 'N3' ? 3.2 : 4.8);
    eog += (rand() - 0.5) * (stage === 'REM' ? 3.5 : 2.2);

    eegRaw.push(eeg);
    eogRaw.push(eog);
  }

  const eeg = toPoints(normalizeToPanel(eegRaw, stage === 'N3' ? 1.04 : 0.88), length);
  const eog = toPoints(normalizeToPanel(eogRaw, stage === 'REM' ? 1.02 : 0.74), length);
  const heatEvents = events.map((event) => {
    const width = event.type === 'rapid-eye' || event.type === 'blink' ? 0.7 : event.width ? event.width * 3.2 : 1.4;
    return {
      start: clamp(event.center - width / 2, 0, duration),
      end: clamp(event.center + width / 2, 0, duration),
      intensity: event.intensity,
    };
  });

  return {
    stage,
    eeg,
    eog,
    gradients: buildHeatSegments(heatEvents, duration),
    attention: [
      { label: '慢波振幅', value: stage === 'N3' ? 0.84 : stage === 'N2' ? 0.46 : 0.32 },
      { label: '眼动活跃度', value: stage === 'REM' ? 0.86 : stage === 'N1' ? 0.58 : 0.24 },
      { label: '纺锤波形态', value: stage === 'N2' ? 0.78 : 0.28 },
    ],
  };
}

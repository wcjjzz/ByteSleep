import { getEpochStage } from './getEpochStage';

function pseudoRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function smoothNoise(x, seed) {
  return Math.sin(x * 0.01 + seed) + Math.sin(x * 0.031 + seed * 2) * 0.5 + Math.sin(x * 0.07 + seed * 3) * 0.25;
}

function wave(x, frequency, amplitude) {
  return amplitude * Math.sin(x * 0.188495 * frequency);
}

function bell(x, center, width) {
  return Math.exp(-((x - center) ** 2) / width);
}

function clampSignal(value) {
  return Math.max(5, Math.min(95, value));
}

function buildStops(highlights, channel) {
  const stops = [];
  let lastX = 0;
  const baseColor = channel === 'eeg' ? '#fca5a5' : '#fee2e2';
  const edgeColor = channel === 'eeg' ? '#dc2626' : '#b91c1c';
  const coreColor = channel === 'eeg' ? '#7f1d1d' : '#450a0a';

  if (highlights.length === 0) {
    return [
      { offset: '0%', color: baseColor },
      { offset: '100%', color: baseColor },
    ];
  }

  highlights.forEach(([start, end]) => {
    const startPct = start / 10;
    const endPct = end / 10;
    const midPct = (startPct + endPct) / 2;

    stops.push({ offset: `${lastX}%`, color: baseColor });
    stops.push({ offset: `${Math.max(0, startPct - 1.5)}%`, color: baseColor });
    stops.push({ offset: `${startPct}%`, color: edgeColor });
    stops.push({ offset: `${midPct}%`, color: coreColor });
    stops.push({ offset: `${endPct}%`, color: edgeColor });
    stops.push({ offset: `${Math.min(100, endPct + 1.5)}%`, color: baseColor });
    lastX = endPct + 1.5;
  });

  stops.push({ offset: '100%', color: baseColor });
  return stops;
}

function getHighlights(stage, channel) {
  if (stage === 'WAKE') {
    return channel === 'eeg' ? [[100, 250], [680, 850]] : [];
  }
  if (stage === 'N1') {
    if (channel === 'eeg') return [[470, 520]];
    return [[120, 380], [550, 850]];
  }
  if (stage === 'N2') {
    return channel === 'eeg' ? [[220, 280], [450, 550], [700, 750]] : [];
  }
  if (stage === 'N3') {
    return channel === 'eeg' ? [[100, 400], [600, 900]] : [];
  }
  if (stage === 'REM') {
    if (channel === 'eeg') return [[400, 460]];
    return [[200, 310], [730, 840]];
  }
  return [];
}

function generateSignalPath(stage, channel, seedStart) {
  let path = '';
  let areaPath = 'M0,100 ';
  const highlights = getHighlights(stage, channel);

  for (let x = 0; x <= 1000; x += 2) {
    let y = 50;
    const basicNoise = (pseudoRandom(seedStart + x) - 0.5) * 2;

    if (stage === 'WAKE') {
      if (channel === 'eeg') {
        const alphaEnv = 0.8 + 0.4 * Math.sin(x * 0.01);
        const alphaPhase = x * 0.188495 * 10 + Math.sin(x * 0.02);
        y += alphaEnv * 8 * Math.sin(alphaPhase);
        y += 2 * smoothNoise(x, seedStart);
        y += wave(x, 20, 1.5);
      } else {
        y += 3 * smoothNoise(x, seedStart + 100);
        if (x > 280 && x < 310) y -= 15 * Math.exp(-((x - 295) ** 2) / 50);
        if (x > 750 && x < 780) y -= 12 * Math.exp(-((x - 765) ** 2) / 60);
      }
    } else if (stage === 'N1') {
      if (channel === 'eeg') {
        const theta1 = wave(x, 4.5, 3 + Math.sin(x * 0.01) * 1.5);
        const theta2 = wave(x, 6.5, 2.5 + Math.cos(x * 0.015) * 1.5);
        const mixedFast = wave(x, 14, 1.2) * bell(x, 500, 200000);
        y += theta1 + theta2 + mixedFast;
        y += 4 * smoothNoise(x, seedStart);
        if (x > 470 && x < 510) {
          const t = x - 470;
          if (t < 18) y -= 24 * Math.sin((t * Math.PI) / 18);
          else y += 12 * Math.sin(((t - 18) * Math.PI) / 22);
        }
      } else {
        const slowRoll = (cx, w, a) => {
          const dx = x - cx;
          if (Math.abs(dx) < w * 2) {
            return a * dx * Math.exp(-(dx ** 2) / ((w * w) / 2));
          }
          return 0;
        };
        y += slowRoll(250, 130, 0.14);
        y += slowRoll(700, 150, -0.12);
        y += 3.5 * smoothNoise(x, seedStart + 100);
      }
    } else if (stage === 'N2') {
      if (channel === 'eeg') {
        y += wave(x, 4, 5) + wave(x, 6, 3);
        y += 3 * smoothNoise(x, seedStart);
        const spindle1 = Math.exp(-((x - 250) ** 2) / 600);
        const spindle2 = Math.exp(-((x - 725) ** 2) / 600);
        if (spindle1 > 0.05) y += spindle1 * 14 * Math.sin(x * 0.1885 * 13);
        if (spindle2 > 0.05) y += spindle2 * 14 * Math.sin(x * 0.1885 * 13.5);
        if (x > 450 && x < 550) {
          const t = x - 450;
          if (t < 35) y -= 38 * Math.sin((t * Math.PI) / 35);
          else y += 25 * Math.sin(((t - 35) * Math.PI) / 65);
        }
      } else {
        y += 2 * smoothNoise(x, seedStart + 200);
      }
    } else if (stage === 'N3') {
      if (channel === 'eeg') {
        const deltaFreq1 = 1.0 + 0.2 * Math.sin(x * 0.005);
        const deltaFreq2 = 0.7 + 0.1 * Math.cos(x * 0.007);
        const deltaAmp1 = 18 + 5 * Math.sin(x * 0.003);
        const deltaAmp2 = 14 + 6 * Math.cos(x * 0.004);
        y += deltaAmp1 * Math.sin(x * 0.1885 * deltaFreq1);
        y += deltaAmp2 * Math.sin(x * 0.1885 * deltaFreq2 + 1);
        y += wave(x, 12, 1.5);
      } else {
        y += 2 * smoothNoise(x, seedStart + 300);
      }
    } else if (stage === 'REM') {
      if (channel === 'eeg') {
        const theta = wave(x, 4.5, 2) + wave(x, 6.5, 1.5);
        const alphaBeta = wave(x, 11, 1) + wave(x, 18, 1.2) + wave(x, 25, 0.8);
        y += theta + alphaBeta;
        y += 2.5 * smoothNoise(x, seedStart);
        if (x > 400 && x < 460) {
          const t = x - 400;
          const saw = 8 * (Math.abs((t % 14) - 7) / 3.5 - 1);
          y -= saw * bell(x, 430, 1000);
        }
      } else {
        y += 2.5 * smoothNoise(x, seedStart + 400);
        const saccade = (cx, amp, rise, fall) => {
          const dx = x - cx;
          if (dx >= -rise && dx <= 0) return amp * Math.exp(-(dx ** 2) / ((rise * rise) / 2));
          if (dx > 0 && dx <= fall) return amp * Math.exp(-(dx ** 2) / ((fall * fall) / 2));
          return 0;
        };
        y += saccade(215, 25, 8, 15);
        y += saccade(245, -30, 6, 12);
        y += saccade(258, -18, 5, 15);
        y += saccade(290, 22, 9, 20);
        y += saccade(740, -28, 7, 14);
        y += saccade(775, 35, 6, 18);
        y += saccade(805, 20, 8, 12);
        y += saccade(825, -25, 5, 16);
      }
    }

    y += basicNoise;
    y = clampSignal(y);
    const cmd = x === 0 ? 'M' : 'L';
    path += `${cmd}${x},${y.toFixed(1)} `;
    areaPath += `L${x},${y.toFixed(1)} `;
  }

  areaPath += 'L1000,100 Z';
  return { path, areaPath, stops: buildStops(highlights, channel) };
}

function getMeta(stage) {
  const meta = {
    WAKE: {
      eegRatio: 0.75,
      eogRatio: 0.25,
      desc: '闭眼静息清醒期。EEG 以整体连续、振幅缓慢起伏的 α 节律为主，EOG 维持平静，偶见轻微眼动漂移或瞬态眨眼伪迹。模型高亮区锁定了最具代表性的 α 节律优势段。',
      attention: [0.72, 0.24, 0.21],
    },
    N1: {
      eegRatio: 0.85,
      eogRatio: 0.15,
      desc: '入睡过渡期。EEG 背景中的 α 节律衰减，转为低幅松散的 θ 波混合频率，并局部检出顶尖波；EOG 通道呈现缓慢、连续的慢滚动眼动。',
      attention: [0.42, 0.58, 0.26],
    },
    N2: {
      eegRatio: 0.92,
      eogRatio: 0.08,
      desc: '浅睡眠核心期。模型在混合背景波中提取到两类典型微观生理特征：呈现梭形包络的睡眠纺锤波以及陡峭负正双相形态的 K 复合波。',
      attention: [0.46, 0.18, 0.78],
    },
    N3: {
      eegRatio: 0.95,
      eogRatio: 0.05,
      desc: '深睡眠期。EEG 视野被高幅、低频且具备自然节律变化的大慢波主导，EOG 通道活动极低。模型判定主要依赖连续慢波群的能量占比。',
      attention: [0.86, 0.12, 0.28],
    },
    REM: {
      eegRatio: 0.48,
      eogRatio: 0.52,
      desc: '快速眼动睡眠期。EEG 转换为低幅、杂乱的混合频率背景；EOG 通道出现成簇快速眼动，其突发而尖锐的形态构成判定该阶段的重要依据。',
      attention: [0.28, 0.86, 0.2],
    },
  };
  return meta[stage];
}

// 直接返回参考实现风格的 SVG path、areaPath 和渐变 stops，避免点数组二次映射造成波形失真。
export function generateEpochSignal(epochId) {
  const stage = getEpochStage(epochId);
  const seedStart = epochId * 1000;
  const meta = getMeta(stage);

  return {
    id: epochId,
    stage,
    eegRatio: meta.eegRatio,
    eogRatio: meta.eogRatio,
    desc: meta.desc,
    eeg: generateSignalPath(stage, 'eeg', seedStart),
    eog: generateSignalPath(stage, 'eog', seedStart + 100),
    confidence: Number((95 + pseudoRandom(seedStart) * 4).toFixed(1)),
    attention: [
      { label: '慢波振幅', value: meta.attention[0] },
      { label: '眼动活跃度', value: meta.attention[1] },
      { label: '纺锤波形态', value: meta.attention[2] },
    ],
  };
}

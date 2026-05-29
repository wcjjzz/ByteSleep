import { buildSignalGradients } from './buildSignalGradients';
import { getEpochStage } from './getEpochStage';

// 生成演示用 EEG / EOG 波形数据。
export function generateEpochSignal(epochId) {
  const stage = getEpochStage(epochId);
  const length = 750;
  const eeg = [];
  const eog = [];

  for (let i = 0; i < length; i += 1) {
    const baseX = i / 18;
    const stageFactor = stage === 'N3' ? 1.8 : stage === 'REM' ? 1.2 : stage === 'WAKE' ? 0.7 : 1;
    const eegValue = Math.sin(baseX) * stageFactor * 16 + Math.sin(baseX / 2.8) * 5 + (Math.cos(baseX / 7) * 3);
    const eogValue = Math.sin(baseX / 3.8) * (stage === 'REM' ? 18 : 8) + Math.cos(baseX / 9) * 4;
    eeg.push({ x: i, y: Number(eegValue.toFixed(2)) });
    eog.push({ x: i, y: Number(eogValue.toFixed(2)) });
  }

  return {
    stage,
    eeg,
    eog,
    gradients: buildSignalGradients(length),
    attention: [
      { label: '慢波振幅', value: stage === 'N3' ? 0.84 : 0.36 },
      { label: '眼动活跃度', value: stage === 'REM' ? 0.82 : 0.21 },
      { label: '纺锤波形态', value: stage === 'N2' ? 0.76 : 0.29 },
    ],
  };
}

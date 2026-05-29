// 用一个近似整夜睡眠周期的规则模拟不同 Epoch 的阶段。
export function getEpochStage(epochId) {
  const cycle = epochId % 180;
  if (cycle < 10) return 'WAKE';
  if (cycle < 30) return 'N1';
  if (cycle < 90) return 'N2';
  if (cycle < 130) return 'N3';
  if (cycle < 150) return 'N2';
  return 'REM';
}

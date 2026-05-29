export const RISK_FEATURES = [
  { name: 'REM 潜伏期', value: 28, baseline: 70, unit: 'min', direction: 'lower-risky', contribution: 0.88 },
  { name: '睡眠效率', value: 69, baseline: 85, unit: '%', direction: 'lower-risky', contribution: 0.74 },
  { name: '觉醒次数', value: 18, baseline: 8, unit: '次', direction: 'higher-risky', contribution: 0.67 },
  { name: 'N3 占比', value: 8, baseline: 16, unit: '%', direction: 'lower-risky', contribution: 0.63 },
  { name: '总睡眠时长', value: 5.6, baseline: 7.1, unit: 'h', direction: 'lower-risky', contribution: 0.51 },
  { name: '睡眠起始潜伏期', value: 35, baseline: 18, unit: 'min', direction: 'higher-risky', contribution: 0.47 },
  { name: 'WASO', value: 65, baseline: 22, unit: 'min', direction: 'higher-risky', contribution: 0.44 },
];

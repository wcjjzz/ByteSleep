export const RISK_FEATURES = [
  { name: 'N3/SWS 时长', value: 42, baseline: 30, unit: 'min', direction: 'higher-supportive', contribution: 0.82 },
  { name: 'REM 时长', value: 32, baseline: 20, unit: 'min', direction: 'higher-supportive', contribution: 0.78 },
  { name: '阶段完整性', value: 71, baseline: 55, unit: '%', direction: 'higher-supportive', contribution: 0.74 },
  { name: '纺锤波密度', value: 2.2, baseline: 1.4, unit: '次/min', direction: 'higher-supportive', contribution: 0.69 },
  { name: '睡眠效率', value: 69, baseline: 65, unit: '%', direction: 'higher-supportive', contribution: 0.58 },
  { name: '夜间觉醒比例', value: 18, baseline: 25, unit: '%', direction: 'lower-supportive', contribution: 0.46 },
  { name: 'EEG/EOG 一致性', value: 81, baseline: 60, unit: '%', direction: 'higher-supportive', contribution: 0.64 },
];

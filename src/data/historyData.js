export const RISK_TREND_DATA = [
  { date: '09-28', mcsProbability: 49, crsR: 7, note: '基线评估，意识反应较弱' },
  { date: '10-05', mcsProbability: 57, crsR: 8, note: '觉醒水平略有改善' },
  { date: '10-12', mcsProbability: 54, crsR: 8, note: '当日配合度下降，结果小幅回落' },
  { date: '10-19', mcsProbability: 66, crsR: 11, note: '视觉追踪与运动反应改善' },
  { date: '10-26', mcsProbability: 62, crsR: 10, note: '夜间觉醒增加，综合分数波动' },
  { date: '11-02', mcsProbability: 74, crsR: 13, note: '近期改善明显，建议复核确认' },
];

export const STAGE_STACKED_DATA = [
  { date: '09-28', WAKE: 24, REM: 6, N1: 17, N2: 39, N3: 14 },
  { date: '10-05', WAKE: 19, REM: 11, N1: 15, N2: 42, N3: 13 },
  { date: '10-12', WAKE: 23, REM: 9, N1: 16, N2: 38, N3: 14 },
  { date: '10-19', WAKE: 14, REM: 18, N1: 12, N2: 39, N3: 17 },
  { date: '10-26', WAKE: 18, REM: 13, N1: 14, N2: 43, N3: 12 },
  { date: '11-02', WAKE: 11, REM: 21, N1: 10, N2: 40, N3: 18 },
];

export const FEATURE_COMPARE_DATA = [
  { name: 'CRS-R总分', 当前: 13, 基线: 7 },
  { name: 'MCS可能性', 当前: 74, 基线: 49 },
  { name: 'N3/SWS占比', 当前: 18, 基线: 14 },
  { name: 'REM时长', 当前: 39, 基线: 12 },
  { name: '纺锤波密度', 当前: 2.4, 基线: 1.5 },
];

export const RISK_TREND_DATA = [
  { date: '10-02', mcsProbability: 52, crsR: 7 },
  { date: '10-09', mcsProbability: 61, crsR: 9 },
  { date: '10-16', mcsProbability: 69, crsR: 12 },
  { date: '10-23', mcsProbability: 84, crsR: 15 },
];

export const STAGE_STACKED_DATA = [
  { date: '10-02', WAKE: 22, REM: 8, N1: 14, N2: 42, N3: 14 },
  { date: '10-09', WAKE: 18, REM: 12, N1: 13, N2: 41, N3: 16 },
  { date: '10-16', WAKE: 15, REM: 16, N1: 11, N2: 41, N3: 17 },
  { date: '10-23', WAKE: 12, REM: 20, N1: 8, N2: 42, N3: 18 },
];

export const FEATURE_COMPARE_DATA = [
  { name: 'CRS-R总分', 当前: 15, 基线: 7 },
  { name: 'MCS可能性', 当前: 84, 基线: 52 },
  { name: 'N3/SWS占比', 当前: 18, 基线: 14 },
  { name: 'REM时长', 当前: 45, 基线: 18 },
  { name: '纺锤波密度', 当前: 2.8, 基线: 1.4 },
];

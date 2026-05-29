const DATES = ['09-28', '10-05', '10-12', '10-19', '10-26', '11-02'];

function getSeed(text = '') {
  return text.split('').reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 17), 0);
}

function pseudo(seed, index) {
  const x = Math.sin(seed * 12.9898 + index * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function buildTrend(patient) {
  const seed = getSeed(patient?.id || patient?.name || 'default');
  const finalMcs = patient?.mcsProbability ?? 70;
  const finalCrs = patient?.crsR ?? 12;
  const startMcs = clamp(finalMcs - (18 + pseudo(seed, 1) * 18), 18, 72);
  const startCrs = clamp(finalCrs - (4 + pseudo(seed, 2) * 6), 2, 18);
  const dipIndex = 2 + Math.floor(pseudo(seed, 3) * 2);

  return DATES.map((date, index) => {
    const progress = index / (DATES.length - 1);
    const noiseMcs = (pseudo(seed, 10 + index) - 0.5) * 12;
    const noiseCrs = (pseudo(seed, 20 + index) - 0.5) * 3.4;
    const dip = index === dipIndex ? -(4 + pseudo(seed, 30) * 8) : 0;
    const mcsProbability = index === DATES.length - 1
      ? finalMcs
      : clamp(startMcs + (finalMcs - startMcs) * progress + noiseMcs + dip, 15, 95);
    const crsR = index === DATES.length - 1
      ? finalCrs
      : clamp(startCrs + (finalCrs - startCrs) * progress + noiseCrs + dip / 6, 1, 23);

    const note = index === 0
      ? '基线评估，作为后续康复趋势参照'
      : index === dipIndex
        ? '当日反应波动，量表与睡眠结构均出现回落'
        : index === DATES.length - 1
          ? '最近一次评估，建议结合睡眠报告复核'
          : pseudo(seed, 40 + index) > 0.5
            ? '视觉追踪或运动反应较前次改善'
            : '觉醒水平与配合度存在轻度波动';

    return { date, mcsProbability, crsR, note };
  });
}

function buildStageData(patient) {
  const seed = getSeed(patient?.id || patient?.name || 'default') + 91;
  const finalRem = Math.max(4, Math.round((patient?.remDuration ?? 30) / 2));
  const finalN3 = patient?.n3Ratio ?? 14;
  const finalWake = clamp(28 - (patient?.sleepEfficiency ?? 70) / 5, 8, 28);
  const finalN1 = clamp(18 - (patient?.stageIntegrity ?? 60) / 10, 7, 18);

  return DATES.map((date, index) => {
    const progress = index / (DATES.length - 1);
    let WAKE = clamp(finalWake + (1 - progress) * (8 + pseudo(seed, index) * 7) + (pseudo(seed, 20 + index) - 0.5) * 7, 8, 34);
    let REM = clamp(finalRem - (1 - progress) * (4 + pseudo(seed, 30 + index) * 7) + (pseudo(seed, 40 + index) - 0.5) * 5, 3, 24);
    let N1 = clamp(finalN1 + (1 - progress) * (3 + pseudo(seed, 50 + index) * 4) + (pseudo(seed, 60 + index) - 0.5) * 4, 6, 20);
    let N3 = clamp(finalN3 - (1 - progress) * (2 + pseudo(seed, 70 + index) * 5) + (pseudo(seed, 80 + index) - 0.5) * 5, 5, 24);

    if (index === 2 + Math.floor(pseudo(seed, 100) * 2)) {
      WAKE = clamp(WAKE + 4, 8, 34);
      REM = clamp(REM - 3, 3, 24);
    }

    const N2 = Math.max(25, 100 - WAKE - REM - N1 - N3);
    const total = WAKE + REM + N1 + N2 + N3;

    return {
      date,
      WAKE: Math.round((WAKE / total) * 100),
      REM: Math.round((REM / total) * 100),
      N1: Math.round((N1 / total) * 100),
      N2: Math.round((N2 / total) * 100),
      N3: 100 - Math.round((WAKE / total) * 100) - Math.round((REM / total) * 100) - Math.round((N1 / total) * 100) - Math.round((N2 / total) * 100),
    };
  });
}

function buildFeatureCompare(patient, trendData, stageData) {
  const firstTrend = trendData[0];
  const lastTrend = trendData[trendData.length - 1];
  const firstStage = stageData[0];
  const lastStage = stageData[stageData.length - 1];

  return [
    { name: 'CRS-R总分', 当前: lastTrend.crsR, 基线: firstTrend.crsR },
    { name: 'MCS可能性', 当前: lastTrend.mcsProbability, 基线: firstTrend.mcsProbability },
    { name: 'N3/SWS占比', 当前: lastStage.N3, 基线: firstStage.N3 },
    { name: 'REM时长', 当前: patient?.remDuration ?? lastStage.REM * 2, 基线: Math.max(0, firstStage.REM * 2) },
    { name: '纺锤波密度', 当前: Number((patient?.spindleDensity ?? 2.2).toFixed(1)), 基线: Number(Math.max(0.6, (patient?.spindleDensity ?? 2.2) - 0.7).toFixed(1)) },
  ];
}

export function getHistoryDataForPatient(patient) {
  const riskTrendData = buildTrend(patient);
  const stageStackedData = buildStageData(patient);
  const featureCompareData = buildFeatureCompare(patient, riskTrendData, stageStackedData);

  return {
    riskTrendData,
    stageStackedData,
    featureCompareData,
  };
}

export const RISK_TREND_DATA = getHistoryDataForPatient({
  id: 'DOC-DEMO',
  name: '演示患者',
  crsR: 13,
  mcsProbability: 74,
  sleepEfficiency: 74,
  remDuration: 39,
  n3Ratio: 18,
  spindleDensity: 2.4,
  stageIntegrity: 72,
}).riskTrendData;

export const STAGE_STACKED_DATA = getHistoryDataForPatient({
  id: 'DOC-DEMO',
  name: '演示患者',
  crsR: 13,
  mcsProbability: 74,
  sleepEfficiency: 74,
  remDuration: 39,
  n3Ratio: 18,
  spindleDensity: 2.4,
  stageIntegrity: 72,
}).stageStackedData;

export const FEATURE_COMPARE_DATA = getHistoryDataForPatient({
  id: 'DOC-DEMO',
  name: '演示患者',
  crsR: 13,
  mcsProbability: 74,
  sleepEfficiency: 74,
  remDuration: 39,
  n3Ratio: 18,
  spindleDensity: 2.4,
  stageIntegrity: 72,
}).featureCompareData;

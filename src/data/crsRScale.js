export const CRS_R_SUBSCALES = [
  {
    key: 'auditory',
    label: '听觉功能',
    max: 4,
    items: [
      { score: 4, label: '4 · 一致性执行指令' },
      { score: 3, label: '3 · 可重复执行指令' },
      { score: 2, label: '2 · 声音定位' },
      { score: 1, label: '1 · 听觉惊跳' },
      { score: 0, label: '0 · 无反应' },
    ],
  },
  {
    key: 'visual',
    label: '视觉功能',
    max: 5,
    items: [
      { score: 5, label: '5 · 物体识别' },
      { score: 4, label: '4 · 物体定位：伸手够取' },
      { score: 3, label: '3 · 视觉追踪' },
      { score: 2, label: '2 · 注视' },
      { score: 1, label: '1 · 视觉惊跳' },
      { score: 0, label: '0 · 无反应' },
    ],
  },
  {
    key: 'motor',
    label: '运动功能',
    max: 6,
    items: [
      { score: 6, label: '6 · 功能性使用物体' },
      { score: 5, label: '5 · 自动性运动反应' },
      { score: 4, label: '4 · 操作物体' },
      { score: 3, label: '3 · 对疼痛刺激定位' },
      { score: 2, label: '2 · 屈曲撤回' },
      { score: 1, label: '1 · 异常姿势' },
      { score: 0, label: '0 · 无反应/弛缓' },
    ],
  },
  {
    key: 'oromotor',
    label: '口运动/言语功能',
    max: 3,
    items: [
      { score: 3, label: '3 · 可理解言语' },
      { score: 2, label: '2 · 发声/口部运动' },
      { score: 1, label: '1 · 口部反射运动' },
      { score: 0, label: '0 · 无反应' },
    ],
  },
  {
    key: 'communication',
    label: '交流功能',
    max: 2,
    items: [
      { score: 2, label: '2 · 功能性准确交流' },
      { score: 1, label: '1 · 非功能性意向交流' },
      { score: 0, label: '0 · 无反应' },
    ],
  },
  {
    key: 'arousal',
    label: '觉醒水平',
    max: 3,
    items: [
      { score: 3, label: '3 · 注意维持' },
      { score: 2, label: '2 · 无需刺激睁眼' },
      { score: 1, label: '1 · 刺激后睁眼' },
      { score: 0, label: '0 · 不可唤醒' },
    ],
  },
];

export function getCrsRTotal(subScores = {}) {
  return CRS_R_SUBSCALES.reduce((sum, subscale) => sum + Number(subScores[subscale.key] || 0), 0);
}

export function getCrsRLevel(score) {
  if (score >= 10) return 'MCS/eMCS 倾向';
  if (score >= 8) return '意识检出边界';
  return 'VS/UWS 或昏迷倾向';
}

export function getCrsRSubscoreText(subScores = {}) {
  return CRS_R_SUBSCALES.map((item) => `${item.label}${subScores[item.key] ?? 0}/${item.max}`).join('，');
}

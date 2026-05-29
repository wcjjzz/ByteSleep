import { getCrsRSubscoreText } from './crsRScale';

const recordTemplates = [
  {
    id: 'CRS-20251025-001',
    patientId: 'DOC-20250915',
    date: '2025-10-25',
    level: 'MCS 跟踪',
    examiner: '李医生',
    subScores: {
      auditory: 3,
      visual: 3,
      motor: 4,
      oromotor: 2,
      communication: 1,
      arousal: 2,
    },
    note: '运动反应和视觉追踪较上次改善，建议结合夜间睡眠报告继续观察。',
  },
  {
    id: 'CRS-20251024-002',
    patientId: 'DOC-20251002',
    date: '2025-10-24',
    level: 'MCS 倾向',
    examiner: '李医生',
    subScores: {
      auditory: 2,
      visual: 2,
      motor: 3,
      oromotor: 1,
      communication: 1,
      arousal: 2,
    },
    note: '存在不稳定指令反应，需结合 EEG/EOG 睡眠结构证据复核。',
  },
  {
    id: 'CRS-20251024-003',
    patientId: 'DOC-20251001',
    date: '2025-10-24',
    level: '待复核',
    examiner: '李医生',
    subScores: {
      auditory: 1,
      visual: 2,
      motor: 2,
      oromotor: 1,
      communication: 0,
      arousal: 2,
    },
    note: '觉醒水平波动明显，建议完成多模态睡眠生理信号采集后再综合判断。',
  },
];

export const INITIAL_CRS_R_RECORDS = recordTemplates.map((record) => ({
  ...record,
  score: Object.values(record.subScores).reduce((sum, value) => sum + value, 0),
  subscoreText: getCrsRSubscoreText(record.subScores),
}));

// 全局导航配置。
export const GLOBAL_VIEW_IDS = {
  workbench: 'workbench',
  patients: 'patients',
  tasks: 'tasks',
  reports: 'reports',
};

// 患者工作区标签配置。
export const PATIENT_VIEW_IDS = {
  overview: 'overview',
  analysis: 'analysis',
  'sleep-report': 'sleep-report',
  'risk-report': 'risk-report',
  history: 'history',
};

// 任务状态对应的徽标类型。
export const STATUS_BADGE_MAP = {
  '待脑电采集': 'warning',
  '睡眠分析中': 'processing',
  '待医生复核': 'warning',
  'MCS 跟踪': 'success',
  'VS/UWS 跟踪': 'danger',
  '异常中断': 'danger',
  '已归档': 'default',
  '已查看': 'default',
  '待采集': 'warning',
};

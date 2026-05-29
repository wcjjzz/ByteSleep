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
  '待（PSG）检查': 'warning',
  '待分诊': 'success',
  '待查看': 'primary',
  'PSG分析中': 'processing',
  '异常中断': 'danger',
  '已归档': 'default',
  '已查看': 'default',
  '待复核': 'warning',
};

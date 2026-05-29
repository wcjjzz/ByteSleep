import { Activity, FileText, Home, Users } from 'lucide-react';

// 左侧全局导航。
export const globalNavItems = [
  { id: 'workbench', icon: Home, label: '工作台' },
  { id: 'patients', icon: Users, label: '患者列表' },
  { id: 'tasks', icon: Activity, label: '任务中心' },
  { id: 'reports', icon: FileText, label: '报告中心' },
];

// 患者工作区顶部标签。
export const patientNavItems = [
  { id: 'overview', label: '概览' },
  { id: 'analysis', label: '智能分析' },
  { id: 'sleep-report', label: '睡眠报告' },
  { id: 'risk-report', label: '意识评估' },
  { id: 'history', label: '康复趋势' },
];

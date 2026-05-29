export const MOCK_TASKS = [
  { id: 'TSK-251025-01', patientId: 'P20251010', examId: 'PSG-251024-001', startTime: '10-25 08:30', stage: '睡眠分期与结构提取', status: 'PSG分析中', priority: true, updateTime: '10分钟前', progress: 3 },
  { id: 'TSK-251025-02', patientId: 'P20251001', examId: 'PSG-251024-002', startTime: '-', stage: '等待原始文件', status: '待（PSG）检查', priority: false, updateTime: '1小时前', progress: 0 },
  { id: 'TSK-251024-03', patientId: 'P20251002', examId: 'PSG-251023-005', startTime: '10-24 14:00', stage: '报告生成', status: '待查看', priority: true, updateTime: '10-24 16:45', progress: 5 },
  { id: 'TSK-251020-04', patientId: 'P20250915', examId: 'PSG-251020-001', startTime: '10-20 08:00', stage: '任务已完结', status: '待分诊', priority: false, updateTime: '10-20 09:15', progress: 6 },
  { id: 'TSK-251025-05', patientId: 'P20251025', examId: 'PSG-251025-008', startTime: '10-25 10:00', stage: '数据预处理', status: '异常中断', priority: true, updateTime: '10-25 10:05', progress: 1, errorMsg: 'EOG 通道数据缺失或信噪比极低，FastICA 去伪迹失败，请检查源文件。' },
];

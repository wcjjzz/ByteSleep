import { AlertTriangle, CircleDashed, FileClock, Workflow } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import { MOCK_TASKS } from '../../data/mockTasks';
import { getPatientById } from '../../utils/patient';
import { STATUS_BADGE_MAP } from '../../constants/appConstants';

function ProgressBar({ progress }) {
  const percent = Math.min(100, Math.max(0, Math.round((progress / 6) * 100)));
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-500">
        <span>流程进度</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default function TasksPage({ enterPatientWorkspace }) {
  const stats = [
    { label: '运行中任务', value: 2, icon: Workflow },
    { label: '待接入文件', value: 1, icon: FileClock },
    { label: '异常中断', value: 1, icon: AlertTriangle },
    { label: '已完结', value: 1, icon: CircleDashed },
  ];

  return (
    <div className="mx-auto max-w-[1300px] space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-800">任务中心</h1>
        <p className="mt-2 text-sm font-medium text-slate-500">查看 PSG 任务当前所处环节、异常状态与最近更新时间。</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.label} className="flex items-center justify-between">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
              <div className="mt-3 text-3xl font-black tracking-tight text-slate-800">{item.value}</div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-blue-600"><item.icon size={20} /></div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50/70 text-xs uppercase tracking-[0.18em] text-slate-500">
                <tr>
                  <th className="px-6 py-5">任务 ID</th>
                  <th className="px-6 py-5">患者</th>
                  <th className="px-6 py-5">Exam ID</th>
                  <th className="px-6 py-5">阶段</th>
                  <th className="px-6 py-5">状态</th>
                  <th className="px-6 py-5">更新时间</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_TASKS.map((task) => {
                  const patient = getPatientById(task.patientId);
                  return (
                    <tr key={task.id} onClick={() => enterPatientWorkspace(patient, task.status === '异常中断' ? 'analysis' : 'sleep-report')} className="cursor-pointer transition hover:bg-blue-50/30">
                      <td className="px-6 py-5 font-bold text-slate-700">{task.id}</td>
                      <td className="px-6 py-5 font-black text-slate-800">{patient.name}</td>
                      <td className="px-6 py-5">{task.examId}</td>
                      <td className="px-6 py-5">{task.stage}</td>
                      <td className="px-6 py-5"><Badge type={STATUS_BADGE_MAP[task.status] || 'default'}>{task.status}</Badge></td>
                      <td className="px-6 py-5 text-slate-500">{task.updateTime}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          {MOCK_TASKS.slice(0, 3).map((task) => {
            const patient = getPatientById(task.patientId);
            return (
              <Card key={task.id}>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{task.id}</div>
                    <div className="mt-1 text-lg font-black text-slate-800">{patient.name}</div>
                  </div>
                  <Badge type={STATUS_BADGE_MAP[task.status] || 'default'}>{task.status}</Badge>
                </div>
                <div className="space-y-3 text-sm text-slate-500">
                  <div>当前环节：<span className="font-bold text-slate-700">{task.stage}</span></div>
                  <div>开始时间：<span className="font-bold text-slate-700">{task.startTime}</span></div>
                  <div>最近更新：<span className="font-bold text-slate-700">{task.updateTime}</span></div>
                </div>
                <div className="mt-5"><ProgressBar progress={task.progress} /></div>
                {task.errorMsg && <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs leading-5 text-rose-600">{task.errorMsg}</div>}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

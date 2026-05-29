import { ArrowRight, FileBarChart, GitMerge, ShieldAlert, Sparkles } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';

export default function OverviewPage({ patient, switchPatientView }) {
  const overviewStats = [
    { label: 'CRS-R 总分', value: `${patient.crsR}` },
    { label: 'MCS 可能性', value: `${patient.mcsProbability}%` },
    { label: 'N3/SWS 占比', value: `${patient.n3Ratio}%` },
    { label: 'REM 时长', value: `${patient.remDuration} min` },
  ];

  return (
    <div className="mx-auto max-w-[1300px] space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Clinical Summary</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-800">临床全景摘要</h2>
            </div>
            <Badge type={patient.mcsProbability >= 70 ? 'success' : patient.mcsProbability >= 45 ? 'warning' : 'danger'}>
              当前状态：{patient.assessment}
            </Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {overviewStats.map((item) => (
              <div key={item.label} className="rounded-3xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{item.label}</div>
                <div className="mt-3 text-2xl font-black text-slate-800">{item.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-3xl border border-blue-100 bg-blue-50/70 p-5 text-sm leading-7 text-slate-700">
            临床摘要：{patient.clinicalSummary}
            <br />
            当前系统建议：优先查看可解释睡眠报告与意识评估页，将模型输出作为 CRS-R、影像学资料和医生床旁观察的客观补充。
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-amber-50 p-3 text-amber-500"><Sparkles size={20} /></div>
            <div>
              <h3 className="text-lg font-black text-slate-800">建议入口</h3>
              <p className="text-sm text-slate-500">从概览直接跳转到关键业务视图</p>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {[
              { id: 'sleep-report', icon: FileBarChart, title: '查看可解释睡眠报告', desc: '进入整夜睡眠结构与单 Epoch 证据解释界面' },
              { id: 'risk-report', icon: ShieldAlert, title: '查看意识评估报告', desc: '查看 MCS / VS-UWS 分类及特征贡献解释' },
              { id: 'history', icon: GitMerge, title: '查看康复趋势', desc: '对比多次复查的 CRS-R 与睡眠结构变化' },
            ].map((item) => (
              <button key={item.id} onClick={() => switchPatientView(item.id)} className="flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-4 text-left transition hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-slate-50 p-3 text-blue-600"><item.icon size={18} /></div>
                  <div>
                    <div className="font-black text-slate-800">{item.title}</div>
                    <div className="text-sm text-slate-500">{item.desc}</div>
                  </div>
                </div>
                <ArrowRight size={18} className="text-slate-400" />
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <h3 className="mb-4 text-lg font-black text-slate-800">历次康复评估档案</h3>
          <div className="space-y-5">
            {[
              { date: '2025-10-24', title: '本次多模态睡眠生理信号评估', desc: '睡眠报告与意识评估报告生成，等待医生复核。' },
              { date: '2025-10-17', title: 'CRS-R 复核记录', desc: '补充 CRS-R 与床旁观察记录，建议结合客观生理信号复评。' },
              { date: '2025-10-10', title: '首次康复建档', desc: '记录病程信息并安排夜间头环采集。' },
            ].map((item) => (
              <div key={item.date} className="flex gap-4">
                <div className="relative flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <div className="mt-2 h-full w-px bg-slate-200" />
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{item.date}</div>
                  <div className="mt-1 font-black text-slate-800">{item.title}</div>
                  <div className="mt-2 text-sm text-slate-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-lg font-black text-slate-800">AI 重点提醒</h3>
          <ul className="space-y-3 text-sm leading-6 text-slate-600">
            <li className="rounded-2xl bg-slate-50 p-4">当前 N3/SWS 片段存在，可作为睡眠结构完整性的辅助证据。</li>
            <li className="rounded-2xl bg-slate-50 p-4">REM 片段与纺锤波特征可为 MCS / VS-UWS 分类提供客观补充线索。</li>
            <li className="rounded-2xl bg-slate-50 p-4">模型输出不替代正式诊断，应结合 CRS-R、影像学资料和床旁观察复核。</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

import { ArrowRight, FileBarChart, GitMerge, ShieldAlert, Sparkles } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';

export default function OverviewPage({ patient, switchPatientView }) {
  const overviewStats = [
    { label: '睡眠效率', value: `${patient.sleepEfficiency}%` },
    { label: 'REM 潜伏期', value: `${patient.remLatency} min` },
    { label: 'N3 占比', value: `${patient.n3Ratio}%` },
    { label: '风险概率', value: `${patient.risk}%` },
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
            <Badge type={patient.risk >= 60 ? 'danger' : patient.risk >= 40 ? 'warning' : 'success'}>
              当前风险 {patient.risk}%
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
            主诉：{patient.complaint}
            <br />
            当前系统建议：优先查看可解释睡眠报告，并结合患者主诉及量表结果评估是否需要进一步进入风险提示与分诊环节。
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
              { id: 'sleep-report', icon: FileBarChart, title: '查看可解释睡眠报告', desc: '进入整夜睡眠结构与单 Epoch 解析界面' },
              { id: 'risk-report', icon: ShieldAlert, title: '查看风险提示报告', desc: '查看风险概率及特征贡献解释' },
              { id: 'history', icon: GitMerge, title: '查看历史对比', desc: '对比多次复查的风险与睡眠结构变化' },
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
          <h3 className="mb-4 text-lg font-black text-slate-800">历次增强分析档案</h3>
          <div className="space-y-5">
            {[
              { date: '2025-10-24', title: '本次 PSG 检查', desc: '双报告生成，风险评估完成。' },
              { date: '2025-10-17', title: '门诊复核记录', desc: '补充 PHQ-9 与既往主诉，建议结合专科门诊复查。' },
              { date: '2025-10-10', title: '首次门诊建档', desc: '记录主诉并安排 PSG 检查。' },
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
            <li className="rounded-2xl bg-slate-50 p-4">当前 REM 潜伏期明显短于常见参考区间，建议优先查看风险提示页。</li>
            <li className="rounded-2xl bg-slate-50 p-4">主诉、睡眠效率与深睡比例呈一致方向变化，适合在后续复查中做纵向跟踪。</li>
            <li className="rounded-2xl bg-slate-50 p-4">如临床需要，可结合量表与门诊访谈进一步完成分诊判断。</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

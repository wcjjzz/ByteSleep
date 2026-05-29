import { AlertTriangle, ArrowUpRight, BrainCircuit, ShieldCheck } from 'lucide-react';
import Card from '../../components/ui/Card';
import RiskRadarChart from '../../charts/RiskRadarChart';
import { RISK_FEATURES } from '../../data/riskFeatures';

function getDirectionText(direction) {
  if (direction === 'higher-supportive') return '偏高支持 MCS';
  if (direction === 'lower-supportive') return '偏低支持 MCS';
  return '需医生复核';
}

export default function RiskReportPage({ patient }) {
  const conclusion = patient?.assessment || 'MCS 倾向';
  const confidence = patient?.mcsProbability || 76;

  return (
    <div className="mx-auto max-w-[1300px] space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-white">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-emerald-100 blur-3xl" />
          <div className="relative z-10 flex items-start gap-4">
            <div className="rounded-3xl bg-emerald-100 p-4 text-emerald-600"><ShieldCheck size={28} /></div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">Consciousness Assessment</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-800">意识障碍辅助评估：{conclusion}（{confidence}%）</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                系统基于夜间多模态睡眠生理信号提取 N3/SWS、REM、纺锤波、阶段完整性与 EEG/EOG 一致性等证据，输出 MCS / VS-UWS 辅助分类结果。
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-white">
          <div className="flex items-start gap-4">
            <div className="rounded-3xl bg-amber-100 p-4 text-amber-600"><AlertTriangle size={28} /></div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-600">Clinical Notes</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-800">临床提醒</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <li>本结果是基于生理信号的客观补充方法，不替代 CRS-R 与医生正式诊断。</li>
                <li>建议结合 CRS-R、影像学资料、病程记录和床旁观察完成复核。</li>
                <li>跨主体适配模块用于降低不同患者波形形态和信号分布差异对输出的影响。</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <Card className="border-blue-100 bg-gradient-to-r from-blue-50 to-white">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Algorithm Evidence</div>
            <h3 className="mt-2 text-xl font-black text-slate-800">算法输出由多模态证据共同支撑</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {['跨主体适配', '多模态融合', '可解释热度图', 'CRS-R 客观补充'].map((item) => (
              <span key={item} className="rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-black text-blue-700">{item}</span>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <RiskRadarChart />
        <Card>
          <h3 className="mb-4 inline-flex items-center gap-2 text-lg font-black text-slate-800"><BrainCircuit size={20} className="text-blue-600" /> 七项意识评估证据明细</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-100 text-xs uppercase tracking-[0.18em] text-slate-500">
                <tr>
                  <th className="py-4 pr-4">特征</th>
                  <th className="py-4 pr-4">当前值</th>
                  <th className="py-4 pr-4">参考值</th>
                  <th className="py-4 pr-4">解释方向</th>
                  <th className="py-4 pr-0">贡献度</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {RISK_FEATURES.map((item) => (
                  <tr key={item.name}>
                    <td className="py-4 pr-4 font-black text-slate-800">{item.name}</td>
                    <td className="py-4 pr-4">{item.value} {item.unit}</td>
                    <td className="py-4 pr-4">{item.baseline} {item.unit}</td>
                    <td className="py-4 pr-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        <ArrowUpRight size={12} /> {getDirectionText(item.direction)}
                      </span>
                    </td>
                    <td className="py-4 pr-0">
                      <div className="mb-2 text-sm font-black text-blue-600">{Math.round(item.contribution * 100)}%</div>
                      <div className="h-2 rounded-full bg-slate-100">
                        <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" style={{ width: `${Math.round(item.contribution * 100)}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

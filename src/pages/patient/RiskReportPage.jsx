import { AlertTriangle, ArrowUpRight, ShieldAlert } from 'lucide-react';
import Card from '../../components/ui/Card';
import RiskRadarChart from '../../charts/RiskRadarChart';
import { RISK_FEATURES } from '../../data/riskFeatures';

export default function RiskReportPage() {
  return (
    <div className="mx-auto max-w-[1300px] space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="relative overflow-hidden bg-gradient-to-br from-rose-50 to-white">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-rose-100 blur-3xl" />
          <div className="relative z-10 flex items-start gap-4">
            <div className="rounded-3xl bg-rose-100 p-4 text-rose-600"><ShieldAlert size={28} /></div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-rose-600">Risk Summary</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-800">抑郁相关风险提示：阳性（75%）</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                风险评分主要由 REM 潜伏期异常缩短、睡眠效率下降、深睡比例减少以及觉醒次数增多共同驱动，建议结合量表与门诊访谈进一步核验。
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
                <li>建议优先查看既往量表、近期主诉和复诊记录，确认症状持续性。</li>
                <li>如患者近一周情绪波动明显，可安排更高优先级的门诊分诊或复诊回访。</li>
                <li>当前页面仅为辅助提示，不替代正式精神卫生诊断。</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <RiskRadarChart />
        <Card>
          <h3 className="mb-4 text-lg font-black text-slate-800">七项风险特征明细</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-100 text-xs uppercase tracking-[0.18em] text-slate-500">
                <tr>
                  <th className="py-4 pr-4">特征</th>
                  <th className="py-4 pr-4">当前值</th>
                  <th className="py-4 pr-4">参考值</th>
                  <th className="py-4 pr-4">风险方向</th>
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
                        <ArrowUpRight size={12} /> {item.direction === 'lower-risky' ? '偏低更危险' : '偏高更危险'}
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

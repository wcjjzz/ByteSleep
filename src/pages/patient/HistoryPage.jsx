import Card from '../../components/ui/Card';
import FeatureCompareBarChart from '../../charts/FeatureCompareBarChart';
import RiskTrendChart from '../../charts/RiskTrendChart';
import StageStackedBarChart from '../../charts/StageStackedBarChart';
import { FEATURE_COMPARE_DATA, RISK_TREND_DATA, STAGE_STACKED_DATA } from '../../data/historyData';

export default function HistoryPage({ patient }) {
  return (
    <div className="mx-auto max-w-[1300px] space-y-6">
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-100">Longitudinal Summary</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight">{patient.name} 的纵向趋势摘要</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-50">
          最近四次记录显示，风险概率总体下降，睡眠效率逐步提升，深睡比例回升。对于门诊复查场景，这种多次结果对照比单次报告更适合支持随访决策。
        </p>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <RiskTrendChart data={RISK_TREND_DATA} />
        <StageStackedBarChart data={STAGE_STACKED_DATA} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <FeatureCompareBarChart data={FEATURE_COMPARE_DATA} />
        <Card>
          <h3 className="mb-4 text-lg font-black text-slate-800">多期核心指标表</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-100 text-xs uppercase tracking-[0.18em] text-slate-500">
                <tr>
                  <th className="py-4 pr-4">日期</th>
                  <th className="py-4 pr-4">风险概率</th>
                  <th className="py-4 pr-4">睡眠效率</th>
                  <th className="py-4 pr-0">趋势说明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {RISK_TREND_DATA.map((item, index) => (
                  <tr key={item.date}>
                    <td className="py-4 pr-4 font-black text-slate-800">{item.date}</td>
                    <td className="py-4 pr-4">{item.risk}%</td>
                    <td className="py-4 pr-4">{item.efficiency}%</td>
                    <td className="py-4 pr-0 text-slate-500">{index === RISK_TREND_DATA.length - 1 ? '近期最好' : '持续改善中'}</td>
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

import Card from '../../components/ui/Card';
import FeatureCompareBarChart from '../../charts/FeatureCompareBarChart';
import RiskTrendChart from '../../charts/RiskTrendChart';
import StageStackedBarChart from '../../charts/StageStackedBarChart';
import { getHistoryDataForPatient } from '../../data/historyData';

export default function HistoryPage({ patient }) {
  const { riskTrendData, stageStackedData, featureCompareData } = getHistoryDataForPatient(patient);

  return (
    <div className="mx-auto max-w-[1300px] space-y-6">
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-100">Rehabilitation Summary</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight">{patient.name} 的康复趋势摘要</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-50">
          最近六次记录显示，CRS-R 总分、MCS 可能性与睡眠阶段完整性存在个体化波动。对于康复中心复评场景，多次结果对照比单次报告更适合支持连续跟踪与医生复核。
        </p>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <RiskTrendChart data={riskTrendData} />
        <StageStackedBarChart data={stageStackedData} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <FeatureCompareBarChart data={featureCompareData} />
        <Card>
          <h3 className="mb-4 text-lg font-black text-slate-800">多次康复评估指标表</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-100 text-xs uppercase tracking-[0.18em] text-slate-500">
                <tr>
                  <th className="py-4 pr-4">日期</th>
                  <th className="py-4 pr-4">MCS 可能性</th>
                  <th className="py-4 pr-4">CRS-R 总分</th>
                  <th className="py-4 pr-0">趋势说明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {riskTrendData.map((item) => (
                  <tr key={item.date}>
                    <td className="py-4 pr-4 font-black text-slate-800">{item.date}</td>
                    <td className="py-4 pr-4">{item.mcsProbability}%</td>
                    <td className="py-4 pr-4">{item.crsR}</td>
                    <td className="py-4 pr-0 text-slate-500">{item.note}</td>
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

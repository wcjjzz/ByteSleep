import { FileCheck, ShieldAlert } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import { MOCK_REPORTS } from '../../data/mockReports';
import { getPatientById } from '../../utils/patient';

function getRiskBadgeType(level) {
  if (level === 'high') return 'success';
  if (level === 'medium') return 'warning';
  return 'primary';
}

export default function ReportsPage({ enterPatientWorkspace }) {
  return (
    <div className="mx-auto max-w-[1300px] space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-800">意识评估报告中心</h1>
        <p className="mt-2 text-sm font-medium text-slate-500">统一查看睡眠报告、意识评估报告、CRS-R 补充信息与医生复核状态。</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex items-center justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">睡眠报告 + 意识评估</div>
            <div className="mt-3 text-4xl font-black text-slate-800">2</div>
          </div>
          <div className="rounded-2xl bg-blue-50 p-4 text-blue-600"><FileCheck size={22} /></div>
        </Card>
        <Card className="flex items-center justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">待复核报告</div>
            <div className="mt-3 text-4xl font-black text-slate-800">1</div>
          </div>
          <div className="rounded-2xl bg-rose-50 p-4 text-rose-600"><ShieldAlert size={22} /></div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50/70 text-xs uppercase tracking-[0.18em] text-slate-500">
                <tr>
                  <th className="px-6 py-5">报告 ID</th>
                  <th className="px-6 py-5">患者</th>
                  <th className="px-6 py-5">检查日期</th>
                  <th className="px-6 py-5">完整性</th>
                  <th className="px-6 py-5">意识状态结论</th>
                  <th className="px-6 py-5">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_REPORTS.map((report) => {
                  const patient = getPatientById(report.patientId);
                  return (
                    <tr key={report.id} onClick={() => enterPatientWorkspace(patient, report.riskLevel === 'high' ? 'risk-report' : 'sleep-report')} className="cursor-pointer transition hover:bg-blue-50/30">
                      <td className="px-6 py-5 font-bold text-slate-700">{report.id}</td>
                      <td className="px-6 py-5 font-black text-slate-800">{patient.name}</td>
                      <td className="px-6 py-5">{report.examDate}</td>
                      <td className="px-6 py-5">{report.comp}</td>
                      <td className="px-6 py-5"><Badge type={getRiskBadgeType(report.riskLevel)}>{report.riskText}</Badge></td>
                      <td className="px-6 py-5"><Badge type="default">{report.status}</Badge></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          {MOCK_REPORTS.map((report) => {
            const patient = getPatientById(report.patientId);
            return (
              <Card key={report.id}>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{report.id}</div>
                    <div className="mt-1 text-lg font-black text-slate-800">{patient.name}</div>
                  </div>
                  <Badge type={getRiskBadgeType(report.riskLevel)}>{report.riskText}</Badge>
                </div>
                <div className="space-y-2 text-sm text-slate-500">
                  <div>检查日期：<span className="font-bold text-slate-700">{report.examDate}</span></div>
                  <div>生成时间：<span className="font-bold text-slate-700">{report.genTime}</span></div>
                  <div>报告组成：<span className="font-bold text-slate-700">{report.comp}</span></div>
                </div>
                <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">{report.summary}</div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { ClipboardList, FileCheck, ShieldAlert } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import { MOCK_REPORTS } from '../../data/mockReports';
import { CRS_R_SUBSCALES } from '../../data/crsRScale';
import { getPatientById } from '../../utils/patient';

function getRiskBadgeType(level) {
  if (level === 'high') return 'success';
  if (level === 'medium') return 'warning';
  return 'primary';
}

function getCrsBadgeType(level) {
  if (level?.includes('MCS')) return 'success';
  if (level?.includes('边界')) return 'warning';
  return 'primary';
}

function CrsRSubscoreGrid({ subScores }) {
  return (
    <div className="mt-4 grid gap-2 sm:grid-cols-2">
      {CRS_R_SUBSCALES.map((item) => (
        <div key={item.key} className="rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-500">{item.label}</span>
            <span className="text-sm font-black text-slate-800">{subScores?.[item.key] ?? 0}<span className="text-xs text-slate-400">/{item.max}</span></span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ReportsPage({ enterPatientWorkspace, crsRRecords = [] }) {
  return (
    <div className="mx-auto max-w-[1300px] space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-800">意识评估报告中心</h1>
        <p className="mt-2 text-sm font-medium text-slate-500">统一查看睡眠报告、意识评估报告、CRS-R 补充信息与医生复核状态。</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="flex items-center justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">睡眠报告 + 意识评估</div>
            <div className="mt-3 text-4xl font-black text-slate-800">{MOCK_REPORTS.length}</div>
          </div>
          <div className="rounded-2xl bg-blue-50 p-4 text-blue-600"><FileCheck size={22} /></div>
        </Card>
        <Card className="flex items-center justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">CRS-R 量表记录</div>
            <div className="mt-3 text-4xl font-black text-slate-800">{crsRRecords.length}</div>
          </div>
          <div className="rounded-2xl bg-indigo-50 p-4 text-indigo-600"><ClipboardList size={22} /></div>
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
          <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-5">
            <h2 className="text-lg font-black text-slate-800">睡眠与意识评估报告</h2>
            <p className="mt-1 text-sm text-slate-500">点击报告可进入患者工作区查看详情。</p>
          </div>
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

      <Card className="overflow-hidden p-0">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-indigo-50/40 px-6 py-5">
          <div>
            <h2 className="inline-flex items-center gap-2 text-lg font-black text-slate-800"><ClipboardList size={20} className="text-indigo-600" /> CRS-R 量表记录</h2>
            <p className="mt-1 text-sm text-slate-500">展示医生在工作台提交的 CRS-R 六项子量表记录、总分与备注。</p>
          </div>
          <Badge type="processing">{crsRRecords.length} 条记录</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/80 text-xs uppercase tracking-[0.18em] text-slate-500">
              <tr>
                <th className="px-6 py-4">记录 ID</th>
                <th className="px-6 py-4">患者</th>
                <th className="px-6 py-4">评估日期</th>
                <th className="px-6 py-4">CRS-R 总分</th>
                <th className="px-6 py-4">意识判断</th>
                <th className="px-6 py-4">医生</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {crsRRecords.map((record) => {
                const patient = getPatientById(record.patientId);
                return (
                  <tr key={record.id} onClick={() => enterPatientWorkspace(patient, 'history')} className="cursor-pointer transition hover:bg-indigo-50/40">
                    <td className="px-6 py-5 font-bold text-slate-700">{record.id}</td>
                    <td className="px-6 py-5 font-black text-slate-800">{patient?.name || record.patientId}</td>
                    <td className="px-6 py-5">{record.date}</td>
                    <td className="px-6 py-5"><span className="font-black text-indigo-700">{record.score}</span><span className="text-slate-400"> / 23</span></td>
                    <td className="px-6 py-5"><Badge type={getCrsBadgeType(record.level)}>{record.level}</Badge></td>
                    <td className="px-6 py-5">{record.examiner}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {crsRRecords.map((record) => {
          const patient = getPatientById(record.patientId);
          return (
            <Card key={`${record.id}-detail`} className="border-indigo-100">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{record.id}</div>
                  <div className="mt-1 text-xl font-black text-slate-800">{patient?.name || record.patientId}</div>
                  <div className="mt-1 text-sm font-bold text-slate-500">{record.date} · {record.examiner}</div>
                </div>
                <div className="rounded-2xl bg-indigo-50 px-4 py-3 text-right">
                  <div className="text-3xl font-black text-indigo-700">{record.score}</div>
                  <div className="text-xs font-bold text-indigo-400">CRS-R / 23</div>
                </div>
              </div>
              <Badge type={getCrsBadgeType(record.level)}>{record.level}</Badge>
              <CrsRSubscoreGrid subScores={record.subScores} />
              <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                <span className="font-black text-slate-700">医生备注：</span>{record.note}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

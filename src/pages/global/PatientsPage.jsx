import { Search, Star } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import { MOCK_PATIENTS } from '../../data/mockPatients';
import { STATUS_BADGE_MAP } from '../../constants/appConstants';

export default function PatientsPage({ enterPatientWorkspace, followedPatientIds, toggleFollow }) {
  return (
    <div className="mx-auto max-w-[1300px] space-y-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-800">DOC 患者管理</h1>
          <p className="mt-2 text-sm font-medium text-slate-500">全局查看和管理康复中心意识障碍患者的多模态睡眠生理信号采集、意识评估与医生复核状态。</p>
        </div>
        <div className="flex flex-col gap-3 md:flex-row">
          <select className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 shadow-sm outline-none">
            <option>所有状态</option>
            <option>待脑电采集</option>
            <option>睡眠分析中</option>
            <option>待医生复核</option>
            <option>MCS 跟踪</option>
            <option>VS/UWS 跟踪</option>
            <option>异常中断</option>
          </select>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm font-bold text-slate-700 shadow-sm outline-none" placeholder="搜索患者姓名、ID..." />
          </div>
        </div>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/70 text-xs uppercase tracking-[0.18em] text-slate-500">
              <tr>
                <th className="px-6 py-5 text-center">关注</th>
                <th className="px-6 py-5">患者 ID</th>
                <th className="px-6 py-5">姓名</th>
                <th className="px-6 py-5">性别/年龄</th>
                <th className="px-6 py-5">最近评估</th>
                <th className="px-6 py-5">评估状态</th>
                <th className="px-6 py-5">CRS-R</th>
                <th className="px-6 py-5">MCS 可能性</th>
                <th className="px-6 py-5">临床摘要</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_PATIENTS.map((item) => {
                const followed = followedPatientIds.includes(item.id);
                return (
                  <tr key={item.id} onClick={() => enterPatientWorkspace(item, 'overview')} className="cursor-pointer bg-white transition hover:bg-blue-50/40">
                    <td className="px-6 py-5 text-center">
                      <button onClick={(event) => { event.stopPropagation(); toggleFollow(item.id); }} className="rounded-full p-2 transition hover:bg-amber-50">
                        <Star size={18} className={followed ? 'fill-amber-400 text-amber-400' : 'text-slate-300'} />
                      </button>
                    </td>
                    <td className="px-6 py-5 font-bold text-slate-700">{item.id}</td>
                    <td className="px-6 py-5 font-black text-slate-800">{item.name}</td>
                    <td className="px-6 py-5">{item.gender} / {item.age}岁</td>
                    <td className="px-6 py-5">{item.lastVisit}</td>
                    <td className="px-6 py-5"><Badge type={STATUS_BADGE_MAP[item.status] || 'default'}>{item.status}</Badge></td>
                    <td className="px-6 py-5 font-bold text-slate-700">{item.crsR}</td>
                    <td className="px-6 py-5 font-bold text-blue-600">{item.mcsProbability}%</td>
                    <td className="min-w-[280px] px-6 py-5 text-slate-500">{item.clinicalSummary}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

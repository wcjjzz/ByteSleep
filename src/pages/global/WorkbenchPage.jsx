import { Activity, Calendar, Check, CheckCircle2, FileText, LineChart, ShieldAlert, Star } from 'lucide-react';
import Card from '../../components/ui/Card';
import { getPatientById } from '../../utils/patient';

function StatCard({ title, value, sub, icon: Icon, accent }) {
  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl ${accent}`} />
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{title}</div>
          <div className="mt-3 flex items-end gap-3">
            <div className="text-4xl font-black tracking-tight text-slate-800">{value}</div>
            <div className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-bold text-slate-500">{sub}</div>
          </div>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 text-blue-600 shadow-inner">
          <Icon size={22} />
        </div>
      </div>
    </Card>
  );
}

function AlgorithmBadge({ children }) {
  return <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{children}</span>;
}

export default function WorkbenchPage({ enterPatientWorkspace, unreadPublicUpdates, unreadFollowedUpdates, markAsRead, markAllAsRead }) {
  return (
    <div className="mx-auto max-w-[1300px] space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-800">李医生，工作顺利</h1>
        <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-slate-500">
          <Calendar size={14} /> 2025年10月25日 星期五
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard title="今日评估完成" value="8" sub="+3 较昨日" icon={FileText} accent="bg-blue-100/60" />
        <StatCard title="待医生复核" value="2" sub="未读" icon={ShieldAlert} accent="bg-rose-100/60" />
        <StatCard title="康复趋势更新" value="5" sub="本周" icon={LineChart} accent="bg-indigo-100/60" />
      </div>

      <Card className="flex flex-col gap-4 border-blue-100 bg-gradient-to-r from-blue-50 to-white lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Algorithm Highlights</div>
          <div className="mt-2 text-lg font-black text-slate-800">基于多模态睡眠生理信号的客观补充评估</div>
          <p className="mt-1 text-sm leading-6 text-slate-500">结果用于补充 CRS-R 和医生床旁观察，不替代正式临床诊断。</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <AlgorithmBadge>跨主体适配</AlgorithmBadge>
          <AlgorithmBadge>显著波提取</AlgorithmBadge>
          <AlgorithmBadge>EEG/EOG 多模态融合</AlgorithmBadge>
          <AlgorithmBadge>可解释热度叠加</AlgorithmBadge>
        </div>
      </Card>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="inline-flex items-center gap-2 text-lg font-black text-slate-800"><Activity size={20} className="text-blue-500" /> 最新评估动态</h2>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-400">已过滤重点跟进名单</span>
          </div>
          {unreadPublicUpdates.length > 0 ? unreadPublicUpdates.map((update) => {
            const patient = getPatientById(update.patientId);
            const iconMap = { risk: ShieldAlert, report: FileText, history: LineChart, alert: Activity };
            const Icon = iconMap[update.type] || FileText;
            return (
              <Card key={update.id} onClick={() => enterPatientWorkspace(patient, update.targetView)} className="group relative flex items-start gap-5 pr-16">
                <div className="rounded-2xl bg-blue-50 p-4 text-blue-600 shadow-inner"><Icon size={22} /></div>
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-base font-black tracking-tight text-slate-800">{patient.name} · {update.title}</h3>
                    <span className="rounded-md bg-slate-50 px-2 py-1 text-[11px] font-bold text-slate-400">{update.time}</span>
                  </div>
                  <p className="text-sm leading-6 text-slate-500">{update.desc}</p>
                </div>
                <button
                  onClick={(event) => { event.stopPropagation(); markAsRead(update.id); }}
                  className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-3 text-slate-400 opacity-0 shadow-sm transition group-hover:opacity-100 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                  title="标为已读"
                >
                  <Check size={16} />
                </button>
              </Card>
            );
          }) : (
            <Card className="flex min-h-72 flex-col items-center justify-center text-center text-slate-400">
              <CheckCircle2 size={42} className="mb-4 text-slate-200" />
              <p className="font-bold text-slate-500">公共流中暂无新的评估动态</p>
              <p className="mt-2 text-sm">重点患者的动态已单独收纳到右侧面板</p>
            </Card>
          )}
        </div>

        <div className="lg:col-span-2">
          <Card className="flex h-[560px] flex-col overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-6 py-5">
              <h2 className="inline-flex items-center gap-2 text-lg font-black text-slate-800"><Star size={18} className="fill-amber-400 text-amber-400" /> 重点患者跟进</h2>
              {unreadFollowedUpdates.length > 0 && (
                <button onClick={() => markAllAsRead(unreadFollowedUpdates.map((item) => item.id))} className="text-xs font-bold text-blue-600 transition hover:text-blue-800">
                  全部标为已读
                </button>
              )}
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {unreadFollowedUpdates.length > 0 ? unreadFollowedUpdates.map((update) => {
                const patient = getPatientById(update.patientId);
                return (
                  <div key={update.id} onClick={() => enterPatientWorkspace(patient, update.targetView)} className="cursor-pointer rounded-2xl border border-slate-100 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-soft">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <div className="font-black text-slate-800">{patient.name}</div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{update.time}</div>
                    </div>
                    <div className="text-sm font-bold text-slate-700">{update.title}</div>
                    <div className="mt-1 text-xs leading-5 text-slate-500">{update.desc}</div>
                  </div>
                );
              }) : (
                <div className="flex h-full flex-col items-center justify-center text-center text-slate-400">
                  <CheckCircle2 size={42} className="mb-4 text-slate-200" />
                  <p className="font-bold text-slate-500">暂无未读跟进动态</p>
                  <p className="mt-2 text-sm">重点患者的新报告和状态变化将在这里优先提醒</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

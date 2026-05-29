import { ArrowLeft, Clock, Star } from 'lucide-react';
import Badge from '../ui/Badge';
import { STATUS_BADGE_MAP } from '../../constants/appConstants';

export default function PatientHeader({ patient, followedPatientIds, toggleFollow, onBack }) {
  const followed = followedPatientIds.includes(patient.id);

  return (
    <div className="flex items-center justify-between px-8 py-5">
      <div className="flex items-center gap-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-black text-white shadow-lg shadow-blue-500/20">
          {patient.name.charAt(0)}
        </div>
        <div>
          <div className="mb-1 flex items-center gap-4">
            <div className="text-2xl font-black tracking-tight text-slate-800">{patient.name}</div>
            <div className="text-sm font-medium text-slate-500">{patient.gender} · {patient.age}岁</div>
            <button
              onClick={() => toggleFollow(patient.id)}
              className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1 text-xs font-bold transition ${
                followed
                  ? 'border-amber-200 bg-amber-50 text-amber-600'
                  : 'border-slate-200 bg-white text-slate-500 hover:border-amber-200 hover:text-amber-500'
              }`}
            >
              <Star size={14} className={followed ? 'fill-amber-500 text-amber-500' : ''} />
              {followed ? '已关注' : '关注'}
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge type="primary">ID: {patient.id}</Badge>
            <Badge type={STATUS_BADGE_MAP[patient.status] || 'default'}>{patient.status}</Badge>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-500">
              <Clock size={14} /> 就诊时间：{patient.lastVisit}
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
      >
        <ArrowLeft size={16} /> 返回全局
      </button>
    </div>
  );
}

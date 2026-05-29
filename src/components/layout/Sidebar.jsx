import { Activity } from 'lucide-react';

export default function Sidebar({ items, currentId, onChange }) {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-800/40 bg-slate-950 text-slate-200">
      <button className="mt-4 flex items-center gap-3 px-6 py-5 text-left" onClick={() => onChange('workbench')}>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-900/40">
          <Activity size={22} />
        </div>
        <div>
          <div className="text-2xl font-black tracking-tight text-white">PSGScope</div>
          <div className="text-xs font-medium text-slate-400">医院 PSG 智能工作台</div>
        </div>
      </button>

      <div className="px-7 py-4 text-[11px] font-bold uppercase tracking-[0.28em] text-slate-500">全局视野</div>

      <nav className="flex-1 px-4">
        {items.map((item) => {
          const isActive = currentId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`mb-2 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-950/40'
                  : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              <span className="font-semibold tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="m-4 rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-inner">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-black text-white">李</div>
          <div>
            <div className="font-bold text-white">李医生</div>
            <div className="text-xs text-slate-400">睡眠医学科</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

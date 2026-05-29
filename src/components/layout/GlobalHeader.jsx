import { Bell, Search, Settings } from 'lucide-react';

export default function GlobalHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/80 px-8 backdrop-blur-md">
      <div className="relative w-96 max-w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          className="w-full rounded-full border border-transparent bg-slate-100/70 py-2 pl-10 pr-4 text-sm font-medium outline-none transition focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
          placeholder="搜索患者姓名、ID或流水号..."
        />
      </div>
      <div className="flex items-center gap-5 text-slate-500">
        <button className="relative transition hover:text-blue-600">
          <Bell size={20} />
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-rose-500" />
        </button>
        <button className="transition hover:text-blue-600">
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
}

import { Activity, Check, Lock, Sparkles, User } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans">
      <div className="relative hidden w-1/2 flex-col justify-center overflow-hidden bg-[#060b17] px-20 text-white lg:flex xl:px-24">
        <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[100px]" />

        <div className="relative z-10 -mt-14">
          <div className="mb-12 flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-[0_0_25px_rgba(59,130,246,0.4)] ring-1 ring-white/10">
              <Activity size={28} strokeWidth={2.5} />
            </div>
            <span className="text-[28px] font-bold tracking-wide text-white">ByteSleep</span>
          </div>

          <h1 className="mb-6 text-[42px] font-black leading-[1.16] tracking-tight text-white xl:text-[50px]">
            基于多模态睡眠生理信号的
            <span className="block bg-gradient-to-r from-blue-300 to-indigo-400 bg-clip-text text-transparent">
              意识障碍康复跟踪平台
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-[16px] font-medium leading-relaxed text-slate-400">
            系统采集患者的多模态睡眠生理信号，通过跨受试适配的新进算法，评估患者病情发展趋势。为医生提供 CRS-R 量表之外的客观评估手段。
          </p>

          <div className="mt-9 flex flex-wrap gap-3 text-sm font-bold text-slate-200">
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">跨主体适配</div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">可解释热度</div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">客观评估手段补充</div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-24 left-20 right-20 h-40 opacity-80 xl:left-24 xl:right-24">
          <svg viewBox="0 0 1000 200" className="h-full w-full" preserveAspectRatio="none">
            <line x1="0" y1="130" x2="1000" y2="130" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeDasharray="12 12" />
            <path
              d="M0,130 L60,120 L90,130 L110,90 L130,160 L160,20 L190,190 L210,100 L240,140 L300,130 C350,130 380,40 430,40 C480,40 500,170 550,170 C600,170 620,40 670,40 C720,40 740,170 790,170 C840,170 860,40 910,40 L940,40 L950,130 L970,70 L1000,130"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="16"
              opacity="0.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M0,130 L60,120 L90,130 L110,90 L130,160 L160,20 L190,190 L210,100 L240,140 L300,130 C350,130 380,40 430,40 C480,40 500,170 550,170 C600,170 620,40 670,40 C720,40 740,170 790,170 C840,170 860,40 910,40 L940,40 L950,130 L970,70 L1000,130"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="absolute bottom-8 left-20 text-[13px] font-medium tracking-wide text-slate-500/70 xl:left-24">
          © 2026 ByteSleep Medical AI Platform. All rights reserved.
        </div>
      </div>

      <div className="relative flex w-full items-center justify-center bg-white lg:w-1/2">
        <div className="w-[420px] px-8">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.26em] text-blue-600">Rehabilitation Clinical Portal</p>
            <h2 className="mb-3 text-[32px] font-extrabold tracking-tight text-slate-800">欢迎登录</h2>
            <p className="text-[15px] font-bold text-slate-500">请使用医生工号或手机号登录系统</p>
          </div>

          <div className="space-y-6">
            <div className="group relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-500" size={20} strokeWidth={2.5} />
              <input
                type="text"
                defaultValue="doctor.li"
                className="block w-full rounded-2xl border-2 border-slate-100 bg-white py-4 pl-12 pr-4 text-[15px] font-bold text-slate-800 shadow-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                placeholder="医生工号 / 手机号"
              />
            </div>

            <div className="group relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-500" size={20} strokeWidth={2.5} />
              <input
                type="password"
                defaultValue="123456"
                className="block w-full rounded-2xl border-2 border-slate-100 bg-white py-4 pl-12 pr-4 text-[15px] font-black tracking-widest text-slate-800 shadow-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                placeholder="密码"
              />
            </div>

            <div className="mt-2 flex items-center justify-between px-1">
              <label className="group flex cursor-pointer items-center gap-2.5">
                <div className="relative flex h-5 w-5 items-center justify-center">
                  <input type="checkbox" defaultChecked className="peer sr-only" />
                  <div className="h-5 w-5 rounded border-2 border-slate-300 transition-colors peer-checked:border-blue-600 peer-checked:bg-blue-600" />
                  <Check size={14} strokeWidth={3} className="absolute text-white opacity-0 transition-opacity peer-checked:opacity-100" />
                </div>
                <span className="text-[14px] font-bold text-slate-600 transition-colors group-hover:text-slate-800">记住账号</span>
              </label>
              <button type="button" className="text-[14px] font-bold text-blue-600 transition-colors hover:text-blue-800">忘记密码?</button>
            </div>

            <button
              onClick={onLogin}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-lg font-bold text-white shadow-[0_8px_20px_rgba(59,130,246,0.25)] transition-all hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-[0_12px_25px_rgba(59,130,246,0.35)]"
            >
              登录系统
            </button>

            <div className="mt-8 flex items-center justify-center gap-2.5 rounded-2xl border border-blue-100/50 bg-blue-50/80 p-4 text-[13px] font-bold text-blue-600 shadow-inner">
              <Sparkles size={16} strokeWidth={2.5} />
              演示模式已开启，直接点击登录即可
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

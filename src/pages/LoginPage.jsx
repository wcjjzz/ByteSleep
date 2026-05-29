import { Lock, Sparkles, User } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.28),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.22),transparent_32%)]" />
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden border-r border-white/10 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold tracking-[0.18em] text-blue-100">
              <Sparkles size={14} /> PSGScope
            </div>
            <h1 className="max-w-md text-5xl font-black leading-tight tracking-tight">
              面向医院 PSG 流程的
              <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">可解释分析工作台</span>
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-slate-200">
              将患者大厅、PSG 任务中心、睡眠报告、风险提示与历史对比整合到统一工作流中，便于门诊医生快速查看与追踪。
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm text-slate-200">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-4">工作台动态</div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-4">可解释报告</div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-4">纵向趋势</div>
          </div>
        </div>

        <div className="bg-white/95 p-8 sm:p-12">
          <div className="mx-auto max-w-md">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-blue-600">Doctor Portal</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-800">登录 PSGScope</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">此页面用于演示静态前端流程，点击登录即可进入系统。</p>
            </div>

            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">账号</span>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none ring-0 transition focus:border-blue-400" defaultValue="doctor.li" />
                </div>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">密码</span>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="password" className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none ring-0 transition focus:border-blue-400" defaultValue="123456" />
                </div>
              </label>
              <button
                onClick={onLogin}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-sm font-black tracking-wide text-white shadow-lg shadow-blue-600/30 transition hover:translate-y-[-1px]"
              >
                进入工作台
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

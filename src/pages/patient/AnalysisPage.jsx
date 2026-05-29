import { CheckCircle2, PlayCircle, UploadCloud } from 'lucide-react';
import Card from '../../components/ui/Card';

export default function AnalysisPage({ patient, switchPatientView }) {
  const steps = [
    '接收 PSG 原始文件与检查信息',
    '完成基础预处理与伪迹处理',
    '执行睡眠分期与结构提取',
    '抽取结构化睡眠特征',
    '生成睡眠报告与风险提示',
  ];

  return (
    <div className="mx-auto max-w-[1300px] space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-50 p-4 text-blue-600"><UploadCloud size={22} /></div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-800">智能分析接入区</h2>
              <p className="mt-1 text-sm text-slate-500">当前患者：{patient.name}</p>
            </div>
          </div>
          <div className="mt-6 rounded-[2rem] border border-dashed border-blue-200 bg-blue-50/40 p-10 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-blue-600 shadow-soft">
              <UploadCloud size={28} />
            </div>
            <h3 className="text-lg font-black text-slate-800">EDF / PSG 文件演示接入位</h3>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500">
              这里保留了与原单文件原型一致的“文件接入与分析开始”语义。当前项目为静态演示版，因此使用说明性界面替代真实上传。
            </p>
            <button className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/30">
              <PlayCircle size={18} /> 开始模拟分析
            </button>
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-black text-slate-800">分析流程进度</h3>
          <div className="mt-6 space-y-5">
            {steps.map((item, index) => {
              const finished = index < 3;
              const current = index === 3;
              return (
                <div key={item} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full ${finished ? 'bg-emerald-500 text-white' : current ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {finished ? <CheckCircle2 size={18} /> : index + 1}
                    </div>
                    {index < steps.length - 1 && <div className="mt-2 h-12 w-px bg-slate-200" />}
                  </div>
                  <div className="pt-1">
                    <div className="font-black text-slate-800">{item}</div>
                    <div className="mt-1 text-sm text-slate-500">{finished ? '已完成' : current ? '正在处理' : '等待执行'}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={() => switchPatientView('sleep-report')} className="mt-8 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50">
            进入睡眠报告页
          </button>
        </Card>
      </div>
    </div>
  );
}

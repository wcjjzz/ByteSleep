import { ChevronLeft, ChevronRight, Eye, Waves } from 'lucide-react';
import Card from '../../components/ui/Card';
import HypnogramChart from '../../charts/HypnogramChart';
import SleepStagePieChart from '../../charts/SleepStagePieChart';
import { HYPNOGRAM_DATA } from '../../data/hypnogramData';
import { useEpochInspector } from '../../features/sleep-report/hooks/useEpochInspector';

function SignalSvg({ data, title, gradients }) {
  const path = data.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${90 - point.y}`).join(' ');
  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-black text-slate-800">{title}</h3>
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">解释性热度叠加</div>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-slate-50 p-3">
        <svg viewBox="0 0 750 180" className="h-48 w-full min-w-[760px]">
          {gradients.map((item, index) => (
            <rect
              key={index}
              x={item.start}
              y="0"
              width={item.end - item.start}
              height="180"
              fill={`rgba(59,130,246,${item.intensity})`}
            />
          ))}
          <path d={path} fill="none" stroke="#0f172a" strokeWidth="2" />
        </svg>
      </div>
    </Card>
  );
}

export default function SleepReportPage() {
  const {
    currentEpochId,
    setCurrentEpochId,
    signalMode,
    setSignalMode,
    inputValue,
    setInputValue,
    signalBundle,
    jumpToEpoch,
  } = useEpochInspector();

  return (
    <div className="mx-auto max-w-[1300px] space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <HypnogramChart data={HYPNOGRAM_DATA} />
        <SleepStagePieChart />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-6">
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Epoch Inspector</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-800">单 Epoch 可解释判别</h2>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
                <button onClick={() => setSignalMode('overlay')} className={`rounded-xl px-4 py-2 text-sm font-black ${signalMode === 'overlay' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>叠加模式</button>
                <button onClick={() => setSignalMode('focus')} className={`rounded-xl px-4 py-2 text-sm font-black ${signalMode === 'focus' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>聚焦模式</button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-center">
              <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <button onClick={() => setCurrentEpochId((prev) => Math.max(1, prev - 1))} className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-50"><ChevronLeft size={16} /></button>
                <div className="text-sm font-black text-slate-800">Epoch #{currentEpochId}</div>
                <button onClick={() => setCurrentEpochId((prev) => prev + 1)} className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-50"><ChevronRight size={16} /></button>
              </div>

              <div className="flex items-center gap-3">
                <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className="w-40 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none" placeholder="输入 Epoch 编号" />
                <button onClick={jumpToEpoch} className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-black text-white">跳转</button>
              </div>

              <div className="rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700">
                当前阶段：{signalBundle.stage}
              </div>
            </div>
          </Card>

          <SignalSvg data={signalBundle.eeg} title="EEG 主导波形" gradients={signalBundle.gradients} />
          <SignalSvg data={signalBundle.eog} title="EOG 水平眼动" gradients={signalBundle.gradients} />
        </div>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600"><Eye size={20} /></div>
              <div>
                <h3 className="text-lg font-black text-slate-800">解释摘要</h3>
                <p className="text-sm text-slate-500">结合信号片段给出模型关注点</p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {signalBundle.attention.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="font-black text-slate-800">{item.label}</div>
                    <div className="text-sm font-black text-blue-600">{Math.round(item.value * 100)}%</div>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" style={{ width: `${Math.round(item.value * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-600"><Waves size={20} /></div>
              <div>
                <h3 className="text-lg font-black text-slate-800">阅读提示</h3>
                <p className="text-sm text-slate-500">辅助医生理解页面交互语义</p>
              </div>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
              <li className="rounded-2xl bg-slate-50 p-4">蓝色热度区表示模型关注度更高的信号片段。</li>
              <li className="rounded-2xl bg-slate-50 p-4">当前项目中的波形与热度数据为演示数据，用于还原原型交互感受。</li>
              <li className="rounded-2xl bg-slate-50 p-4">后续若接入真实后端，可将该区域替换为真实 Epoch 与解释性输出。</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

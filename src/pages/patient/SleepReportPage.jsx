import { ChevronLeft, ChevronRight, CheckCircle2, Eye, Waves } from 'lucide-react';
import Card from '../../components/ui/Card';
import HypnogramChart from '../../charts/HypnogramChart';
import SleepStagePieChart from '../../charts/SleepStagePieChart';
import { HYPNOGRAM_DATA } from '../../data/hypnogramData';
import { useEpochInspector } from '../../features/sleep-report/hooks/useEpochInspector';

function buildSignalPath(data) {
  return data.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${90 - point.y}`).join(' ');
}

function buildAreaPath(data) {
  const path = buildSignalPath(data);
  const last = data[data.length - 1];
  return `${path} L ${last.x} 90 L 0 90 Z`;
}

function buildGradientStops(gradients, length) {
  const stops = [];
  gradients.forEach((item) => {
    const start = (item.start / length) * 100;
    const middle = (((item.start + item.end) / 2) / length) * 100;
    const end = (item.end / length) * 100;
    const strongColor = item.intensity >= 0.5 ? '#7f1d1d' : item.intensity >= 0.35 ? '#ef4444' : '#fca5a5';
    stops.push({ offset: `${start}%`, color: '#fca5a5' });
    stops.push({ offset: `${middle}%`, color: strongColor });
    stops.push({ offset: `${end}%`, color: '#fca5a5' });
  });
  return stops;
}

function SignalHeatmapPanel({ data, title, subtitle, sampleRate, gradients, mode, channel, epochId }) {
  const path = buildSignalPath(data);
  const areaPath = buildAreaPath(data);
  const length = data[data.length - 1]?.x || 750;
  const gradientId = `heat-grad-${channel}-${epochId}`;
  const stops = buildGradientStops(gradients, length);
  const rawStroke = channel === 'eog' ? '#0ea5e9' : '#3b82f6';
  const dotClass = channel === 'eog' ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]';
  const areaFill = channel === 'eog' ? 'rgba(6,182,212,0.05)' : 'rgba(59,130,246,0.05)';

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 bg-white/90 px-6 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className={`h-2.5 w-2.5 rounded-full ${dotClass}`} />
          <div>
            <div className="text-[13px] font-black tracking-wide text-slate-700">{title}</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">{subtitle}</div>
          </div>
        </div>
        <span className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-black tracking-widest text-slate-500">{sampleRate}</span>
      </div>

      <div className="relative h-44 w-full bg-white px-2 pt-4">
        <div className="absolute inset-x-0 top-1/4 h-px bg-slate-100" />
        <div className="absolute inset-x-0 top-2/4 h-px bg-slate-200" />
        <div className="absolute inset-x-0 top-3/4 h-px bg-slate-100" />
        <svg className="relative z-0 h-32 w-full" viewBox={`0 0 ${length} 180`} preserveAspectRatio="none">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              {stops.map((stop, index) => (
                <stop key={`${stop.offset}-${index}`} offset={stop.offset} stopColor={stop.color} />
              ))}
            </linearGradient>
          </defs>
          {mode === 'raw' && <path d={areaPath} fill={areaFill} className="transition-all duration-500" />}
          <path
            d={path}
            fill="transparent"
            stroke={mode === 'heatmap' ? `url(#${gradientId})` : rawStroke}
            strokeWidth={mode === 'heatmap' ? '3' : '1.7'}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
        </svg>
      </div>

      <div className="flex h-7 items-center justify-between border-t border-slate-100 bg-slate-50/80 px-4 text-[10px] font-bold tracking-widest text-slate-400">
        <span>0s</span><span>10s</span><span>20s</span><span>30s</span>
      </div>
    </div>
  );
}

function ChannelContributionChart({ attention }) {
  const eegRatio = Math.max(0.18, Math.min(0.92, attention[0]?.value || 0.64));
  const eogRatio = Math.max(0.18, Math.min(0.92, attention[1]?.value || 0.42));
  return (
    <Card className="flex min-h-[260px] flex-col items-center justify-center border-slate-200/80 p-6 shadow-sm">
      <h4 className="mb-8 text-center text-[13px] font-extrabold tracking-wide text-slate-800">通道特征注意力贡献比</h4>
      <div className="flex w-full flex-1 items-stretch justify-center px-1">
        <div className="flex h-full shrink-0 flex-col justify-between py-0 pr-3 text-right text-[11px] font-bold tracking-wider text-slate-400">
          <span>1.00</span><span>0.75</span><span>0.50</span><span>0.25</span><span>0.00</span>
        </div>
        <div className="relative flex h-44 w-[130px] shrink-0 items-end justify-around border-b-[2px] border-l-[2px] border-slate-300 bg-white px-4">
          <div className="absolute left-0 right-0 top-0 h-px bg-slate-100" />
          <div className="absolute left-0 right-0 top-1/4 h-px bg-slate-100" />
          <div className="absolute left-0 right-0 top-2/4 h-px bg-slate-100" />
          <div className="absolute left-0 right-0 top-3/4 h-px bg-slate-100" />
          {[{ label: 'EEG', value: eegRatio }, { label: 'EOG', value: eogRatio }].map((item) => (
            <div
              key={item.label}
              className="group relative z-10 w-10 rounded-t-[2px] bg-[#ae8585] shadow-[0_2px_8px_rgba(174,133,133,0.2)] transition-all duration-700 hover:bg-[#9d7373]"
              style={{ height: `${item.value * 100}%` }}
            >
              <div className="pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 rounded bg-slate-800 px-2 py-1 font-mono text-[11px] font-bold text-white opacity-0 shadow-md transition-all group-hover:opacity-100">
                {item.value.toFixed(2)}
                <div className="absolute bottom-[-4px] left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex w-full justify-center pr-2">
        <div className="w-[28px]" />
        <div className="flex w-[130px] justify-around px-4 text-[13px] font-extrabold text-slate-700">
          <span className="w-10 text-center">EEG</span><span className="w-10 text-center">EOG</span>
        </div>
      </div>
      <div className="mt-5 w-full text-center">
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Signal</span>
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

  const confidence = signalBundle.stage === 'N3' ? 91 : signalBundle.stage === 'REM' ? 88 : signalBundle.stage === 'N2' ? 86 : 79;
  const explanation = signalBundle.stage === 'N3'
    ? '模型主要依据 EEG 中持续高幅慢波片段进行判断，N3/SWS 证据较强，可作为意识状态辅助评估中的睡眠结构完整性线索。'
    : signalBundle.stage === 'REM'
      ? '模型同时关注 EOG 中成簇眼动与 EEG 低幅混合频率片段，说明该 Epoch 具有 REM 相关证据。'
      : '模型关注 EEG/EOG 的局部形态变化，并结合睡眠阶段上下文输出当前分期结果。';

  return (
    <div className="mx-auto max-w-[1300px] space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <HypnogramChart data={HYPNOGRAM_DATA} />
        <SleepStagePieChart />
      </div>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-slate-100 bg-slate-50/50 px-7 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.26em] text-blue-600">Epoch Inspector</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-800">单 Epoch 睡眠证据解释</h2>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
              <button onClick={() => setSignalMode('raw')} className={`rounded-xl px-4 py-2 text-sm font-black ${signalMode === 'raw' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>原始信号</button>
              <button onClick={() => setSignalMode('heatmap')} className={`rounded-xl px-4 py-2 text-sm font-black ${signalMode === 'heatmap' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>模型热度图</button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <button onClick={() => setCurrentEpochId((prev) => Math.max(1, prev - 1))} className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-50 hover:text-blue-600"><ChevronLeft size={18} strokeWidth={3} /></button>
              <div className="rounded-xl bg-slate-50 px-4 py-2 text-sm font-black text-slate-800"><span className="mr-2 text-[10px] uppercase tracking-widest text-slate-400">Epoch</span>#{currentEpochId}</div>
              <button onClick={() => setCurrentEpochId((prev) => prev + 1)} className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-50 hover:text-blue-600"><ChevronRight size={18} strokeWidth={3} /></button>
            </div>
            <div className="flex items-center gap-3">
              <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className="w-40 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-blue-400" placeholder="输入 Epoch 编号" />
              <button onClick={jumpToEpoch} className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800">跳转</button>
            </div>
            <div className="rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700">
              AI 判决：<span className="ml-1 text-base font-black text-indigo-600">{signalBundle.stage} 期</span>
            </div>
          </div>
        </div>

        <div className="grid gap-0 xl:grid-cols-[1fr_330px]">
          <div className="space-y-5 p-6">
            <SignalHeatmapPanel
              data={signalBundle.eeg}
              title="脑电信号 (EEG Fpz-Cz)"
              subtitle="模型关注热度沿波形线条叠加"
              sampleRate="100 Hz"
              gradients={signalBundle.gradients}
              mode={signalMode}
              channel="eeg"
              epochId={currentEpochId}
            />
            <SignalHeatmapPanel
              data={signalBundle.eog}
              title="眼电信号 (EOG Horizontal)"
              subtitle="快速眼动与慢滚动眼动证据"
              sampleRate="100 Hz"
              gradients={signalBundle.gradients}
              mode={signalMode}
              channel="eog"
              epochId={currentEpochId}
            />
          </div>

          <div className="flex h-full flex-col border-l border-slate-100 bg-white p-6 shadow-[inset_1px_0_10px_rgba(0,0,0,0.02)]">
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-5">
              <div>
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Model Confidence</p>
                <div className="text-4xl font-black leading-none tracking-tighter text-emerald-500">{confidence}<span className="text-2xl text-emerald-400">%</span></div>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50">
                <CheckCircle2 size={24} className="text-emerald-500" strokeWidth={2.5} />
              </div>
            </div>

            <ChannelContributionChart attention={signalBundle.attention} />

            <div className="mt-6 flex-1 overflow-hidden rounded-3xl border border-indigo-100/50 bg-indigo-50/40 p-6 shadow-sm">
              <div className="relative h-full pl-3">
                <div className="absolute bottom-0 left-0 top-0 w-1.5 rounded-full bg-indigo-500" />
                <p className="text-justify text-[13px] font-medium leading-relaxed text-slate-700">
                  {explanation}
                </p>
                <div className="mt-5 flex items-start gap-3 border-t border-indigo-100 pt-5">
                  <CheckCircle2 size={18} className="shrink-0 text-indigo-600" strokeWidth={2.5} />
                  <span className="text-[11px] font-bold leading-tight tracking-wide text-indigo-800">核验提示：AI 已依据 EEG/EOG 高亮段提取波形证据，建议结合 CRS-R 与医生床旁观察综合复核。</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <Card>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600"><Eye size={20} /></div>
            <div>
              <h3 className="text-lg font-black text-slate-800">意识评估相关证据</h3>
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
              <h3 className="text-lg font-black text-slate-800">医生阅读提示</h3>
              <p className="text-sm text-slate-500">辅助理解页面交互语义</p>
            </div>
          </div>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
            <li className="rounded-2xl bg-slate-50 p-4">模型热度图将关注强度直接映射到 EEG/EOG 波形线条，而不是使用背景色块遮挡信号。</li>
            <li className="rounded-2xl bg-slate-50 p-4">时间轴以 30s epoch 展示，便于医生对齐睡眠分期和局部波形证据。</li>
            <li className="rounded-2xl bg-slate-50 p-4">该解释用于展示模型从多模态睡眠生理信号中提取证据的过程。</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

import { ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line } from 'recharts';
import Card from '../components/ui/Card';

const stageLabelMap = {
  1: 'REM',
  0: '清醒',
  '-1': 'N1',
  '-2': 'N2',
  '-3': 'N3',
};

export default function HypnogramChart({ data }) {
  return (
    <Card className="flex h-80 flex-col overflow-hidden">
      <div className="mb-3 flex shrink-0 items-center justify-between">
        <div>
          <h3 className="text-lg font-black text-slate-800">整夜睡眠结构图</h3>
          <p className="mt-1 text-sm text-slate-500">按 30 秒 Epoch 聚合后的睡眠分期轨迹</p>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 18, left: 4, bottom: 8 }}>
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              fontSize={11}
              height={26}
              tickMargin={8}
              interval="preserveStartEnd"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={11}
              width={42}
              ticks={[1, 0, -1, -2, -3]}
              tickFormatter={(value) => stageLabelMap[value]}
            />
            <Tooltip formatter={(value) => stageLabelMap[value]} />
            <Line type="stepAfter" dataKey="stage" stroke="#2563eb" strokeWidth={3} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

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
    <Card className="h-80">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-black text-slate-800">整夜睡眠结构图</h3>
          <p className="mt-1 text-sm text-slate-500">按 30 秒 Epoch 聚合后的睡眠分期轨迹</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="time" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={12}
            ticks={[1, 0, -1, -2, -3]}
            tickFormatter={(value) => stageLabelMap[value]}
          />
          <Tooltip formatter={(value) => stageLabelMap[value]} />
          <Line type="stepAfter" dataKey="stage" stroke="#2563eb" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

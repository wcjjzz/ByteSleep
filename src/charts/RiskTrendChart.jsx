import { ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from '../components/ui/Card';

export default function RiskTrendChart({ data }) {
  return (
    <Card className="h-80">
      <h3 className="mb-4 text-lg font-black text-slate-800">风险概率与睡眠效率趋势</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <XAxis dataKey="date" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip />
          <Line type="monotone" dataKey="risk" stroke="#e11d48" strokeWidth={3} />
          <Line type="monotone" dataKey="efficiency" stroke="#2563eb" strokeWidth={3} />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
}

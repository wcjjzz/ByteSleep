import { ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import Card from '../components/ui/Card';

export default function RiskTrendChart({ data }) {
  return (
    <Card className="flex h-80 flex-col overflow-hidden">
      <h3 className="mb-3 shrink-0 text-lg font-black text-slate-800">MCS 可能性与 CRS-R 趋势</h3>
      <div className="min-h-0 flex-1 overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 18, left: 0, bottom: 6 }}>
            <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} height={24} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} fontSize={11} width={34} />
            <Tooltip />
            <Legend verticalAlign="top" align="right" height={24} wrapperStyle={{ fontSize: 12, lineHeight: '20px' }} />
            <Line type="monotone" name="MCS可能性" dataKey="mcsProbability" stroke="#e11d48" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 4 }} isAnimationActive={false} />
            <Line type="monotone" name="CRS-R" dataKey="crsR" stroke="#2563eb" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 4 }} isAnimationActive={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

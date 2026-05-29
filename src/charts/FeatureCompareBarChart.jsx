import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from '../components/ui/Card';

export default function FeatureCompareBarChart({ data }) {
  return (
    <Card className="h-80">
      <h3 className="mb-4 text-lg font-black text-slate-800">核心特征基线对比</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="当前" fill="#2563eb" radius={[8, 8, 0, 0]} />
          <Bar dataKey="基线" fill="#94a3b8" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

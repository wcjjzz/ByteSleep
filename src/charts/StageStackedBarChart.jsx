import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from '../components/ui/Card';
import { STAGE_COLORS } from '../constants/stageColors';

export default function StageStackedBarChart({ data }) {
  return (
    <Card className="h-80">
      <h3 className="mb-4 text-lg font-black text-slate-800">睡眠阶段组成对比</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="date" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="WAKE" stackId="stage" fill={STAGE_COLORS.WAKE} />
          <Bar dataKey="REM" stackId="stage" fill={STAGE_COLORS.REM} />
          <Bar dataKey="N1" stackId="stage" fill={STAGE_COLORS.N1} />
          <Bar dataKey="N2" stackId="stage" fill={STAGE_COLORS.N2} />
          <Bar dataKey="N3" stackId="stage" fill={STAGE_COLORS.N3} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

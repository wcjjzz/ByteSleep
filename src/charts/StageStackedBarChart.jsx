import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from '../components/ui/Card';
import { STAGE_COLORS } from '../constants/stageColors';

export default function StageStackedBarChart({ data }) {
  return (
    <Card className="flex h-80 flex-col overflow-hidden">
      <h3 className="mb-3 shrink-0 text-lg font-black text-slate-800">睡眠阶段组成对比</h3>
      <div className="min-h-0 flex-1 overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 6 }} barCategoryGap="24%">
            <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} height={24} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} fontSize={11} width={34} />
            <Tooltip />
            <Legend verticalAlign="top" align="right" height={24} iconSize={8} wrapperStyle={{ fontSize: 11, lineHeight: '18px' }} />
            <Bar dataKey="WAKE" stackId="stage" fill={STAGE_COLORS.WAKE} isAnimationActive={false} />
            <Bar dataKey="REM" stackId="stage" fill={STAGE_COLORS.REM} isAnimationActive={false} />
            <Bar dataKey="N1" stackId="stage" fill={STAGE_COLORS.N1} isAnimationActive={false} />
            <Bar dataKey="N2" stackId="stage" fill={STAGE_COLORS.N2} isAnimationActive={false} />
            <Bar dataKey="N3" stackId="stage" fill={STAGE_COLORS.N3} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

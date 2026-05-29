import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import Card from '../components/ui/Card';
import { STAGE_COLORS } from '../constants/stageColors';

const pieData = [
  { name: 'WAKE', value: 12 },
  { name: 'REM', value: 20 },
  { name: 'N1', value: 8 },
  { name: 'N2', value: 42 },
  { name: 'N3', value: 18 },
];

export default function SleepStagePieChart() {
  return (
    <Card className="h-80">
      <h3 className="mb-4 text-lg font-black text-slate-800">阶段占比</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={65} outerRadius={95} paddingAngle={3}>
            {pieData.map((item) => (
              <Cell key={item.name} fill={STAGE_COLORS[item.name]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}

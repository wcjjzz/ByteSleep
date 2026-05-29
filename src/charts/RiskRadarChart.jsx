import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import Card from '../components/ui/Card';

const radarData = [
  { feature: 'REM潜伏期', score: 88 },
  { feature: '睡眠效率', score: 74 },
  { feature: 'N3占比', score: 63 },
  { feature: '觉醒次数', score: 67 },
  { feature: 'SOL', score: 47 },
  { feature: 'WASO', score: 44 },
];

export default function RiskRadarChart() {
  return (
    <Card className="h-96">
      <h3 className="mb-4 text-lg font-black text-slate-800">风险贡献雷达图</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="feature" fontSize={12} />
          <PolarRadiusAxis fontSize={11} />
          <Radar dataKey="score" fill="#2563eb" fillOpacity={0.25} stroke="#2563eb" strokeWidth={2} />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  );
}

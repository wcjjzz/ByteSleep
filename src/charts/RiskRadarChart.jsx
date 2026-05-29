import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import Card from '../components/ui/Card';

const radarData = [
  { feature: 'N3/SWS', score: 82 },
  { feature: 'REM', score: 78 },
  { feature: '阶段完整性', score: 74 },
  { feature: '纺锤波', score: 69 },
  { feature: '睡眠效率', score: 58 },
  { feature: '模态一致性', score: 64 },
];

export default function RiskRadarChart() {
  return (
    <Card className="h-96">
      <h3 className="mb-4 text-lg font-black text-slate-800">意识评估证据雷达图</h3>
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

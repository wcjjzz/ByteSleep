import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from '../components/ui/Card';

function shortLabel(value) {
  const labelMap = {
    CRS-R总分: 'CRS-R',
    MCS可能性: 'MCS',
    'N3/SWS占比': 'N3/SWS',
    REM时长: 'REM',
    纺锤波密度: '纺锤波',
  };
  return labelMap[value] || value;
}

export default function FeatureCompareBarChart({ data }) {
  return (
    <Card className="flex h-80 flex-col overflow-hidden">
      <h3 className="mb-3 shrink-0 text-lg font-black text-slate-800">康复核心指标基线对比</h3>
      <div className="min-h-0 flex-1 overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }} barCategoryGap="26%">
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              fontSize={11}
              height={32}
              tickMargin={8}
              interval={0}
              tickFormatter={shortLabel}
            />
            <YAxis tickLine={false} axisLine={false} fontSize={11} width={34} />
            <Tooltip />
            <Legend verticalAlign="top" align="right" height={24} iconSize={8} wrapperStyle={{ fontSize: 12, lineHeight: '20px' }} />
            <Bar dataKey="当前" fill="#2563eb" radius={[8, 8, 0, 0]} isAnimationActive={false} />
            <Bar dataKey="基线" fill="#94a3b8" radius={[8, 8, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceDot } from 'recharts';

const IncomeChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
        <defs>
            <linearGradient id="colorScenario1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
             <linearGradient id="colorCurrent" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
        <XAxis 
            dataKey="year" 
            stroke="#64748b" 
            tick={{fontSize: 12}} 
            tickLine={false}
            axisLine={false}
            label={{ value: 'Timeline (Years)', position: 'insideBottom', offset: -5, fill: '#475569', fontSize: 12 }}
        />
        <YAxis 
          stroke="#64748b" 
          tickFormatter={(value) => `₹₹{value}M`}
          tick={{fontSize: 12}}
          tickLine={false}
          axisLine={false}
          label={{ value: 'Net Worth', angle: -90, position: 'insideLeft', fill: '#475569', fontSize: 12 }}
        />
        
        <Tooltip content={<CustomTooltip />} />
        
        {/* Retirement Indication Line */}
        <ReferenceLine x={65} stroke="#3b82f6" strokeDasharray="3 3" label={{ position: 'top', value: 'Retirement (65)', fill: '#3b82f6', fontSize: 12 }} />

        {/* Indication Dot for Peak */}
        <ReferenceDot x={65} y={4.5} r={6} fill="#3b82f6" stroke="none" />

        <Line 
            type="monotone" 
            dataKey="current" 
            name="Current Plan"
            stroke="url(#colorCurrent)" 
            strokeWidth={3} 
            dot={{ r: 0 }} 
            activeDot={{ r: 6, strokeWidth: 0 }}
        />
        <Line 
            type="monotone" 
            dataKey="scenario1" 
            name="Optimized"
            stroke="url(#colorScenario1)" 
            strokeWidth={3} 
            dot={{ r: 0 }} 
            activeDot={{ r: 6, strokeWidth: 0 }}
            strokeDasharray="5 5"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1e293b] border border-slate-700 p-4 rounded-xl shadow-xl min-w-[200px]">
        <p className="text-slate-400 text-xs font-bold mb-2 uppercase">Age {label}</p>
        {payload.map((entry, index) => (
            <div key={index} className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium" style={{ color: entry.color }}>{entry.name}:</span>
                <span className="text-sm font-bold text-white">${entry.value}M</span>
            </div>
        ))}
         <div className="mt-3 pt-2 border-t border-slate-700/50">
            <div className="bg-primary-blue/20 text-primary-blue text-xs font-bold px-2 py-1 rounded inline-block">
                On Track
            </div>
         </div>
      </div>
    );
  }
  return null;
};

export default IncomeChart;

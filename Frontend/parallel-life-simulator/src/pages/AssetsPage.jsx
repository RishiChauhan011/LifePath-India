import Card from '../components/common/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, DollarSign, Briefcase } from 'lucide-react';

const AssetsPage = () => {
  const data = [
    { name: 'Real Estate', value: 400000, color: '#3b82f6' },
    { name: 'Stocks (Index)', value: 150000, color: '#10b981' },
    { name: 'Crypto', value: 25000, color: '#8b5cf6' },
    { name: 'Cash', value: 45000, color: '#94a3b8' },
  ];

  return (
    <div className="min-h-screen bg-app-bg p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Asset Allocation</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Asset Breakdown Chart */}
            <Card className="md:col-span-1 bg-card-bg border-slate-700 min-h-[400px]">
                <h3 className="text-lg font-bold text-white mb-4">Total Portfolio</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie 
                                data={data} 
                                innerRadius={60} 
                                outerRadius={80} 
                                paddingAngle={5} 
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-₹{index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                    {data.map((item) => (
                        <div key={item.name} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2 text-text-secondary">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                {item.name}
                            </div>
                            <span className="text-white font-mono">₹{item.value.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Asset List */}
            <div className="md:col-span-2 space-y-6">
                {['Primary Residence', 'Vanguard Total Stock Market', 'Bitcoin Holdings'].map((asset, i) => (
                    <Card key={i} className="bg-card-bg border-slate-700 flex justify-between items-center hover:border-primary-blue/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                                {i === 0 ? <HomeIcon /> : i === 1 ? <Briefcase size={20}/> : <DollarSign size={20}/>}
                            </div>
                            <div>
                                <h4 className="font-bold text-white">{asset}</h4>
                                <p className="text-xs text-text-secondary">Last updated: Today</p>
                            </div>
                        </div>
                        <div className="text-right">
                             <div className="text-lg font-bold text-white">₹{(100000 * (i+1)).toLocaleString()}</div>
                             <div className="text-xs text-success flex items-center justify-end gap-1">
                                <TrendingUp size={12} /> +{(i+2.4).toFixed(1)}%
                             </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

const HomeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);

export default AssetsPage;

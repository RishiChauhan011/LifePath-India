import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, Download, TrendingUp, Shield, Award, Edit, Plus, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Slider from '../components/common/Slider';
import IncomeChart from '../components/results/IncomeChart';

const ResultsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-app-bg p-8 font-sans">
      <div className="max-w-[1600px] mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-1">Impact Analysis Dashboard</h1>
                <p className="text-text-secondary text-sm">Comparing <span className="text-primary-blue font-medium">Scenario A (Current Plan)</span> vs <span className="text-primary-green font-medium">Scenario B (Optimized)</span></p>
            </div>
            <div className="flex gap-3">
                <Button 
                    variant="secondary" 
                    className="bg-slate-800 text-white border border-slate-700 flex items-center gap-2"
                    onClick={() => navigate('/scenarios')}
                >
                    <Edit size={16} /> Edit Scenarios
                </Button>
                <Button 
                    className="bg-primary-blue flex items-center gap-2 shadow-glow"
                    onClick={() => navigate('/profile-setup')}
                >
                    <Plus size={16} /> New Simulation
                </Button>
            </div>
        </div>

        {/* TOP KPI CARDS */}
        <div className="grid grid-cols-4 gap-6 mb-8">
             <KpiCard 
                title="NET WORTH AT 65" 
                value="₹3,420,000" 
                change="+15.2% vs Scenario A" 
                color="green" 
                icon={TrendingUp} 
            />
             <KpiCard 
                title="MONTHLY CASH FLOW" 
                value="₹14,250" 
                change="+₹1,750 monthly increase" 
                color="blue" 
                icon={TrendingUp} 
            />
             <KpiCard 
                title="SUCCESS PROBABILITY" 
                value="96.4%" 
                change="+4.2% confidence score" 
                color="green" 
                icon={Shield} 
            />
             <KpiCard 
                title="TAX OPTIMIZATION" 
                value="₹412,000" 
                change="8.5% Eff. lifetime savings" 
                color="blue" 
                icon={Award} 
            />
        </div>

        {/* MAIN SPLIT VIEW */}
        <div className="grid grid-cols-12 gap-8 mb-8">
            
            {/* LEFT: MAIN CHART (8 Cols) */}
            <div className="col-span-8">
                <Card className="h-full bg-card-bg border border-slate-700 p-0 overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-700/50 flex justify-between items-start">
                        <div>
                             <h3 className="font-bold text-white text-lg">Wealth Accumulation & Drawdown</h3>
                             <p className="text-text-secondary text-xs">Long-term projection comparison from age 30 to 90</p>
                        </div>
                        <div className="bg-slate-800 rounded-lg p-2 flex text-xs gap-4">
                             <div>
                                <span className="text-slate-400 block mb-1">AGE 65 - RETIREMENT</span>
                                <div className="flex items-center gap-2">
                                     <div className="w-2 h-2 rounded-full bg-primary-blue" />
                                     <span className="text-white font-mono">₹2.84M</span>
                                </div>
                                <div className="flex items-center gap-2">
                                     <div className="w-2 h-2 rounded-full bg-primary-green" />
                                     <span className="text-white font-mono">₹3.42M</span>
                                </div>
                             </div>
                        </div>
                    </div>
                    
                    <div className="flex-1 p-6 min-h-[400px]">
                         <IncomeChart 
                            data={[
                                { year: 30, current: 0.5, scenario1: 0.5 },
                                { year: 40, current: 1.5, scenario1: 1.8 },
                                { year: 50, current: 2.8, scenario1: 3.5 },
                                { year: 65, current: 4.5, scenario1: 6.2 },
                                { year: 75, current: 3.5, scenario1: 5.8 },
                                { year: 90, current: 2.0, scenario1: 4.5 },
                            ]} 
                        />
                    </div>

                    <div className="p-4 border-t border-slate-700/50 flex justify-between px-12 text-xs text-slate-500 font-mono">
                        <span>AGE 30</span>
                        <span>40</span>
                        <span>50</span>
                        <span className="text-primary-blue bg-primary-blue/10 px-2 rounded">65 (TARGET)</span>
                        <span>75</span>
                        <span>90</span>
                    </div>
                </Card>
            </div>

            {/* RIGHT: INSIGHTS PANEL (4 Cols) */}
            <div className="col-span-4 space-y-6">
                
                {/* Blue Optimization Box */}
                <div className="bg-gradient-to-br from-[#1e3a8a] to-[#172554] rounded-xl p-6 border border-blue-800 relative overflow-hidden">
                     <div className="flex items-center gap-2 mb-4 text-blue-200">
                         <Award size={20} />
                         <span className="font-bold">Optimization Insights</span>
                     </div>
                     <p className="text-sm text-blue-100/80 leading-relaxed mb-6">
                         By reallocating your <span className="text-white font-bold">401k surplus</span> into tax-efficient index funds (Scenario B), you could potentially retire <span className="text-success font-bold">3 years earlier</span> with a 12% higher liquidity margin.
                     </p>
                     <Button className="w-full bg-primary-blue hover:bg-blue-600 border-none shadow-lg">
                         Apply All Suggestions
                     </Button>
                </div>

                {/* Simulation Variables */}
                <Card className="bg-card-bg border border-slate-700 p-6">
                    <h3 className="font-bold text-white mb-6">Simulation Variables</h3>
                    <div className="space-y-6">
                        <div className="flex justify-between text-xs text-white mb-1">
                            <span>Inflation Rate</span>
                            <span>3.2%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full mb-4">
                            <div className="h-full w-[40%] bg-primary-blue rounded-full" />
                        </div>

                         <div className="flex justify-between text-xs text-white mb-1">
                            <span>Equity Returns</span>
                            <span>7.5%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full mb-4">
                             <div className="h-full w-[70%] bg-primary-blue rounded-full" />
                        </div>

                        <div className="flex justify-between text-xs text-white mb-1">
                            <span>Annual Contribution</span>
                            <span>₹24,000</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full mb-6">
                             <div className="h-full w-[60%] bg-primary-blue rounded-full" />
                        </div>

                        <Button variant="outline" className="w-full text-xs py-2 border-slate-700 text-slate-400 hover:text-white">
                            Reset to Defaults
                        </Button>
                    </div>
                </Card>

                {/* Key Improvements */}
                <Card className="bg-card-bg border border-slate-700 p-6">
                    <h3 className="font-bold text-white mb-4">Key Improvements</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-xs text-slate-300">
                            <CheckCircle2 size={16} className="text-success" /> Roth Conversion Strategy
                        </li>
                        <li className="flex items-center gap-3 text-xs text-slate-300">
                            <CheckCircle2 size={16} className="text-success" /> Aggressive Debt Snowball
                        </li>
                         <li className="flex items-center gap-3 text-xs text-slate-500">
                            <div className="w-4 h-4 rounded-full bg-slate-800" /> Downsizing Primary Res (Age 65)
                        </li>
                    </ul>
                </Card>
            </div>
        </div>

        {/* BOTTOM: CASH FLOW SUMMARY */}
        <Card className="bg-card-bg border border-slate-700 p-0">
             <div className="p-4 border-b border-slate-700/50 flex justify-between items-center">
                 <h3 className="font-bold text-white">Annual Cash Flow Summary</h3>
                 <span className="text-xs text-primary-blue cursor-pointer flex items-center gap-1">View Full Ledger <ArrowRight size={12}/></span>
             </div>
             <div className="p-4">
                 <div className="grid grid-cols-12 text-xs text-slate-500 uppercase font-bold mb-3 px-4">
                     <div className="col-span-4">Timeline</div>
                     <div className="col-span-2">Scenario A Net</div>
                     <div className="col-span-2">Scenario B Net</div>
                     <div className="col-span-2">Annual Delta</div>
                     <div className="col-span-2 text-right">Impact Score</div>
                 </div>
                 {[
                     { label: 'Ages 30-45 (Accumulation)', a: '₹84,500', b: '₹92,300', delta: '+₹7,800', score: 'STABLE', scoreColor: 'bg-blue-900/50 text-blue-400' },
                     { label: 'Ages 46-64 (Peak Earnings)', a: '₹158,000', b: '₹189,400', delta: '+₹33,400', score: 'OPTIMIZED', scoreColor: 'bg-green-900/50 text-green-400' },
                     { label: 'Age 65+ (Drawdown)', a: '₹112,000', b: '₹125,500', delta: '+₹13,500', score: 'MAXIMIZED', scoreColor: 'bg-green-900/50 text-green-400' },
                 ].map((row, i) => (
                    <div key={i} className="grid grid-cols-12 text-sm text-white py-4 px-4 border-t border-slate-800/50 hover:bg-slate-800/30 transition-colors cursor-pointer items-center">
                         <div className="col-span-4 font-bold">{row.label}</div>
                         <div className="col-span-2 text-slate-300">{row.a}</div>
                         <div className="col-span-2 text-green-400 font-bold">{row.b}</div>
                         <div className="col-span-2 text-white">{row.delta}</div>
                         <div className="col-span-2 flex justify-end">
                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${row.scoreColor}`}>{row.score}</span>
                         </div>
                    </div>
                 ))}
             </div>
        </Card>
      </div>
    </div>
  );
};

const KpiCard = ({ title, value, change, color, icon: Icon }) => (
    <Card className={`bg-card-bg border border-slate-700 p-6 border-t-4 relative overflow-hidden ${color === 'green' ? 'border-t-primary-green' : 'border-t-primary-blue'}`}>
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Icon size={80} className="text-white" />
        </div>
        <h3 className="text-xs font-bold text-text-secondary tracking-wider uppercase mb-3">{title}</h3>
        <div className="text-3xl font-bold text-white mb-2">{value}</div>
        <div className={`text-xs font-bold ${color === 'green' ? 'text-success' : 'text-primary-blue'}`}>
            {change}
        </div>
    </Card>
);

export default ResultsPage;

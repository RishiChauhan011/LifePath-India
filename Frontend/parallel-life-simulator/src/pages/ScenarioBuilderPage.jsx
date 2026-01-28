import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Bell, User, Search, Save, Settings2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Slider from '../components/common/Slider';
import IncomeChart from '../components/results/IncomeChart';
import QoLRadarChart from '../components/results/RadarChart';
import RiskAnalysis from '../components/results/RiskAnalysis';

const ScenarioBuilderPage = () => {
  const navigate = useNavigate();
  
  // State for Input Variables
  const [savings, setSavings] = useState(45000);
  const [risk, setRisk] = useState('Aggressive');
  const [retireAge, setRetireAge] = useState(62);
  const [inflation, setInflation] = useState(2.4);
  const [activeTab, setActiveTab] = useState('networth');

  const qolData = [
      { subject: 'Wealth', A: 8, B: 9, fullMark: 10 },
      { subject: 'Health', A: 7, B: 7, fullMark: 10 },
      { subject: 'Time', A: 4, B: 8, fullMark: 10 },
      { subject: 'Purpose', A: 6, B: 7, fullMark: 10 },
      { subject: 'Security', A: 8, B: 9, fullMark: 10 },
  ];

  return (
    <div className="h-[calc(100vh-64px)] flex overflow-hidden bg-app-bg">
      
      {/* LEFT SIDEBAR - INPUT VARIABLES */}
      <div className="w-80 bg-app-bg border-r border-slate-800 flex flex-col p-6 overflow-y-auto">
        {/* ... Sidebar Content ... */}
        <div className="flex items-center gap-2 mb-8 text-white">
            <Settings2 size={20} className="text-primary-blue" />
            <h2 className="font-bold text-lg">Input Variables</h2>
        </div>

        <div className="space-y-8">
            <Slider 
                label="Annual Savings" 
                value={savings} 
                min={0} max={100000} step={1000} 
                onChange={setSavings}
                formatValue={(v) => `₹₹{v.toLocaleString()}`}
            />

            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-text-secondary">Investment Risk</label>
                    <span className="text-sm font-bold text-primary-blue">{risk}</span>
                </div>
                <div className="flex bg-slate-800 p-1 rounded-lg">
                    {['Conservative', 'Moderate', 'Aggressive'].map((r) => (
                        <button
                            key={r}
                            onClick={() => setRisk(r)}
                            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ₹{
                                risk === r ? 'bg-slate-600 text-white shadow-sm' : 'text-text-secondary hover:text-white'
                            }`}
                        >
                            {r === 'Conservative' ? 'LOW' : r === 'Moderate' ? 'MED' : 'HIGH'}
                        </button>
                    ))}
                </div>
            </div>

            <Slider 
                label="Retirement Age" 
                value={retireAge} 
                min={50} max={80} 
                onChange={setRetireAge}
            />

            <Slider 
                label="Inflation Adjust." 
                value={inflation} 
                min={0} max={10} step={0.1} 
                onChange={setInflation}
                unit="%"
            />
        </div>

        <div className="mt-12">
            <div className="flex items-center gap-2 mb-4 text-text-secondary uppercase text-xs font-bold tracking-wider">
                <span className="w-4 h-4 rounded border border-text-secondary flex items-center justify-center pt-0.5">↺</span>
                Scenarios
            </div>
            
            <div className="space-y-2">
                <div className="p-3 bg-primary-blue/10 border border-primary-blue rounded-lg text-white text-sm font-medium flex items-center gap-3 cursor-pointer">
                    <div className="w-2 h-2 bg-primary-blue rounded-full" />
                    Aggressive Early
                </div>
                <div className="p-3 hover:bg-slate-800 border border-transparent rounded-lg text-text-secondary text-sm font-medium flex items-center gap-3 cursor-pointer">
                    <div className="w-2 h-2 bg-slate-600 rounded-full" />
                    Conservative Baseline
                </div>
            </div>
        </div>

        <div className="mt-auto pt-6">
            <Button onClick={() => navigate('/processing')} className="w-full py-4 text-base font-bold shadow-glow">
                <Play fill="currentColor" size={16} className="mr-2" /> RUN SIMULATION
            </Button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0B101A]"> {/* Darker bg for chart area */}
        
        {/* Top Bar */}
        <div className="h-16 border-b border-slate-800 flex items-center justify-between px-8">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
                <span>Workspaces</span>
                <span>/</span>
                <span className="text-white font-medium">Retirement Plan 2024</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                    <input className="bg-slate-800 border border-transparent focus:border-slate-600 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 w-64 outline-none" placeholder="Search parameters..." />
                </div>
                <Button className="bg-primary-blue hover:bg-blue-600 text-white px-4 py-2 text-sm rounded-lg shadow-glow">
                    Save Scenario
                </Button>
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-colors">
                    <Bell size={20} />
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-colors">
                    <User size={20} />
                </div>
            </div>
        </div>

        <div className="p-8 overflow-y-auto">
            {/* KPI ROW */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <Card className="bg-card-bg border border-slate-700 p-6">
                    <h3 className="text-xs font-bold text-text-secondary tracking-wider uppercase mb-2">Net Worth at 65</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white">$4,250,000</span>
                        <span className="text-success font-bold text-sm">+12.5%</span>
                    </div>
                </Card>
                 <Card className="bg-card-bg border border-slate-700 p-6">
                    <h3 className="text-xs font-bold text-text-secondary tracking-wider uppercase mb-2">Success Probability</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white">92%</span>
                        <span className="text-success font-bold text-sm">+2.1%</span>
                    </div>
                </Card>
                 <Card className="bg-card-bg border border-slate-700 p-6">
                    <h3 className="text-xs font-bold text-text-secondary tracking-wider uppercase mb-2">Est. Monthly Income</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white">$12,500</span>
                        <span className="text-error font-bold text-sm">-0.5%</span>
                    </div>
                </Card>
            </div>

            {/* CHART AREA WITH TABS */}
            <Card className="bg-card-bg border border-slate-700 p-8 min-h-[500px]">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <div className="flex space-x-4">
                            {['Net Worth', 'Quality of Life', 'Risk Analysis'].map((tab) => {
                                const id = tab.toLowerCase().replace(/ /g, '');
                                const active = (id === activeTab) || (id === 'riskanalysis' && activeTab === 'risk');
                                const realId = id === 'riskanalysis' ? 'risk' : id;

                                return (
                                    <button 
                                        key={id}
                                        onClick={() => setActiveTab(realId)}
                                        className={`pb-2 px-1 text-sm font-bold transition-all border-b-2 ${
                                            active
                                                ? 'text-primary-blue border-primary-blue' 
                                                : 'text-text-secondary border-transparent hover:text-white'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                         <div className="flex items-center gap-2">
                             <div className="w-3 h-3 rounded-full bg-primary-blue shadow-[0_0_8px_#2563eb]" />
                             <span className="text-sm text-white">Current Scenario</span>
                         </div>
                         <div className="flex items-center gap-2">
                             <div className="w-3 h-3 rounded-full bg-slate-600" />
                             <span className="text-sm text-text-secondary">Base Case</span>
                         </div>
                    </div>
                </div>

                <div className="h-[400px]">
                    {activeTab === 'networth' && (
                        <IncomeChart 
                            data={[
                                { year: '2024', current: 0, scenario1: 0 },
                                { year: '2034', current: 0.8, scenario1: 0.5 },
                                { year: '2044', current: 2.8, scenario1: 1.5 },
                                { year: '2054', current: 5.2, scenario1: 2.2 },
                                { year: '2064', current: 7.5, scenario1: 2.5 },
                            ]} 
                        />
                    )}

                    {activeTab === 'qualityoflife' && (
                        <QoLRadarChart data={qolData} />
                    )}

                    {activeTab === 'risk' && (
                        <RiskAnalysis />
                    )}
                </div>
            </Card>

        </div>
      </div>
    </div>
  );
};

export default ScenarioBuilderPage;

import Card from '../common/Card';
import { AlertTriangle, ShieldCheck, TrendingDown } from 'lucide-react';

const RiskAnalysis = () => {
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="grid grid-cols-3 gap-8 mb-8">
        {/* Market Risk */}
        <div className="text-center">
             <div className="relative w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="#1e293b" strokeWidth="12" fill="none" />
                    <circle cx="64" cy="64" r="56" stroke="#ef4444" strokeWidth="12" fill="none" strokeDasharray="351" strokeDashoffset="100" className="transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <span className="text-2xl font-bold">High</span>
                    <span className="text-xs text-text-secondary">Market Risk</span>
                </div>
             </div>
             <p className="text-xs text-text-secondary px-4">Portfolio heavily weighted in equities. High volatility expected.</p>
        </div>

        {/* Inflation Risk */}
        <div className="text-center">
             <div className="relative w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="#1e293b" strokeWidth="12" fill="none" />
                    <circle cx="64" cy="64" r="56" stroke="#eab308" strokeWidth="12" fill="none" strokeDasharray="351" strokeDashoffset="200" className="transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <span className="text-2xl font-bold">Med</span>
                    <span className="text-xs text-text-secondary">Inflation</span>
                </div>
             </div>
             <p className="text-xs text-text-secondary px-4">Purchasing power projected to decrease by 40% over 30 years.</p>
        </div>

        {/* Longevity Risk */}
        <div className="text-center">
             <div className="relative w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="#1e293b" strokeWidth="12" fill="none" />
                    <circle cx="64" cy="64" r="56" stroke="#10b981" strokeWidth="12" fill="none" strokeDasharray="351" strokeDashoffset="280" className="transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <span className="text-2xl font-bold">Low</span>
                    <span className="text-xs text-text-secondary">Longevity</span>
                </div>
             </div>
             <p className="text-xs text-text-secondary px-4">Assets likely to outlast life expectancy by 12+ years.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-slate-800/50 border border-slate-700 p-4 flex items-start gap-4">
            <div className="bg-red-500/10 p-2 rounded-lg text-red-500">
                <TrendingDown size={20} />
            </div>
            <div>
                <h4 className="text-white font-bold text-sm">Worst Case Scenario</h4>
                <p className="text-xs text-text-secondary mt-1">
                    In a prolonged recession (2008 style), your portfolio could drawdown <span className="text-red-400 font-bold">-35%</span> within 2 years.
                </p>
            </div>
        </Card>
         <Card className="bg-slate-800/50 border border-slate-700 p-4 flex items-start gap-4">
            <div className="bg-green-500/10 p-2 rounded-lg text-green-500">
                <ShieldCheck size={20} />
            </div>
            <div>
                <h4 className="text-white font-bold text-sm">Diversification Score</h4>
                <p className="text-xs text-text-secondary mt-1">
                    Your portfolio is <span className="text-green-400 font-bold">Well Diversified</span> across 4 asset classes, reducing single-point failure risk.
                </p>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default RiskAnalysis;

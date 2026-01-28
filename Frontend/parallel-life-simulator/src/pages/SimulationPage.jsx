import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers, Zap } from 'lucide-react';
import Card from '../components/common/Card';

const SimulationPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setProgress(prev => {
            if (prev >= 100) return 100;
            return prev + 1;
        });
    }, 40); // 4 seconds total

    const timeout = setTimeout(() => {
      navigate('/results/Sim-12345');
    }, 4500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-app-bg text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
       {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-blue/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary-purple/5 rounded-full blur-[100px]" />

      <div className="z-10 w-full max-w-lg">
         {/* Center Icon Animation */}
         <div className="flex justify-center mb-16">
            <div className="relative w-32 h-32 flex items-center justify-center">
                <motion.div 
                    className="absolute inset-0 rounded-full border border-primary-blue/30"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                    className="absolute inset-4 rounded-full border border-primary-purple/30"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <div className="w-20 h-20 bg-card-bg rounded-2xl flex items-center justify-center shadow-glow border border-primary-blue/50">
                    <Layers className="text-primary-blue" size={40} />
                </div>
            </div>
         </div>

        {/* Progress Card */}
        <Card className="border-t-primary-blue/50">
           <div className="flex justify-between items-end mb-4">
              <div>
                  <h3 className="text-lg font-bold mb-1">Processing market volatility scenarios...</h3>
                  <p className="text-sm text-text-secondary">Step 3 of 5: Risk Assessment & Monte Carlo Pathing</p>
              </div>
              <div className="text-4xl font-bold font-mono text-white">
                  {progress}%
              </div>
           </div>

           <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
               <motion.div 
                  className="h-full bg-gradient-to-r from-primary-blue to-primary-purple"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
               />
           </div>
        </Card>

        {/* Tip */}
        <div className="mt-8 bg-card-bg/50 border border-slate-800 rounded-xl p-4 flex gap-4 items-start">
             <div className="p-2 bg-primary-blue/20 rounded-lg text-primary-blue">
                 <Zap size={20} />
             </div>
             <div>
                 <h4 className="font-semibold text-sm text-white mb-1">Pro Tip: Diversification reduces volatility</h4>
                 <p className="text-xs text-text-secondary leading-relaxed">
                     Our models run 10,000 simulations using historical market data adjusted for your selected inflation parameters.
                 </p>
             </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationPage;

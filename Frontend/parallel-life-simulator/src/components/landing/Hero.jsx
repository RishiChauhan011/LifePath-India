import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, TrendingUp, Users } from 'lucide-react';
import Button from '../common/Button';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-app-bg min-h-screen">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-primary-blue/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -left-1/4 w-[800px] h-[800px] bg-primary-purple/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Test Life Decisions <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-purple">
                Before You Live Them
              </span>
            </h1>
            <p className="mt-6 text-xl text-text-secondary leading-relaxed mb-10">
              Simulate parallel timelines based on your choices. Explore how education, 
              career, and location pivots impact your wealth, happiness, and future.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                onClick={() => navigate('/register')} 
                className="px-8 py-4 text-lg shadow-glow flex items-center gap-2"
              >
                Start Simulation <ArrowRight size={20} />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="px-8 py-4 text-lg"
              >
                Existing User
              </Button>
            </div>
          </motion.div>

          {/* Feature Snippets */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
          >
            <div className="bg-card-bg/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 shadow-lg hover:shadow-glow transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary-blue/10 text-primary-blue rounded-xl flex items-center justify-center mb-4">
                <Activity size={24} />
              </div>
              <h3 className="font-semibold text-lg text-white mb-2">AI Predictions</h3>
              <p className="text-text-secondary">Data-backed forecasting for income, stability, and lifestyle metrics.</p>
            </div>
            
            <div className="bg-card-bg/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 shadow-lg hover:shadow-glow transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary-purple/10 text-primary-purple rounded-xl flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h3 className="font-semibold text-lg text-white mb-2">Social Comparison</h3>
              <p className="text-text-secondary">Benchmark your path against realistic career trajectories.</p>
            </div>

            <div className="bg-card-bg/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 shadow-lg hover:shadow-glow transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary-green/10 text-primary-green rounded-xl flex items-center justify-center mb-4">
                <TrendingUp size={24} />
              </div>
              <h3 className="font-semibold text-lg text-white mb-2">Visual Insights</h3>
              <p className="text-text-secondary">Stunning charts and graphs to visualize your potential futures.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

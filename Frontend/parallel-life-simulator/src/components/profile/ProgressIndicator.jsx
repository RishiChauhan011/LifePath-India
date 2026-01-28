import { motion } from 'framer-motion';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full">
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary-blue shadow-[0_0_10px_rgba(37,99,235,0.5)]"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: 0.5, ease: "circOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const GoalCard = ({ icon: Icon, title, description, isSelected, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all h-full flex flex-col items-start text-left ${
        isSelected
          ? 'bg-primary-blue/10 border-primary-blue shadow-glow'
          : 'bg-card-bg border-slate-700 hover:border-slate-600'
      }`}
    >
      <div className={`p-3 rounded-xl mb-4 ${isSelected ? 'bg-primary-blue text-white' : 'bg-slate-800 text-text-secondary'}`}>
        <Icon size={24} />
      </div>
      
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{description}</p>

      {isSelected && (
        <div className="absolute top-4 right-4 text-primary-blue">
          <CheckCircle2 size={24} fill="currentColor" className="text-white" />
        </div>
      )}
    </motion.div>
  );
};

export default GoalCard;

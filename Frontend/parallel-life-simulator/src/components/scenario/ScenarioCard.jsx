import { Trash2, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

const ScenarioCard = ({ scenario, isActive, onClick, onDelete, onDuplicate }) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`p-4 rounded-xl border cursor-pointer transition-all group relative ${
        isActive
          ? 'bg-primary-blue/10 border-primary-blue shadow-glow'
          : 'bg-app-bg border-slate-800 hover:border-slate-600'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-semibold truncate pr-8 ${isActive ? 'text-primary-blue' : 'text-white'}`}>
          {scenario.name}
        </h3>
        {isActive && <div className="w-2 h-2 rounded-full bg-primary-blue shadow-[0_0_5px_#2563eb]" />}
      </div>
      
      <div className="text-xs space-y-1.5 text-text-secondary">
        <div className="flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
             {scenario.education || 'No Change'}
        </div>
        <div className="flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
             {scenario.career || 'Current Path'}
        </div>
      </div>

      <div className={`absolute right-2 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
        <button
          onClick={(e) => { e.stopPropagation(); onDuplicate(scenario.id); }}
          className="p-1.5 hover:bg-slate-700 rounded-lg text-text-secondary hover:text-white"
          title="Duplicate"
        >
          <Copy size={14} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(scenario.id); }}
          className="p-1.5 hover:bg-red-500/20 rounded-lg text-text-secondary hover:text-red-400"
          title="Delete"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </motion.div>
  );
};

export default ScenarioCard;

import { useState } from 'react';
import { Moon, Home, GraduationCap, TrendingUp } from 'lucide-react';
import GoalCard from './GoalCard';
import { motion } from 'framer-motion';

const GoalSelectionStep = ({ data, updateData }) => {
  const goals = [
    {
      id: 'retirement',
      title: 'Retirement',
      description: 'Plan for a comfortable and secure long-term future.',
      icon: Moon
    },
    {
      id: 'home',
      title: 'Home Ownership',
      description: 'Saving for a down payment or upgrading your current living space.',
      icon: Home
    },
    {
      id: 'education',
      title: 'Education',
      description: 'Funding for higher education for yourself or your dependents.',
      icon: GraduationCap
    },
    {
      id: 'wealth',
      title: 'Wealth Building',
      description: 'General investment strategies and portfolio growth goals.',
      icon: TrendingUp
    }
  ];

  const toggleGoal = (id) => {
    const currentGoals = data.goals || [];
    const newGoals = currentGoals.includes(id)
      ? currentGoals.filter(g => g !== id)
      : [...currentGoals, id];
    updateData({ goals: newGoals });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">What are your primary life goals?</h2>
        <p className="text-text-secondary">Select the milestones you want to plan for. This helps us build high-fidelity simulations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => (
            <GoalCard
                key={goal.id}
                icon={goal.icon}
                title={goal.title}
                description={goal.description}
                isSelected={(data.goals || []).includes(goal.id)}
                onClick={() => toggleGoal(goal.id)}
            />
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-900/20 border border-blue-900/50 rounded-lg flex gap-3 text-sm text-blue-200">
        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold shrink-0">i</div>
        <p>You can change these goals at any time from your simulation settings. We use these to prioritize visuals.</p>
      </div>
    </motion.div>
  );
};

export default GoalSelectionStep;

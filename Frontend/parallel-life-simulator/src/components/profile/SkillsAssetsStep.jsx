import { useFormContext } from 'react-hook-form';
import Input from '../common/Input';
import { motion } from 'framer-motion';

const SkillsAssetsStep = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white">Skills & Assets</h2>
        <p className="text-text-secondary mt-2">Final details to complete your profile baseline.</p>
      </div>

      {/* Skills Section */}
      <div className="bg-card-bg border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Key Skills</h3>
          <Input
            label="Top Skills (Comma separated)"
            placeholder="e.g. Project Management, Python, Public Speaking"
            {...register('skills')}
            className="mb-0"
          />
          <p className="text-xs text-text-secondary mt-2">We use these to suggest career pivots.</p>
      </div>

      {/* Assets Section */}
      <div className="bg-card-bg border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Current Financial Assets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
                label="Total Savings (Cash)"
                type="number"
                placeholder="25000"
                {...register('assets.savings')}
            />
            <Input
                label="Investments (Stocks/Bonds)"
                type="number"
                placeholder="50000"
                {...register('assets.investments')}
            />
             <Input
                label="Real Estate Equity"
                type="number"
                placeholder="0"
                {...register('assets.realEstate')}
            />
             <Input
                label="Total Debt"
                type="number"
                placeholder="10000"
                {...register('assets.debt')}
            />
          </div>
      </div>
    </motion.div>
  );
};

export default SkillsAssetsStep;

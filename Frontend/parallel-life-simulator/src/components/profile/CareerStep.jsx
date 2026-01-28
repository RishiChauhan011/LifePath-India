import { useFormContext } from 'react-hook-form';
import Input from '../common/Input';
import { motion } from 'framer-motion';

const CareerStep = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white">Career Details</h2>
        <p className="text-text-secondary mt-2">Your current career trajectory helps us model future income.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
            <Input
            label="Current Job Title"
            placeholder="e.g. Senior Software Engineer"
            {...register('career.title')}
            error={errors?.career?.title?.message}
            />
        </div>

        <div>
             <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Industry
            </label>
            <select
              {...register('career.industry')}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-800 focus:ring-2 focus:ring-primary-blue/20 outline-none text-white transition-all focus:border-primary-blue"
            >
              <option value="">Select...</option>
              <option value="tech">Technology</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="other">Other</option>
            </select>
        </div>

        <Input
          label="Years of Experience"
          type="number"
          placeholder="5"
          {...register('career.experience')}
          error={errors?.career?.experience?.message}
        />

        <Input
          label="Current Annual Income"
          type="number"
          placeholder="1500000"
          {...register('career.income')}
          error={errors?.career?.income?.message}
        />
        
        <Input
          label="Target Income (Age 40)"
          type="number"
          placeholder="2500000"
          {...register('career.targetIncome')}
          error={errors?.career?.targetIncome?.message}
        />
      </div>
    </motion.div>
  );
};

export default CareerStep;

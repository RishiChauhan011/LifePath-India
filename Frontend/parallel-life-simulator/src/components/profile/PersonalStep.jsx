import { useFormContext } from 'react-hook-form';
import Input from '../common/Input';
import { motion } from 'framer-motion';

const PersonalStep = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white">Tell us about yourself</h2>
        <p className="text-text-secondary mt-2">Let's start with the basics to calibrate your timeline.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Input
          label="Full Name"
          placeholder="Ex. Rishi Kumar"
          {...register('fullName')}
          error={errors.fullName?.message}
        />

        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Age"
            type="number"
            placeholder="24"
            {...register('age')}
            error={errors.age?.message}
          />
          
          <div>
             <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Gender
            </label>
            <select
              {...register('gender')}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-800 focus:ring-2 focus:ring-primary-blue/20 outline-none text-white transition-all focus:border-primary-blue"
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            Current Location
          </label>
          <div className="grid grid-cols-3 gap-3">
             {['Urban', 'Semi-Urban', 'Rural'].map((loc) => (
                <label key={loc} className="cursor-pointer">
                  <input
                    type="radio"
                    value={loc.toLowerCase()}
                    {...register('locationType')}
                    className="peer sr-only"
                  />
                  <div className="text-center py-2 px-3 rounded-lg border border-slate-700 bg-card-bg text-text-secondary peer-checked:bg-primary-blue peer-checked:border-primary-blue peer-checked:text-white transition-all hover:bg-slate-800">
                    {loc}
                  </div>
                </label>
             ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalStep;

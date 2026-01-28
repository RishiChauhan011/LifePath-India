import { useFormContext } from 'react-hook-form';
import Input from '../common/Input';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { X, Plus } from 'lucide-react';

const SkillsStep = () => {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const [skillInput, setSkillInput] = useState('');
  const skills = watch('skills') || [];

  const addSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setValue('skills', [...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setValue('skills', skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addSkill(e);
    }
  };

  return (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-dark">Skills & Expertise</h2>
         <p className="text-secondary-gray mt-2">What sets you apart?</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary-gray mb-1.5">
            Key Skills
          </label>
          <div className="flex gap-2">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type and press Enter (e.g. Photoshop, Python)"
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-blue/20 outline-none"
            />
            <button 
                type="button"
                onClick={addSkill}
                className="bg-secondary-light text-primary-blue p-2.5 rounded-lg hover:bg-blue-50 border border-transparent hover:border-primary-blue/20 transition-all"
            >
                <Plus size={20} />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4 min-h-[50px] p-4 bg-secondary-light/30 rounded-xl border border-dashed border-gray-300">
            {skills.length === 0 && (
                <span className="text-gray-400 text-sm">No skills added yet</span>
            )}
            {skills.map((skill) => (
              <span key={skill} className="flex items-center gap-1.5 bg-white border border-gray-200 text-dark px-3 py-1 rounded-full text-sm shadow-sm">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-gray-400 hover:text-error transition-colors"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        <Input
          label="Certifications Count"
          type="number"
          {...register('certificationsCount')}
        />
      </div>
    </motion.div>
  );
};

export default SkillsStep;

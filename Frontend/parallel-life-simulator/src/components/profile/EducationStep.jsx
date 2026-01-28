import { useFormContext, useFieldArray } from 'react-hook-form';
import Input from '../common/Input';
import Button from '../common/Button';
import { motion } from 'framer-motion';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

const EducationStep = () => {
  const { register, control, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education"
  });

  // Initialize with one field if empty
  if (fields.length === 0) {
    append({ degree: '', institution: '', year: '' });
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white">Education History</h2>
        <p className="text-text-secondary mt-2">Add your academic background to help structure career paths.</p>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="bg-card-bg border border-slate-700 rounded-xl p-6 relative">
             <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-2 text-white font-bold">
                     <GraduationCap size={20} className="text-primary-blue"/>
                     Education #{index + 1}
                 </div>
                 {index > 0 && (
                     <button type="button" onClick={() => remove(index)} className="text-slate-500 hover:text-error transition-colors">
                         <Trash2 size={18} />
                     </button>
                 )}
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="md:col-span-2">
                     <Input
                        label="Degree / Certificate"
                        placeholder="e.g. Bachelor of Science in Computer Science"
                        {...register(`education.${index}.degree`)}
                        error={errors?.education?.[index]?.degree?.message}
                     />
                 </div>
                 <Input
                    label="Institution"
                    placeholder="University Name"
                    {...register(`education.${index}.institution`)}
                    error={errors?.education?.[index]?.institution?.message}
                 />
                 <Input
                    label="Graduation Year"
                    placeholder="2024"
                    type="number"
                    {...register(`education.${index}.year`)}
                    error={errors?.education?.[index]?.year?.message}
                 />
             </div>
          </div>
        ))}

        <Button 
            type="button" 
            variant="outline" 
            onClick={() => append({ degree: '', institution: '', year: '' })}
            className="w-full border-dashed border-slate-600 text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-800"
        >
            <Plus size={16} className="mr-2" /> Add Another Degree
        </Button>
      </div>
    </motion.div>
  );
};

export default EducationStep;

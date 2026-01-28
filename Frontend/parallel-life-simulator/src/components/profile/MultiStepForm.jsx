import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProgressIndicator from './ProgressIndicator';
import GoalSelectionStep from './GoalSelectionStep';
import PersonalStep from './PersonalStep';
import EducationStep from './EducationStep';
import CareerStep from './CareerStep';
import SkillsAssetsStep from './SkillsAssetsStep';
import Button from '../common/Button';

// Validation Schema
const schema = yup.object({
  fullName: yup.string().when('$step', { is: 2, then: (schema) => schema.required('Full Name is required') }),
  age: yup.number().when('$step', { is: 2, then: (schema) => schema.typeError('Age must be a number').required('Age is required') }),
});

const MultiStepForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 5; 
  const [formData, setFormData] = useState({
      goals: ['retirement'], 
  });

  const methods = useForm({
      resolver: yupResolver(schema),
      context: { step }, // Pass step to context for dynamic validation
      mode: 'onChange'
  });

  const { trigger, handleSubmit } = methods;

  const nextStep = async () => {
      // Validate current step fields before moving
      let valid = true;
      if (step === 2) valid = await trigger(['fullName', 'age']); 
      
      if (valid) {
          if (step < totalSteps) setStep(step + 1);
          else navigate('/scenarios');
      }
  };
  
  const prevStep = () => {
      if (step > 1) setStep(step - 1);
  };

  const updateData = (newData) => {
      setFormData({ ...formData, ...newData });
  };

  return (
    <FormProvider {...methods}>
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-2 flex justify-between items-end">
          <div>
            <span className="text-primary-blue font-bold uppercase text-sm tracking-wider">Onboarding</span>
            <p className="text-white text-lg font-medium">Step {step} of {totalSteps}: {
                step === 1 ? 'Life Goals' : 
                step === 2 ? 'Personal Details' : 
                step === 3 ? 'Education History' :
                step === 4 ? 'Career Details' : 'Skills & Assets'
            }</p>
          </div>
          <span className="text-white font-bold">{Math.round((step / totalSteps) * 100)}% Complete</span>
      </div>
      
      <ProgressIndicator currentStep={step} totalSteps={totalSteps} />

      <div className="bg-app-bg text-white max-w-3xl mx-auto mt-8">
        <AnimatePresence mode="wait">
            {step === 1 && <GoalSelectionStep key="step1" data={formData} updateData={updateData} />}
            {step === 2 && <PersonalStep key="step2" />} 
            {step === 3 && <EducationStep key="step3" />}
            {step === 4 && <CareerStep key="step4" />}
            {step === 5 && <SkillsAssetsStep key="step5" />}
        </AnimatePresence>

        <div className="flex justify-between mt-12 pt-6 border-t border-slate-800">
            <Button variant="outline" onClick={prevStep} disabled={step === 1} className="gap-2">
                <ArrowLeft size={16} /> Back
            </Button>
            <Button onClick={nextStep} className="gap-2 px-8">
                {step === totalSteps ? 'Finish' : 'Next Step'} <ArrowRight size={16} />
            </Button>
        </div>
      </div>
    </div>
    </FormProvider>
  );
};

export default MultiStepForm;

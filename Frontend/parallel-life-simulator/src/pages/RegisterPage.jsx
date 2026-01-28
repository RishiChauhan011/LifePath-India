import RegisterForm from '../components/auth/RegisterForm';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-app-bg">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-card-bg rounded-2xl shadow-card border border-slate-800 p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Start Your Journey</h1>
          <p className="text-text-secondary mt-2">Create an account to build your parallel lives</p>
        </div>
        
        <RegisterForm />
      </motion.div>
    </div>
  );
};

export default RegisterPage;

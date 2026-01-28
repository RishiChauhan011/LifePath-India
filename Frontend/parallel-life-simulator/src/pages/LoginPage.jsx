import LoginForm from '../components/auth/LoginForm';
import { motion } from 'framer-motion';

const LoginPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-app-bg">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-card-bg rounded-2xl shadow-card border border-slate-800 p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-text-secondary mt-2">Sign in to continue your simulation</p>
        </div>
        
        <LoginForm />
      </motion.div>
    </div>
  );
};

export default LoginPage;

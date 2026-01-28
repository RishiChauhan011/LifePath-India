import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
}).required();

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'demo@example.com',
      password: 'password123'
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    try {
      await login(data);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Try using the demo account.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Input
            label="Email Address"
            placeholder="you@example.com"
            {...register('email')}
            error={errors.email?.message}
            className="pl-10"
          />
          <Mail className="absolute left-3 top-[38px] text-text-secondary" size={18} />
        </div>

        <div className="relative">
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register('password')}
            error={errors.password?.message}
             className="pl-10"
          />
           <Lock className="absolute left-3 top-[38px] text-text-secondary" size={18} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-slate-700 bg-app-bg text-primary-blue focus:ring-primary-blue" />
          <span className="ml-2 text-sm text-text-secondary">Remember me</span>
        </label>
        <Link to="/forgot-password" className="text-sm font-medium text-primary-blue hover:text-blue-400">
          Forgot password?
        </Link>
      </div>

      {error && (
        <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-3 bg-red-500/10 border border-red-500/20 text-red-200 text-sm rounded-lg"
        >
            {error}
        </motion.div>
      )}

      <Button type="submit" className="w-full flex justify-center py-3" disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin" /> : 'Sign In'}
      </Button>
      
      <p className="text-center text-sm text-text-secondary">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-primary-blue hover:text-blue-400">
          Create an account
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;

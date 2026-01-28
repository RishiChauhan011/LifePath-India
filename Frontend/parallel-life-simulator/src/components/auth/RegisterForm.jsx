import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';

const schema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Min 8 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
}).required();

const RegisterForm = () => {
  const { register: registerAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await registerAuth(data);
      navigate('/profile-setup');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Full Name"
        placeholder="John Doe"
        {...register('fullName')}
        error={errors.fullName?.message}
      />
      
      <Input
        label="Email Address"
        placeholder="you@example.com"
        {...register('email')}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        {...register('password')}
        error={errors.password?.message}
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />

      <label className="flex items-start gap-2">
        <input type="checkbox" className="mt-1 rounded border-slate-700 bg-app-bg text-primary-blue focus:ring-primary-blue" />
        <span className="text-sm text-text-secondary">
            I agree to the <a href="#" className="text-primary-blue hover:text-blue-400">Terms of Service</a> and <a href="#" className="text-primary-blue hover:text-blue-400">Privacy Policy</a>
        </span>
      </label>

      <Button type="submit" className="w-full flex justify-center py-3" disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin" /> : 'Create Account'}
      </Button>
      
      <p className="text-center text-sm text-text-secondary">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary-blue hover:text-blue-400">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;

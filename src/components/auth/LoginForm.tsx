import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import toast from 'react-hot-toast';
import authStore from '../../store/authStore';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { login, loading, error } = authStore();
  const navigate = useNavigate();
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by the store
    }
  };
  
  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm p-8 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to your Legacy Radio account
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          fullWidth
          leftIcon={<Mail className="h-5 w-5" />}
        />
        
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          fullWidth
          leftIcon={<Lock className="h-5 w-5" />}
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <div className="text-sm">
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
              Forgot password?
            </a>
          </div>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={loading}
        >
          Sign in
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
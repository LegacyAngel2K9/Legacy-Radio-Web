import React from 'react';
import Layout from '../components/layout/Layout';
import LoginForm from '../components/auth/LoginForm';
import { Radio } from 'lucide-react';

const LoginPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-16rem)] bg-gray-50 py-12">
        <div className="flex justify-center">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Radio className="h-12 w-12 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Legacy Radio</h1>
            <p className="text-gray-500">Sign in to manage your communication servers</p>
          </div>
        </div>
        
        <div className="max-w-lg mx-auto">
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
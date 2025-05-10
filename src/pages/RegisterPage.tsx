import React from 'react';
import Layout from '../components/layout/Layout';
import RegisterForm from '../components/auth/RegisterForm';
import { Radio } from 'lucide-react';

const RegisterPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-16rem)] bg-gray-50 py-12">
        <div className="flex justify-center">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Radio className="h-12 w-12 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Legacy Radio</h1>
            <p className="text-gray-500">Create your account to get started</p>
          </div>
        </div>
        
        <div className="max-w-lg mx-auto">
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
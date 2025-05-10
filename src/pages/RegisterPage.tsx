import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import RegisterForm from '../components/auth/RegisterForm';
import Logo from '../components/Logo';
import { setPageTitle } from '../lib/utils';

const RegisterPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Register');
  }, []);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-16rem)] bg-dark-50 py-12">
        <div className="flex justify-center">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo className="h-12 w-12" />
            </div>
            <h1 className="text-4xl font-bold text-gray-100">Legacy Radio</h1>
            <p className="text-gray-400">Create your account to get started</p>
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
import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import LoginForm from '../components/auth/LoginForm';
import Logo from '../components/Logo';
import { setPageTitle } from '../lib/utils';

const LoginPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Login');
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
            <p className="text-gray-400">Sign in to manage your communication servers</p>
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
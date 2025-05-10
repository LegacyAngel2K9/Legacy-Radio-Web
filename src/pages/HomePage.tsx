import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Radio, Shield, Clock, Server, User, CreditCard, Tag } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { setPageTitle } from '../lib/utils';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle('Home');
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-dark-100 to-dark-50 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Professional Voice Communication for Logistics & Transport
            </h1>
            <p className="text-lg mb-8 text-gray-200">
              Legacy Radio provides secure, reliable voice servers to keep your team connected and coordinated in real-time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/subscribe')}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white hover:text-primary-800"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-accent-500 rounded-full opacity-20 animate-pulse-slow"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary-400 rounded-full opacity-20 animate-pulse-slow"></div>
              <div className="relative bg-white dark:bg-dark-100 rounded-lg shadow-xl p-6 transform rotate-3">
                <div className="flex items-center mb-4">
                  <Radio className="h-8 w-8 text-primary-500 mr-3" />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Legacy Radio Console</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-100 dark:bg-dark-200 p-3 rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Server className="h-5 w-5 text-primary-600 mr-2" />
                        <span className="font-medium text-gray-800 dark:text-gray-100">Main Dispatch</span>
                      </div>
                      <span className="text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full">Active</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 dark:bg-dark-200 p-3 rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Server className="h-5 w-5 text-primary-600 mr-2" />
                        <span className="font-medium text-gray-800 dark:text-gray-100">European Route Network</span>
                      </div>
                      <span className="text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full">Active</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 dark:bg-dark-200 p-3 rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Server className="h-5 w-5 text-primary-600 mr-2" />
                        <span className="font-medium text-gray-800 dark:text-gray-100">North America Logistics</span>
                      </div>
                      <span className="text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-100">Why Choose Legacy Radio?</h2>
            <p className="mt-4 text-xl text-gray-400">
              Built for professionals who demand reliability and performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-dark-100 p-6 rounded-lg shadow-sm border border-dark-200 hover:shadow-md transition-shadow">
              <div className="bg-primary-100/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Secure Communication</h3>
              <p className="text-gray-400">
                End-to-end encryption ensures your communications remain private and secure at all times.
              </p>
            </div>

            <div className="bg-dark-100 p-6 rounded-lg shadow-sm border border-dark-200 hover:shadow-md transition-shadow">
              <div className="bg-primary-100/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">99.9% Uptime</h3>
              <p className="text-gray-400">
                Our servers are maintained with redundant systems ensuring your teams stay connected when it matters most.
              </p>
            </div>

            <div className="bg-dark-100 p-6 rounded-lg shadow-sm border border-dark-200 hover:shadow-md transition-shadow">
              <div className="bg-primary-100/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Simple Management</h3>
              <p className="text-gray-400">
                Easily manage users, subscriptions, and access through our intuitive web portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-100">Flexible Subscription Plans</h2>
            <p className="mt-4 text-xl text-gray-400">
              Choose the duration that fits your operational needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { months: 1, discount: "0%", popular: false },
              { months: 3, discount: "5%", popular: false },
              { months: 6, discount: "10%", popular: true },
              { months: 12, discount: "15%", popular: false },
            ].map((plan) => (
              <div 
                key={plan.months}
                className={`bg-dark-100 border rounded-lg overflow-hidden transition-all hover:shadow-md ${
                  plan.popular 
                    ? 'border-primary-500 relative' 
                    : 'border-dark-300'
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary-500 text-white text-sm font-medium px-4 py-1 text-center">
                    Most Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-100">
                    {plan.months} {plan.months === 1 ? 'Month' : 'Months'}
                  </h3>
                  {plan.discount !== "0%" && (
                    <div className="mt-2 inline-block bg-accent-900/30 text-accent-300 text-sm font-medium px-2.5 py-0.5 rounded-full">
                      Save {plan.discount}
                    </div>
                  )}
                  <div className="mt-4 flex items-baseline">
                    <span className="text-gray-100 text-2xl font-extrabold">
                      From $19.99
                    </span>
                    <span className="text-gray-400 text-sm ml-1">
                      /server
                    </span>
                  </div>
                  <p className="mt-4 text-gray-400 text-sm">
                    Per month, billed {plan.months === 1 ? 'monthly' : `every ${plan.months} months`}
                  </p>
                  <ul className="mt-6 space-y-4">
                    <li className="flex">
                      <svg className="flex-shrink-0 h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-gray-400">Unlimited users</span>
                    </li>
                    <li className="flex">
                      <svg className="flex-shrink-0 h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-gray-400">24/7 technical support</span>
                    </li>
                    <li className="flex">
                      <svg className="flex-shrink-0 h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-gray-400">99.9% uptime guarantee</span>
                    </li>
                  </ul>
                  <div className="mt-8">
                    <Button
                      variant={plan.popular ? 'primary' : 'outline'}
                      fullWidth
                      onClick={() => navigate('/subscribe')}
                    >
                      Choose Plan
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
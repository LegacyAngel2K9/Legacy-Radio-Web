import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import SubscriptionCard from '../components/dashboard/SubscriptionCard';
import { useNavigate } from 'react-router-dom';
import { Radio, Server, Plus, Calendar, User } from 'lucide-react';
import subscriptionStore from '../store/subscriptionStore';
import authStore from '../store/authStore';
import toast from 'react-hot-toast';
import { setPageTitle } from '../lib/utils';

const DashboardPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Dashboard');
  }, []);

  const { subscriptions, loading, error, fetchSubscriptions } = subscriptionStore();
  const { user } = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <Layout>
      <div className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Manage your Legacy Radio voice communication services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-primary-100 rounded-full p-3">
                    <User className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {user?.username || 'User'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-accent-100 rounded-full p-3">
                    <Server className="h-6 w-6 text-accent-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {subscriptions.length} Server{subscriptions.length !== 1 ? 's' : ''}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {subscriptions.length > 0 
                        ? 'Active subscriptions' 
                        : 'No active subscriptions'}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-success-50 rounded-full p-3">
                    <Calendar className="h-6 w-6 text-success-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Billing Cycle
                    </h3>
                    <p className="text-sm text-gray-500">
                      Renews on the 1st of each month
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <Radio className="h-5 w-5 text-primary-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Subscriptions
                </h2>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/subscribe')}
                leftIcon={<Plus className="h-4 w-4" />}
              >
                Add Subscription
              </Button>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
                  <p className="mt-4 text-gray-500">Loading your subscriptions...</p>
                </div>
              ) : subscriptions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subscriptions.map((subscription) => (
                    <SubscriptionCard
                      key={subscription.id}
                      subscription={subscription}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Server className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No Active Subscriptions
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    You don't have any active voice server subscriptions yet. 
                    Subscribe to get access to our secure communication network.
                  </p>
                  <Button 
                    variant="primary"
                    onClick={() => navigate('/subscribe')}
                  >
                    Browse Available Servers
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-primary-800 mb-2">
                  Need Help Managing Your Subscriptions?
                </h3>
                <p className="text-primary-600 mb-4 md:mb-0">
                  Our support team is available 24/7 to assist you with any questions.
                </p>
              </div>
              <Button 
                variant="primary"
                onClick={() => navigate('/support')}
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
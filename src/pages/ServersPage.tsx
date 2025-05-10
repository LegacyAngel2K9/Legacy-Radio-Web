import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardBody, CardHeader, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useNavigate } from 'react-router-dom';
import { Radio, Server, Calendar, Users } from 'lucide-react';
import subscriptionStore from '../store/subscriptionStore';
import toast from 'react-hot-toast';

const ServersPage: React.FC = () => {
  const { subscriptions, loading, error, fetchSubscriptions } = subscriptionStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Group subscriptions by server
  const serverGroups = subscriptions.reduce((acc, subscription) => {
    if (!subscription.server) return acc;
    
    if (!acc[subscription.server.id]) {
      acc[subscription.server.id] = {
        server: subscription.server,
        subscriptions: [],
      };
    }
    
    acc[subscription.server.id].subscriptions.push(subscription);
    return acc;
  }, {} as Record<string, { server: any; subscriptions: typeof subscriptions }>);

  return (
    <Layout>
      <div className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Your Servers</h1>
              <p className="mt-2 text-gray-600">
                Manage your voice communication servers
              </p>
            </div>
            
            <Button
              variant="primary"
              onClick={() => navigate('/subscribe')}
            >
              Add New Server
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading your servers...</p>
            </div>
          ) : Object.keys(serverGroups).length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.values(serverGroups).map(({ server, subscriptions }) => {
                const activeCount = subscriptions.filter(
                  (s) => new Date(s.expires_at) > new Date()
                ).length;
                
                const latestExpiry = new Date(
                  Math.max(
                    ...subscriptions.map((s) => new Date(s.expires_at).getTime())
                  )
                );
                
                return (
                  <Card key={server.id} className="overflow-hidden">
                    <CardHeader className="bg-primary-50 flex items-center justify-between">
                      <div className="flex items-center">
                        <Radio className="h-6 w-6 text-primary-600 mr-2" />
                        <h3 className="text-xl font-semibold text-gray-900">
                          {server.name}
                        </h3>
                      </div>
                      
                      <Badge 
                        variant={activeCount > 0 ? 'success' : 'error'}
                      >
                        {activeCount > 0 ? 'Active' : 'Inactive'}
                      </Badge>
                    </CardHeader>
                    
                    <CardBody>
                      <p className="text-gray-600 mb-4">
                        {server.description}
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600">
                            Latest expiration: {latestExpiry.toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600">
                            {subscriptions.length} subscription{subscriptions.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </CardBody>
                    
                    <CardFooter className="bg-gray-50 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Server ID: {server.id.slice(0, 8)}...
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/server-details/${server.id}`)}
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Server className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No Servers Found
              </h3>
              <p className="text-gray-500 mb-6">
                You don't have access to any voice servers yet. Subscribe to get started.
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
    </Layout>
  );
};

export default ServersPage;
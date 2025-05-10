import React, { useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Server, Tag, User, Radio } from 'lucide-react';
import serverStore from '../../store/serverStore';
import discountCodeStore from '../../store/discountCodeStore';
import toast from 'react-hot-toast';
import { setPageTitle } from '../../lib/utils';

const AdminOverviewPage: React.FC = () => {
  const { servers, loading: serversLoading, fetchServers } = serverStore();
  const { 
    discountCodes, 
    loading: codesLoading, 
    fetchDiscountCodes 
  } = discountCodeStore();
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle('Admin Overview');
  }, []);

  useEffect(() => {
    fetchServers();
    fetchDiscountCodes();
  }, [fetchServers, fetchDiscountCodes]);

  return (
    <Layout>
      <div className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="flex items-center">
              <Radio className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <p className="mt-2 text-gray-600">
              Manage servers, users, and discount codes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-none">
              <CardBody className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-primary-500 bg-opacity-10 rounded-full p-3">
                    <Server className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm text-primary-600 font-medium">
                      Total Servers
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {serversLoading ? (
                        <div className="animate-pulse h-8 w-12 bg-gray-200 rounded"></div>
                      ) : (
                        servers.length
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => navigate('/admin/servers')}
                  >
                    Manage Servers
                  </Button>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-accent-50 to-accent-100 border-none">
              <CardBody className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-accent-500 bg-opacity-10 rounded-full p-3">
                    <Tag className="h-6 w-6 text-accent-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm text-accent-600 font-medium">
                      Discount Codes
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {codesLoading ? (
                        <div className="animate-pulse h-8 w-12 bg-gray-200 rounded"></div>
                      ) : (
                        discountCodes.length
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    onClick={() => navigate('/admin/discount-codes')}
                  >
                    Manage Discount Codes
                  </Button>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-success-50 to-gray-50 border-none">
              <CardBody className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-success-500 bg-opacity-10 rounded-full p-3">
                    <User className="h-6 w-6 text-success-500" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm text-success-500 font-medium">
                      Users
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      <div className="animate-pulse h-8 w-12 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => navigate('/admin/users')}
                  >
                    Manage Users
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="bg-white flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Servers
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/admin/servers')}
                >
                  View All
                </Button>
              </CardHeader>
              <CardBody>
                {serversLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse flex items-center">
                        <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                        <div className="ml-4 flex-1">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : servers.length > 0 ? (
                  <div className="divide-y">
                    {servers.slice(0, 5).map((server) => (
                      <div key={server.id} className="py-3 flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <Server className="h-5 w-5 text-primary-500" />
                        </div>
                        <div className="ml-3">
                          <div className="flex items-center">
                            <h4 className="text-sm font-medium text-gray-900">
                              {server.name}
                            </h4>
                            <span className="ml-2 text-xs text-gray-500">
                              ID: {server.id.slice(0, 8)}...
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {server.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No servers available</p>
                  </div>
                )}
              </CardBody>
            </Card>

            <Card>
              <CardHeader className="bg-white flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Active Discount Codes
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/admin/discount-codes')}
                >
                  View All
                </Button>
              </CardHeader>
              <CardBody>
                {codesLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse flex items-center">
                        <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                        <div className="ml-4 flex-1">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : discountCodes.length > 0 ? (
                  <div className="divide-y">
                    {discountCodes.slice(0, 5).map((code) => (
                      <div key={code.id} className="py-3 flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <Tag className="h-5 w-5 text-accent-500" />
                        </div>
                        <div className="ml-3">
                          <div className="flex items-center">
                            <h4 className="text-sm font-medium text-gray-900">
                              {code.code}
                            </h4>
                            {new Date(code.expires_at) < new Date() ? (
                              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-error-100 text-error-800">
                                Expired
                              </span>
                            ) : (
                              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <span>Expires: {new Date(code.expires_at).toLocaleDateString()}</span>
                            <span className="mx-2">•</span>
                            <span>Uses: {code.current_uses}/{code.max_uses || '∞'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No discount codes available</p>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOverviewPage;
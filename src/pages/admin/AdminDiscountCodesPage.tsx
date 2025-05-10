import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import DiscountCodeForm from '../../components/admin/DiscountCodeForm';
import { Tag, Plus, Search, Info, Calendar, Check, X } from 'lucide-react';
import discountCodeStore from '../../store/discountCodeStore';
import serverStore from '../../store/serverStore';
import toast from 'react-hot-toast';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';

const AdminDiscountCodesPage: React.FC = () => {
  const { 
    discountCodes, 
    loading, 
    error, 
    fetchDiscountCodes, 
    createDiscountCode,
    fetchCodeUsage,
    currentCodeUsage
  } = discountCodeStore();
  
  const { servers, fetchServers } = serverStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [viewingCodeId, setViewingCodeId] = useState<string | null>(null);

  useEffect(() => {
    fetchDiscountCodes();
    fetchServers();
  }, [fetchDiscountCodes, fetchServers]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleCreateCode = async (data: {
    code: string;
    server_id: string;
    expires_at: string;
    max_uses: number | null;
  }) => {
    const success = await createDiscountCode(
      data.code,
      data.server_id,
      data.expires_at,
      data.max_uses
    );
    
    if (success) {
      toast.success('Discount code created successfully!');
      setShowForm(false);
    }
  };

  const handleViewUsage = async (codeId: string) => {
    setViewingCodeId(codeId);
    await fetchCodeUsage(codeId);
  };

  const filteredCodes = discountCodes.filter(
    (code) =>
      code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (code.server?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getServerNameById = (serverId: string) => {
    const server = servers.find((s) => s.id === serverId);
    return server ? server.name : 'Unknown Server';
  };

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Discount Codes</h1>
              <p className="mt-2 text-gray-600">
                Create and manage discount codes for server subscriptions
              </p>
            </div>
            
            {!showForm && (
              <Button
                variant="primary"
                onClick={() => setShowForm(true)}
                leftIcon={<Plus className="h-5 w-5" />}
              >
                Create New Code
              </Button>
            )}
          </div>

          {showForm && (
            <Card className="mb-8 animate-fade-in">
              <CardHeader className="bg-white">
                <h2 className="text-xl font-semibold text-gray-900">
                  Create Discount Code
                </h2>
              </CardHeader>
              <CardBody>
                <DiscountCodeForm
                  servers={servers}
                  onSubmit={handleCreateCode}
                  isLoading={loading}
                />
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}

          {viewingCodeId && (
            <Card className="mb-8 animate-fade-in">
              <CardHeader className="bg-white flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Usage History
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewingCodeId(null)}
                >
                  Close
                </Button>
              </CardHeader>
              <CardBody>
                {loading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
                  </div>
                ) : currentCodeUsage.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Used At
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentCodeUsage.map((usage) => (
                          <tr key={usage.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {usage.user?.username || 'Unknown User'}
                              </div>
                              <div className="text-xs text-gray-500">
                                {usage.user?.email || 'No email available'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {new Date(usage.used_at).toLocaleString()}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Info className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">No usage records found for this code</p>
                  </div>
                )}
              </CardBody>
            </Card>
          )}

          <Card>
            <CardHeader className="bg-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <h2 className="text-xl font-semibold text-gray-900">
                  Discount Codes
                </h2>
                
                <div className="w-full md:w-64">
                  <Input
                    placeholder="Search codes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    leftIcon={<Search className="h-5 w-5" />}
                    fullWidth
                  />
                </div>
              </div>
            </CardHeader>
            <CardBody>
              {loading && discountCodes.length === 0 ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-16 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : filteredCodes.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Code
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Server
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Expiration
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Usage
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCodes.map((code) => (
                        <tr key={code.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Tag className="h-5 w-5 text-accent-500 mr-3" />
                              <div className="text-sm font-medium text-gray-900">
                                {code.code}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {getServerNameById(code.server_id)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                              <div className="text-sm text-gray-500">
                                {new Date(code.expires_at).toLocaleDateString()}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {code.current_uses} / {code.max_uses === null ? '∞' : code.max_uses}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {isExpired(code.expires_at) ? (
                              <Badge variant="error" size="sm">
                                <div className="flex items-center">
                                  <X className="h-3 w-3 mr-1" />
                                  Expired
                                </div>
                              </Badge>
                            ) : (
                              <Badge variant="success" size="sm">
                                <div className="flex items-center">
                                  <Check className="h-3 w-3 mr-1" />
                                  Active
                                </div>
                              </Badge>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewUsage(code.id)}
                            >
                              View Usage
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Tag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No Discount Codes Found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm
                      ? `No codes matching "${searchTerm}"`
                      : "You haven't created any discount codes yet"}
                  </p>
                  <Button 
                    variant="primary"
                    onClick={() => setShowForm(true)}
                  >
                    Create First Code
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDiscountCodesPage;
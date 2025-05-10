import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ServerForm from '../../components/admin/ServerForm';
import { Server, Plus, Edit, Trash2, Search } from 'lucide-react';
import serverStore from '../../store/serverStore';
import toast from 'react-hot-toast';
import Input from '../../components/ui/Input';
import { setPageTitle } from '../../lib/utils';

const AdminServersPage: React.FC = () => {
  const { servers, loading, error, fetchServers, createServer, updateServer } = serverStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingServer, setEditingServer] = useState<any>(null);

  useEffect(() => {
    setPageTitle('Admin Servers');
  }, []);

  useEffect(() => {
    fetchServers();
  }, [fetchServers]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleCreateServer = async (data: { name: string; description: string }) => {
    const success = await createServer(data.name, data.description);
    
    if (success) {
      toast.success('Server created successfully!');
      setShowForm(false);
    }
  };

  const handleUpdateServer = async (data: { name: string; description: string }) => {
    if (!editingServer) return;
    
    const success = await updateServer(editingServer.id, data.name, data.description);
    
    if (success) {
      toast.success('Server updated successfully!');
      setEditingServer(null);
    }
  };

  const handleEditClick = (server: any) => {
    setEditingServer(server);
    setShowForm(true);
  };

  const filteredServers = servers.filter(
    (server) =>
      server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Server Management</h1>
              <p className="mt-2 text-gray-600">
                Create and manage voice communication servers
              </p>
            </div>
            
            {!showForm && (
              <Button
                variant="primary"
                onClick={() => setShowForm(true)}
                leftIcon={<Plus className="h-5 w-5" />}
              >
                Add New Server
              </Button>
            )}
          </div>

          {showForm && (
            <Card className="mb-8 animate-fade-in">
              <CardHeader className="bg-white">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingServer ? 'Edit Server' : 'Create New Server'}
                </h2>
              </CardHeader>
              <CardBody>
                <ServerForm
                  initialData={editingServer}
                  onSubmit={editingServer ? handleUpdateServer : handleCreateServer}
                  isLoading={loading}
                />
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingServer(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}

          <Card>
            <CardHeader className="bg-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <h2 className="text-xl font-semibold text-gray-900">
                  Servers
                </h2>
                
                <div className="w-full md:w-64">
                  <Input
                    placeholder="Search servers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    leftIcon={<Search className="h-5 w-5" />}
                    fullWidth
                  />
                </div>
              </div>
            </CardHeader>
            <CardBody>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-16 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : filteredServers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Server
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredServers.map((server) => (
                        <tr key={server.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Server className="h-5 w-5 text-primary-500 mr-3" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {server.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  ID: {server.id.slice(0, 8)}...
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {server.description}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {new Date(server.created_at).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleEditClick(server)}
                              className="text-primary-600 hover:text-primary-900 mr-4"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              className="text-error-600 hover:text-error-900"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Server className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No Servers Found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm
                      ? `No servers matching "${searchTerm}"`
                      : "You haven't created any servers yet"}
                  </p>
                  <Button 
                    variant="primary"
                    onClick={() => setShowForm(true)}
                  >
                    Create First Server
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

export default AdminServersPage;
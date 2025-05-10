import React from 'react';
import clsx from 'clsx';
import { Server } from '../../types';
import { Card, CardHeader, CardBody, CardFooter } from '../ui/Card';
import { Check, Radio } from 'lucide-react';

interface ServerSelectorProps {
  servers: Server[];
  selectedServer: string | null;
  onSelectServer: (serverId: string) => void;
  loading: boolean;
}

const ServerSelector: React.FC<ServerSelectorProps> = ({
  servers,
  selectedServer,
  onSelectServer,
  loading,
}) => {
  if (loading) {
    return (
      <div className="w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Select Server
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="bg-gray-100 animate-pulse h-40 rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  if (servers.length === 0) {
    return (
      <div className="w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Select Server
        </h3>
        <div className="p-6 rounded-lg border border-gray-200 bg-gray-50">
          <p className="text-center text-gray-500">
            No servers available. Please contact an administrator.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Select Server
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {servers.map((server) => {
          const isSelected = selectedServer === server.id;
          
          return (
            <Card
              key={server.id}
              className={clsx(
                'cursor-pointer transition-all duration-200 hover:shadow-md h-full',
                {
                  'ring-2 ring-primary-500': isSelected,
                }
              )}
              hover
              onClick={() => onSelectServer(server.id)}
            >
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center">
                  <Radio className="h-5 w-5 text-primary-500 mr-2" />
                  <h3 className="font-semibold">{server.name}</h3>
                </div>
                
                {isSelected && (
                  <div className="bg-primary-500 text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </CardHeader>
              
              <CardBody>
                <p className="text-gray-600 text-sm">{server.description}</p>
              </CardBody>
              
              <CardFooter className="bg-gray-50">
                <p className="text-xs text-gray-500">
                  Created: {new Date(server.created_at).toLocaleDateString()}
                </p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ServerSelector;
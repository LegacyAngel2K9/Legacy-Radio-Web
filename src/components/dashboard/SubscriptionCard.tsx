import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { Radio, Calendar, AlertCircle } from 'lucide-react';
import { Card, CardBody, CardHeader, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import { Subscription } from '../../types';

interface SubscriptionCardProps {
  subscription: Subscription;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription }) => {
  const expiresAt = new Date(subscription.expires_at);
  const isExpired = expiresAt < new Date();
  const isExpiringSoon = !isExpired && expiresAt < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  
  return (
    <Card className="h-full transform transition-all duration-200 hover:translate-y-[-4px]">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center">
          <Radio className="h-5 w-5 text-primary-500 mr-2" />
          <h3 className="font-semibold text-lg">
            {subscription.server?.name || 'Server'}
          </h3>
        </div>
        
        <Badge 
          variant={isExpired ? 'error' : isExpiringSoon ? 'warning' : 'success'}
          size="md"
        >
          {isExpired 
            ? 'Expired' 
            : isExpiringSoon 
              ? 'Expiring Soon'
              : 'Active'
          }
        </Badge>
      </CardHeader>
      
      <CardBody>
        <p className="text-gray-500 text-sm mb-4">
          {subscription.server?.description || 'No description available'}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-gray-600">Expires:</span>
            <span className="ml-2 font-medium">
              {format(expiresAt, 'PPP')}
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <span className="text-gray-600">Time remaining:</span>
            <span className="ml-2 font-medium">
              {isExpired
                ? 'Expired'
                : formatDistanceToNow(expiresAt, { addSuffix: true })}
            </span>
          </div>
          
          {subscription.via_coupon && (
            <div className="flex items-center mt-2">
              <Badge variant="primary">Applied with discount code</Badge>
            </div>
          )}
        </div>
      </CardBody>
      
      {isExpired && (
        <CardFooter className="bg-error-50 flex items-center">
          <AlertCircle className="h-4 w-4 text-error-500 mr-2" />
          <p className="text-sm text-error-500">
            This subscription has expired. Please renew to continue access.
          </p>
        </CardFooter>
      )}
      
      {isExpiringSoon && !isExpired && (
        <CardFooter className="bg-warning-50 flex items-center">
          <AlertCircle className="h-4 w-4 text-warning-700 mr-2" />
          <p className="text-sm text-warning-700">
            This subscription will expire soon. Consider renewing.
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default SubscriptionCard;
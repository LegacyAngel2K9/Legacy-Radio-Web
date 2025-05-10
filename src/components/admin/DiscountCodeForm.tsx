import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Server } from '../../types';
import { Calendar } from 'lucide-react';

interface DiscountCodeFormProps {
  servers: Server[];
  onSubmit: (data: {
    code: string;
    server_id: string;
    expires_at: string;
    max_uses: number | null;
  }) => Promise<void>;
  isLoading: boolean;
}

const DiscountCodeForm: React.FC<DiscountCodeFormProps> = ({
  servers,
  onSubmit,
  isLoading,
}) => {
  const [code, setCode] = useState('');
  const [serverId, setServerId] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [maxUses, setMaxUses] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!code.trim()) {
      newErrors.code = 'Discount code is required';
    } else if (!/^[A-Za-z0-9]+$/.test(code)) {
      newErrors.code = 'Code must contain only letters and numbers';
    }

    if (!serverId) {
      newErrors.serverId = 'Please select a server';
    }

    if (!expiresAt) {
      newErrors.expiresAt = 'Expiration date is required';
    } else {
      const selectedDate = new Date(expiresAt);
      if (selectedDate <= new Date()) {
        newErrors.expiresAt = 'Expiration date must be in the future';
      }
    }

    if (maxUses && parseInt(maxUses) <= 0) {
      newErrors.maxUses = 'Max uses must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    await onSubmit({
      code: code.toUpperCase(),
      server_id: serverId,
      expires_at: expiresAt,
      max_uses: maxUses ? parseInt(maxUses) : null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        id="code"
        label="Discount Code"
        placeholder="LR2025FREE"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        error={errors.code}
        fullWidth
      />

      <div>
        <label
          htmlFor="server"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Server
        </label>
        <select
          id="server"
          value={serverId}
          onChange={(e) => setServerId(e.target.value)}
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm ${
            errors.serverId ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''
          }`}
        >
          <option value="">Select a server</option>
          {servers.map((server) => (
            <option key={server.id} value={server.id}>
              {server.name}
            </option>
          ))}
        </select>
        {errors.serverId && (
          <p className="mt-1 text-sm text-error-500">{errors.serverId}</p>
        )}
      </div>

      <Input
        id="expiresAt"
        type="date"
        label="Expiration Date"
        value={expiresAt}
        onChange={(e) => setExpiresAt(e.target.value)}
        error={errors.expiresAt}
        fullWidth
        leftIcon={<Calendar className="h-5 w-5" />}
      />

      <Input
        id="maxUses"
        type="number"
        label="Max Uses (Optional)"
        placeholder="Leave empty for unlimited"
        value={maxUses}
        onChange={(e) => setMaxUses(e.target.value)}
        error={errors.maxUses}
        fullWidth
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
        >
          Create Discount Code
        </Button>
      </div>
    </form>
  );
};

export default DiscountCodeForm;
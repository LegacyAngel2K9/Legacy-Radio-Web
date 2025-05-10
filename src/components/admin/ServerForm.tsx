import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Server } from '../../types';

interface ServerFormProps {
  initialData?: Server;
  onSubmit: (data: { name: string; description: string }) => Promise<void>;
  isLoading: boolean;
}

const ServerForm: React.FC<ServerFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Server name is required';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    await onSubmit({
      name,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        id="name"
        label="Server Name"
        placeholder="Enter server name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
        fullWidth
      />

      <div>
        <label 
          htmlFor="description" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          placeholder="Enter server description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm ${
            errors.description ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-error-500">{errors.description}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
        >
          {initialData ? 'Update Server' : 'Create Server'}
        </Button>
      </div>
    </form>
  );
};

export default ServerForm;
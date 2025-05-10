import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Tag, CheckCircle, AlertCircle } from 'lucide-react';
import { validateDiscountCode } from '../../lib/api';

interface DiscountCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidate: (isValid: boolean) => void;
}

const DiscountCodeInput: React.FC<DiscountCodeInputProps> = ({
  value,
  onChange,
  onValidate,
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    message: string;
  } | null>(null);

  const handleValidate = async () => {
    if (!value.trim()) {
      setValidationResult({
        valid: false,
        message: 'Please enter a discount code',
      });
      onValidate(false);
      return;
    }

    setIsValidating(true);
    setValidationResult(null);

    try {
      const response = await validateDiscountCode(value.trim());
      setValidationResult({
        valid: true,
        message: `Valid code for server: ${response.server?.name || 'Unknown'}`,
      });
      onValidate(true);
    } catch (error) {
      setValidationResult({
        valid: false,
        message: error instanceof Error ? error.message : 'Invalid discount code',
      });
      onValidate(false);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <h3 className="text-lg font-medium text-gray-900">
        Add Discount Code (Optional)
      </h3>
      
      <div className="flex space-x-2">
        <div className="flex-grow">
          <Input
            placeholder="Enter discount code"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            leftIcon={<Tag className="h-5 w-5" />}
            fullWidth
          />
        </div>
        
        <Button
          onClick={handleValidate}
          variant="outline"
          isLoading={isValidating}
        >
          Validate
        </Button>
      </div>
      
      {validationResult && (
        <div
          className={`p-3 rounded-md flex items-center ${
            validationResult.valid
              ? 'bg-success-50 text-success-700'
              : 'bg-error-50 text-error-700'
          }`}
        >
          {validationResult.valid ? (
            <CheckCircle className="h-5 w-5 mr-2" />
          ) : (
            <AlertCircle className="h-5 w-5 mr-2" />
          )}
          <p className="text-sm">{validationResult.message}</p>
        </div>
      )}
    </div>
  );
};

export default DiscountCodeInput;
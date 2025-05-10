import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '../ui/Button';
import { createPaymentIntent } from '../../lib/api';
import toast from 'react-hot-toast';

interface CheckoutFormProps {
  serverId: string;
  duration: number;
  discountCode?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  serverId,
  duration,
  discountCode,
  onSuccess,
  onCancel,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPaymentIntent = async () => {
      try {
        const { client_secret } = await createPaymentIntent(
          serverId,
          duration,
          discountCode
        );
        setClientSecret(client_secret);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          toast.error(error.message);
        } else {
          setError('Failed to initialize payment');
          toast.error('Failed to initialize payment');
        }
      } finally {
        setLoading(false);
      }
    };

    getPaymentIntent();
  }, [serverId, duration, discountCode]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    setProcessing(true);
    setError(null);

    const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (paymentError) {
      setError(paymentError.message || 'Payment failed');
      toast.error(paymentError.message || 'Payment failed');
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      toast.success('Payment successful!');
      onSuccess();
    } else {
      setError('Payment processing failed');
      toast.error('Payment processing failed');
    }

    setProcessing(false);
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Preparing payment...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Details
        </label>
        <div className="border border-gray-300 rounded-md p-3 bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        {error && <div className="mt-2 text-sm text-error-500">{error}</div>}
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={processing}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={processing}
          disabled={!stripe || !clientSecret || processing}
        >
          Pay Now
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
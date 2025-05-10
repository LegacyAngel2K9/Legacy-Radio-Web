import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Layout from '../components/layout/Layout';
import ServerSelector from '../components/subscription/ServerSelector';
import DurationSelector from '../components/subscription/DurationSelector';
import DiscountCodeInput from '../components/subscription/DiscountCodeInput';
import CheckoutForm from '../components/payment/CheckoutForm';
import { Card, CardBody, CardHeader, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ArrowLeft, CreditCard, Wallet, Radio } from 'lucide-react';
import serverStore from '../store/serverStore';
import subscriptionStore from '../store/subscriptionStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Mock Stripe promise - in a real app, use your actual publishable key
const stripePromise = loadStripe('pk_test_mock');

const SubscribePage: React.FC = () => {
  const { servers, loading, fetchServers } = serverStore();
  const { 
    selectedServer, 
    selectedDuration, 
    discountCode, 
    paymentMethod,
    setSelectedServer,
    setSelectedDuration,
    setDiscountCode,
    setPaymentMethod,
    createSubscription,
    error,
    resetSubscriptionForm
  } = subscriptionStore();
  
  const [step, setStep] = useState(1);
  const [isDiscountValid, setIsDiscountValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServers();
    // Reset form when component mounts
    resetSubscriptionForm();
  }, [fetchServers, resetSubscriptionForm]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleNext = () => {
    if (step === 1 && !selectedServer) {
      toast.error('Please select a server');
      return;
    }
    
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handlePaymentMethodChange = (method: 'stripe' | 'paypal') => {
    setPaymentMethod(method);
  };

  const handleSubmit = async () => {
    const success = await createSubscription();
    
    if (success) {
      toast.success('Subscription created successfully!');
      navigate('/dashboard');
    }
  };

  const handlePaymentSuccess = () => {
    toast.success('Payment successful!');
    navigate('/dashboard');
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <ServerSelector
            servers={servers}
            selectedServer={selectedServer}
            onSelectServer={setSelectedServer}
            loading={loading}
          />
        );
      case 2:
        return (
          <DurationSelector
            selectedDuration={selectedDuration}
            onChange={setSelectedDuration}
          />
        );
      case 3:
        return (
          <DiscountCodeInput
            value={discountCode}
            onChange={setDiscountCode}
            onValidate={setIsDiscountValid}
          />
        );
      case 4:
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Select Payment Method
            </h3>
            
            <div className="space-y-4">
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${
                  paymentMethod === 'stripe' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200'
                }`}
                onClick={() => handlePaymentMethodChange('stripe')}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <input
                      type="radio"
                      checked={paymentMethod === 'stripe'}
                      onChange={() => handlePaymentMethodChange('stripe')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                  </div>
                  <div className="ml-3">
                    <label className="flex items-center text-sm font-medium text-gray-900">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Credit / Debit Card
                    </label>
                  </div>
                </div>
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${
                  paymentMethod === 'paypal' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200'
                }`}
                onClick={() => handlePaymentMethodChange('paypal')}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <input
                      type="radio"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => handlePaymentMethodChange('paypal')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                  </div>
                  <div className="ml-3">
                    <label className="flex items-center text-sm font-medium text-gray-900">
                      <Wallet className="h-5 w-5 mr-2" />
                      PayPal
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Complete Your Payment
            </h3>
            
            {paymentMethod === 'stripe' ? (
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  serverId={selectedServer || ''}
                  duration={selectedDuration}
                  discountCode={isDiscountValid ? discountCode : undefined}
                  onSuccess={handlePaymentSuccess}
                  onCancel={() => setStep(4)}
                />
              </Elements>
            ) : (
              <div className="text-center p-8">
                <p className="text-gray-600 mb-4">
                  You will be redirected to PayPal to complete your payment.
                </p>
                <Button 
                  variant="primary"
                  onClick={handleSubmit}
                >
                  Proceed to PayPal
                </Button>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Radio className="h-8 w-8 text-primary-600 mr-3" />
              Subscribe to Legacy Radio
            </h1>
            <p className="mt-2 text-gray-600">
              Select your server and subscription plan
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center">
              <div className="flex-grow">
                <div className="overflow-hidden h-2 text-xs flex bg-gray-200 rounded-full">
                  <div
                    className="bg-primary-500 rounded-full"
                    style={{ width: `${(step / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="ml-4">
                <span className="text-sm font-medium text-gray-700">
                  Step {step} of 5
                </span>
              </div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>Server</span>
              <span>Duration</span>
              <span>Discount</span>
              <span>Payment</span>
              <span>Confirm</span>
            </div>
          </div>

          <Card>
            <CardHeader className="bg-white">
              <h2 className="text-xl font-semibold text-gray-900">
                {step === 1 && 'Select Server'}
                {step === 2 && 'Choose Subscription Duration'}
                {step === 3 && 'Apply Discount Code'}
                {step === 4 && 'Select Payment Method'}
                {step === 5 && 'Complete Payment'}
              </h2>
            </CardHeader>
            
            <CardBody>
              {renderStepContent()}
            </CardBody>
            
            {step !== 5 && (
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={step === 1 ? () => navigate('/dashboard') : handleBack}
                  leftIcon={step > 1 ? <ArrowLeft className="h-4 w-4" /> : undefined}
                >
                  {step === 1 ? 'Cancel' : 'Back'}
                </Button>
                
                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={step === 1 && !selectedServer}
                >
                  {step === 4 ? 'Proceed to Payment' : 'Continue'}
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SubscribePage;
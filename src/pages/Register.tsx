
import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { LanguageContext } from "@/contexts/LanguageContext";
import RegistrationForm from "@/components/RegistrationForm";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import PaymentForm from "@/components/PaymentForm";

type Step = 'register' | 'subscription' | 'payment';

const Register = () => {
  const [currentStep, setCurrentStep] = useState<Step>('register');
  const [selectedPlan, setSelectedPlan] = useState<{ duration: string; price: number; planType: string } | null>(null);
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleRegistrationSuccess = () => {
    setCurrentStep('subscription');
  };

  const handlePlanSelect = (plan: { duration: string; price: number; planType: string }) => {
    setSelectedPlan(plan);
    setCurrentStep('payment');
  };

  const handlePaymentSuccess = () => {
    navigate('/supplier-dashboard');
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'subscription':
        return (
          <SubscriptionPlans 
            onPlanSelect={handlePlanSelect}
            onBack={() => setCurrentStep('register')}
            isSupplier={true}
          />
        );
      case 'payment':
        return selectedPlan ? (
          <PaymentForm 
            plan={selectedPlan}
            onPaymentSuccess={handlePaymentSuccess}
            onBack={() => setCurrentStep('subscription')}
          />
        ) : null;
      default:
        return (
          <RegistrationForm 
            onSuccess={handleRegistrationSuccess}
            onBackToLogin={() => navigate('/login')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/5142faa5-d964-4021-b411-2ea1ad268901.png" 
            alt="EasyBizz Logo" 
            className="h-16 w-auto mx-auto mb-4"
          />
        </div>

        {renderContent()}

        {currentStep === 'register' && (
          <div className="text-center mt-6">
            <p className="text-gray-600">
              {t('have_account')}{' '}
              <Link to="/login" className="text-[#0794FE] hover:underline font-medium">
                {t('login')}
              </Link>
            </p>
            <div className="mt-4">
              <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
                {t('back_to_home')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;

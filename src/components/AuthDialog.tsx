
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import RegistrationForm from "./RegistrationForm";
import SubscriptionPlans from "./SubscriptionPlans";
import PaymentForm from "./PaymentForm";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess: () => void;
}

type Step = 'login' | 'register' | 'subscription' | 'payment';

const AuthDialog = ({ open, onOpenChange, onAuthSuccess }: AuthDialogProps) => {
  const [currentStep, setCurrentStep] = useState<Step>('login');
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ duration: string; price: number; planType: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication for login
    if (isLogin) {
      onAuthSuccess();
    }
  };

  const handleRegistrationSuccess = () => {
    setCurrentStep('subscription');
  };

  const handlePlanSelect = (plan: { duration: string; price: number; planType: string }) => {
    setSelectedPlan(plan);
    setCurrentStep('payment');
  };

  const handlePaymentSuccess = () => {
    onAuthSuccess();
  };

  const handleBackToLogin = () => {
    setCurrentStep('login');
    setIsLogin(true);
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'register':
        return (
          <RegistrationForm 
            onSuccess={handleRegistrationSuccess}
            onBackToLogin={handleBackToLogin}
          />
        );
      case 'subscription':
        return (
          <SubscriptionPlans 
            onPlanSelect={handlePlanSelect}
            onBack={() => setCurrentStep('register')}
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
          <>
            {/* Login/Register Toggle */}
            <div className="w-full mb-6">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    isLogin 
                      ? 'bg-white text-[#0794FE] shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(false);
                    setCurrentStep('register');
                  }}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    !isLogin 
                      ? 'bg-white text-[#0794FE] shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Register
                </button>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-sm text-gray-600">
                Fill in the information below in order to access your account.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-lg border-gray-300"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="rounded-lg border-gray-300 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[#E1275C] hover:bg-[#C91F4F] text-white rounded-lg py-3 font-medium mt-6"
              >
                Login
              </Button>
            </form>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">Are you a supplier?</p>
              <Button
                type="button"
                variant="outline"
                className="mt-2 border-[#0794FE] text-[#0794FE] hover:bg-[#0794FE] hover:text-white rounded-lg"
              >
                Espace fournisseur
              </Button>
            </div>
            
            <div className="text-center mt-4">
              <button
                type="button"
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Forgot Password?
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white">
        <div className="flex flex-col items-center p-6">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/lovable-uploads/5142faa5-d964-4021-b411-2ea1ad268901.png" 
              alt="EasyBizz Logo" 
              className="h-16 w-auto"
            />
          </div>

          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;

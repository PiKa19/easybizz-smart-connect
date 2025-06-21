
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import PaymentForm from "./PaymentForm";

interface SubscriptionWallProps {
  open: boolean;
  onClose: () => void;
  onPlanSelect?: (plan: { duration: string; price: number; planType: string }) => void;
  onBorrow3Days?: () => void;
  onSubscriptionRenewed?: () => void;
}

const plans = [
  {
    id: "1month",
    duration: "1 Month",
    price: 2500,
    description: "Perfect for getting started",
    features: ["Full access to all features", "Customer support", "Analytics dashboard"]
  },
  {
    id: "6months",
    duration: "6 Months",
    price: 13500,
    originalPrice: 15000,
    description: "Most popular choice",
    features: ["Full access to all features", "Priority customer support", "Advanced analytics", "Save 10%"]
  },
  {
    id: "1year",
    duration: "1 Year",
    price: 27000,
    originalPrice: 30000,
    description: "Best value for committed businesses",
    features: ["Full access to all features", "Priority customer support", "Advanced analytics", "Save 10%", "Free training sessions"]
  }
];

const SubscriptionWall: React.FC<SubscriptionWallProps> = ({
  open,
  onClose,
  onPlanSelect,
  onBorrow3Days,
  onSubscriptionRenewed
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [showPayment, setShowPayment] = useState(false);
  const [planForPayment, setPlanForPayment] = useState<{ duration: string; price: number; planType: string } | null>(null);

  const handleSelect = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    if (plan) {
      setPlanForPayment({
        duration: plan.duration,
        price: plan.price,
        planType: selectedPlan
      });
      setShowPayment(true);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setSelectedPlan("");
    setPlanForPayment(null);
    if (onPlanSelect && planForPayment) {
      onPlanSelect(planForPayment);
    }
    // Call hook to update days left counter in dashboard
    if (onSubscriptionRenewed) onSubscriptionRenewed();
    onClose();
    // Optionally show a toast here for successful payment
  };

  const handleBackToPlans = () => {
    setShowPayment(false);
  };

  const handleBorrow = () => {
    if (onBorrow3Days) onBorrow3Days();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-visible">
        {!showPayment ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-center mt-2">Renew Your Subscription</DialogTitle>
              <DialogDescription className="text-center">Choose a plan below or borrow 3 extra days</DialogDescription>
            </DialogHeader>
            <div className="px-4 pb-4">
              <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                <div className="flex flex-col gap-4 md:flex-row md:gap-4 justify-center items-start w-full">
                  {plans.map((plan) => (
                    <Card
                      key={plan.id}
                      className={`flex-1 min-w-[230px] max-w-xs cursor-pointer h-full transition-colors ${
                        selectedPlan === plan.id ? 'ring-2 ring-[#0794FE] bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={plan.id} id={plan.id} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{plan.duration}</CardTitle>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-[#E1275C]">{plan.price} DZD</div>
                                {plan.originalPrice && (
                                  <div className="text-sm text-gray-500 line-through">{plan.originalPrice} DZD</div>
                                )}
                              </div>
                            </div>
                            <CardDescription className="mt-1">{plan.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-2 text-sm">
                              <Check className="w-4 h-4 text-green-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </RadioGroup>
              <div className="flex flex-col gap-3 pt-6 max-w-lg mx-auto">
                <Button 
                  onClick={handleSelect}
                  disabled={!selectedPlan}
                  className="w-full bg-[#E1275C] hover:bg-[#C91F4F] text-white"
                >
                  Continue to Payment
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-[#E1275C] font-semibold hover:bg-pink-50"
                  onClick={handleBorrow}
                  type="button"
                >
                  Borrow 3 days (temporary access)
                </Button>
              </div>
            </div>
            <DialogClose asChild>
              <button
                className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-xl"
                aria-label="Close"
              >
                ×
              </button>
            </DialogClose>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-center mt-2">Complete Your Payment</DialogTitle>
              <DialogDescription className="text-center">Secure payment with Carte Dahabiya</DialogDescription>
            </DialogHeader>
            {planForPayment && (
              <div className="px-4 pb-4">
                <PaymentForm 
                  plan={planForPayment}
                  onPaymentSuccess={handlePaymentSuccess}
                  onBack={handleBackToPlans}
                />
              </div>
            )}
            <DialogClose asChild>
              <button
                className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-xl"
                aria-label="Close"
              >
                ×
              </button>
            </DialogClose>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionWall;

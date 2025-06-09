
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

interface SubscriptionPlansProps {
  onPlanSelect: (plan: { duration: string; price: number; planType: string }) => void;
  onBack: () => void;
}

const SubscriptionPlans = ({ onPlanSelect, onBack }: SubscriptionPlansProps) => {
  const [selectedPlan, setSelectedPlan] = useState("");

  const plans = [
    {
      id: "1month",
      duration: "1 Month",
      price: 1000,
      description: "Perfect for getting started",
      features: ["Full access to all features", "Customer support", "Analytics dashboard"]
    },
    {
      id: "6months",
      duration: "6 Months",
      price: 5000,
      originalPrice: 6000,
      description: "Most popular choice",
      features: ["Full access to all features", "Priority customer support", "Advanced analytics", "Save 17%"]
    },
    {
      id: "1year",
      duration: "1 Year",
      price: 9000,
      originalPrice: 12000,
      description: "Best value for committed businesses",
      features: ["Full access to all features", "Priority customer support", "Advanced analytics", "Save 25%", "Free training sessions"]
    }
  ];

  const handleContinue = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    if (plan) {
      onPlanSelect({
        duration: plan.duration,
        price: plan.price,
        planType: selectedPlan
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Choose Your Subscription Plan</h2>
        <p className="text-sm text-gray-600">Select the plan that best fits your business needs</p>
      </div>

      <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4">
        {plans.map((plan) => (
          <Card key={plan.id} className={`cursor-pointer transition-colors ${
            selectedPlan === plan.id ? 'ring-2 ring-[#0794FE] bg-blue-50' : 'hover:bg-gray-50'
          }`}>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value={plan.id} id={plan.id} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{plan.duration}</CardTitle>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#E1275C]">{plan.price} DA</div>
                      {plan.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">{plan.originalPrice} DA</div>
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
      </RadioGroup>

      <div className="flex gap-3">
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
        >
          Back
        </Button>
        <Button 
          onClick={handleContinue}
          disabled={!selectedPlan}
          className="flex-1 bg-[#E1275C] hover:bg-[#C91F4F] text-white"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionPlans;

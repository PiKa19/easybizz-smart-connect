
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Shield } from "lucide-react";

interface PaymentFormProps {
  plan: { duration: string; price: number; planType: string };
  onPaymentSuccess: () => void;
  onBack: () => void;
}

const PaymentForm = ({ plan, onPaymentSuccess, onBack }: PaymentFormProps) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Complete Your Payment</h2>
        <p className="text-sm text-gray-600">Secure payment with Dahabiya</p>
      </div>

      {/* Order Summary */}
      <Card className="bg-gray-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Subscription Plan</span>
            <span className="font-medium">{plan.duration}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
            <span>Total</span>
            <span className="text-[#E1275C]">{plan.price} DA</span>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-[#0794FE]" />
            <CardTitle className="text-lg">Dahabiya Card Details</CardTitle>
          </div>
          <CardDescription>Enter your Dahabiya card information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardHolder" className="text-gray-700">Card Holder Name</Label>
              <Input
                id="cardHolder"
                type="text"
                placeholder="Enter name as shown on card"
                value={paymentData.cardHolder}
                onChange={(e) => setPaymentData(prev => ({ ...prev, cardHolder: e.target.value }))}
                required
                className="rounded-lg border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="text-gray-700">Card Number</Label>
              <Input
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                required
                className="rounded-lg border-gray-300"
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate" className="text-gray-700">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  value={paymentData.expiryDate}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  required
                  className="rounded-lg border-gray-300"
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv" className="text-gray-700">CVV</Label>
                <Input
                  id="cvv"
                  type="text"
                  placeholder="123"
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value }))}
                  required
                  className="rounded-lg border-gray-300"
                  maxLength={3}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
              <Shield className="w-4 h-4 text-green-600" />
              <span>Your payment information is encrypted and secure</span>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="button"
                onClick={onBack}
                variant="outline"
                className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
                disabled={isProcessing}
              >
                Back
              </Button>
              <Button 
                type="submit"
                disabled={isProcessing}
                className="flex-1 bg-[#E1275C] hover:bg-[#C91F4F] text-white"
              >
                {isProcessing ? "Processing..." : `Pay ${plan.price} DA`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentForm;

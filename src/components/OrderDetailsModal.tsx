
import React, { useState } from 'react';
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Download, 
  Send, 
  Upload, 
  Package, 
  Truck, 
  CreditCard, 
  MessageSquare,
  BarChart3,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

interface Order {
  id: string;
  supplier: string;
  date: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose }) => {
  const [message, setMessage] = useState('');
  
  // Mock data for detailed order information
  const orderDetails = {
    orderNumber: order.id,
    orderDate: order.date,
    supplier: order.supplier,
    globalStatus: order.status,
    totalAmount: order.amount,
    deliveryAddress: "123 Business Street, Algiers, Algeria",
    invoiceLink: "#",
    products: [
      {
        id: 1,
        image: "/lovable-uploads/75fa4299-081c-4a60-b0f2-2e05b0a82ad4.png",
        name: "Premium Olive Oil 5L",
        quantity: 2,
        unitPrice: 1200.00,
        lineTotal: 2400.00,
        status: "shipped",
        sku: "OLV-5L-001"
      },
      {
        id: 2,
        image: "/lovable-uploads/c644764e-0ea6-4962-913f-1137b4e0e713.png",
        name: "Organic Honey 1kg",
        quantity: 5,
        unitPrice: 520.00,
        lineTotal: 2600.00,
        status: "preparation",
        sku: "HNY-1K-002"
      }
    ],
    delivery: {
      company: "Fast Delivery DZ",
      transportContact: "+213 555 123 456",
      trackingCode: "FDZ123456789",
      trackingLink: "https://fastdelivery.dz/track/FDZ123456789",
      estimatedDate: "20/06/2025",
      status: "in_transit",
      address: "123 Business Street, Algiers, Algeria",
      instructions: "Call before delivery"
    },
    payment: {
      method: "Carte Dahabiya",
      amountPaid: 5000.00,
      status: "paid",
      reference: "DAH-20250615-001",
      proof: null,
      amountHT: 4237.29,
      vat: 762.71,
      totalTTC: 5000.00,
      amountDue: 0
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'preparation':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparation':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in_transit':
        return 'bg-purple-100 text-purple-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-[#0794FE]">
          Order Details - #{orderDetails.orderNumber}
        </DialogTitle>
      </DialogHeader>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="communication">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="font-semibold">{orderDetails.orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-semibold">{orderDetails.orderDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Supplier</p>
                <p className="font-semibold">{orderDetails.supplier}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Global Status</p>
                <Badge className={getStatusColor(orderDetails.globalStatus)}>
                  {orderDetails.globalStatus}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-semibold">{orderDetails.totalAmount.toFixed(2)} DZD</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Invoice</p>
                <Button variant="outline" size="sm" asChild>
                  <a href={orderDetails.invoiceLink} target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </a>
                </Button>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Delivery Address</p>
                <p className="font-semibold text-sm">{orderDetails.deliveryAddress}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ordered Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderDetails.products.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                      <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusIcon(product.status)}
                        <Badge className={getStatusColor(product.status)}>
                          {product.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Unit Price</p>
                      <p className="font-semibold">{product.unitPrice.toFixed(2)} DZD</p>
                      <p className="text-sm text-gray-600 mt-2">Line Total</p>
                      <p className="text-lg font-bold text-[#0794FE]">{product.lineTotal.toFixed(2)} DZD</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Delivery Company</p>
                  <p className="font-semibold">{orderDetails.delivery.company}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Transport Contact</p>
                  <p className="font-semibold">{orderDetails.delivery.transportContact}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tracking Code</p>
                  <p className="font-semibold">{orderDetails.delivery.trackingCode}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Date</p>
                  <p className="font-semibold">{orderDetails.delivery.estimatedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Delivery Status</p>
                  <Badge className={getStatusColor(orderDetails.delivery.status)}>
                    {orderDetails.delivery.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tracking Link</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href={orderDetails.delivery.trackingLink} target="_blank" rel="noopener noreferrer">
                      Track Package
                    </a>
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Delivery Address</p>
                <p className="font-semibold">{orderDetails.delivery.address}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Delivery Instructions</p>
                <p className="font-semibold">{orderDetails.delivery.instructions}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">Visual Timeline</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="text-xs mt-1">Order Prepared</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-green-500 mx-2"></div>
                  <div className="flex flex-col items-center">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="text-xs mt-1">Shipped</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-blue-500 mx-2"></div>
                  <div className="flex flex-col items-center">
                    <Clock className="w-6 h-6 text-blue-500" />
                    <span className="text-xs mt-1">In Transit</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
                  <div className="flex flex-col items-center">
                    <Clock className="w-6 h-6 text-gray-400" />
                    <span className="text-xs mt-1">Delivered</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-semibold">{orderDetails.payment.method}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Status</p>
                  <Badge className={getStatusColor(orderDetails.payment.status)}>{orderDetails.payment.status}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Reference</p>
                  <p className="font-semibold">{orderDetails.payment.reference}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Proof</p>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-1" />
                    Upload Proof
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Payment Details Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Amount Before Tax (HT)</span>
                    <span>{orderDetails.payment.amountHT.toFixed(2)} DZD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT (18%)</span>
                    <span>{orderDetails.payment.vat.toFixed(2)} DZD</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>Total Amount with Tax (TTC)</span>
                    <span>{orderDetails.payment.totalTTC.toFixed(2)} DZD</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Amount Paid</span>
                    <span>{orderDetails.payment.amountPaid.toFixed(2)} DZD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount Due</span>
                    <span>{orderDetails.payment.amountDue.toFixed(2)} DZD</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Client/Supplier Communication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-64 border rounded p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-[#0794FE]">Supplier ({orderDetails.supplier})</p>
                    <p className="text-sm">Your order has been prepared and will be shipped tomorrow.</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg ml-8">
                    <p className="text-sm font-semibold">You</p>
                    <p className="text-sm">Thank you for the update. Please ensure careful packaging.</p>
                    <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-[#0794FE]">Supplier ({orderDetails.supplier})</p>
                    <p className="text-sm">Package has been dispatched. Tracking code: {orderDetails.delivery.trackingCode}</p>
                    <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button className="bg-[#0794FE] hover:bg-[#0670CC]">
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-2">View Past Replies</h4>
                <Button variant="outline" size="sm">
                  Load More Messages
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Statistics & History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-[#0794FE]">2 days</p>
                  <p className="text-sm text-gray-600">Processing Time</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">15%</p>
                  <p className="text-sm text-gray-600">Price Comparison</p>
                  <p className="text-xs text-gray-500">Better vs Market</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">7</p>
                  <p className="text-sm text-gray-600">Quantity Analysis</p>
                  <p className="text-xs text-gray-500">Items Ordered</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">High</p>
                  <p className="text-sm text-gray-600">Critical Product Alert</p>
                  <p className="text-xs text-gray-500">Demand Status</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default OrderDetailsModal;

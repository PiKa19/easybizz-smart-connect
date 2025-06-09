
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Minus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CartItem {
  id: number;
  product: any;
  quantity: number;
  seller: any;
  unitPrice: number;
  totalPrice: number;
}

interface CartPageProps {
  cartItems: CartItem[];
  onRemoveItem: (itemId: number) => void;
  onUpdateQuantity: (itemId: number, newQuantity: number) => void;
}

const CartPage = ({ cartItems, onRemoveItem, onUpdateQuantity }: CartPageProps) => {
  const [selectedDelivery, setSelectedDelivery] = useState('standard');

  const deliveryOptions = [
    { id: 'standard', name: 'Standard Delivery - ZR express', price: 1500 },
    { id: 'express', name: 'Express Delivery - 24h', price: 2500 },
    { id: 'premium', name: 'Premium Delivery - Same day', price: 3500 },
  ];

  const selectedDeliveryOption = deliveryOptions.find(option => option.id === selectedDelivery);
  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryPrice = selectedDeliveryOption?.price || 0;
  const total = subtotal + deliveryPrice;

  const groupedItems = cartItems.reduce((groups, item) => {
    const sellerName = item.seller.name;
    if (!groups[sellerName]) {
      groups[sellerName] = [];
    }
    groups[sellerName].push(item);
    return groups;
  }, {} as Record<string, CartItem[]>);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Your cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              🛒
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">Your cart is empty</h3>
          <p className="text-gray-500">Add some products to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {Object.entries(groupedItems).map(([sellerName, items]) => (
              <div key={sellerName} className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">you are buying from</span>
                  <span className="font-medium text-gray-800">{sellerName}</span>
                  <span className="text-sm text-gray-600">By buying from this seller you accept their</span>
                  <Button variant="link" className="p-0 h-auto text-blue-600 text-sm">
                    terms and conditions
                  </Button>
                </div>

                {items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-16 h-16 object-contain bg-gray-50 rounded-lg"
                        />
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">{item.product.name}</h3>
                          <p className="text-sm text-gray-600">{item.product.description}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                if (item.quantity > 1) {
                                  onUpdateQuantity(item.id, item.quantity - 1);
                                }
                              }}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveItem(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-gray-600">Unit price</div>
                          <div className="font-bold text-gray-800">{item.unitPrice} DZD</div>
                          <div className="text-sm text-gray-600">Total price</div>
                          <div className="font-bold text-gray-800">{item.totalPrice} DZD</div>
                          <div className="text-xs text-gray-500">Including VAT</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button variant="link" className="text-blue-600">
                  Buy more from this seller
                </Button>
              </div>
            ))}
          </div>

          {/* Delivery Service & Summary */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-800 mb-4">Delivery service</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Require delivery :
                    </label>
                    <Select value={selectedDelivery} onValueChange={setSelectedDelivery}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select delivery option" />
                      </SelectTrigger>
                      <SelectContent>
                        {deliveryOptions.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.name} - {option.price} DZD
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal :</span>
                    <span>{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery :</span>
                    <span>{deliveryPrice}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{total}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-[#0794FE] hover:bg-[#0670CC] text-white">
                  Confirm order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

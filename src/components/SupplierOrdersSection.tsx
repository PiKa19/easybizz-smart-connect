
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface Order {
  orderReference: string;
  client: {
    name: string;
    contact: string;
  };
  products: string[];
  quantity: number;
  orderDate: string;
  deliveryDate: string;
  deliveryStatus: 'Preparing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: 'Dahabiya' | 'CIB' | 'Cash on Delivery';
  totalPrice: number;
  invoiceLink: string;
  notes: string;
  deliveryAddress: string;
  returnStatus?: string;
}

const initialOrders: Order[] = [
  {
    orderReference: 'ORD-10545',
    client: { name: 'Boutique Lina', contact: '07 10 23 55 90' },
    products: ['Product A', 'Product B'],
    quantity: 5,
    orderDate: '15/06/2025, 09:15',
    deliveryDate: '17/06/2025',
    deliveryStatus: 'Preparing',
    paymentMethod: 'CIB',
    totalPrice: 1850.00,
    invoiceLink: '#',
    notes: 'Please deliver in the morning.',
    deliveryAddress: '123 Rue de la Liberte, Algiers',
  },
  {
    orderReference: 'ORD-10546',
    client: { name: 'Superette Amine', contact: '06 90 17 13 17' },
    products: ['Product C'],
    quantity: 10,
    orderDate: '16/06/2025, 10:50',
    deliveryDate: '18/06/2025',
    deliveryStatus: 'Shipped',
    paymentMethod: 'Cash on Delivery',
    totalPrice: 900.00,
    invoiceLink: '#',
    notes: '',
    deliveryAddress: '45 Avenue des Martyrs, Oran',
    returnStatus: 'N/A'
  },
];

const SupplierOrdersSection: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (orderReference: string, newStatus: Order['deliveryStatus']) => {
    setOrders(currentOrders =>
      currentOrders.map(order =>
        order.orderReference === orderReference
          ? { ...order, deliveryStatus: newStatus }
          : order
      )
    );
  };

  const filteredOrders = orders.filter(order =>
    order.orderReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Orders</h2>
      <p className="text-muted-foreground mb-6">Manage and track your orders, update their status & view order details.</p>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Recherche..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">Filtrage</Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#0794FE] text-white">
              <tr>
                <th className="p-3 text-left">Order Reference</th>
                <th className="p-3 text-left">Client Name / Boutique</th>
                <th className="p-3 text-left">Product(s) Ordered</th>
                <th className="p-3 text-left">Quantity</th>
                <th className="p-3 text-left">Order Date</th>
                <th className="p-3 text-left">Delivery Date</th>
                <th className="p-3 text-left">Delivery Status</th>
                <th className="p-3 text-left">Payment Method</th>
                <th className="p-3 text-left">Total Price</th>
                <th className="p-3 text-left">Invoice Link</th>
                <th className="p-3 text-left">Notes / Comments</th>
                <th className="p-3 text-left">Delivery Address</th>
                <th className="p-3 text-left">Return Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.orderReference} className="border-b hover:bg-gray-50">
                  <td className="p-3">{order.orderReference}</td>
                  <td className="p-3">
                    <div className="font-medium">{order.client.name}</div>
                    <div className="text-xs text-muted-foreground">{order.client.contact}</div>
                  </td>
                  <td className="p-3">{order.products.join(', ')}</td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3">{order.orderDate}</td>
                  <td className="p-3">{order.deliveryDate}</td>
                  <td className="p-3">
                   <Select
                    value={order.deliveryStatus}
                    onValueChange={(value: Order['deliveryStatus']) => handleStatusChange(order.orderReference, value)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Preparing">Preparing</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  </td>
                  <td className="p-3">{order.paymentMethod}</td>
                  <td className="p-3">{order.totalPrice.toFixed(2)} DZD</td>
                  <td className="p-3">
                    <Button variant="outline" size="sm" asChild>
                      <a href={order.invoiceLink} target="_blank" rel="noopener noreferrer">View Invoice</a>
                    </Button>
                  </td>
                  <td className="p-3 truncate max-w-[200px]">{order.notes}</td>
                  <td className="p-3 truncate max-w-[200px]">{order.deliveryAddress}</td>
                  <td className="p-3">{order.returnStatus || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupplierOrdersSection;

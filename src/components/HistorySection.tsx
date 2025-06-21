import React, { useState, useContext, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LanguageContext } from '@/contexts/LanguageContext';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar as CalendarIcon,
  ChevronDown,
  Receipt,
  Package,
  Users,
  CreditCard,
  Activity
} from "lucide-react";
import { format } from "date-fns";

// Mock data interfaces
interface Transaction {
  id: string;
  date: string;
  time: string;
  clientName: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  paymentMethod: string;
  cashier: string;
  status: 'Completed' | 'Refunded' | 'Pending';
}

interface OrderHistory {
  orderRef: string;
  status: 'Delivered' | 'Pending' | 'Cancelled';
  deliveryDate: string;
  clientSupplier: string;
  amount: number;
  paymentStatus: 'Paid' | 'Pending' | 'Overdue';
  createdBy: string;
  createdDate: string;
}

interface InventoryMovement {
  id: string;
  productName: string;
  action: 'Added' | 'Sold' | 'Removed' | 'Returned';
  quantity: number;
  reason: string;
  date: string;
  time: string;
  user: string;
}

interface UserActivity {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  affectedItem: string;
  details: string;
}

interface PaymentHistory {
  paymentRef: string;
  clientSupplier: string;
  linkedTransaction: string;
  date: string;
  paymentMethod: string;
  amount: number;
  status: 'Completed' | 'Failed' | 'Pending';
}

const HistorySection = () => {
  const { t } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState('transactions');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [selectedFilters, setSelectedFilters] = useState({
    status: 'all',
    paymentMethod: 'all',
    user: 'all',
    category: 'all'
  });
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Mock data
  const transactions: Transaction[] = [
    {
      id: "TXN-001",
      date: "2024-12-15",
      time: "14:30",
      clientName: "Ahmed Benali",
      items: [
        { name: "Coca-Cola 2L", quantity: 2, price: 150 },
        { name: "Elio Oil 5L", quantity: 1, price: 790 }
      ],
      totalAmount: 1090,
      paymentMethod: "Cash",
      cashier: "Mohamed",
      status: "Completed"
    },
    {
      id: "TXN-002",
      date: "2024-12-15",
      time: "15:45",
      clientName: "Fatima Khelil",
      items: [
        { name: "Skor Civital 2KG", quantity: 1, price: 290 },
        { name: "La Vache qui rit 24p", quantity: 2, price: 450 }
      ],
      totalAmount: 1190,
      paymentMethod: "Card",
      cashier: "Anis",
      status: "Completed"
    },
    {
      id: "TXN-003",
      date: "2024-12-14",
      time: "10:15",
      clientName: "Karim Messaoud",
      items: [
        { name: "Cheezy 24p", quantity: 1, price: 390 }
      ],
      totalAmount: 390,
      paymentMethod: "Cash",
      cashier: "Mohamed",
      status: "Refunded"
    }
  ];

  const orderHistory: OrderHistory[] = [
    {
      orderRef: "ORD-10545",
      status: "Delivered",
      deliveryDate: "2024-12-16",
      clientSupplier: "FRS Semmar",
      amount: 5000,
      paymentStatus: "Paid",
      createdBy: "Baraka",
      createdDate: "2024-12-15"
    },
    {
      orderRef: "ORD-10546",
      status: "Pending",
      deliveryDate: "2024-12-18",
      clientSupplier: "Fresh Foods Algeria",
      amount: 3500,
      paymentStatus: "Pending",
      createdBy: "Baraka",
      createdDate: "2024-12-15"
    }
  ];

  const inventoryMovements: InventoryMovement[] = [
    {
      id: "INV-001",
      productName: "Coca-Cola 2L",
      action: "Sold",
      quantity: 2,
      reason: "Customer purchase",
      date: "2024-12-15",
      time: "14:30",
      user: "Mohamed"
    },
    {
      id: "INV-002",
      productName: "Elio Oil 5L",
      action: "Added",
      quantity: 50,
      reason: "New stock delivery",
      date: "2024-12-15",
      time: "09:00",
      user: "Baraka"
    },
    {
      id: "INV-003",
      productName: "Cheezy 24p",
      action: "Returned",
      quantity: 1,
      reason: "Customer return",
      date: "2024-12-14",
      time: "16:20",
      user: "Anis"
    }
  ];

  const userActivities: UserActivity[] = [
    {
      id: "ACT-001",
      action: "Added new product",
      user: "Baraka",
      timestamp: "2024-12-15 09:15",
      affectedItem: "Nestlé Water 1.5L",
      details: "Added new product to inventory"
    },
    {
      id: "ACT-002",
      action: "Edited price",
      user: "Mohamed",
      timestamp: "2024-12-15 11:30",
      affectedItem: "Coca-Cola 2L",
      details: "Changed price from 140 DZD to 150 DZD"
    },
    {
      id: "ACT-003",
      action: "Processed refund",
      user: "Anis",
      timestamp: "2024-12-14 16:25",
      affectedItem: "TXN-003",
      details: "Refunded transaction for Cheezy 24p"
    }
  ];

  const paymentHistory: PaymentHistory[] = [
    {
      paymentRef: "PAY-001",
      clientSupplier: "Ahmed Benali",
      linkedTransaction: "TXN-001",
      date: "2024-12-15",
      paymentMethod: "Cash",
      amount: 1090,
      status: "Completed"
    },
    {
      paymentRef: "PAY-002",
      clientSupplier: "FRS Semmar",
      linkedTransaction: "ORD-10545",
      date: "2024-12-16",
      paymentMethod: "Bank Transfer",
      amount: 5000,
      status: "Completed"
    }
  ];

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'delivered':
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
      case 'cancelled':
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'overdue':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'added':
        return 'bg-green-100 text-green-800';
      case 'sold':
        return 'bg-blue-100 text-blue-800';
      case 'removed':
        return 'bg-red-100 text-red-800';
      case 'returned':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredData = useMemo(() => {
    const filterBySearch = (items: any[], searchFields: string[]) => {
      if (!searchTerm) return items;
      return items.filter(item =>
        searchFields.some(field => {
          const value = field.split('.').reduce((obj, key) => obj?.[key], item);
          return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    };

    const filterByDate = (items: any[], dateField: string) => {
      if (!dateRange.from && !dateRange.to) return items;
      return items.filter(item => {
        const itemDate = new Date(item[dateField]);
        if (dateRange.from && itemDate < dateRange.from) return false;
        if (dateRange.to && itemDate > dateRange.to) return false;
        return true;
      });
    };

    switch (activeTab) {
      case 'transactions':
        let filteredTransactions = filterBySearch(transactions, ['id', 'clientName', 'cashier', 'items.name']);
        filteredTransactions = filterByDate(filteredTransactions, 'date');
        if (selectedFilters.status !== 'all') {
          filteredTransactions = filteredTransactions.filter(t => t.status.toLowerCase() === selectedFilters.status);
        }
        if (selectedFilters.paymentMethod !== 'all') {
          filteredTransactions = filteredTransactions.filter(t => t.paymentMethod.toLowerCase() === selectedFilters.paymentMethod);
        }
        return filteredTransactions;

      case 'orders':
        let filteredOrders = filterBySearch(orderHistory, ['orderRef', 'clientSupplier', 'createdBy']);
        filteredOrders = filterByDate(filteredOrders, 'createdDate');
        if (selectedFilters.status !== 'all') {
          filteredOrders = filteredOrders.filter(o => o.status.toLowerCase() === selectedFilters.status);
        }
        return filteredOrders;

      case 'inventory':
        let filteredInventory = filterBySearch(inventoryMovements, ['productName', 'user', 'reason']);
        filteredInventory = filterByDate(filteredInventory, 'date');
        if (selectedFilters.category !== 'all') {
          filteredInventory = filteredInventory.filter(i => i.action.toLowerCase() === selectedFilters.category);
        }
        return filteredInventory;

      case 'activities':
        let filteredActivities = filterBySearch(userActivities, ['action', 'user', 'affectedItem']);
        if (selectedFilters.user !== 'all') {
          filteredActivities = filteredActivities.filter(a => a.user.toLowerCase() === selectedFilters.user);
        }
        return filteredActivities;

      case 'payments':
        let filteredPayments = filterBySearch(paymentHistory, ['paymentRef', 'clientSupplier', 'linkedTransaction']);
        filteredPayments = filterByDate(filteredPayments, 'date');
        if (selectedFilters.status !== 'all') {
          filteredPayments = filteredPayments.filter(p => p.status.toLowerCase() === selectedFilters.status);
        }
        return filteredPayments;

      default:
        return [];
    }
  }, [activeTab, searchTerm, dateRange, selectedFilters, transactions, orderHistory, inventoryMovements, userActivities, paymentHistory]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0794FE] mb-2">History</h1>
          <p className="text-gray-600">Track all your business activities and transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search transactions, orders, products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Date Range */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd")}`
                    ) : (
                      format(dateRange.from, "MMM dd, yyyy")
                    )
                  ) : (
                    "Pick a date"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            {/* Status Filter */}
            <Select value={selectedFilters.status} onValueChange={(value) => setSelectedFilters(prev => ({ ...prev, status: value }))}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <Receipt className="w-4 h-4" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="activities" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Activities
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Payments
          </TabsTrigger>
        </TabsList>

        {/* Transaction History */}
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredData.map((transaction: Transaction) => (
                  <div key={transaction.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-semibold">{transaction.id}</div>
                          <div className="text-sm text-gray-600">{transaction.date} at {transaction.time}</div>
                        </div>
                        <div>
                          <div className="font-medium">{transaction.clientName}</div>
                          <div className="text-sm text-gray-600">Cashier: {transaction.cashier}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold text-lg">{transaction.totalAmount} DZD</div>
                          <div className="text-sm text-gray-600">{transaction.paymentMethod}</div>
                        </div>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpanded(transaction.id)}
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${expandedItems.has(transaction.id) ? 'rotate-180' : ''}`} />
                        </Button>
                      </div>
                    </div>
                    {expandedItems.has(transaction.id) && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-medium mb-2">Items:</h4>
                        <div className="space-y-2">
                          {transaction.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                              <span>{item.name}</span>
                              <span>{item.quantity} × {item.price} DZD = {item.quantity * item.price} DZD</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Order History */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredData.map((order: OrderHistory) => (
                  <div key={order.orderRef} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-semibold">{order.orderRef}</div>
                          <div className="text-sm text-gray-600">Created: {order.createdDate}</div>
                        </div>
                        <div>
                          <div className="font-medium">{order.clientSupplier}</div>
                          <div className="text-sm text-gray-600">By: {order.createdBy}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold text-lg">{order.amount} DZD</div>
                          <div className="text-sm text-gray-600">Delivery: {order.deliveryDate}</div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <Badge className={getStatusColor(order.paymentStatus)}>
                            {order.paymentStatus}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Movement */}
        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Movement Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredData.map((movement: InventoryMovement) => (
                  <div key={movement.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-semibold">{movement.productName}</div>
                          <div className="text-sm text-gray-600">{movement.date} at {movement.time}</div>
                        </div>
                        <Badge className={getActionColor(movement.action)}>
                          {movement.action}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold">Qty: {movement.quantity}</div>
                          <div className="text-sm text-gray-600">By: {movement.user}</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      Reason: {movement.reason}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Activities */}
        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <CardTitle>User Activity History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredData.map((activity: UserActivity) => (
                  <div key={activity.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-semibold">{activity.action}</div>
                          <div className="text-sm text-gray-600">{activity.timestamp}</div>
                        </div>
                        <div>
                          <div className="font-medium">User: {activity.user}</div>
                          <div className="text-sm text-gray-600">Item: {activity.affectedItem}</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      {activity.details}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment History */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredData.map((payment: PaymentHistory) => (
                  <div key={payment.paymentRef} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-semibold">{payment.paymentRef}</div>
                          <div className="text-sm text-gray-600">{payment.date}</div>
                        </div>
                        <div>
                          <div className="font-medium">{payment.clientSupplier}</div>
                          <div className="text-sm text-gray-600">Linked: {payment.linkedTransaction}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold text-lg">{payment.amount} DZD</div>
                          <div className="text-sm text-gray-600">{payment.paymentMethod}</div>
                        </div>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HistorySection;
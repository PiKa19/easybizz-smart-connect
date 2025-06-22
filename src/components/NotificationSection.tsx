
import React, { useState, useContext } from 'react';
import { 
  Bell, 
  Package, 
  ShoppingCart, 
  AlertTriangle, 
  TrendingUp, 
  Settings, 
  Check, 
  X,
  Clock,
  User,
  Shield,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LanguageContext } from '@/contexts/LanguageContext';

// Mock notification data
const mockNotifications = {
  orders: [
    {
      id: 1,
      title: "New Order Received",
      message: "Order #ORD-2024-001 from Client ABC",
      time: "2 minutes ago",
      status: "unread",
      type: "new_order"
    },
    {
      id: 2,
      title: "Order Delivered",
      message: "Order #ORD-2024-002 has been delivered successfully",
      time: "1 hour ago",
      status: "read",
      type: "delivered"
    },
    {
      id: 3,
      title: "Order Cancelled",
      message: "Order #ORD-2024-003 cancelled by customer",
      time: "3 hours ago",
      status: "unread",
      type: "cancelled"
    }
  ],
  system: [
    {
      id: 4,
      title: "New Device Login",
      message: "Login detected from new device (Chrome, Windows)",
      time: "30 minutes ago",
      status: "unread",
      type: "security"
    },
    {
      id: 5,
      title: "Backup Completed",
      message: "Daily data backup completed successfully",
      time: "2 hours ago",
      status: "read",
      type: "backup"
    },
    {
      id: 6,
      title: "Sync Failed",
      message: "Cloud sync failed - please check connection",
      time: "4 hours ago",
      status: "unread",
      type: "error"
    }
  ],
  inventory: [
    {
      id: 7,
      title: "Low Stock Alert",
      message: "Coca Cola 330ml - Only 5 units remaining",
      time: "1 hour ago",
      status: "unread",
      type: "low_stock"
    },
    {
      id: 8,
      title: "Out of Stock",
      message: "Bread Loaf is now out of stock",
      time: "2 hours ago",
      status: "unread",
      type: "out_of_stock"
    },
    {
      id: 9,
      title: "Stock Added",
      message: "50 units of Rice 1kg added to inventory",
      time: "5 hours ago",
      status: "read",
      type: "stock_added"
    }
  ],
  trending: [
    {
      id: 10,
      title: "New Product Available",
      message: "iPhone 15 Pro Max now available from Supplier Tech",
      time: "3 hours ago",
      status: "unread",
      type: "new_product"
    },
    {
      id: 11,
      title: "Trending Product",
      message: "Samsung Galaxy S24 is trending in your area",
      time: "6 hours ago",
      status: "read",
      type: "trending"
    },
    {
      id: 12,
      title: "Best Seller Alert",
      message: "Wireless Earbuds are best selling this week",
      time: "1 day ago",
      status: "read",
      type: "best_seller"
    }
  ]
};

const NotificationSection = () => {
  const { t } = useContext(LanguageContext);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState('orders');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_order':
      case 'delivered':
      case 'cancelled':
        return <ShoppingCart className="w-5 h-5" />;
      case 'security':
        return <Shield className="w-5 h-5" />;
      case 'backup':
        return <Check className="w-5 h-5" />;
      case 'error':
        return <X className="w-5 h-5" />;
      case 'low_stock':
      case 'out_of_stock':
      case 'stock_added':
        return <Package className="w-5 h-5" />;
      case 'new_product':
      case 'trending':
      case 'best_seller':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'new_order':
        return 'bg-blue-100 text-blue-600';
      case 'delivered':
        return 'bg-green-100 text-green-600';
      case 'cancelled':
        return 'bg-red-100 text-red-600';
      case 'security':
        return 'bg-orange-100 text-orange-600';
      case 'backup':
        return 'bg-green-100 text-green-600';
      case 'error':
        return 'bg-red-100 text-red-600';
      case 'low_stock':
      case 'out_of_stock':
        return 'bg-yellow-100 text-yellow-600';
      case 'stock_added':
        return 'bg-green-100 text-green-600';
      case 'new_product':
      case 'trending':
      case 'best_seller':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const markAsRead = (notificationId: number, category: string) => {
    setNotifications(prev => ({
      ...prev,
      [category]: prev[category].map(notification =>
        notification.id === notificationId
          ? { ...notification, status: 'read' }
          : notification
      )
    }));
  };

  const markAllAsRead = (category: string) => {
    setNotifications(prev => ({
      ...prev,
      [category]: prev[category].map(notification => ({
        ...notification,
        status: 'read'
      }))
    }));
  };

  const getUnreadCount = (category: string) => {
    return notifications[category].filter(n => n.status === 'unread').length;
  };

  const renderNotificationList = (notificationList: any[], category: string) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">
          {category.charAt(0).toUpperCase() + category.slice(1)} Notifications
        </h3>
        {getUnreadCount(category) > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => markAllAsRead(category)}
          >
            Mark All as Read
          </Button>
        )}
      </div>
      
      {notificationList.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No notifications yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {notificationList.map((notification) => (
            <Card 
              key={notification.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                notification.status === 'unread' ? 'border-l-4 border-l-blue-500 bg-blue-50/50' : ''
              }`}
              onClick={() => markAsRead(notification.id, category)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {notification.title}
                      </h4>
                      {notification.status === 'unread' && (
                        <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">
                          New
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {notification.time}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const totalUnread = Object.keys(notifications).reduce((total, key) => {
    return total + getUnreadCount(key);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Notifications</h1>
          <p className="text-gray-600">Stay updated with all your business activities</p>
        </div>
        {totalUnread > 0 && (
          <Badge variant="destructive" className="text-lg px-3 py-1">
            {totalUnread} Unread
          </Badge>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="orders" className="relative">
            Orders
            {getUnreadCount('orders') > 0 && (
              <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">
                {getUnreadCount('orders')}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="system" className="relative">
            System
            {getUnreadCount('system') > 0 && (
              <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">
                {getUnreadCount('system')}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="inventory" className="relative">
            Inventory
            {getUnreadCount('inventory') > 0 && (
              <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">
                {getUnreadCount('inventory')}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="trending" className="relative">
            Trending
            {getUnreadCount('trending') > 0 && (
              <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">
                {getUnreadCount('trending')}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6">
          {renderNotificationList(notifications.orders, 'orders')}
        </TabsContent>

        <TabsContent value="system" className="mt-6">
          {renderNotificationList(notifications.system, 'system')}
        </TabsContent>

        <TabsContent value="inventory" className="mt-6">
          {renderNotificationList(notifications.inventory, 'inventory')}
        </TabsContent>

        <TabsContent value="trending" className="mt-6">
          {renderNotificationList(notifications.trending, 'trending')}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationSection;


import React, { useState } from 'react';
import { 
  Bell, 
  ShoppingCart, 
  AlertTriangle, 
  Check, 
  X,
  Clock,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock notification data for supplier
const mockSupplierNotifications = {
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
  ]
};

const SupplierNotificationSection = () => {
  const [notifications, setNotifications] = useState(mockSupplierNotifications);
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
        <TabsList className="grid w-full grid-cols-2">
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
        </TabsList>

        <TabsContent value="orders" className="mt-6">
          {renderNotificationList(notifications.orders, 'orders')}
        </TabsContent>

        <TabsContent value="system" className="mt-6">
          {renderNotificationList(notifications.system, 'system')}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierNotificationSection;

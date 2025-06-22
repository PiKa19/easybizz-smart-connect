
import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ShoppingCart, Package, Users, TrendingUp, Bell, Settings, 
  BarChart3, MessageSquare, Clock, Calendar, Store, Truck,
  CreditCard, FileText, Star, AlertTriangle
} from "lucide-react";
import { LanguageContext } from '@/contexts/LanguageContext';
import OrdersSection from './OrdersSection';
import ProductsSection from './ProductsSection';
import InventorySection from './InventorySection';
import AnalyticsDashboard from './AnalyticsDashboard';
import CashierSection from './CashierSection';
import ClientTable from './ClientTable';
import BoutiqueSection from './BoutiqueSection';
import HistorySection from './HistorySection';
import MessagingSection from './MessagingSection';
import NotificationSection from './NotificationSection';
import SettingsSection from './SettingsSection';
import BizzSection from './BizzSection';

type Section = 
  | 'home' 
  | 'orders' 
  | 'products' 
  | 'inventory' 
  | 'analytics' 
  | 'cashier' 
  | 'clients' 
  | 'boutique' 
  | 'history' 
  | 'messaging' 
  | 'notifications' 
  | 'settings'
  | 'bizz';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const { t } = useContext(LanguageContext);
  const [currentSection, setCurrentSection] = useState<Section>('home');

  const navigateToSection = (section: Section) => {
    setCurrentSection(section);
  };

  const handleBackToHome = () => {
    setCurrentSection('home');
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'orders':
        return <OrdersSection onBack={handleBackToHome} onNavigateToBizz={() => navigateToSection('bizz')} />;
      case 'products':
        return <ProductsSection onBack={handleBackToHome} />;
      case 'inventory':
        return <InventorySection onBack={handleBackToHome} />;
      case 'analytics':
        return <AnalyticsDashboard onBack={handleBackToHome} />;
      case 'cashier':
        return <CashierSection onBack={handleBackToHome} />;
      case 'clients':
        return <ClientTable onBack={handleBackToHome} />;
      case 'boutique':
        return <BoutiqueSection onBack={handleBackToHome} />;
      case 'history':
        return <HistorySection onBack={handleBackToHome} />;
      case 'messaging':
        return <MessagingSection onBack={handleBackToHome} />;
      case 'notifications':
        return <NotificationSection onBack={handleBackToHome} />;
      case 'settings':
        return <SettingsSection onBack={handleBackToHome} />;
      case 'bizz':
        return <BizzSection onBack={handleBackToHome} />;
      default:
        return renderHomeSection();
    }
  };

  const renderHomeSection = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('dashboard_title')}</h1>
          <p className="text-gray-600">{t('dashboard_subtitle')}</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-green-100 text-green-800 px-3 py-1">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            {t('store_status_open')}
          </Badge>
          <div className="text-right text-sm">
            <p className="text-gray-600">{t('today_sales')}</p>
            <p className="font-semibold text-lg">12,450 {t('currency')}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">{t('total_sales')}</p>
                <p className="text-2xl font-bold text-blue-800">847,230</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12.5% {t('from_yesterday')}
                </p>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 mb-1">{t('products_sold')}</p>
                <p className="text-2xl font-bold text-green-800">2,341</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8.2% {t('from_yesterday')}
                </p>
              </div>
              <div className="bg-green-500 p-3 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 mb-1">{t('active_orders')}</p>
                <p className="text-2xl font-bold text-orange-800">127</p>
                <p className="text-xs text-orange-600 flex items-center mt-1">
                  <Clock className="w-3 h-3 mr-1" />
                  5 {t('urgent')}
                </p>
              </div>
              <div className="bg-orange-500 p-3 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 mb-1">{t('customers')}</p>
                <p className="text-2xl font-bold text-purple-800">1,234</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Users className="w-3 h-3 mr-1" />
                  +23 {t('new_today')}
                </p>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[
          { 
            key: 'orders', 
            title: t('orders'), 
            icon: Package, 
            description: t('manage_orders'),
            color: 'bg-blue-500',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200'
          },
          { 
            key: 'products', 
            title: t('products'), 
            icon: ShoppingCart, 
            description: t('manage_products'),
            color: 'bg-green-500',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200'
          },
          { 
            key: 'inventory', 
            title: t('inventory'), 
            icon: Package, 
            description: t('track_stock'),
            color: 'bg-orange-500',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200'
          },
          { 
            key: 'analytics', 
            title: t('analytics'), 
            icon: BarChart3, 
            description: t('view_reports'),
            color: 'bg-purple-500',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200'
          },
          { 
            key: 'cashier', 
            title: t('cashier'), 
            icon: CreditCard, 
            description: t('pos_system'),
            color: 'bg-red-500',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200'
          },
          { 
            key: 'clients', 
            title: t('clients'), 
            icon: Users, 
            description: t('manage_customers'),
            color: 'bg-indigo-500',
            bgColor: 'bg-indigo-50',
            borderColor: 'border-indigo-200'
          },
          { 
            key: 'boutique', 
            title: t('boutique'), 
            icon: Store, 
            description: t('store_management'),
            color: 'bg-pink-500',
            bgColor: 'bg-pink-50',
            borderColor: 'border-pink-200'
          },
          { 
            key: 'history', 
            title: t('history'), 
            icon: Clock, 
            description: t('transaction_history'),
            color: 'bg-gray-500',
            bgColor: 'bg-gray-50',
            borderColor: 'border-gray-200'
          },
          { 
            key: 'messaging', 
            title: t('messaging'), 
            icon: MessageSquare, 
            description: t('chat_communication'),
            color: 'bg-cyan-500',
            bgColor: 'bg-cyan-50',
            borderColor: 'border-cyan-200'
          },
          { 
            key: 'bizz', 
            title: t('bizz'), 
            icon: Truck, 
            description: t('business_operations'),
            color: 'bg-amber-500',
            bgColor: 'bg-amber-50',
            borderColor: 'border-amber-200'
          },
          { 
            key: 'notifications', 
            title: t('notifications'), 
            icon: Bell, 
            description: t('alerts_updates'),
            color: 'bg-yellow-500',
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-200'
          },
          { 
            key: 'settings', 
            title: t('settings'), 
            icon: Settings, 
            description: t('app_configuration'),
            color: 'bg-slate-500',
            bgColor: 'bg-slate-50',
            borderColor: 'border-slate-200'
          }
        ].map((item) => (
          <Card 
            key={item.key}
            className={`${item.bgColor} ${item.borderColor} hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer group`}
            onClick={() => navigateToSection(item.key as Section)}
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`p-4 rounded-full ${item.color} group-hover:scale-110 transition-transform duration-200`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              {t('recent_activities')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "10:30", action: t('new_order_received'), user: "Karim M.", status: "success" },
                { time: "09:45", action: t('payment_completed'), user: "Amina S.", status: "success" },
                { time: "09:20", action: t('stock_updated'), user: t('system'), status: "info" },
                { time: "08:55", action: t('new_customer_registered'), user: "Omar B.", status: "success" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' : 
                      activity.status === 'info' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.user}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              {t('alerts_notifications')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  type: "warning", 
                  title: t('low_stock_alert'), 
                  message: t('product_running_low', { product: "Huile 5L Elio" }),
                  time: "2h"
                },
                { 
                  type: "info", 
                  title: t('system_update'), 
                  message: t('backup_completed_successfully'),
                  time: "1d"
                },
                { 
                  type: "success", 
                  title: t('payment_received'), 
                  message: t('invoice_payment_confirmed'),
                  time: "3h"
                }
              ].map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'warning' ? 'bg-orange-500' : 
                    alert.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                  </div>
                  <span className="text-xs text-gray-400">{alert.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {renderCurrentSection()}
      </div>
    </div>
  );
};

export default Dashboard;

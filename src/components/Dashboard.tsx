import React, { useState, useContext } from 'react';
import {
  Home,
  ShoppingCart,
  BarChart3,
  Package,
  ClipboardList,
  Users,
  History,
  Bell,
  Calculator,
  Settings,
  LogOut,
  PackageOpen,
  Search
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LanguageContext } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import UserProfile from './UserProfile';
import SupplierSection from "./SupplierSection";
import MessagingSection from "./MessagingSection";
import CashierSection from "./CashierSection";
import BoutiqueSection from "./BoutiqueSection";
import ProductsSection from "./ProductsSection";
import OrdersSection from "./OrdersSection";
import BizzSection from "./BizzSection";
import SubscriptionWall from './SubscriptionWall';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const { t } = useContext(LanguageContext);
  const [activeSection, setActiveSection] = useState('home');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showSubscriptionWall, setShowSubscriptionWall] = useState(false);

  // Move daysLeft to state so it can be updated after payment
  const [daysLeft, setDaysLeft] = useState(() => Math.floor(Math.random() * 18) + 2);

  const menuItems = [
    { id: 'home', label: t('home'), icon: Home },
    { id: 'boutique', label: t('boutique'), icon: ShoppingCart },
    { id: 'bizz', label: t('bizz'), icon: ShoppingCart },
    { id: 'analytics', label: t('analytics'), icon: BarChart3 },
    { id: 'inventory', label: t('inventory'), icon: Package },
    { id: 'products', label: t('products'), icon: Package },
    { id: 'orders', label: t('orders'), icon: ClipboardList },
    { id: 'suppliers', label: t('suppliers'), icon: Users },
    { id: 'historique', label: t('historique'), icon: History },
    { id: 'notification', label: t('notification'), icon: Bell },
    { id: 'cashier', label: t('cashier'), icon: Calculator },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

  const handlePlanSelect = (plan: { duration: string; price: number; planType: string }) => {
    // For now just log the selected plan
    console.log("Plan selected:", plan);
    setShowSubscriptionWall(false);
    // Here you could proceed to payment
  };

  const handleBorrow = () => {
    // For this demo, just log and close modal, then maybe show a toast or notification
    console.log("User borrowed 3 days of access");
    setShowSubscriptionWall(false);
    // You could add logic here for actual access extension
  };

  const handleSubscriptionRenewed = () => {
    // For demo, reset to a new random value between 29 and 31 (simulates a full new period)
    setDaysLeft(Math.floor(Math.random() * 3) + 29);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-6">
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('welcome')}</h1>
              <p className="text-gray-600">{t('dashboard_greeting')}</p>
              <p className="text-sm text-gray-500">{t('dashboard_subtitle')}</p>
            </div>

            {/* --- New Navigation Buttons --- */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "secondary"}
                  className="flex flex-col items-center justify-center py-6 gap-2 shadow-sm h-32"
                  onClick={() => setActiveSection(item.id)}
                >
                  <item.icon className="w-7 h-7 mb-1" />
                  <span className="text-base font-medium">{item.label}</span>
                </Button>
              ))}
            </div>
            {/* --- End Navigation Buttons --- */}

            {/* Optionally, keep the original 3 cards below or remove if you want only the navigation buttons */}
            {/* 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('bizz')}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{t('buy_products')}</h3>
                      <p className="text-sm text-gray-600">{t('buy_products_desc')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('analytics')}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{t('view_analytics')}</h3>
                      <p className="text-sm text-gray-600">{t('view_analytics_desc')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('inventory')}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{t('inventory_management')}</h3>
                      <p className="text-sm text-gray-600">{t('inventory_management_desc')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            */}
          </div>
        );

      case 'boutique':
        return <BoutiqueSection onBack={() => setActiveSection('home')} />;

      case 'bizz':
        return <BizzSection onBack={() => setActiveSection('home')} />;

      case 'products':
        return <ProductsSection onBack={() => setActiveSection('home')} />;

      case 'orders':
        return <OrdersSection onBack={() => setActiveSection('home')} />;

      case 'suppliers':
        return <SupplierSection />;

      case 'messages':
        return <MessagingSection />;

      case 'cashier':
        return <CashierSection onBack={() => setActiveSection('home')} />;

      case 'inventory':
        return (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('section')}</h3>
            <p className="text-gray-500">{t('section_under_development')}</p>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('section')}</h3>
            <p className="text-gray-500">{t('section_under_development')}</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            {/* Logo replaces 'EasyBizz' text */}
            <img
              src="/lovable-uploads/5142faa5-d964-4021-b411-2ea1ad268901.png"
              alt="EasyBizz Logo"
              className="h-8 w-auto"
            />
          </div>
          <div className="flex items-center gap-4">
            {/* --- Subscription Days Left Section (Pink) --- */}
            <button
              className="relative flex items-center rounded-lg px-3 py-1 bg-[#E1275C] text-white font-semibold text-sm shadow hover:bg-[#C91F4F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E1275C]"
              title="Your subscription days left"
              onClick={() => setShowSubscriptionWall(true)}
              type="button"
            >
              {daysLeft} days left
            </button>
            {/* --- End Subscription Section --- */}

            <LanguageSwitcher />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder={t('search_product')}
                className="w-64 pl-10"
              />
            </div>
            <Button variant="ghost" size="sm">
              <Bell className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-[#0794FE] rounded-lg flex items-center justify-center text-white font-bold">
                B
              </div>
              <span className="hidden md:inline">Baraka</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">{t('logout')}</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white h-[calc(100vh-73px)] shadow-sm">
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-[#0794FE] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>

      {/* User Profile Modal */}
      <UserProfile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      {/* Subscription Wall Modal */}
      <SubscriptionWall
        open={showSubscriptionWall}
        onClose={() => setShowSubscriptionWall(false)}
        onPlanSelect={handlePlanSelect}
        onBorrow3Days={handleBorrow}
        onSubscriptionRenewed={handleSubscriptionRenewed}
      />
    </div>
  );
};

export default Dashboard;

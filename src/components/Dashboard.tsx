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
  Search
} from 'lucide-react';
import { LanguageContext } from '@/contexts/LanguageContext';
import UserProfile from './UserProfile';
import SupplierSection from "./SupplierSection";
import MessagingSection from "./MessagingSection";
import CashierSection from "./CashierSection";
import BoutiqueSection from "./BoutiqueSection";
import ProductsSection from "./ProductsSection";
import OrdersSection from "./OrdersSection";
import BizzSection from "./BizzSection";
import SubscriptionWall from './SubscriptionWall';
import InventorySection from "./InventorySection";
// Extracted components:
import DashboardHeader from './dashboard/DashboardHeader';
import DashboardSidebar from './dashboard/DashboardSidebar';
import HomeNavigationGrid from './dashboard/HomeNavigationGrid';

interface DashboardProps {
  onLogout: () => void;
}

const SIDEBAR_WIDTH = 256; // 64 * 4 = 256px (w-64)
const HEADER_HEIGHT = 73;  // px-6 py-4, h-16~h-20 (estimated/padded below)

const Dashboard = ({ onLogout }: DashboardProps) => {
  const { t } = useContext(LanguageContext);
  const [activeSection, setActiveSection] = useState('home');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showSubscriptionWall, setShowSubscriptionWall] = useState(false);
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

  const menuDescriptions: Record<string, string> = {
    home: t('dashboard_greeting'),
    boutique: t('buy_products_desc'),
    bizz: t('buy_products_desc'),
    analytics: t('view_analytics_desc'),
    inventory: t('inventory_management_desc'),
    products: t('manage_products') || 'Manage your listed products',
    orders: t('manage_orders') || 'View and manage your orders',
    suppliers: t('manage_suppliers') || 'View your suppliers and contacts',
    historique: t('section_under_development'),
    notification: t('section_under_development'),
    cashier: t('section_under_development'),
    settings: t('section_under_development'),
  };

  const handlePlanSelect = (plan: { duration: string; price: number; planType: string }) => {
    console.log("Plan selected:", plan);
    setShowSubscriptionWall(false);
  };

  const handleBorrow = () => {
    console.log("User borrowed 3 days of access");
    setShowSubscriptionWall(false);
  };

  const handleSubscriptionRenewed = () => {
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
            <HomeNavigationGrid
              menuItems={menuItems}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              menuDescriptions={menuDescriptions}
            />
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
        return <InventorySection />;

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
    <div className="min-h-screen bg-gray-50 relative">
      {/* Fixed Top Header */}
      <div
        className="fixed top-0 left-0 right-0 z-40"
        style={{ height: HEADER_HEIGHT }}
      >
        <DashboardHeader
          daysLeft={daysLeft}
          onSubscriptionClick={() => setShowSubscriptionWall(true)}
          onProfileOpen={() => setIsProfileOpen(true)}
          onLogout={onLogout}
          t={t}
        />
      </div>
      {/* Fixed Left Sidebar */}
      <div
        className="fixed top-[73px] left-0 z-30 h-[calc(100vh-73px)]"
        style={{ width: SIDEBAR_WIDTH }}
      >
        <DashboardSidebar
          menuItems={menuItems}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>
      {/* Main Content */}
      <main
        className="flex-1 p-6"
        style={{
          marginLeft: SIDEBAR_WIDTH,
          marginTop: HEADER_HEIGHT,
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
          background: "inherit"
        }}
      >
        {renderContent()}
      </main>
      <UserProfile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
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

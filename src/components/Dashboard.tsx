
import React, { useState, useContext, Suspense } from 'react';
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

const AnalyticsDashboard = React.lazy(() => import('./AnalyticsDashboard'));

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

  // Add motion and pleasant transitions for the main content
  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-10 animate-fade-in">
            <div className="flex flex-col items-start bg-gradient-to-br from-[#f5fcfd] to-[#edf6ff] p-7 rounded-2xl shadow-md border border-blue-50 transition-all duration-200 mb-6">
              <h1 className="text-3xl font-playfair font-bold text-gray-800 mb-1 tracking-tight drop-shadow-[0_0_4px_rgba(14,135,255,0.07)]">
                {t('welcome')}
              </h1>
              <p className="text-blue-700 text-xl font-semibold mb-1 transition-all duration-200">{t('dashboard_greeting')}</p>
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
        return <div className="animate-fade-in"><BoutiqueSection onBack={() => setActiveSection('home')} /></div>;
      case 'bizz':
        return <div className="animate-fade-in"><BizzSection onBack={() => setActiveSection('home')} /></div>;
      case 'products':
        return <div className="animate-fade-in"><ProductsSection onBack={() => setActiveSection('home')} /></div>;
      case 'orders':
        return <div className="animate-fade-in"><OrdersSection onBack={() => setActiveSection('home')} /></div>;
      case 'suppliers':
        return <div className="animate-fade-in"><SupplierSection /></div>;
      case 'messages':
        return <div className="animate-fade-in"><MessagingSection /></div>;
      case 'cashier':
        return <div className="animate-fade-in"><CashierSection onBack={() => setActiveSection('home')} /></div>;
      case 'inventory':
        return <div className="animate-fade-in"><InventorySection /></div>;
      case 'analytics':
        return (
          <div className="animate-fade-in scale-95 animate-scale-in duration-500">
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-[200px]">
                <span className="text-sm text-blue-600 animate-pulse">{t('loading') || "Loading KPIs..."}</span>
              </div>
            }>
              <AnalyticsDashboard />
            </Suspense>
          </div>
        );
      default:
        return (
          <div className="text-center py-12 animate-fade-in">
            <Package className="w-12 h-12 text-blue-200 mx-auto mb-4 drop-shadow-[0_0_4px_rgba(14,135,255,0.07)]" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('section')}</h3>
            <p className="text-gray-500">{t('section_under_development')}</p>
          </div>
        );
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-gradient-to-tr from-white via-blue-50 to-blue-100 relative overflow-x-hidden transition-colors duration-300"
    >
      {/* Fixed Top Header */}
      <div
        className="fixed top-0 left-0 right-0 z-40 drop-shadow-md"
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
        className="fixed top-[73px] left-0 z-30 h-[calc(100vh-73px)] shadow-xl"
        style={{ width: SIDEBAR_WIDTH }}
      >
        <DashboardSidebar
          menuItems={menuItems}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>
      {/* Main Content with smooth card feeling and subtle separators */}
      <main
        className="flex-1 p-8 md:p-12 xl:p-14"
        style={{
          marginLeft: SIDEBAR_WIDTH,
          marginTop: HEADER_HEIGHT,
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
          background: "inherit",
          transition: "padding 0.2s"
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl shadow-lg border border-blue-100/70 p-6 md:p-10 bg-white/90 animate-fade-in transition-all duration-200">
            {renderContent()}
          </div>
        </div>
      </main>
      <UserProfile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      <SubscriptionWall
        open={showSubscriptionWall}
        onClose={() => setShowSubscriptionWall(false)}
        onPlanSelect={handlePlanSelect}
        onBorrow3Days={handleBorrow}
        onSubscriptionRenewed={handleSubscriptionRenewed}
      />
      <div className="fixed left-[280px] bottom-3 px-4 py-1 pointer-events-none text-xs text-blue-400 font-playfair opacity-80 select-none hidden md:block animate-fade-in">
        v. Design by Lovable
      </div>
    </div>
  );
};

export default Dashboard;

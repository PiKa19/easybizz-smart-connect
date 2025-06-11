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
  MessageSquare,
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

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const { t } = useContext(LanguageContext);
  const [activeSection, setActiveSection] = useState('home');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: t('home'), icon: Home },
    { id: 'bizz', label: t('bizz'), icon: ShoppingCart },
    { id: 'analytics', label: t('analytics'), icon: BarChart3 },
    { id: 'inventory', label: t('inventory'), icon: Package },
    { id: 'products', label: t('products'), icon: Package },
    { id: 'orders', label: t('orders'), icon: ClipboardList },
    { id: 'suppliers', label: t('suppliers'), icon: Users },
    { id: 'historique', label: t('historique'), icon: History },
    { id: 'notification', label: t('notification'), icon: Bell },
    { id: 'cashier', label: t('cashier'), icon: Calculator },
    { id: 'messages', label: t('messages'), icon: MessageSquare },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

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
          </div>
        );

      case 'suppliers':
        return <SupplierSection />;

      case 'messages':
        return <MessagingSection />;

      case 'cashier':
        return <CashierSection onBack={() => setActiveSection('home')} />;

      case 'products':
        return (
          <div className="text-center py-12">
            <PackageOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('section')}</h3>
            <p className="text-gray-500">{t('section_under_development')}</p>
          </div>
        );

      case 'inventory':
        return (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('section')}</h3>
            <p className="text-gray-500">{t('section_under_development')}</p>
          </div>
        );

      case 'orders':
        return (
          <div className="text-center py-12">
            <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-4" />
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
            <div className="w-8 h-8 bg-[#0794FE] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="font-bold text-xl text-gray-800">EasyBizz</span>
          </div>
          
          <div className="flex items-center gap-4">
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
          
          <div className="absolute bottom-4 left-4 right-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t('logout')}
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>

      {/* User Profile Modal */}
      <UserProfile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
};

export default Dashboard;

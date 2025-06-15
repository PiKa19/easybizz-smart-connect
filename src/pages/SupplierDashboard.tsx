import React, { useState, useContext } from 'react';
import {
  Home,
  ShoppingCart,
  Bell,
  Settings,
  LogOut,
  Search,
  MessageSquare,
  Users
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LanguageContext } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import SupplierBizzSection from '@/components/SupplierBizzSection';
import SupplierMessagingSection from '@/components/SupplierMessagingSection';
import SupplierClientsSection from '@/components/SupplierClientsSection';

const SupplierDashboard = () => {
  const { t } = useContext(LanguageContext);
  const [activeSection, setActiveSection] = useState('home');

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'bizz', label: 'Bizz', icon: ShoppingCart },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    window.location.href = '/';
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-6">
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">bonjour, supérette elbaraka</h1>
              <p className="text-gray-600">Start managing your supermarket</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('bizz')}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Sell products</h3>
                      <p className="text-sm text-gray-600">sell your products directly to intrested retailers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('orders')}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Orders</h3>
                      <p className="text-sm text-gray-600">track orders you recieved</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('bizz')}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Sell products</h3>
                      <p className="text-sm text-gray-600">sell your products directly to intrested retailers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('settings')}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Settings</h3>
                      <p className="text-sm text-gray-600">track orders you recieved</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'bizz':
        return <SupplierBizzSection onBack={() => setActiveSection('home')} />;

      case 'messages':
        return <SupplierMessagingSection />;

      case 'clients':
        return <SupplierClientsSection />;

      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Section</h3>
            <p className="text-gray-500">This section is under development</p>
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
            <LanguageSwitcher />
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search"
                className="w-64 pl-10"
              />
            </div>
            
            <Button variant="ghost" size="sm">
              <Bell className="w-5 h-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-[#0794FE] rounded-lg flex items-center justify-center text-white font-bold">
                F
              </div>
              <span className="hidden md:inline">FRS essemar</span>
            </Button>

            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Logout</span>
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
    </div>
  );
};

export default SupplierDashboard;

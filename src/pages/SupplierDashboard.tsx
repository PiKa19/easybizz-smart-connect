import React, { useState, useContext } from 'react';
import {
  Home,
  ShoppingCart,
  Bell,
  Settings,
  LogOut,
  Search,
  MessageSquare,
  Users,
  BarChart3,
  Package,
  Menu,
  X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LanguageContext } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import SupplierBizzSection from '@/components/SupplierBizzSection';
import SupplierMessagingSection from '@/components/SupplierMessagingSection';
import SupplierClientsSection from '@/components/SupplierClientsSection';
import SupplierOrdersSection from '@/components/SupplierOrdersSection';
import SupplierAnalyticsSection from '@/components/SupplierAnalyticsSection';
import SupplierInventorySection from '@/components/SupplierInventorySection';
import SupplierSettingsSection from '@/components/SupplierSettingsSection';
import SupplierNotificationSection from '@/components/SupplierNotificationSection';

const SupplierDashboard = () => {
  const { t } = useContext(LanguageContext);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'bizz', label: 'Products', icon: ShoppingCart },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'notifications', label: 'Notifications', icon: Bell },
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
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, FRS Semmar</h1>
              <p className="text-gray-600">Manage your supplier business efficiently</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('bizz')}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Manage Products</h3>
                      <p className="text-sm text-gray-600">Add, edit and manage your product catalog</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('orders')}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Orders</h3>
                      <p className="text-sm text-gray-600">Track and manage incoming orders</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('clients')}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Clients</h3>
                      <p className="text-sm text-gray-600">Manage your client relationships</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('inventory')}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Inventory</h3>
                      <p className="text-sm text-gray-600">Track stock levels and manage inventory</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('analytics')}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Analytics</h3>
                      <p className="text-sm text-gray-600">View business insights and reports</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('messages')}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Messages</h3>
                      <p className="text-sm text-gray-600">Communicate with your clients</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('notifications')}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Bell className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                      <p className="text-sm text-gray-600">Stay updated with business activities</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-6 lg:mt-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-blue-600">156</div>
                  <div className="text-sm text-gray-600">Total Products</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-green-600">342</div>
                  <div className="text-sm text-gray-600">Orders This Month</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-purple-600">89</div>
                  <div className="text-sm text-gray-600">Active Clients</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-orange-600">1.2M</div>
                  <div className="text-sm text-gray-600">Revenue (DZD)</div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'bizz':
        return <SupplierBizzSection onBack={() => setActiveSection('home')} />;

      case 'orders':
        return <SupplierOrdersSection />;

      case 'messages':
        return <SupplierMessagingSection />;

      case 'clients':
        return <SupplierClientsSection />;

      case 'inventory':
        return <SupplierInventorySection />;

      case 'analytics':
        return <SupplierAnalyticsSection />;

      case 'notifications':
        return <SupplierNotificationSection />;

      case 'settings':
        return <SupplierSettingsSection />;

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
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b relative z-50">
        <div className="flex items-center justify-between px-4 lg:px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <img
              src="/lovable-uploads/5142faa5-d964-4021-b411-2ea1ad268901.png"
              alt="EasyBizz Logo"
              className="h-6 lg:h-8 w-auto"
            />
          </div>
          
          <div className="flex items-center gap-2 lg:gap-4">
            <LanguageSwitcher />
            
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search"
                className="w-48 lg:w-64 pl-10"
              />
            </div>
            
            <Button variant="ghost" size="sm" className="hidden sm:flex">
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
              <span className="hidden lg:inline">FRS Semmar</span>
            </Button>

            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden lg:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Sidebar */}
        <aside className={`w-64 bg-white h-[calc(100vh-73px)] shadow-sm fixed lg:relative z-40 transform transition-transform duration-300 ease-in-out lg:transform-none ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 lg:py-2 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-[#0794FE] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 lg:ml-0">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default SupplierDashboard;

import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Settings, 
  Package, 
  BarChart3, 
  ShoppingCart, 
  History, 
  Bell, 
  CreditCard, 
  LogOut, 
  HelpCircle,
  Search,
  ChevronRight,
  Package2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";
import { LanguageContext } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [currentSection, setCurrentSection] = useState('home');
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useContext(LanguageContext);

  const navigationItems = [
    { id: 'home', icon: Home, label: t('home') },
    { id: 'bizz', icon: Package2, label: t('bizz') },
    { id: 'analytics', icon: BarChart3, label: t('analytics') },
    { id: 'inventory', icon: Package, label: t('inventory') },
    { id: 'products', icon: ShoppingCart, label: t('products') },
    { id: 'historique', icon: History, label: t('historique') },
    { id: 'notification', icon: Bell, label: t('notification') },
    { id: 'cashier', icon: CreditCard, label: t('cashier') },
    { id: 'settings', icon: Settings, label: t('settings') },
    { id: 'logout', icon: LogOut, label: t('logout') },
    { id: 'faq', icon: HelpCircle, label: t('faq') }
  ];

  const products = [
    {
      id: 1,
      name: "Premium Shampoo",
      price: 1500,
      supplier: "Beauty Supplies Co.",
      image: "/placeholder.svg",
      description: "Professional grade shampoo for all hair types",
      stock: 50,
      category: "Hair Care"
    },
    {
      id: 2,
      name: "Coca-cola",
      description: "2 liter bottle",
      price: "150 DZD",
      image: "/api/placeholder/150/150",
      category: "Beverages",
      volume: "2 Liters",
      packaging: "PET bottle with resealable cap",
      storage: "Shelf stable and easy to store",
      usage: "Ideal for supermarkets, convenience stores, and HoReCa"
    },
    {
      id: 3,
      name: "Coca-cola",
      description: "1 liter bottle",
      price: "90 DZD",
      image: "/api/placeholder/150/150",
      category: "Beverages"
    },
    {
      id: 4,
      name: "Hamoud bida",
      description: "2 liter bottle",
      price: "130 DZD",
      image: "/api/placeholder/150/150",
      category: "Beverages"
    },
    {
      id: 5,
      name: "Hamoud bida",
      description: "1 liter bottle",
      price: "80 DZD",
      image: "/api/placeholder/150/150",
      category: "Beverages"
    },
    {
      id: 6,
      name: "Coca-cola",
      description: "2 liter bottle",
      price: "150 DZD",
      image: "/api/placeholder/150/150",
      category: "Beverages"
    }
  ];

  const handleNavClick = (id: string) => {
    if (id === 'logout') {
      onLogout();
    } else {
      setCurrentSection(id);
      setSelectedProduct(null);
    }
  };

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
  }

  const renderHomeCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow bg-white rounded-xl border border-gray-100"
        onClick={() => setCurrentSection('bizz')}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package2 className="w-6 h-6 text-[#0794FE]" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg text-gray-800">{t('buy_products')}</CardTitle>
              <CardDescription className="text-sm text-gray-600 mt-1">
                {t('buy_products_desc')}
              </CardDescription>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </CardHeader>
      </Card>

      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow bg-white rounded-xl border border-gray-100"
        onClick={() => setCurrentSection('analytics')}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-[#0794FE]" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg text-gray-800">{t('view_analytics')}</CardTitle>
              <CardDescription className="text-sm text-gray-600 mt-1">
                {t('view_analytics_desc')}
              </CardDescription>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </CardHeader>
      </Card>

      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow bg-white rounded-xl border border-gray-100"
        onClick={() => setCurrentSection('inventory')}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="w-6 h-6 text-[#0794FE]" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg text-gray-800">{t('inventory_management')}</CardTitle>
              <CardDescription className="text-sm text-gray-600 mt-1">
                {t('inventory_management_desc')}
              </CardDescription>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </CardHeader>
      </Card>

      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow bg-white rounded-xl border border-gray-100"
        onClick={() => setCurrentSection('bizz')}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package2 className="w-6 h-6 text-[#0794FE]" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg text-gray-800">{t('buy_products')}</CardTitle>
              <CardDescription className="text-sm text-gray-600 mt-1">
                {t('buy_products_desc')}
              </CardDescription>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </CardHeader>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Dynamic Sidebar */}
      <div 
        className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${
          isHovered ? 'w-64' : 'w-16'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/5142faa5-d964-4021-b411-2ea1ad268901.png" 
              alt="EasyBizz Logo" 
              className="h-8 w-8 flex-shrink-0"
            />
            {isHovered && (
              <span className="font-semibold text-gray-800 text-sm">EasyBizz</span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-[#0794FE] border-r-2 border-[#0794FE]' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isHovered && (
                  <span className="truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">{t('dashboard_greeting')}</h1>
              <p className="text-sm text-gray-600">{t('dashboard_subtitle')}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search"
                  className="pl-10 w-64"
                />
              </div>
              <LanguageSwitcher />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0794FE] rounded-full flex items-center justify-center text-white text-sm font-medium">
                  B
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-800">Baraka</div>
                  <div className="text-gray-500">baraka@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {currentSection === 'home' && (
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                {renderHomeCards()}
              </div>
            </div>
          )}

          {currentSection === 'bizz' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">{t('buy_products')}</h2>
                <Badge variant="secondary" className="bg-blue-100 text-[#0794FE]">
                  {products.length} Products Available
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={setSelectedProduct}
                  />
                ))}
              </div>
            </div>
          )}

          {(currentSection === 'analytics' || currentSection === 'inventory' || currentSection === 'products') && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Package className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} Section
              </h3>
              <p className="text-gray-500">This section is under development</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

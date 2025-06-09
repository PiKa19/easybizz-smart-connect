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
  Package2,
  ChevronDown
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<any[]>([]);
  const { t } = useContext(LanguageContext);

  const navigationItems = [
    { id: 'home', icon: Home, label: t('home') },
    { id: 'bizz', icon: () => <img src="/lovable-uploads/b7b53d1c-2060-4de4-931d-52706bd84107.png" alt="Bizz" className="w-5 h-5" />, label: t('bizz') },
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

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'beverages', name: 'Beverages' },
    { id: 'snacks', name: 'Snacks' },
    { id: 'cleaning', name: 'Cleaning' },
    { id: 'meat-poultry', name: 'Meat & Poultry' },
    { id: 'seafood', name: 'Seafood' },
    { id: 'dairy', name: 'Dairy Products' },
    { id: 'frozen', name: 'Frozen Foods' },
    { id: 'canned', name: 'Canned Foods' }
  ];

  const products = [
    {
      id: 1,
      name: "Coca-cola",
      description: "2 liter bottle",
      price: "150 DZD",
      image: "/lovable-uploads/bc27ac7e-7ac9-405e-bf04-b04f5339fe06.png",
      category: "beverages",
      volume: "2 Liters",
      packaging: "PET bottle with resealable cap",
      storage: "Shelf stable and easy to store",
      usage: "Ideal for supermarkets, convenience stores, and HoReCa",
      sellers: [
        { id: 1, name: "FRS semmar", rating: "99%", reviews: 4458, price: "150.00 DZD", isDefault: true },
        { id: 2, name: "FRS semmar blanc", rating: "99%", reviews: 4458, price: "151.00 DZD" },
        { id: 3, name: "FRS blida eurl", rating: "99%", reviews: 4458, price: "151.20 DZD" },
        { id: 4, name: "FRS cheraga", rating: "99%", reviews: 4458, price: "152.00 DZD" },
        { id: 5, name: "FRS alger", rating: "99%", reviews: 4458, price: "153.33 DZD" }
      ]
    },
    {
      id: 2,
      name: "Coca-cola",
      description: "1 liter bottle",
      price: "90 DZD",
      image: "/lovable-uploads/bc27ac7e-7ac9-405e-bf04-b04f5339fe06.png",
      category: "beverages",
      sellers: [
        { id: 1, name: "FRS semmar", rating: "99%", reviews: 4458, price: "90.00 DZD", isDefault: true }
      ]
    },
    {
      id: 3,
      name: "Hamoud bida",
      description: "2 liter bottle",
      price: "130 DZD",
      image: "/lovable-uploads/146f2919-20c5-498a-ba87-e4ab9afc14f6.png",
      category: "beverages",
      sellers: [
        { id: 1, name: "FRS semmar", rating: "99%", reviews: 4458, price: "130.00 DZD", isDefault: true }
      ]
    },
    {
      id: 4,
      name: "Hamoud bida",
      description: "1 liter bottle",
      price: "80 DZD",
      image: "/lovable-uploads/146f2919-20c5-498a-ba87-e4ab9afc14f6.png",
      category: "beverages",
      sellers: [
        { id: 1, name: "FRS semmar", rating: "99%", reviews: 4458, price: "80.00 DZD", isDefault: true }
      ]
    },
    {
      id: 5,
      name: "Premium Pasta",
      description: "500g package",
      price: "200 DZD",
      image: "/api/placeholder/150/150",
      category: "snacks",
      sellers: [
        { id: 1, name: "FRS semmar", rating: "99%", reviews: 4458, price: "200.00 DZD", isDefault: true }
      ]
    },
    {
      id: 6,
      name: "Chicken Breast",
      description: "1kg fresh",
      price: "800 DZD",
      image: "/api/placeholder/150/150",
      category: "meat-poultry",
      sellers: [
        { id: 1, name: "FRS semmar", rating: "99%", reviews: 4458, price: "800.00 DZD", isDefault: true }
      ]
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product: any, quantity: number, seller: any) => {
    const cartItem = {
      id: Date.now(),
      product,
      quantity,
      seller,
      unitPrice: parseFloat(seller.price.replace(' DZD', '')),
      totalPrice: parseFloat(seller.price.replace(' DZD', '')) * quantity
    };
    setCart(prev => [...prev, cartItem]);
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateCartQuantity = (itemId: number, newQuantity: number) => {
    setCart(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, quantity: newQuantity, totalPrice: item.unitPrice * newQuantity }
        : item
    ));
  };

  const handleNavClick = (id: string) => {
    if (id === 'logout') {
      onLogout();
    } else {
      setCurrentSection(id);
      setSelectedProduct(null);
    }
  };

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} onAddToCart={addToCart} />;
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
              <img src="/lovable-uploads/b7b53d1c-2060-4de4-931d-52706bd84107.png" alt="Bizz" className="w-6 h-6" />
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
              <img src="/lovable-uploads/b7b53d1c-2060-4de4-931d-52706bd84107.png" alt="Bizz" className="w-6 h-6" />
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
      {/* Dynamic Sidebar - Always Visible */}
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
                {typeof Icon === 'function' ? <Icon /> : <Icon className="w-5 h-5 flex-shrink-0" />}
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
        {/* Header - Always Visible */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-xl font-semibold text-gray-800">{t('dashboard_greeting')}</h1>
                <p className="text-sm text-gray-600">{t('dashboard_subtitle')}</p>
              </div>
              
              {/* Boutique Selection */}
              <div className="flex items-center gap-2">
                <Select defaultValue="one">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select boutique" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one">One boutique</SelectItem>
                    <SelectItem value="two">Two boutiques</SelectItem>
                    <SelectItem value="three">Three boutiques</SelectItem>
                    <SelectItem value="multiple">Multiple boutiques</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
              <Button
                variant="outline"
                onClick={() => setCurrentSection('cart')}
                className="relative"
              >
                <ShoppingCart className="w-4 h-4" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 min-w-[1.25rem] h-5">
                    {cart.length}
                  </Badge>
                )}
              </Button>
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
          {selectedProduct ? (
            <ProductDetail 
              product={selectedProduct} 
              onBack={() => setSelectedProduct(null)}
              onAddToCart={addToCart}
            />
          ) : currentSection === 'home' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                {renderHomeCards()}
              </div>
            </div>
          ) : currentSection === 'bizz' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">{t('buy_products')}</h2>
                <div className="flex items-center gap-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Badge variant="secondary" className="bg-blue-100 text-[#0794FE]">
                    {filteredProducts.length} Products Available
                  </Badge>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-[#0794FE] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={setSelectedProduct}
                  />
                ))}
              </div>
            </div>
          ) : currentSection === 'cart' ? (
            <CartPage 
              cartItems={cart}
              onRemoveItem={removeFromCart}
              onUpdateQuantity={updateCartQuantity}
            />
          ) : (
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

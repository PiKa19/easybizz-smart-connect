
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Package, BarChart3, Settings, LogOut, Search, ShoppingCart } from "lucide-react";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const navigationItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "buy-products", icon: ShoppingCart, label: "Buy products" },
    { id: "analytics", icon: BarChart3, label: "View analytics" },
    { id: "inventory", icon: Package, label: "Inventory management" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  const products = [
    {
      id: 1,
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
      id: 2,
      name: "Coca-cola",
      description: "1 liter bottle",
      price: "90 DZD",
      image: "/api/placeholder/150/150",
      category: "Beverages"
    },
    {
      id: 3,
      name: "Hamoud bida",
      description: "2 liter bottle",
      price: "130 DZD",
      image: "/api/placeholder/150/150",
      category: "Beverages"
    },
    {
      id: 4,
      name: "Hamoud bida",
      description: "1 liter bottle",
      price: "80 DZD",
      image: "/api/placeholder/150/150",
      category: "Beverages"
    },
    {
      id: 5,
      name: "Coca-cola",
      description: "2 liter bottle",
      price: "150 DZD",
      image: "/api/placeholder/150/150",
      category: "Beverages"
    }
  ];

  const categories = ["Beverages", "Snacks", "Cleaning", "Meat & Poultry", "Seafood", "Dairy Products", "Frozen Foods", "Canned Foods"];

  const handleProductSelect = (product: any) => {
    setSelectedProduct(product);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };

  const renderHomeSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer"
            onClick={() => setActiveSection("buy-products")}>
        <CardHeader className="text-center pb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-6 h-6 text-[#0794FE]" />
          </div>
          <CardTitle className="text-blue-900 text-xl">Buy products</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-600 text-center">
            browse and order directly from suppliers
          </CardDescription>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer"
            onClick={() => setActiveSection("analytics")}>
        <CardHeader className="text-center pb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-6 h-6 text-[#0794FE]" />
          </div>
          <CardTitle className="text-blue-900 text-xl">View analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-600 text-center">
            browse and order directly from suppliers
          </CardDescription>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer"
            onClick={() => setActiveSection("inventory")}>
        <CardHeader className="text-center pb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-6 h-6 text-[#0794FE]" />
          </div>
          <CardTitle className="text-blue-900 text-xl">Inventory management</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-600 text-center">
            browse and order directly from suppliers
          </CardDescription>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer"
            onClick={() => setActiveSection("buy-products")}>
        <CardHeader className="text-center pb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-6 h-6 text-[#0794FE]" />
          </div>
          <CardTitle className="text-blue-900 text-xl">Buy products</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-600 text-center">
            browse and order directly from suppliers
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );

  const renderBuyProductsSection = () => {
    if (selectedProduct) {
      return <ProductDetail product={selectedProduct} onBack={handleBackToProducts} />;
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Buy products from official wholesalers</h2>
          <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm">
            <option>Filters</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Name: A to Z</option>
          </select>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className="whitespace-nowrap rounded-full px-6 py-2 text-sm"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={handleProductSelect}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return renderHomeSection();
      case "buy-products":
        return renderBuyProductsSection();
      case "analytics":
        return <div className="text-center py-20 text-gray-500">Analytics section coming soon...</div>;
      case "inventory":
        return <div className="text-center py-20 text-gray-500">Inventory management section coming soon...</div>;
      case "settings":
        return <div className="text-center py-20 text-gray-500">Settings section coming soon...</div>;
      default:
        return renderHomeSection();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-16 bg-white shadow-lg flex flex-col items-center py-6 space-y-6">
        {/* Logo */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/5142faa5-d964-4021-b411-2ea1ad268901.png" 
            alt="EasyBizz Logo" 
            className="h-8 w-auto"
          />
        </div>

        {/* Navigation Icons */}
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`p-3 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-[#0794FE] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title={item.label}
            >
              <Icon className="w-6 h-6" />
            </button>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="mt-auto p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          title="Logout"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">bonjour, supérette elbaraka</h1>
            <p className="text-sm text-gray-600">Start managing your supermarket</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search"
                className="pl-10 pr-4 py-2 w-64 rounded-lg border-gray-300"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#E1275C] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                B
              </div>
              <div className="text-sm">
                <div className="font-medium">Baraka</div>
                <div className="text-gray-500">barakat@gmail.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

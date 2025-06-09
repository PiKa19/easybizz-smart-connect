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
  ChevronDown,
  Store,
  Plus,
  Edit,
  Trash2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";
import CartPage from "./CartPage";
import { LanguageContext } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

interface DashboardProps {
  onLogout: () => void;
}

interface Boutique {
  id: number;
  name: string;
  address: string;
  isActive: boolean;
}

interface Product {
  id: number;
  name: string;
  reference: string;
  barcode: string;
  quantity: number;
  alert: number;
  buyingPrice: number;
  sellingPrice: number;
  rotation: string;
  status: 'Rapid' | 'Normal' | 'Slow';
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [currentSection, setCurrentSection] = useState('home');
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<any[]>([]);
  const [selectedBoutique, setSelectedBoutique] = useState<number>(1);
  const [isAddBoutiqueOpen, setIsAddBoutiqueOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newBoutique, setNewBoutique] = useState({ name: '', address: '' });
  const [newProduct, setNewProduct] = useState({
    name: '',
    reference: '',
    barcode: '',
    quantity: 0,
    alert: 0,
    buyingPrice: 0,
    sellingPrice: 0
  });
  
  const { t } = useContext(LanguageContext);

  const [boutiques, setBoutiques] = useState<Boutique[]>([
    { id: 1, name: "supérette elbaraka", address: "123 Main St", isActive: true },
    { id: 2, name: "Boutique Centre", address: "456 Center Ave", isActive: false },
    { id: 3, name: "Mini Market Nord", address: "789 North Rd", isActive: false }
  ]);

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Huile SL elio",
      reference: "HUI-001",
      barcode: "59446032664B",
      quantity: 5,
      alert: 50,
      buyingPrice: 630.00,
      sellingPrice: 650.00,
      rotation: "5 days",
      status: 'Rapid'
    }
  ]);

  const BizzIcon = () => (
    <img src="/lovable-uploads/b7b53d1c-2060-4de4-931d-52706bd84107.png" alt="Bizz" className="w-5 h-5" />
  );

  const navigationItems = [
    { id: 'boutique', icon: Store, label: t('boutique') || 'Boutique' },
    { id: 'home', icon: Home, label: t('home') },
    { id: 'bizz', icon: BizzIcon, label: t('bizz') },
    { id: 'analytics', icon: BarChart3, label: t('analytics') },
    { id: 'inventory', icon: Package, label: t('inventory') },
    { id: 'products', icon: Package2, label: t('products') },
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

  const bizzProducts = [
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

  const filteredBizzProducts = selectedCategory === 'all' 
    ? bizzProducts 
    : bizzProducts.filter(product => product.category === selectedCategory);

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

  const handleAddBoutique = () => {
    if (newBoutique.name && newBoutique.address) {
      const newId = Math.max(...boutiques.map(b => b.id)) + 1;
      setBoutiques(prev => [...prev, {
        id: newId,
        name: newBoutique.name,
        address: newBoutique.address,
        isActive: false
      }]);
      setNewBoutique({ name: '', address: '' });
      setIsAddBoutiqueOpen(false);
    }
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.reference) {
      const newId = Math.max(...products.map(p => p.id)) + 1;
      setProducts(prev => [...prev, {
        ...newProduct,
        id: newId,
        rotation: "New",
        status: 'Normal' as const
      }]);
      setNewProduct({
        name: '',
        reference: '',
        barcode: '',
        quantity: 0,
        alert: 0,
        buyingPrice: 0,
        sellingPrice: 0
      });
      setIsAddProductOpen(false);
    }
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Rapid': return 'bg-red-500';
      case 'Normal': return 'bg-blue-500';
      case 'Slow': return 'bg-gray-500';
      default: return 'bg-gray-500';
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
              <BizzIcon />
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
        onClick={() => setCurrentSection('products')}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package2 className="w-6 h-6 text-[#0794FE]" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg text-gray-800">{t('products')}</CardTitle>
              <CardDescription className="text-sm text-gray-600 mt-1">
                Manage your product inventory
              </CardDescription>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </CardHeader>
      </Card>
    </div>
  );

  const renderBoutiqueSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Boutique Management</h2>
        <Dialog open={isAddBoutiqueOpen} onOpenChange={setIsAddBoutiqueOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0794FE] hover:bg-[#0670CC] text-white flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Boutique
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Boutique</DialogTitle>
              <DialogDescription>
                Create a new boutique to manage your business locations.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="boutique-name">Boutique Name</Label>
                <Input
                  id="boutique-name"
                  value={newBoutique.name}
                  onChange={(e) => setNewBoutique(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter boutique name"
                />
              </div>
              <div>
                <Label htmlFor="boutique-address">Address</Label>
                <Input
                  id="boutique-address"
                  value={newBoutique.address}
                  onChange={(e) => setNewBoutique(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter boutique address"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddBoutique} className="bg-[#0794FE] hover:bg-[#0670CC]">
                  Add Boutique
                </Button>
                <Button variant="outline" onClick={() => setIsAddBoutiqueOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {boutiques.map((boutique) => (
          <Card 
            key={boutique.id} 
            className={`cursor-pointer transition-all ${
              selectedBoutique === boutique.id 
                ? 'ring-2 ring-[#0794FE] bg-blue-50' 
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedBoutique(boutique.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">{boutique.name}</h3>
                <Badge variant={boutique.isActive ? "default" : "secondary"}>
                  {boutique.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{boutique.address}</p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProductsSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            bonjour, {boutiques.find(b => b.id === selectedBoutique)?.name}
          </h2>
          <p className="text-gray-600">Start managing your supermarket</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search a product"
              className="pl-10 w-64"
            />
          </div>
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#0794FE] hover:bg-[#0670CC] text-white flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add a product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Add a new product to your inventory.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input
                    id="product-name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <Label htmlFor="product-reference">Reference</Label>
                  <Input
                    id="product-reference"
                    value={newProduct.reference}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, reference: e.target.value }))}
                    placeholder="Enter reference"
                  />
                </div>
                <div>
                  <Label htmlFor="product-barcode">Barcode</Label>
                  <Input
                    id="product-barcode"
                    value={newProduct.barcode}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, barcode: e.target.value }))}
                    placeholder="Enter barcode"
                  />
                </div>
                <div>
                  <Label htmlFor="product-quantity">Quantity</Label>
                  <Input
                    id="product-quantity"
                    type="number"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                    placeholder="Enter quantity"
                  />
                </div>
                <div>
                  <Label htmlFor="product-alert">Alert Level</Label>
                  <Input
                    id="product-alert"
                    type="number"
                    value={newProduct.alert}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, alert: parseInt(e.target.value) || 0 }))}
                    placeholder="Enter alert level"
                  />
                </div>
                <div>
                  <Label htmlFor="product-buying-price">Buying Price (DZD)</Label>
                  <Input
                    id="product-buying-price"
                    type="number"
                    step="0.01"
                    value={newProduct.buyingPrice}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, buyingPrice: parseFloat(e.target.value) || 0 }))}
                    placeholder="Enter buying price"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="product-selling-price">Selling Price (DZD)</Label>
                  <Input
                    id="product-selling-price"
                    type="number"
                    step="0.01"
                    value={newProduct.sellingPrice}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, sellingPrice: parseFloat(e.target.value) || 0 }))}
                    placeholder="Enter selling price"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddProduct} className="bg-[#0794FE] hover:bg-[#0670CC]">
                  Add Product
                </Button>
                <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0794FE] text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Product</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Reference</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Barcode</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Quantity</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Alert</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Buying Price</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Selling Price</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Rotation Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{product.name}</td>
                  <td className="px-4 py-3 text-sm">{product.reference}</td>
                  <td className="px-4 py-3 text-sm">{product.barcode}</td>
                  <td className="px-4 py-3 text-sm">{product.quantity}</td>
                  <td className="px-4 py-3 text-sm">{product.alert}</td>
                  <td className="px-4 py-3 text-sm">{product.buyingPrice.toFixed(2)} DZD</td>
                  <td className="px-4 py-3 text-sm">{product.sellingPrice.toFixed(2)} DZD</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${getStatusColor(product.status)}`}></span>
                      <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="text-blue-600">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-600"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-gray-600">
            Rows per page: 
            <Select defaultValue="5">
              <SelectTrigger className="w-16 ml-2 inline-flex">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-gray-600">
            1-1 of 1
          </div>
        </div>
      </div>
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
        {/* Header - Always Visible */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-xl font-semibold text-gray-800">{t('dashboard_greeting')}</h1>
                <p className="text-sm text-gray-600">{t('dashboard_subtitle')}</p>
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
          ) : currentSection === 'boutique' ? (
            renderBoutiqueSection()
          ) : currentSection === 'products' ? (
            renderProductsSection()
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
                    {filteredBizzProducts.length} Products Available
                  </Badge>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentSection('cart')}
                    className="relative"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Cart
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 min-w-[1.25rem] h-5">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
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
                {filteredBizzProducts.map((product) => (
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
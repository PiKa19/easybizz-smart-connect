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
  Trash2,
  List,
  ClipboardList,
  Download,
  ChevronLeft
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
import CashierSection from "./CashierSection";
import { LanguageContext } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import UserProfile from "./UserProfile";

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
  quantityInStock: number;
  quantitySold: number;
  alert: number;
  buyingPriceIncVat: number;
  sellingPriceExcVat: number;
  sellingPriceIncVat: number;
  rotation: string;
  status: 'Rapid' | 'Normal' | 'Slow';
}

interface Order {
  id: string;
  supplierId: number;
  supplierName: string;
  date: string;
  amount: number;
  status: 'confirmed' | 'on-hold' | 'canceled' | 'delivered';
  items: any[];
}

interface Supplier {
  id: number;
  name: string;
  rating: string;
  reviews: number;
  items: number;
  badges: string[];
  categories: { name: string; count: number }[];
  products: any[];
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [currentSection, setCurrentSection] = useState('home');
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<any[]>([]);
  const [selectedBoutique, setSelectedBoutique] = useState<number>(1);
  const [isAddBoutiqueOpen, setIsAddBoutiqueOpen] = useState(false);
  const [isEditBoutiqueOpen, setIsEditBoutiqueOpen] = useState(false);
  const [editingBoutique, setEditingBoutique] = useState<Boutique | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newBoutique, setNewBoutique] = useState({ name: '', address: '' });
  const [newProduct, setNewProduct] = useState({
    name: '',
    reference: '',
    barcode: '',
    quantityInStock: 0,
    quantitySold: 0,
    alert: 0,
    buyingPriceIncVat: 0,
    sellingPriceExcVat: 0,
    sellingPriceIncVat: 0
  });
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  
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
      quantityInStock: 5,
      quantitySold: 45,
      alert: 50,
      buyingPriceIncVat: 630.00,
      sellingPriceExcVat: 550.00,
      sellingPriceIncVat: 650.00,
      rotation: "5 days",
      status: 'Rapid'
    }
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "10545",
      supplierId: 1,
      supplierName: "FRS Semmar",
      date: "15/06/2025",
      amount: 5000.00,
      status: 'confirmed',
      items: []
    }
  ]);
  const [orderSearchTerm, setOrderSearchTerm] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  
  const suppliers: Supplier[] = [
    {
      id: 1,
      name: "Ultimate_choices",
      rating: "100%",
      reviews: 86288,
      items: 12772,
      badges: ["EXCELLENT SELLER"],
      categories: [
        { name: "Gaming", count: 3689 },
        { name: "Software", count: 50 },
        { name: "Gift cards", count: 9452 },
        { name: "Subscriptions", count: 251 },
        { name: "Mobile Games", count: 97 },
        { name: "For Adults", count: 25 }
      ],
      products: [
        {
          id: 1,
          name: "Microsoft Windows 11 Pro - PC",
          platform: "Microsoft",
          type: "Key",
          region: "GLOBAL",
          price: 22.13,
          originalPrice: 148.02,
          discount: 85,
          canActivateInAlgeria: true,
          image: "/api/placeholder/100/100"
        }
      ]
    }
  ];

  const BoutiqueIcon = () => (
    <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center">
      <div className="w-3 h-3 bg-white rounded-sm flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
      </div>
    </div>
  );

  const BizzIcon = () => (
    <img src="/lovable-uploads/b7b53d1c-2060-4de4-931d-52706bd84107.png" alt="Bizz" className="w-5 h-5" />
  );

  const navigationItems = [
    { id: 'boutique', icon: BoutiqueIcon, label: t('boutique') || 'Boutique' },
    { id: 'home', icon: Home, label: t('home') },
    { id: 'bizz', icon: BizzIcon, label: t('bizz') },
    { id: 'analytics', icon: BarChart3, label: t('analytics') },
    { id: 'inventory', icon: Package, label: t('inventory') },
    { id: 'products', icon: List, label: t('products') },
    { id: 'orders', icon: ClipboardList, label: t('orders') || 'Orders' },
    { id: 'historique', icon: History, label: t('historique') },
    { id: 'notification', icon: Bell, label: t('notification') },
    { id: 'cashier', icon: CreditCard, label: t('cashier') },
    { id: 'settings', icon: Settings, label: t('settings') },
    { id: 'logout', icon: LogOut, label: t('logout') },
    { id: 'faq', icon: HelpCircle, label: t('faq') }
  ];

  const categories = [
    { id: 'all', name: t('all_products') || 'All Products' },
    { id: 'beverages', name: t('beverages') || 'Beverages' },
    { id: 'snacks', name: t('snacks') || 'Snacks' },
    { id: 'cleaning', name: t('cleaning') || 'Cleaning' },
    { id: 'meat-poultry', name: t('meat_poultry') || 'Meat & Poultry' },
    { id: 'seafood', name: t('seafood') || 'Seafood' },
    { id: 'dairy', name: t('dairy') || 'Dairy Products' },
    { id: 'frozen', name: t('frozen') || 'Frozen Foods' },
    { id: 'canned', name: t('canned') || 'Canned Foods' }
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

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
    order.supplierName.toLowerCase().includes(orderSearchTerm.toLowerCase())
  );

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
      setSelectedSupplier(null);
    }
  };

  const handleSelectBoutique = (boutiqueId: number) => {
    setBoutiques(prev => prev.map(b => ({
      ...b,
      isActive: b.id === boutiqueId
    })));
    setSelectedBoutique(boutiqueId);
  };

  const handleEditBoutique = (boutique: Boutique) => {
    setEditingBoutique(boutique);
    setIsEditBoutiqueOpen(true);
  };

  const handleUpdateBoutique = () => {
    if (editingBoutique) {
      setBoutiques(prev => prev.map(b => 
        b.id === editingBoutique.id ? editingBoutique : b
      ));
      setEditingBoutique(null);
      setIsEditBoutiqueOpen(false);
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
        quantityInStock: 0,
        quantitySold: 0,
        alert: 0,
        buyingPriceIncVat: 0,
        sellingPriceExcVat: 0,
        sellingPriceIncVat: 0
      });
      setIsAddProductOpen(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsEditProductOpen(true);
  };

  const handleUpdateProduct = () => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id ? editingProduct : p
      ));
      setEditingProduct(null);
      setIsEditProductOpen(false);
    }
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleStatusChange = (productId: number, newStatus: 'Rapid' | 'Normal' | 'Slow') => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, status: newStatus } : p
    ));
  };

  const handleOrderStatusChange = (orderId: string, newStatus: 'confirmed' | 'on-hold' | 'canceled' | 'delivered') => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleDownloadBill = (orderId: string) => {
    // Simulate bill download
    console.log(`Downloading bill for order ${orderId}`);
  };

  const handleViewSupplier = (supplierId: number) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    if (supplier) {
      setSelectedSupplier(supplier);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Rapid': return 'bg-red-500';
      case 'Normal': return 'bg-blue-500';
      case 'Slow': return 'bg-gray-500';
      case 'confirmed': return 'bg-green-500';
      case 'on-hold': return 'bg-yellow-500';
      case 'canceled': return 'bg-red-500';
      case 'delivered': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600';
      case 'on-hold': return 'text-yellow-600';
      case 'canceled': return 'text-red-600';
      case 'delivered': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

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
                {t('manage_product_inventory') || 'Manage your product inventory'}
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
        <h2 className="text-2xl font-bold text-gray-800">{t('boutique_management') || 'Boutique Management'}</h2>
        <Dialog open={isAddBoutiqueOpen} onOpenChange={setIsAddBoutiqueOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0794FE] hover:bg-[#0670CC] text-white flex items-center gap-2">
              <Plus className="w-4 h-4" />
              {t('add_boutique') || 'Add Boutique'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('add_new_boutique') || 'Add New Boutique'}</DialogTitle>
              <DialogDescription>
                {t('create_new_boutique_desc') || 'Create a new boutique to manage your business locations.'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="boutique-name">{t('boutique_name') || 'Boutique Name'}</Label>
                <Input
                  id="boutique-name"
                  value={newBoutique.name}
                  onChange={(e) => setNewBoutique(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={t('enter_boutique_name') || 'Enter boutique name'}
                />
              </div>
              <div>
                <Label htmlFor="boutique-address">{t('address') || 'Address'}</Label>
                <Input
                  id="boutique-address"
                  value={newBoutique.address}
                  onChange={(e) => setNewBoutique(prev => ({ ...prev, address: e.target.value }))}
                  placeholder={t('enter_boutique_address') || 'Enter boutique address'}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddBoutique} className="bg-[#0794FE] hover:bg-[#0670CC]">
                  {t('add_boutique') || 'Add Boutique'}
                </Button>
                <Button variant="outline" onClick={() => setIsAddBoutiqueOpen(false)}>
                  {t('cancel') || 'Cancel'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Boutique Selection */}
      <div className="mb-6">
        <Select value={selectedBoutique.toString()} onValueChange={(value) => handleSelectBoutique(parseInt(value))}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select a boutique" />
          </SelectTrigger>
          <SelectContent>
            {boutiques.map((boutique) => (
              <SelectItem key={boutique.id} value={boutique.id.toString()}>
                {boutique.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Edit Boutique Dialog */}
      <Dialog open={isEditBoutiqueOpen} onOpenChange={setIsEditBoutiqueOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Boutique</DialogTitle>
            <DialogDescription>
              Update boutique information.
            </DialogDescription>
          </DialogHeader>
          {editingBoutique && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-boutique-name">Boutique Name</Label>
                <Input
                  id="edit-boutique-name"
                  value={editingBoutique.name}
                  onChange={(e) => setEditingBoutique(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                />
              </div>
              <div>
                <Label htmlFor="edit-boutique-address">Address</Label>
                <Input
                  id="edit-boutique-address"
                  value={editingBoutique.address}
                  onChange={(e) => setEditingBoutique(prev => prev ? ({ ...prev, address: e.target.value }) : null)}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleUpdateBoutique} className="bg-[#0794FE] hover:bg-[#0670CC]">
                  Update Boutique
                </Button>
                <Button variant="outline" onClick={() => setIsEditBoutiqueOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {boutiques.map((boutique) => (
          <Card 
            key={boutique.id} 
            className={`cursor-pointer transition-all ${
              boutique.isActive 
                ? 'ring-2 ring-[#0794FE] bg-blue-50' 
                : 'hover:shadow-md'
            }`}
            onClick={() => handleSelectBoutique(boutique.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">{boutique.name}</h3>
                <Badge variant={boutique.isActive ? "default" : "secondary"}>
                  {boutique.isActive ? t('active') || 'Active' : t('inactive') || 'Inactive'}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{boutique.address}</p>
              <div className="flex gap-2 mt-3">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditBoutique(boutique);
                  }}
                >
                  <Edit className="w-3 h-3 mr-1" />
                  {t('edit') || 'Edit'}
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
            {t('hello')}, {boutiques.find(b => b.isActive)?.name || boutiques.find(b => b.id === selectedBoutique)?.name}
          </h2>
          <p className="text-gray-600">{t('start_managing_supermarket') || 'Start managing your supermarket'}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder={t('search_product') || 'Search a product'}
              className="pl-10 w-64"
            />
          </div>
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#0794FE] hover:bg-[#0670CC] text-white flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {t('add_product') || 'Add a product'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{t('add_new_product') || 'Add New Product'}</DialogTitle>
                <DialogDescription>
                  {t('add_product_desc') || 'Add a new product to your inventory.'}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="product-name">{t('product_name') || 'Product Name'}</Label>
                  <Input
                    id="product-name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    placeholder={t('enter_product_name') || 'Enter product name'}
                  />
                </div>
                <div>
                  <Label htmlFor="product-reference">{t('reference') || 'Reference'}</Label>
                  <Input
                    id="product-reference"
                    value={newProduct.reference}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, reference: e.target.value }))}
                    placeholder={t('enter_reference') || 'Enter reference'}
                  />
                </div>
                <div>
                  <Label htmlFor="product-barcode">{t('barcode') || 'Barcode'}</Label>
                  <Input
                    id="product-barcode"
                    value={newProduct.barcode}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, barcode: e.target.value }))}
                    placeholder={t('enter_barcode') || 'Enter barcode'}
                  />
                </div>
                <div>
                  <Label htmlFor="product-quantity-stock">{t('quantity_in_stock') || 'Quantity in Stock'}</Label>
                  <Input
                    id="product-quantity-stock"
                    type="number"
                    value={newProduct.quantityInStock}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, quantityInStock: parseInt(e.target.value) || 0 }))}
                    placeholder={t('enter_quantity_stock') || 'Enter quantity in stock'}
                  />
                </div>
                <div>
                  <Label htmlFor="product-quantity-sold">{t('quantity_sold') || 'Quantity Sold'}</Label>
                  <Input
                    id="product-quantity-sold"
                    type="number"
                    value={newProduct.quantitySold}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, quantitySold: parseInt(e.target.value) || 0 }))}
                    placeholder={t('enter_quantity_sold') || 'Enter quantity sold'}
                  />
                </div>
                <div>
                  <Label htmlFor="product-alert">{t('alert_level') || 'Alert Level'}</Label>
                  <Input
                    id="product-alert"
                    type="number"
                    value={newProduct.alert}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, alert: parseInt(e.target.value) || 0 }))}
                    placeholder={t('enter_alert_level') || 'Enter alert level'}
                  />
                </div>
                <div>
                  <Label htmlFor="product-buying-price-inc">{t('buying_price_inc_vat') || 'Buying Price (Inc. VAT)'}</Label>
                  <Input
                    id="product-buying-price-inc"
                    type="number"
                    step="0.01"
                    value={newProduct.buyingPriceIncVat}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, buyingPriceIncVat: parseFloat(e.target.value) || 0 }))}
                    placeholder={t('enter_buying_price_inc') || 'Enter buying price inc. VAT'}
                  />
                </div>
                <div>
                  <Label htmlFor="product-selling-price-exc">{t('selling_price_exc_vat') || 'Selling Price (Exc. VAT)'}</Label>
                  <Input
                    id="product-selling-price-exc"
                    type="number"
                    step="0.01"
                    value={newProduct.sellingPriceExcVat}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, sellingPriceExcVat: parseFloat(e.target.value) || 0 }))}
                    placeholder={t('enter_selling_price_exc') || 'Enter selling price exc. VAT'}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="product-selling-price-inc">{t('selling_price_inc_vat') || 'Selling Price (Inc. VAT)'}</Label>
                  <Input
                    id="product-selling-price-inc"
                    type="number"
                    step="0.01"
                    value={newProduct.sellingPriceIncVat}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, sellingPriceIncVat: parseFloat(e.target.value) || 0 }))}
                    placeholder={t('enter_selling_price_inc') || 'Enter selling price inc. VAT'}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddProduct} className="bg-[#0794FE] hover:bg-[#0670CC]">
                  {t('add_product') || 'Add Product'}
                </Button>
                <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                  {t('cancel') || 'Cancel'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{t('edit_product') || 'Edit Product'}</DialogTitle>
            <DialogDescription>
              {t('edit_product_desc') || 'Update product information.'}
            </DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-product-name">{t('product_name') || 'Product Name'}</Label>
                <Input
                  id="edit-product-name"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                />
              </div>
              <div>
                <Label htmlFor="edit-product-reference">{t('reference') || 'Reference'}</Label>
                <Input
                  id="edit-product-reference"
                  value={editingProduct.reference}
                  onChange={(e) => setEditingProduct(prev => prev ? ({ ...prev, reference: e.target.value }) : null)}
                />
              </div>
              <div>
                <Label htmlFor="edit-product-barcode">{t('barcode') || 'Barcode'}</Label>
                <Input
                  id="edit-product-barcode"
                  value={editingProduct.barcode}
                  onChange={(e) => setEditingProduct(prev => prev ? ({ ...prev, barcode: e.target.value }) : null)}
                />
              </div>
              <div>
                <Label htmlFor="edit-product-quantity-stock">{t('quantity_in_stock') || 'Quantity in Stock'}</Label>
                <Input
                  id="edit-product-quantity-stock"
                  type="number"
                  value={editingProduct.quantityInStock}
                  onChange={(e) => setEditingProduct(prev => prev ? ({ ...prev, quantityInStock: parseInt(e.target.value) || 0 }) : null)}
                />
              </div>
              <div>
                <Label htmlFor="edit-product-quantity-sold">{t('quantity_sold') || 'Quantity Sold'}</Label>
                <Input
                  id="edit-product-quantity-sold"
                  type="number"
                  value={editingProduct.quantitySold}
                  onChange={(e) => setEditingProduct(prev => prev ? ({ ...prev, quantitySold: parseInt(e.target.value) || 0 }) : null)}
                />
              </div>
              <div>
                <Label htmlFor="edit-product-alert">{t('alert_level') || 'Alert Level'}</Label>
                <Input
                  id="edit-product-alert"
                  type="number"
                  value={editingProduct.alert}
                  onChange={(e) => setEditingProduct(prev => prev ? ({ ...prev, alert: parseInt(e.target.value) || 0 }) : null)}
                />
              </div>
              <div>
                <Label htmlFor="edit-product-buying-price-inc">{t('buying_price_inc_vat') || 'Buying Price (Inc. VAT)'}</Label>
                <Input
                  id="edit-product-buying-price-inc"
                  type="number"
                  step="0.01"
                  value={editingProduct.buyingPriceIncVat}
                  onChange={(e) => setEditingProduct(prev => prev ? ({ ...prev, buyingPriceIncVat: parseFloat(e.target.value) || 0 }) : null)}
                />
              </div>
              <div>
                <Label htmlFor="edit-product-selling-price-exc">{t('selling_price_exc_vat') || 'Selling Price (Exc. VAT)'}</Label>
                <Input
                  id="edit-product-selling-price-exc"
                  type="number"
                  step="0.01"
                  value={editingProduct.sellingPriceExcVat}
                  onChange={(e) => setEditingProduct(prev => prev ? ({ ...prev, sellingPriceExcVat: parseFloat(e.target.value) || 0 }) : null)}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="edit-product-selling-price-inc">{t('selling_price_inc_vat') || 'Selling Price (Inc. VAT)'}</Label>
                <Input
                  id="edit-product-selling-price-inc"
                  type="number"
                  step="0.01"
                  value={editingProduct.sellingPriceIncVat}
                  onChange={(e) => setEditingProduct(prev => prev ? ({ ...prev, sellingPriceIncVat: parseFloat(e.target.value) || 0 }) : null)}
                />
              </div>
            </div>
          )}
          <div className="flex gap-2">
            <Button onClick={handleUpdateProduct} className="bg-[#0794FE] hover:bg-[#0670CC]">
              {t('update_product') || 'Update Product'}
            </Button>
            <Button variant="outline" onClick={() => setIsEditProductOpen(false)}>
              {t('cancel') || 'Cancel'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0794FE] text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('product') || 'Product'}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('reference') || 'Reference'}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('barcode') || 'Barcode'}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('qty_stock') || 'Qty Stock'}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('qty_sold') || 'Qty Sold'}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('alert') || 'Alert'}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('buy_price_inc') || 'Buy Price (Inc)'}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('sell_price_exc') || 'Sell Price (Exc)'}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('sell_price_inc') || 'Sell Price (Inc)'}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('rotation_status') || 'Rotation Status'}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('action') || 'Action'}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{product.name}</td>
                  <td className="px-4 py-3 text-sm">{product.reference}</td>
                  <td className="px-4 py-3 text-sm">{product.barcode}</td>
                  <td className="px-4 py-3 text-sm">{product.quantityInStock}</td>
                  <td className="px-4 py-3 text-sm">{product.quantitySold}</td>
                  <td className="px-4 py-3 text-sm">{product.alert}</td>
                  <td className="px-4 py-3 text-sm">{product.buyingPriceIncVat.toFixed(2)} DZD</td>
                  <td className="px-4 py-3 text-sm">{product.sellingPriceExcVat.toFixed(2)} DZD</td>
                  <td className="px-4 py-3 text-sm">{product.sellingPriceIncVat.toFixed(2)} DZD</td>
                  <td className="px-4 py-3 text-sm">
                    <Select 
                      value={product.status} 
                      onValueChange={(value: 'Rapid' | 'Normal' | 'Slow') => handleStatusChange(product.id, value)}
                    >
                      <SelectTrigger className="w-24">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${getStatusColor(product.status)}`}></span>
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Rapid">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            {t('rapid') || 'Rapid'}
                          </div>
                        </SelectItem>
                        <SelectItem value="Normal">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            {t('normal') || 'Normal'}
                          </div>
                        </SelectItem>
                        <SelectItem value="Slow">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                            {t('slow') || 'Slow'}
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-blue-600"
                        onClick={() => handleEditProduct(product)}
                      >
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
            {t('rows_per_page') || 'Rows per page'}: 
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
            1-1 {t('of') || 'of'} 1
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrdersSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">{t('orders') || 'Orders'}</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder={t('search_order_id_supplier') || 'Search by order ID or supplier name'}
            className="pl-10 w-80"
            value={orderSearchTerm}
            onChange={(e) => setOrderSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0794FE] text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('order_id') || 'Order ID'}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('supplier') || 'Supplier'}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('date') || 'Date'}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('amount') || 'Amount'}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('status') || 'Status'}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('actions') || 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{order.id}</td>
                  <td className="px-4 py-3 text-sm">
                    <button 
                      className="text-[#0794FE] hover:underline"
                      onClick={() => handleViewSupplier(order.supplierId)}
                    >
                      {order.supplierName}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm">{order.date}</td>
                  <td className="px-4 py-3 text-sm font-medium">{order.amount.toFixed(2)} DZD</td>
                  <td className="px-4 py-3 text-sm">
                    <Select 
                      value={order.status} 
                      onValueChange={(value: 'confirmed' | 'on-hold' | 'canceled' | 'delivered') => 
                        handleOrderStatusChange(order.id, value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${getStatusColor(order.status)}`}></span>
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="confirmed">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            {t('confirmed') || 'Confirmed'}
                          </div>
                        </SelectItem>
                        <SelectItem value="on-hold">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                            {t('on_hold') || 'On Hold'}
                          </div>
                        </SelectItem>
                        <SelectItem value="canceled">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            {t('canceled') || 'Canceled'}
                          </div>
                        </SelectItem>
                        <SelectItem value="delivered">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            {t('delivered') || 'Delivered'}
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownloadBill(order.id)}
                        className="text-[#0794FE]"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        {t('download_bill') || 'Download Bill'}
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-[#0794FE] hover:bg-[#0670CC] text-white"
                      >
                        {t('learn_more') || 'En savoir plus'}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSupplierProfile = () => {
    if (!selectedSupplier) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => setSelectedSupplier(null)}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            {t('back') || 'Back'}
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {selectedSupplier.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{selectedSupplier.name}</h1>
              <div className="flex items-center gap-4 mt-1">
                <Badge className="bg-blue-100 text-blue-800">EXCELLENT SELLER</Badge>
                <span className="text-sm text-gray-600">
                  {selectedSupplier.rating} Positive feedback | {selectedSupplier.reviews.toLocaleString()} reviews
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedSupplier.categories.map((category, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count.toLocaleString()}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                Seller's items ({selectedSupplier.items.toLocaleString()} items)
              </h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Search" className="pl-10 w-64" />
                </div>
                <Select defaultValue="best-match">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="best-match">Best match</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedSupplier.products.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                        <div className="text-xs text-gray-600 space-y-1">
                          <div>Platform: {product.platform}</div>
                          <div>Type: {product.type}</div>
                          <div>Region: {product.region}</div>
                          {product.canActivateInAlgeria && (
                            <div className="text-green-600 flex items-center gap-1">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              Can activate in: Algeria
                            </div>
                          )}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="font-bold text-lg">{product.price} USD</span>
                          {product.originalPrice && (
                            <>
                              <span className="text-sm text-gray-500 line-through">
                                {product.originalPrice} USD
                              </span>
                              <Badge className="bg-red-100 text-red-800 text-xs">
                                -{product.discount}%
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

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
              className="h-6 w-6 flex-shrink-0"
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
                  placeholder={t('search') || 'Search'}
                  className="pl-10 w-64"
                />
              </div>
              <LanguageSwitcher />
              <button
                onClick={() => setIsUserProfileOpen(true)}
                className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-[#0794FE] rounded-full flex items-center justify-center text-white text-sm font-medium">
                  B
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-800">Baraka</div>
                  <div className="text-gray-500">baraka@gmail.com</div>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {selectedSupplier ? (
            renderSupplierProfile()
          ) : selectedProduct ? (
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
          ) : currentSection === 'orders' ? (
            renderOrdersSection()
          ) : currentSection === 'cashier' ? (
            <CashierSection onBack={() => setCurrentSection('home')} />
          ) : currentSection === 'bizz' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">{t('buy_products')}</h2>
                <div className="flex items-center gap-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder={t('filter_by_category') || 'Filter by category'} />
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
                    {filteredBizzProducts.length} {t('products_available') || 'Products Available'}
                  </Badge>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentSection('cart')}
                    className="relative"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {t('cart') || 'Cart'}
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
                {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} {t('section') || 'Section'}
              </h3>
              <p className="text-gray-500">{t('section_under_development') || 'This section is under development'}</p>
            </div>
          )}
        </main>
      </div>

      {/* User Profile Modal */}
      <UserProfile 
        isOpen={isUserProfileOpen}
        onClose={() => setIsUserProfileOpen(false)}
      />
    </div>
  );
};

export default Dashboard;

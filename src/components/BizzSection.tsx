import React, { useState, useContext, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, ShoppingCart, ShoppingBag } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LanguageContext } from '@/contexts/LanguageContext';
import ProductCard from './ProductCard';
import ProductDetail from './ProductDetail';
import CartPage from './CartPage';
import SupplierSection from './SupplierSection';

interface Seller {
  id: number;
  name: string;
  rating: string;
  reviews: number;
  price: string;
  isDefault?: boolean;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  volume?: string;
  packaging?: string;
  storage?: string;
  usage?: string;
  sellers?: Seller[];
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  seller: Seller;
  unitPrice: number;
  totalPrice: number;
}

interface BizzSectionProps {
  onBack: () => void;
}

const CART_STORAGE_KEY = "bizz_section_cart";

const BizzSection = ({ onBack }: BizzSectionProps) => {
  const { t } = useContext(LanguageContext);
  const [currentView, setCurrentView] = useState<'products' | 'detail' | 'cart' | 'supplier' | 'messages'>('products');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartPopoverOpen, setCartPopoverOpen] = useState(false);
  const [messageSeller, setMessageSeller] = useState<Seller | null>(null);

  // Hydrate cartItems from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        setCartItems([]);
      }
    }
  }, []);

  // Persist cartItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // New product listings (Coca Cola, Elio oils, Skor Civital) with random suppliers
  const products: Product[] = [
    // Elio Oil 2L
    {
      id: 101,
      name: "Elio Oil 2L",
      description: "Vegetable Oil - 2 Liter Bottle",
      price: "350",
      image: "/lovable-uploads/75fa4299-081c-4a60-b0f2-2e05b0a82ad4.png",
      category: "Oils & Fats",
      volume: "2 Liters",
      packaging: "PET bottle",
      storage: "Store at room temperature",
      usage: "Cooking and frying",
      sellers: [
        { id: 5, name: "Atlas Alimentaire", rating: "4.6", reviews: 54, price: "340", isDefault: true },
        { id: 8, name: "Sarl NourFood", rating: "4.9", reviews: 112, price: "350" },
        { id: 12, name: "Epicerie Maroc", rating: "4.7", reviews: 78, price: "345" }
      ]
    },
    // Elio Oil 5L
    {
      id: 102,
      name: "Elio Oil 5L",
      description: "Vegetable Oil - 5 Liter Bottle",
      price: "790",
      image: "/lovable-uploads/c644764e-0ea6-4962-913f-1137b4e0e713.png",
      category: "Oils & Fats",
      volume: "5 Liters",
      packaging: "Large PET bottle",
      storage: "Store at room temperature",
      usage: "Catering and large kitchens",
      sellers: [
        { id: 6, name: "Bled Distributeur", rating: "4.4", reviews: 99, price: "789", isDefault: true },
        { id: 9, name: "Marché Express", rating: "4.8", reviews: 59, price: "795" },
        { id: 15, name: "Djezzy Food Wholesale", rating: "4.5", reviews: 65, price: "780" }
      ]
    },
    // Skor Civital 2KG
    {
      id: 103,
      name: "Skor Civital 2KG",
      description: "Refined sugar - 2 KG pack",
      price: "290",
      image: "/lovable-uploads/e74f37fd-6aa5-4408-9543-a9cce368970d.png",
      category: "Sugar",
      volume: "2 KG",
      packaging: "Plastic pack",
      storage: "Store in dry place",
      usage: "Tea, baking, multi-use",
      sellers: [
        { id: 7, name: "AgroSweets", rating: "4.8", reviews: 77, price: "285", isDefault: true },
        { id: 10, name: "Civital Centrale", rating: "4.6", reviews: 81, price: "290" },
        { id: 11, name: "Ain FoodMarket", rating: "4.9", reviews: 63, price: "288" }
      ]
    },
    // La Vache qui rit 24p
    {
      id: 104,
      name: "La Vache qui rit 24p",
      description: "Creamy cheese, 24 portions",
      price: "450",
      image: "/lovable-uploads/e7b1650b-c98e-4190-989c-e6153f13970f.png",
      category: "Dairy Products",
      volume: "24 portions",
      packaging: "Round box",
      storage: "Refrigerate after opening",
      usage: "Spread, snacks, sandwiches",
      sellers: [
        { id: 13, name: "Dairy Market Plus", rating: "4.7", reviews: 82, price: "445", isDefault: true },
        { id: 14, name: "Fromagerie Express", rating: "4.8", reviews: 65, price: "450" },
        { id: 15, name: "SuperMart Distributors", rating: "4.6", reviews: 107, price: "455" }
      ]
    },
    // Cheezy 24p
    {
      id: 105,
      name: "Cheezy 24p",
      description: "Spreadable processed cheese, 24 portions",
      price: "390",
      image: "/lovable-uploads/62fa08c2-a7b0-4852-90cc-e4621b3c1760.png",
      category: "Dairy Products",
      volume: "24 portions",
      packaging: "Round box",
      storage: "Refrigerate after opening",
      usage: "Spread, snacks, sandwiches",
      sellers: [
        { id: 16, name: "Epicerie Maroc", rating: "4.5", reviews: 54, price: "385", isDefault: true },
        { id: 17, name: "Laiterie Maghreb", rating: "4.8", reviews: 103, price: "390" },
        { id: 18, name: "SuperMart Distributors", rating: "4.7", reviews: 91, price: "395" }
      ]
    },
    // Random additional products
    {
      id: 106,
      name: "Nestlé Water 1.5L",
      description: "Pack of 6 bottles, spring water",
      price: "210",
      image: "/lovable-uploads/bc27ac7e-7ac9-405e-bf04-b04f5339fe06.png",
      category: "Beverages",
      volume: "1.5L x 6",
      packaging: "Plastic bottles",
      storage: "Store in cool dry place",
      usage: "Daily hydration",
      sellers: [
        { id: 19, name: "Marché Express", rating: "4.6", reviews: 49, price: "210", isDefault: true },
        { id: 20, name: "FreshMart", rating: "4.7", reviews: 37, price: "215" }
      ]
    },
    {
      id: 107,
      name: "Barilla Spaghetti 500g",
      description: "Classic Italian pasta",
      price: "190",
      image: "/placeholder.svg",
      category: "Canned Foods",
      volume: "500g",
      packaging: "Plastic package",
      storage: "Cool, dry place",
      usage: "Pasta dishes",
      sellers: [
        { id: 21, name: "Epicerie Italia", rating: "4.8", reviews: 44, price: "189", isDefault: true },
        { id: 22, name: "Bled Distributeur", rating: "4.5", reviews: 28, price: "190" }
      ]
    },
    {
      id: 108,
      name: "Sunshine Chips",
      description: "Crispy salted potato chips, 210g",
      price: "120",
      image: "/lovable-uploads/b7b53d1c-2060-4de4-931d-52706bd84107.png",
      category: "Snacks",
      volume: "210g",
      packaging: "Bag",
      storage: "Store in dry place",
      usage: "Snacking",
      sellers: [
        { id: 23, name: "SnackMania", rating: "4.4", reviews: 22, price: "119", isDefault: true },
        { id: 24, name: "FreshMart", rating: "4.5", reviews: 19, price: "120" }
      ]
    },
    {
      id: 109,
      name: "Oreo Pack 24p",
      description: "Chocolate sandwich cookies, 24 pieces",
      price: "250",
      image: "/placeholder.svg",
      category: "Snacks",
      volume: "24 cookies",
      packaging: "Box",
      storage: "Store in cool dry place",
      usage: "Snacks, tea time",
      sellers: [
        { id: 25, name: "SnackMania", rating: "4.5", reviews: 41, price: "248", isDefault: true },
        { id: 26, name: "Epicerie Maroc", rating: "4.5", reviews: 34, price: "250" }
      ]
    },
    {
      id: 1,
      name: "Coca-cola",
      description: "2 liter bottle",
      price: "150",
      image: "/lovable-uploads/2772f3d5-06fc-4c62-a337-1fc9f51010b1.png",
      category: "Beverages",
      volume: "2 Liters",
      packaging: "PET bottle with resealable cap",
      storage: "Shelf stable and easy to store",
      usage: "Ideal for supermarkets, convenience stores, and HoReCa",
      sellers: [
        { id: 1, name: "SuperMart Distributors", rating: "4.8", reviews: 245, price: "145", isDefault: true },
        { id: 2, name: "Beverage Plus", rating: "4.6", reviews: 189, price: "150" },
        { id: 3, name: "Wholesale Direct", rating: "4.7", reviews: 156, price: "148" }
      ]
    },
    {
      id: 2,
      name: "Coca-cola",
      description: "1 liter bottle",
      price: "120",
      image: "/lovable-uploads/2772f3d5-06fc-4c62-a337-1fc9f51010b1.png",
      category: "Beverages",
      volume: "1 Liter",
      packaging: "PET bottle with resealable cap",
      storage: "Shelf stable and easy to store",
      usage: "Ideal for supermarkets, convenience stores, and HoReCa",
      sellers: [
        { id: 1, name: "SuperMart Distributors", rating: "4.8", reviews: 245, price: "115", isDefault: true },
        { id: 2, name: "Beverage Plus", rating: "4.6", reviews: 189, price: "120" }
      ]
    }
  ];

  const categories = ['All Products', 'Beverages', 'Snacks', 'Cleaning', 'Meat & Poultry', 'Seafood', 'Dairy Products', 'Frozen Foods', 'Canned Foods'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
  };

  const handleAddToCart = (product: Product, quantity: number, seller: Seller) => {
    const unitPrice = parseInt(seller.price);
    const totalPrice = unitPrice * quantity;
    
    const newCartItem: CartItem = {
      id: Date.now(),
      product,
      quantity,
      seller,
      unitPrice,
      totalPrice
    };

    setCartItems(prev => [...prev, newCartItem]);
    console.log('Added to cart:', newCartItem);
    console.log('Updated cart items:', [...cartItems, newCartItem]);
  };

  const handleBuyMoreFromSupplier = (sellerId: number) => {
    setSelectedSupplierId(sellerId);
    setCurrentView('supplier');
  };

  const handleRemoveFromCart = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: item.unitPrice * newQuantity
        };
      }
      return item;
    }));
  };

  // Change callback type to expect Seller object
  const handleContactSeller = (seller: Seller) => {
    setMessageSeller(seller);
    setCurrentView('messages');
  };

  const renderProductsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{t('buy_products')}</h1>
          <p className="text-gray-600">{t('dashboard_subtitle')}</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-blue-100 text-[#0794FE]">
            {filteredProducts.length} {t('products')} Available
          </Badge>
          {/* Red animated cart popover if items exist */}
          {cartItems.length > 0 ? (
            <Popover open={cartPopoverOpen} onOpenChange={setCartPopoverOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="relative flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white animate-bounce"
                  onClick={() => setCartPopoverOpen(true)}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {t('cart')}
                  <span className="absolute -top-2 -right-2 text-xs font-semibold bg-white text-red-600 rounded-full px-2 py-0.5 shadow">{cartItems.length}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-4 max-w-xs text-center bg-red-50 border-red-300">
                <div className="font-semibold text-red-600 mb-2 flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  {t('cart')} ({cartItems.length})
                </div>
                <div className="mb-2 text-sm text-gray-700">
                  {t('you_have')} {cartItems.length} {t('products')} {t('in_cart')}
                </div>
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white mt-2"
                  onClick={() => { setCurrentView('cart'); setCartPopoverOpen(false); }}
                >
                  {t('go_to_cart')}
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('cart')}
              className="flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              {t('cart')} ({cartItems.length})
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder={t('search_product')}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "bg-[#0794FE] text-white" : ""}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onSelect={handleProductSelect}
          />
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'products':
        return renderProductsView();
      case 'detail':
        return selectedProduct ? (
          <ProductDetail 
            product={selectedProduct}
            onBack={() => setCurrentView('products')}
            onAddToCart={handleAddToCart}
            onBuyMoreFromSupplier={handleBuyMoreFromSupplier}
            onContactSeller={handleContactSeller}
          />
        ) : null;
      case 'cart':
        return (
          <CartPage 
            cartItems={cartItems}
            onRemoveItem={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        );
      case 'supplier':
        return <SupplierSection />;
      case 'messages':
        // Forward seller to SupplierSection so its message tab can be auto-opened for this seller
        return <SupplierSection initialMessageSupplier={messageSeller} />;
      default:
        return renderProductsView();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('previous_page')}
        </Button>
        
        {currentView !== 'products' && currentView !== 'supplier' && (
          <Button 
            variant="ghost" 
            onClick={() => setCurrentView('products')}
            className="flex items-center gap-2 text-gray-600"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to products
          </Button>
        )}

        {currentView === 'supplier' && (
          <Button 
            variant="ghost" 
            onClick={() => setCurrentView('products')}
            className="flex items-center gap-2 text-gray-600"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to products
          </Button>
        )}
      </div>
      {renderContent()}
    </div>
  );
};

export default BizzSection;

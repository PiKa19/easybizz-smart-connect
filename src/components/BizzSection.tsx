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

  const products: Product[] = [
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
        return <SupplierSection initialMessageSeller={messageSeller} />;
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

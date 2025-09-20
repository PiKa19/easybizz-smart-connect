import React, { useState, useContext, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, ShoppingCart, ShoppingBag, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LanguageContext } from '@/contexts/LanguageContext';
import ProductCard from './ProductCard';
import ProductDetail from './ProductDetail';
import CartPage from './CartPage';
import SupplierSection from './SupplierSection';
import ApiFallback from './ApiFallback';
import { useSafeBizz } from '@/hooks/useSafeApi';
import type { Bizz as ApiBizz } from '@/lib/api';

interface Seller {
  id: number;
  name: string;
  rating: string;
  reviews: number;
  price: string;
  isDefault?: boolean;
  quantityAvailable?: number;
  deliveryAvailable?: boolean;
  paymentMethods?: string[];
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

  // Safe API integration
  const { data: apiBizz, loading, error, refetch } = useSafeBizz();

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

  // Transform API data to Product format with proper validation
  const transformApiBizzToProducts = (apiBizz: any): Product[] => {
    console.log('🔍 Raw API data:', apiBizz);
    console.log('🔍 Data type:', typeof apiBizz);
    console.log('🔍 Is array:', Array.isArray(apiBizz));
    
    // Handle different response formats
    if (!apiBizz) {
      console.log('❌ No API data received');
      return [];
    }
    
    // If it's not an array, try to extract data from common response formats
    let dataArray: any[] = [];
    
    if (Array.isArray(apiBizz)) {
      dataArray = apiBizz;
    } else if (apiBizz.data && Array.isArray(apiBizz.data)) {
      dataArray = apiBizz.data;
    } else if (apiBizz.results && Array.isArray(apiBizz.results)) {
      dataArray = apiBizz.results;
    } else if (apiBizz.items && Array.isArray(apiBizz.items)) {
      dataArray = apiBizz.items;
    } else {
      console.log('❌ API data is not in expected format:', apiBizz);
      return [];
    }
    
    console.log('✅ Extracted data array:', dataArray);
    
    return dataArray.map((bizz, index) => ({
      id: bizz.id || index,
      name: bizz.product_name || bizz.name || `Product ${index + 1}`,
      description: `${bizz.product_name || bizz.name || `Product ${index + 1}`} - Product from API`,
      price: (bizz.price || 0).toString(),
      image: "/placeholder.svg", // Default image since API doesn't provide images
      category: "API Products", // Default category since API doesn't provide categories
      volume: "Various",
      packaging: "Standard",
      storage: "Store as per manufacturer instructions",
      usage: "General use",
      sellers: [
        {
          id: bizz.boutique_id || bizz.store_id || index,
          name: `Boutique ${bizz.boutique_id || bizz.store_id || index}`,
          rating: (bizz.rating || 4.0).toString(),
          reviews: bizz.reviews || 0,
          price: (bizz.price || 0).toString(),
          isDefault: true,
          quantityAvailable: 100,
          deliveryAvailable: true,
          paymentMethods: ["Cash", "Card"]
        }
      ]
    }));
  };

  // Get products from API or fallback to empty array with error handling
  const products: Product[] = (() => {
    try {
      if (!apiBizz) return [];
      return transformApiBizzToProducts(apiBizz);
    } catch (error) {
      console.error('❌ Error transforming API data:', error);
      return [];
    }
  })();

  // Fallback products when API fails
  const fallbackProducts: Product[] = [
    {
      id: 999,
      name: "API Connection Issue",
      description: "Unable to load products from API. Please check your connection.",
      price: "0",
      image: "/placeholder.svg",
      category: "System",
      volume: "N/A",
      packaging: "N/A",
      storage: "N/A",
      usage: "Debugging",
      sellers: [
        {
          id: 999,
          name: "System",
          rating: "0.0",
          reviews: 0,
          price: "0",
          isDefault: true,
          quantityAvailable: 0,
          deliveryAvailable: false,
          paymentMethods: []
        }
      ]
    }
  ];

  // Use fallback products if API fails and no data
  const displayProducts = products.length > 0 ? products : (error ? fallbackProducts : []);

  const categories = ['All Products', 'Beverages', 'Snacks', 'Cleaning', 'Meat & Poultry', 'Seafood', 'Dairy Products', 'Frozen Foods', 'Canned Foods'];

  const filteredProducts = displayProducts.filter(product => {
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

  // Use a modern card-like container to match Clients/Orders sections:
  const renderProductsView = () => (
    <div className="space-y-6">
      <div className="bg-white/90 border border-blue-100 rounded-2xl shadow-xl p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-3xl font-bold text-[#0794FE] mb-1">{t('buy_products')}</h1>
            <p className="text-muted-foreground">{t('dashboard_subtitle')}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-blue-50 text-[#0794FE] border border-blue-100 px-3 py-1.5 rounded-lg font-semibold text-sm shadow hover:shadow-md transition">
              {filteredProducts.length} {t('products')} Available
            </span>
            {/* Red animated cart popover if items exist */}
            {cartItems.length > 0 ? (
              <Popover open={cartPopoverOpen} onOpenChange={setCartPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="relative flex items-center gap-2 bg-[#0794FE] hover:bg-[#065fad] text-white shadow-lg animate-bounce rounded-lg"
                    onClick={() => setCartPopoverOpen(true)}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {t('cart')}
                    <span className="absolute -top-2 -right-2 text-xs font-semibold bg-white text-[#0794FE] rounded-full px-2 py-0.5 shadow border border-blue-200">{cartItems.length}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-4 max-w-xs text-center bg-blue-50 border-blue-100 rounded-2xl shadow-lg">
                  <div className="font-semibold text-[#0794FE] mb-2 flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    {t('cart')} ({cartItems.length})
                  </div>
                  <div className="mb-2 text-sm text-blue-900">{t('you_have')} {cartItems.length} {t('products')} {t('in_cart')}</div>
                  <Button
                    className="w-full bg-[#0794FE] hover:bg-[#065fad] text-white mt-2 shadow"
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
                className="flex items-center gap-2 rounded-lg border-blue-200 text-[#0794FE] shadow hover:shadow-md"
              >
                <ShoppingCart className="w-4 h-4" />
                {t('cart')} ({cartItems.length})
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2 mb-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-52 bg-blue-50 border-blue-100 rounded shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-xl border-blue-200 z-50">
              {categories.map(category => (
                <SelectItem
                  key={category}
                  value={category}
                  className="text-[#0794FE] font-semibold data-[state=checked]:bg-[#0794FE]/10 data-[state=checked]:text-[#0794FE]"
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-300" />
            <Input 
              placeholder={t('search_product')}
              className="pl-10 min-w-[120px] rounded bg-blue-50 border-blue-100 text-blue-900 focus:ring-2 focus:ring-blue-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap pb-4">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-[#0794FE] text-white shadow" : "border-blue-200 text-[#0794FE] bg-blue-50 hover:bg-blue-100"}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#0794FE]" />
            <span className="ml-2 text-[#0794FE]">Loading products...</span>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-red-600 mb-4">Error loading products: {error}</p>
              <Button onClick={refetch} className="bg-[#0794FE] hover:bg-[#065fad] text-white">
                Retry
              </Button>
            </div>
          </div>
        )}

        {/* Product grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white border border-blue-50 rounded-xl shadow hover:shadow-lg transition-shadow p-0 animate-fade-in flex flex-col hover-scale cursor-pointer"
                onClick={() => handleProductSelect(product)}
                style={{ minHeight: '320px' }}>
                <ProductCard 
                  product={product} 
                  onSelect={handleProductSelect}
                />
              </div>
            ))}
          </div>
        )}

        {/* No products state */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    // Show fallback if API failed and we're in products view
    if (currentView === 'products' && error && !loading) {
      return (
        <ApiFallback
          title="Products"
          error={error}
          onRetry={refetch}
          onTestApi={() => window.open('http://5.196.209.135/api/merchant/bizz', '_blank')}
        />
      );
    }

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

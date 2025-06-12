import React, { useState, useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, ShoppingCart } from "lucide-react";
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

const BizzSection = ({ onBack }: BizzSectionProps) => {
  const { t } = useContext(LanguageContext);
  const [currentView, setCurrentView] = useState<'products' | 'detail' | 'cart' | 'supplier'>('products');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('cart')}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            {t('cart')} ({cartItems.length})
          </Button>
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

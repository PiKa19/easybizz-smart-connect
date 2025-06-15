import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import ProductListingForm from './ProductListingForm';
import { Input } from "@/components/ui/input";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

interface SupplierBizzSectionProps {
  onBack: () => void;
}

const SupplierBizzSection = ({ onBack }: SupplierBizzSectionProps) => {
  const [currentView, setCurrentView] = useState<'listings' | 'add-listing' | 'edit-listing'>('listings');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'listings' | 'add-listing'>('listings');
  const [searchTerm, setSearchTerm] = useState('');

  // Add more realistic/random categories
  const categories = [
    "Beverages",
    "Conserves",
    "Dairy",
    "Cleaning",
    "Canned Foods",
    "Frozen Foods",
    "Snacks",
    "Bakery",
    "Personal Care",
    "Meat & Poultry"
  ];

  // Mock data for supplier's products (unchanged)
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Coca-cola",
      description: "2 liter bottle",
      price: "150",
      image: "/lovable-uploads/2772f3d5-06fc-4c62-a337-1fc9f51010b1.png",
      category: "Beverages"
    },
    {
      id: 2,
      name: "Coca-cola",
      description: "1 liter bottle",
      price: "120",
      image: "/lovable-uploads/2772f3d5-06fc-4c62-a337-1fc9f51010b1.png",
      category: "Beverages"
    },
    {
      id: 3,
      name: "Hamoud bida",
      description: "2 liter bottle",
      price: "130",
      image: "/placeholder.svg",
      category: "Beverages"
    },
    {
      id: 4,
      name: "Hamoud bida",
      description: "1 liter bottle",
      price: "110",
      image: "/placeholder.svg",
      category: "Beverages"
    },
    {
      id: 5,
      name: "Coca-cola",
      description: "2 liter bottle",
      price: "150",
      image: "/lovable-uploads/2772f3d5-06fc-4c62-a337-1fc9f51010b1.png",
      category: "Beverages"
    }
  ]);

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('edit-listing');
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleSaveProduct = (productData: any) => {
    if (selectedProduct) {
      // Edit existing product
      setProducts(prev => prev.map(p => 
        p.id === selectedProduct.id ? { ...p, ...productData } : p
      ));
    } else {
      // Add new product
      const newProduct = {
        id: Date.now(),
        ...productData
      };
      setProducts(prev => [...prev, newProduct]);
    }
    setCurrentView('listings');
    setSelectedProduct(null);
  };

  // Filter products by search term (case-insensitive match on name or description)
  const filteredProducts = products.filter(product => {
    const query = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  });

  if (currentView === 'add-listing' || currentView === 'edit-listing') {
    return (
      <ProductListingForm
        product={selectedProduct}
        onSave={handleSaveProduct}
        onCancel={() => {
          setCurrentView('listings');
          setSelectedProduct(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous page
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Sell products on easybizz</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-4">
        <Button
          variant={activeTab === 'listings' ? "default" : "outline"}
          onClick={() => setActiveTab('listings')}
          className={activeTab === 'listings' ? "bg-[#0794FE] text-white" : ""}
        >
          listings
        </Button>
        <Button
          variant={activeTab === 'add-listing' ? "default" : "outline"}
          onClick={() => {
            setActiveTab('add-listing');
            setCurrentView('add-listing');
          }}
          className={activeTab === 'add-listing' ? "bg-[#0794FE] text-white" : ""}
        >
          Add listing
        </Button>
      </div>

      {/* Search Bar for Filtering Products */}
      <div className="max-w-md my-2">
        <Input
          placeholder="Search your listings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-3"
        />
      </div>

      {/* Category filters: now more categories */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <Button key={category} variant="outline" size="sm">{category}</Button>
        ))}
      </div>

      {/* Products Grid (NO Buy now button) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-32 object-cover rounded mb-3"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={() => handleEditProduct(product)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDeleteProduct(product.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <h4 className="font-semibold">{product.name}</h4>
              <p className="text-sm text-gray-600">{product.description}</p>
              {/* Removed Buy now button */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SupplierBizzSection;

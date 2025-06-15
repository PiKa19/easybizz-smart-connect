
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

      <div className="bg-white/90 border border-blue-100 rounded-2xl shadow-xl p-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-[#0794FE] mb-1">Your Product Listings</h1>
            <span className="text-muted-foreground text-base">Manage your products and connect with retailers easily.</span>
          </div>
          <div className="flex gap-2 mt-2 md:mt-0">
            <Button
              variant={activeTab === 'listings' ? "default" : "outline"}
              className={activeTab === 'listings' ? "bg-[#0794FE] text-white border-blue-300" : "text-[#0794FE] border-blue-100"}
              onClick={() => {
                setActiveTab('listings');
                setCurrentView('listings');
              }}
            >
              Listings
            </Button>
            <Button
              variant={activeTab === 'add-listing' ? "default" : "outline"}
              className={activeTab === 'add-listing' ? "bg-[#0794FE] text-white border-blue-300" : "text-[#0794FE] border-blue-100"}
              onClick={() => {
                setActiveTab('add-listing');
                setCurrentView('add-listing');
              }}
            >
              Add Listing
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="flex-1">
            <Input
              placeholder="Search your listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-3 min-w-[160px] max-w-lg border-blue-100 bg-blue-50 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm"
            />
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map((category) => (
            <Button key={category}
              variant="outline"
              size="sm"
              className="rounded-full px-4 py-1.5 border-blue-100 text-[#0794FE] bg-blue-50 hover:bg-blue-100"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center text-blue-700 py-8 font-medium border-2 border-blue-100/80 bg-blue-50/50 rounded-2xl shadow-inner">
              No listings found.
            </div>
          )}
          {filteredProducts.map(product => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow border-blue-100 bg-white rounded-xl animate-fade-in flex flex-col relative group">
              <CardContent className="p-4 flex-1 flex flex-col">
                <div className="relative mb-3 w-full flex justify-center items-center">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg border border-blue-50 shadow-sm group-hover:scale-105 group-hover:shadow-md transition-transform duration-200"
                  />
                  <div className="absolute top-2 right-2 flex gap-1 z-10 opacity-80 group-hover:opacity-100 transition-opacity">
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
                <h4 className="font-semibold text-lg text-blue-800 mb-0.5">{product.name}</h4>
                <p className="text-sm text-blue-600 mb-2">{product.description}</p>
                <span className="inline-block font-bold text-[#0794FE] bg-blue-50 rounded px-2 py-1 text-base shadow-sm mt-auto mb-0">
                  {product.price} DA
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplierBizzSection;


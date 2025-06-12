
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

interface ProductListingFormProps {
  product?: Product | null;
  onSave: (productData: any) => void;
  onCancel: () => void;
}

const ProductListingForm = ({ product, onSave, onCancel }: ProductListingFormProps) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || '',
    image: product?.image || '',
    unit: 'bottle',
    minimumOrder: '1',
    stockQuantity: '100',
    brand: '',
    weight: '',
    dimensions: '',
    expiryDate: '',
    storage: 'Room temperature'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: e.target?.result as string || '/placeholder.svg'
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to listings
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">
          {product ? 'Edit Product' : 'Add New Product'}
        </h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>{product ? 'Edit Product Listing' : 'Create New Product Listing'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    placeholder="Enter brand name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beverages">Beverages</SelectItem>
                    <SelectItem value="Snacks">Snacks</SelectItem>
                    <SelectItem value="Dairy">Dairy</SelectItem>
                    <SelectItem value="Cleaning">Cleaning</SelectItem>
                    <SelectItem value="Canned Foods">Canned Foods</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Pricing and Inventory */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Pricing & Inventory</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price (DZD)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bottle">Bottle</SelectItem>
                      <SelectItem value="can">Can</SelectItem>
                      <SelectItem value="pack">Pack</SelectItem>
                      <SelectItem value="kg">Kilogram</SelectItem>
                      <SelectItem value="liter">Liter</SelectItem>
                      <SelectItem value="piece">Piece</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="stockQuantity">Stock Quantity</Label>
                  <Input
                    id="stockQuantity"
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) => handleInputChange('stockQuantity', e.target.value)}
                    placeholder="100"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="minimumOrder">Minimum Order Quantity</Label>
                <Input
                  id="minimumOrder"
                  type="number"
                  value={formData.minimumOrder}
                  onChange={(e) => handleInputChange('minimumOrder', e.target.value)}
                  placeholder="1"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Weight/Volume</Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="e.g., 2L, 500g"
                  />
                </div>
                
                <div>
                  <Label htmlFor="dimensions">Dimensions</Label>
                  <Input
                    id="dimensions"
                    value={formData.dimensions}
                    onChange={(e) => handleInputChange('dimensions', e.target.value)}
                    placeholder="L x W x H (cm)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="storage">Storage Requirements</Label>
                  <Select value={formData.storage} onValueChange={(value) => handleInputChange('storage', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Room temperature">Room Temperature</SelectItem>
                      <SelectItem value="Refrigerated">Refrigerated</SelectItem>
                      <SelectItem value="Frozen">Frozen</SelectItem>
                      <SelectItem value="Cool and dry">Cool and Dry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Product Image */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Image</h3>
              
              <div className="flex items-center gap-4">
                {formData.image && (
                  <img 
                    src={formData.image} 
                    alt="Product preview" 
                    className="w-20 h-20 object-cover rounded border"
                  />
                )}
                
                <div>
                  <Label htmlFor="image" className="cursor-pointer">
                    <div className="flex items-center gap-2 p-2 border border-dashed rounded-lg hover:bg-gray-50">
                      <Upload className="w-4 h-4" />
                      <span>{formData.image ? 'Change Image' : 'Upload Image'}</span>
                    </div>
                  </Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="bg-[#0794FE] hover:bg-blue-700">
                {product ? 'Update Product' : 'Create Product'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductListingForm;

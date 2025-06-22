
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ProductData {
  name: string;
  reference: string;
  barcode: string;
  qtyStock: number;
  qtySold: number;
  alert: number;
  buyPrice: number;
  sellPriceHT: number;
  sellPriceTTC: number;
  rotationStatus: string;
}

interface AddProductDialogProps {
  onSave: (product: ProductData) => void;
  onClose: () => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ onSave, onClose }) => {
  const [productData, setProductData] = useState<ProductData>({
    name: '',
    reference: '',
    barcode: '',
    qtyStock: 0,
    qtySold: 0,
    alert: 0,
    buyPrice: 0,
    sellPriceHT: 0,
    sellPriceTTC: 0,
    rotationStatus: 'Normal'
  });

  const handleInputChange = (field: keyof ProductData, value: string | number) => {
    setProductData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (!productData.name || !productData.reference) {
      alert('Please fill in required fields (Name and Reference)');
      return;
    }
    onSave(productData);
    onClose();
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add New Product</DialogTitle>
      </DialogHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 max-h-96 overflow-y-auto">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            placeholder="Enter product name"
            value={productData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="reference">Reference *</Label>
          <Input
            id="reference"
            placeholder="Enter reference"
            value={productData.reference}
            onChange={(e) => handleInputChange('reference', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="barcode">Barcode</Label>
          <Input
            id="barcode"
            placeholder="Enter barcode"
            value={productData.barcode}
            onChange={(e) => handleInputChange('barcode', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="qtyStock">Stock Quantity</Label>
          <Input
            id="qtyStock"
            type="number"
            placeholder="0"
            value={productData.qtyStock}
            onChange={(e) => handleInputChange('qtyStock', parseInt(e.target.value) || 0)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="qtySold">Quantity Sold</Label>
          <Input
            id="qtySold"
            type="number"
            placeholder="0"
            value={productData.qtySold}
            onChange={(e) => handleInputChange('qtySold', parseInt(e.target.value) || 0)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="alert">Alert Threshold</Label>
          <Input
            id="alert"
            type="number"
            placeholder="0"
            value={productData.alert}
            onChange={(e) => handleInputChange('alert', parseInt(e.target.value) || 0)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="buyPrice">Buy Price (DZD)</Label>
          <Input
            id="buyPrice"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={productData.buyPrice}
            onChange={(e) => handleInputChange('buyPrice', parseFloat(e.target.value) || 0)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="sellPriceHT">Sell Price HT (DZD)</Label>
          <Input
            id="sellPriceHT"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={productData.sellPriceHT}
            onChange={(e) => handleInputChange('sellPriceHT', parseFloat(e.target.value) || 0)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="sellPriceTTC">Sell Price TTC (DZD)</Label>
          <Input
            id="sellPriceTTC"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={productData.sellPriceTTC}
            onChange={(e) => handleInputChange('sellPriceTTC', parseFloat(e.target.value) || 0)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rotationStatus">Rotation Status</Label>
          <Select value={productData.rotationStatus} onValueChange={(value) => handleInputChange('rotationStatus', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Rapid">Rapid</SelectItem>
              <SelectItem value="Normal">Normal</SelectItem>
              <SelectItem value="Slow">Slow</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Add Product
        </Button>
      </div>
    </>
  );
};

export default AddProductDialog;

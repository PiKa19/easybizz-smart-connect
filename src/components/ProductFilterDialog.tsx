
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductFilterState {
  name: string;
  reference: string;
  barcode: string;
  qtyMin: string;
  qtyMax: string;
  stockMin: string;
  stockMax: string;
  soldMin: string;
  soldMax: string;
  alertMin: string;
  alertMax: string;
  buyPriceMin: string;
  buyPriceMax: string;
  sellPriceHTMin: string;
  sellPriceHTMax: string;
  sellPriceTTCMin: string;
  sellPriceTTCMax: string;
  rotation: string;
}

interface ProductFilterDialogProps {
  filters: ProductFilterState;
  onFiltersChange: (filters: ProductFilterState) => void;
  onClose: () => void;
}

const ProductFilterDialog: React.FC<ProductFilterDialogProps> = ({
  filters,
  onFiltersChange,
  onClose
}) => {
  const handleFilterChange = (key: keyof ProductFilterState, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      name: '',
      reference: '',
      barcode: '',
      qtyMin: '',
      qtyMax: '',
      stockMin: '',
      stockMax: '',
      soldMin: '',
      soldMax: '',
      alertMin: '',
      alertMax: '',
      buyPriceMin: '',
      buyPriceMax: '',
      sellPriceHTMin: '',
      sellPriceHTMax: '',
      sellPriceTTCMin: '',
      sellPriceTTCMax: '',
      rotation: ''
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Filter Products</DialogTitle>
      </DialogHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 max-h-96 overflow-y-auto">
        <div className="space-y-2">
          <label className="text-sm font-medium">Product Name</label>
          <Input
            placeholder="Search by name..."
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Reference</label>
          <Input
            placeholder="Search by reference..."
            value={filters.reference}
            onChange={(e) => handleFilterChange('reference', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Barcode</label>
          <Input
            placeholder="Search by barcode..."
            value={filters.barcode}
            onChange={(e) => handleFilterChange('barcode', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Rotation Status</label>
          <Select value={filters.rotation} onValueChange={(value) => handleFilterChange('rotation', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All rotations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All rotations</SelectItem>
              <SelectItem value="Rapid">Rapid</SelectItem>
              <SelectItem value="Normal">Normal</SelectItem>
              <SelectItem value="Slow">Slow</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Stock Quantity Range</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.stockMin}
              onChange={(e) => handleFilterChange('stockMin', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.stockMax}
              onChange={(e) => handleFilterChange('stockMax', e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Quantity Sold Range</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.soldMin}
              onChange={(e) => handleFilterChange('soldMin', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.soldMax}
              onChange={(e) => handleFilterChange('soldMax', e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Alert Range</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.alertMin}
              onChange={(e) => handleFilterChange('alertMin', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.alertMax}
              onChange={(e) => handleFilterChange('alertMax', e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Buy Price Range (DZD)</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.buyPriceMin}
              onChange={(e) => handleFilterChange('buyPriceMin', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.buyPriceMax}
              onChange={(e) => handleFilterChange('buyPriceMax', e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Sell Price HT Range (DZD)</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.sellPriceHTMin}
              onChange={(e) => handleFilterChange('sellPriceHTMin', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.sellPriceHTMax}
              onChange={(e) => handleFilterChange('sellPriceHTMax', e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Sell Price TTC Range (DZD)</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.sellPriceTTCMin}
              onChange={(e) => handleFilterChange('sellPriceTTCMin', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.sellPriceTTCMax}
              onChange={(e) => handleFilterChange('sellPriceTTCMax', e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={clearFilters}>
          Clear Filters
        </Button>
        <Button onClick={onClose}>
          Apply Filters
        </Button>
      </div>
    </>
  );
};

export default ProductFilterDialog;

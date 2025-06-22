import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProductFilters {
  name: string;
  reference: string;
  barcode: string;
  qtyStockMin: string;
  qtyStockMax: string;
  qtySoldMin: string;
  qtySoldMax: string;
  alertMin: string;
  alertMax: string;
  buyPriceMin: string;
  buyPriceMax: string;
  sellPriceHTMin: string;
  sellPriceHTMax: string;
  sellPriceTTCMin: string;
  sellPriceTTCMax: string;
  rotationStatus: string;
}

interface ProductFilterDialogProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  onClose: () => void;
}

const ProductFilterDialog = ({ filters, onFiltersChange, onClose }: ProductFilterDialogProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const emptyFilters: ProductFilters = {
      name: '',
      reference: '',
      barcode: '',
      qtyStockMin: '',
      qtyStockMax: '',
      qtySoldMin: '',
      qtySoldMax: '',
      alertMin: '',
      alertMax: '',
      buyPriceMin: '',
      buyPriceMax: '',
      sellPriceHTMin: '',
      sellPriceHTMax: '',
      sellPriceTTCMin: '',
      sellPriceTTCMax: '',
      rotationStatus: ''
    };
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
    onClose();
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>Filter Products</DialogTitle>
      </DialogHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Product Name</label>
          <Input
            placeholder="Filter by product name"
            value={localFilters.name}
            onChange={(e) => setLocalFilters({ ...localFilters, name: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Reference</label>
          <Input
            placeholder="Filter by reference"
            value={localFilters.reference}
            onChange={(e) => setLocalFilters({ ...localFilters, reference: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Barcode</label>
          <Input
            placeholder="Filter by barcode"
            value={localFilters.barcode}
            onChange={(e) => setLocalFilters({ ...localFilters, barcode: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Rotation Status</label>
          <Select value={localFilters.rotationStatus} onValueChange={(value) => setLocalFilters({ ...localFilters, rotationStatus: value === 'all' ? '' : value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select rotation status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Rapid">Rapid</SelectItem>
              <SelectItem value="Normal">Normal</SelectItem>
              <SelectItem value="Slow">Slow</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-sm">Quantity Stock Range</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Min</label>
            <Input
              type="number"
              placeholder="0"
              value={localFilters.qtyStockMin}
              onChange={(e) => setLocalFilters({ ...localFilters, qtyStockMin: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Max</label>
            <Input
              type="number"
              placeholder="999"
              value={localFilters.qtyStockMax}
              onChange={(e) => setLocalFilters({ ...localFilters, qtyStockMax: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-sm">Quantity Sold Range</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Min</label>
            <Input
              type="number"
              placeholder="0"
              value={localFilters.qtySoldMin}
              onChange={(e) => setLocalFilters({ ...localFilters, qtySoldMin: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Max</label>
            <Input
              type="number"
              placeholder="999"
              value={localFilters.qtySoldMax}
              onChange={(e) => setLocalFilters({ ...localFilters, qtySoldMax: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-sm">Alert Level Range</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Min</label>
            <Input
              type="number"
              placeholder="0"
              value={localFilters.alertMin}
              onChange={(e) => setLocalFilters({ ...localFilters, alertMin: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Max</label>
            <Input
              type="number"
              placeholder="999"
              value={localFilters.alertMax}
              onChange={(e) => setLocalFilters({ ...localFilters, alertMax: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-sm">Buy Price Range (DZD)</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Min</label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={localFilters.buyPriceMin}
              onChange={(e) => setLocalFilters({ ...localFilters, buyPriceMin: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Max</label>
            <Input
              type="number"
              step="0.01"
              placeholder="9999.99"
              value={localFilters.buyPriceMax}
              onChange={(e) => setLocalFilters({ ...localFilters, buyPriceMax: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-sm">Sell Price HT Range (DZD)</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Min</label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={localFilters.sellPriceHTMin}
              onChange={(e) => setLocalFilters({ ...localFilters, sellPriceHTMin: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Max</label>
            <Input
              type="number"
              step="0.01"
              placeholder="9999.99"
              value={localFilters.sellPriceHTMax}
              onChange={(e) => setLocalFilters({ ...localFilters, sellPriceHTMax: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-sm">Sell Price TTC Range (DZD)</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Min</label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={localFilters.sellPriceTTCMin}
              onChange={(e) => setLocalFilters({ ...localFilters, sellPriceTTCMin: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Max</label>
            <Input
              type="number"
              step="0.01"
              placeholder="9999.99"
              value={localFilters.sellPriceTTCMax}
              onChange={(e) => setLocalFilters({ ...localFilters, sellPriceTTCMax: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={handleClearFilters}>
          Clear All
        </Button>
        <Button onClick={handleApplyFilters} className="bg-[#0794FE] hover:bg-[#0670CC] text-white">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default ProductFilterDialog;

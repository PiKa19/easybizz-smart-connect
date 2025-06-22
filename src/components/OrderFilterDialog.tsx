
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterState {
  dateFrom: string;
  dateTo: string;
  amountMin: string;
  amountMax: string;
  status: string;
  supplier: string;
}

interface OrderFilterDialogProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClose: () => void;
}

const OrderFilterDialog: React.FC<OrderFilterDialogProps> = ({
  filters,
  onFiltersChange,
  onClose
}) => {
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      dateFrom: '',
      dateTo: '',
      amountMin: '',
      amountMax: '',
      status: '',
      supplier: ''
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Filter Orders</DialogTitle>
      </DialogHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Date From</label>
          <Input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Date To</label>
          <Input
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleFilterChange('dateTo', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Min Amount (DZD)</label>
          <Input
            type="number"
            placeholder="0"
            value={filters.amountMin}
            onChange={(e) => handleFilterChange('amountMin', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Max Amount (DZD)</label>
          <Input
            type="number"
            placeholder="999999"
            value={filters.amountMax}
            onChange={(e) => handleFilterChange('amountMax', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All statuses</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Supplier</label>
          <Input
            placeholder="Search supplier..."
            value={filters.supplier}
            onChange={(e) => handleFilterChange('supplier', e.target.value)}
          />
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

export default OrderFilterDialog;

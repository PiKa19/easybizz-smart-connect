
import React, { useState, useMemo, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LanguageContext } from "@/contexts/LanguageContext";
import { Filter, Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import AddInventoryItemDialog from "./AddInventoryItemDialog";
import { merchantInventoryApi, categoriesApi } from '@/services/api';
// shadcn/ui dropdown menu
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

interface InventoryRow {
  id?: number;
  product_id?: number;
  product_name: string;
  barcode?: string;
  category_id?: number;
  purchased_quantity?: number;
  sold_quantity?: number;
  returned_quantity?: number;
  damaged_quantity?: number;
  current_quantity?: number;
  unit_price_ht: number;
  total_cost?: number;
  supplier_id?: number;
  supplier_name: string;
  created_at?: string;
  updated_at?: string;
}

// Remove dummy data - will be loaded from API

const columnDefs = [
  { key: "product_name", label: "Product", type: "text" },
  { key: "barcode", label: "Barcode", type: "text" },
  { key: "category_id", label: "Category", type: "text" },
  { key: "purchased_quantity", label: "Purchased", type: "number" },
  { key: "sold_quantity", label: "Sold", type: "number" },
  { key: "current_quantity", label: "Current Stock", type: "number" },
  { key: "unit_price_ht", label: "Unit Price HT", type: "number" },
  { key: "total_cost", label: "Total Cost", type: "number" },
  { key: "supplier_name", label: "Supplier", type: "text" },
  { key: "created_at", label: "Date Added", type: "date" }
];

const InventorySection = () => {
  const { t } = useContext(LanguageContext);

  // One filter state per column
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [inventoryData, setInventoryData] = useState<InventoryRow[]>([]);
  const [loading, setLoading] = useState(true);

  // Demo state, could integrate pagination here
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch inventory data on mount
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const data = await merchantInventoryApi.getAll();
        setInventoryData(data);
      } catch (error) {
        console.error('Failed to fetch inventory:', error);
        toast({
          title: "Error",
          description: "Failed to load inventory data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  // Status quick filters
  const handleStatusQuickFilter = (filterType: string) => {
    if (filterType === 'low_stock') {
      // Filter items with current_quantity < 10 (or similar logic)
      setFilters(f => ({ ...f, current_quantity: '<10' }));
    } else if (filterType === 'available') {
      // Filter items with current_quantity > 0
      setFilters(f => ({ ...f, current_quantity: '>0' }));
    }
  };

  const handleAddProduct = () => {
    setIsAddProductOpen(true);
  };

  const handleProductSubmit = async (formData: any) => {
    try {
      const inventoryData = {
        product_id: formData.product_id || 1, // Default or from form
        product_name: formData.product_name,
        barcode: formData.barcode,
        category_id: formData.category_id || 1,
        purchased_quantity: parseInt(formData.purchased_quantity) || 0,
        sold_quantity: parseInt(formData.sold_quantity) || 0,
        returned_quantity: parseInt(formData.returned_quantity) || 0,
        damaged_quantity: parseInt(formData.damaged_quantity) || 0,
        current_quantity: parseInt(formData.current_quantity) || 0,
        unit_price_ht: parseFloat(formData.unit_price_ht) || 0,
        total_cost: parseFloat(formData.total_cost) || 0,
        supplier_id: formData.supplier_id || 1,
        supplier_name: formData.supplier_name
      };
      
      const newProduct = await merchantInventoryApi.create(inventoryData);
      setInventoryData(prev => [newProduct, ...prev]);
      
      toast({
        title: "Success",
        description: "Product added to inventory successfully.",
      });
    } catch (error) {
      console.error('Failed to add product:', error);
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive"
      });
    }
  };

  const filteredRows = useMemo(() => {
    return inventoryData.filter(row =>
      columnDefs.every(col => {
        const filterVal = filters[col.key];
        if (!filterVal) return true;
        const rowValue = row[col.key as keyof InventoryRow];
        if (col.type === "number") {
          return String(rowValue).includes(filterVal);
        }
        if (col.type === "date") {
          return String(rowValue).includes(filterVal);
        }
        // default: text
        return String(rowValue).toLowerCase().includes(filterVal.toLowerCase());
      })
    );
  }, [filters, inventoryData]);

  return (
    <div className="space-y-6">
      {/* Title & Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0794FE] mb-2">{t("inventory") || "Inventory"}</h1>
          <p className="text-gray-600">{t("manage_inventory") || "Start managing your supermarket"}</p>
        </div>
        <div>
          <Button
            className="bg-[#16c784] hover:bg-[#149a69] text-white flex items-center gap-2"
            onClick={handleAddProduct}
          >
            <Plus className="w-4 h-4" />
            {t("add_product")}
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-blue-100 px-0 pt-0 pb-0 animate-fade-in">
        {/* Filters */}
        <div className="p-6 pb-0">
          <div className="flex gap-2 items-center mb-4 flex-wrap">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-gray-600">Filtrage</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="bg-white z-50 p-4 border shadow-md min-w-[320px] grid grid-cols-1 gap-3 max-h-72 overflow-y-auto"
                align="start"
              >
                {columnDefs.map(col => (
                  <div key={col.key} className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500 mb-0.5">{col.label}</label>
                    <Input
                      type={col.type === "date" ? "date" : (col.type === "number" ? "number" : "text")}
                      placeholder={col.label}
                      className="w-full text-xs"
                      value={filters[col.key] || ""}
                      onChange={e => setFilters(f => ({
                        ...f,
                        [col.key]: e.target.value
                      }))}
                      style={{ minWidth: 80 }}
                    />
                  </div>
                ))}
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-full"
                    onClick={() => setFilters({})}
                    type="button"
                  >
                    {t("clear_filters") || "Clear filters"}
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              className="bg-[#0794FE] hover:bg-[#0670CC] text-white px-4"
              onClick={() => handleStatusQuickFilter("low_stock")}
            >
              Low Stock
            </Button>
            <Button
              className="bg-[#0794FE] hover:bg-[#0670CC] text-white px-4"
              onClick={() => handleStatusQuickFilter("available")}
            >
              Available Stock
            </Button>
          </div>
        </div>
        {/* Table Wrapper */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-[#0794FE] text-white">
                {columnDefs.map(col => (
                  <th key={col.key} className="px-4 py-3 text-left text-sm font-medium first:rounded-tl-2xl last:rounded-tr-2xl">{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columnDefs.length} className="p-8 text-center text-gray-400 bg-white rounded-b-2xl">
                    Loading inventory data...
                  </td>
                </tr>
              ) : filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={columnDefs.length} className="p-8 text-center text-gray-400 bg-white rounded-b-2xl">
                    {t("no_data") || "No data found"}
                  </td>
                </tr>
              ) : (
                filteredRows.slice(0, rowsPerPage).map((row, idx) => (
                  <tr key={row.id || idx} className={`hover:bg-blue-50/60 transition-colors border-b last:border-b-0`}>
                    {columnDefs.map(col => (
                      <td key={col.key} className="px-4 py-4 text-sm whitespace-nowrap">
                        {col.key === 'unit_price_ht' || col.key === 'total_cost' 
                          ? `${row[col.key as keyof InventoryRow]} DZD`
                          : row[col.key as keyof InventoryRow]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
          <div className="text-sm text-gray-600 flex items-center gap-2">
            {t("rows_per_page") || "Rows per page"}:
            <select
              value={rowsPerPage}
              onChange={e => setRowsPerPage(Number(e.target.value))}
              className="border rounded px-2 py-1 text-xs ml-2"
            >
              {[5, 10, 20, 50].map(n => (
                <option value={n} key={n}>{n}</option>
              ))}
            </select>
          </div>
          <div className="text-sm text-gray-600">
            1-{Math.min(filteredRows.length, rowsPerPage)} of {filteredRows.length}
          </div>
        </div>
      </div>
      
      <AddInventoryItemDialog
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onSubmit={handleProductSubmit}
      />
    </div>
  );
};

export default InventorySection;


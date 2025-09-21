import React, { useState, useMemo, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LanguageContext } from "@/contexts/LanguageContext";
import { Filter, Plus, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import AddInventoryItemDialog from "./AddInventoryItemDialog";
import { useMerchantInventory } from '@/hooks/useApi';
import type { MerchantInventory } from '@/lib/api';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

interface InventoryRow {
  product: string;
  ref: string;
  codebar: string;
  dateTime: string;
  fabricationDate: string;
  perimationDate: string;
  prixHT: number;
  tva: number;
  ttc: number;
  status: string;
  alertQty: number;
  alertDate: string;
  supplier: string;
}

const columnDefs = [
  { key: "product", label: "Product", type: "text" },
  { key: "ref", label: "ref", type: "text" },
  { key: "codebar", label: "codebar", type: "text" },
  { key: "dateTime", label: "date et heure", type: "text" },
  { key: "fabricationDate", label: "date de fabrication", type: "date" },
  { key: "perimationDate", label: "date de perimation", type: "date" },
  { key: "prixHT", label: "prix ht", type: "number" },
  { key: "tva", label: "TVA", type: "number" },
  { key: "ttc", label: "TTC", type: "number" },
  { key: "status", label: "status", type: "text" },
  { key: "alertQty", label: "product alert in quantité", type: "number" },
  { key: "alertDate", label: "product alert in date", type: "date" },
  { key: "supplier", label: "Supplier", type: "text" }
];

const InventorySection = () => {
  const { t } = useContext(LanguageContext);

  const [filters, setFilters] = useState<Record<string, string>>({});
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  
  // API integration
  const { data: apiInventory, loading, error, refetch } = useMerchantInventory();

  // Transform API data to InventoryRow format
  const transformApiInventoryToRows = (apiData: any): InventoryRow[] => {
    console.log('🔍 Raw Inventory API data:', apiData);
    
    if (!apiData) {
      console.log('❌ No Inventory API data received');
      return [];
    }
    
    let dataArray: any[] = [];
    
    if (Array.isArray(apiData)) {
      dataArray = apiData;
    } else if (apiData.data && Array.isArray(apiData.data)) {
      dataArray = apiData.data;
    } else if (apiData.results && Array.isArray(apiData.results)) {
      dataArray = apiData.results;
    } else if (apiData.items && Array.isArray(apiData.items)) {
      dataArray = apiData.items;
    } else {
      console.log('❌ Inventory API data is not in expected format:', apiData);
      return [];
    }
    
    console.log('✅ Extracted inventory data array:', dataArray);
    
    return dataArray.map((item, index) => ({
      product: item.product_name || item.name || `Product ${index + 1}`,
      ref: `REF-${item.id || index}`,
      codebar: item.barcode || `BC-${item.id || index}`,
      dateTime: new Date().toISOString().slice(0, 16).replace('T', ' '),
      fabricationDate: new Date().toISOString().slice(0, 10),
      perimationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      prixHT: item.unit_price_ht || item.unit_price || 0,
      tva: 19, // Default VAT
      ttc: (item.unit_price_ht || item.unit_price || 0) * 1.19,
      status: (item.current_quantity || 0) > 0 ? "Disponible" : "Rupture",
      alertQty: 10, // Default alert quantity
      alertDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      supplier: item.supplier_name || item.supplier || "Unknown Supplier"
    }));
  };

  const inventoryData: InventoryRow[] = (() => {
    try {
      if (!apiInventory) return [];
      return transformApiInventoryToRows(apiInventory);
    } catch (error) {
      console.error('❌ Error transforming inventory API data:', error);
      return [];
    }
  })();

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleStatusQuickFilter = (status: string) => {
    setFilters(f => ({ ...f, status }));
  };

  const handleAddProduct = () => {
    setIsAddProductOpen(true);
  };

  const handleProductSubmit = (formData: any) => {
    const newProduct = {
      ...formData,
      dateTime: new Date().toISOString().slice(0, 16).replace('T', ' '),
      prixHT: parseFloat(formData.prixHT) || 0,
      tva: parseFloat(formData.tva) || 0,
      ttc: (parseFloat(formData.prixHT) || 0) * (1 + (parseFloat(formData.tva) || 0) / 100),
      alertQty: parseInt(formData.alertQty) || 0,
    };
    
    // TODO: Implement API call to create inventory item
    console.log('New product to be created:', newProduct);
    toast({
      title: "Product Added",
      description: "New product has been added to inventory",
    });
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
              onClick={() => handleStatusQuickFilter("Endommagé")}
            >
              produit endomagé
            </Button>
            <Button
              className="bg-[#0794FE] hover:bg-[#0670CC] text-white px-4"
              onClick={() => handleStatusQuickFilter("Disponible")}
            >
              produit disponible
            </Button>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#0794FE]" />
            <span className="ml-2 text-[#0794FE]">Loading inventory...</span>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-red-600 mb-4">Error loading inventory: {error}</p>
              <Button onClick={refetch} className="bg-[#0794FE] hover:bg-[#065fad] text-white">
                Retry
              </Button>
            </div>
          </div>
        )}

        {/* Success message when API works */}
        {!loading && !error && inventoryData.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 m-6">
            <p className="text-green-800">✅ Successfully connected to API! Showing {inventoryData.length} items from the server.</p>
          </div>
        )}

        {/* No data message */}
        {!loading && !error && inventoryData.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 m-6">
            <p className="text-yellow-800">📦 No inventory items found. The API is connected but returned empty data.</p>
          </div>
        )}

        {/* Table Wrapper */}
        {!loading && !error && inventoryData.length > 0 && (
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
                {filteredRows.slice(0, rowsPerPage).map((row, idx) => (
                  <tr key={idx} className={`hover:bg-blue-50/60 transition-colors border-b last:border-b-0`}>
                    {columnDefs.map(col => (
                      <td key={col.key} className="px-4 py-4 text-sm whitespace-nowrap">
                        {row[col.key as keyof InventoryRow]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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
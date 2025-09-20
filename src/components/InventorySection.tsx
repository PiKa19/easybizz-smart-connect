
import React, { useState, useMemo, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LanguageContext } from "@/contexts/LanguageContext";
import { Filter, Plus, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import AddInventoryItemDialog from "./AddInventoryItemDialog";
import ApiFallback from "./ApiFallback";
import { useSafeMerchantInventory } from '@/hooks/useSafeApi';
import type { MerchantInventory } from '@/lib/api';
// shadcn/ui dropdown menu
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

// Filled dummy data:
const DUMMY_INVENTORY: InventoryRow[] = [
  {
    product: "Huile 5L elio",
    ref: "HUI-001",
    codebar: "59446032664B",
    dateTime: "2024-06-01 14:30",
    fabricationDate: "2024-01-10",
    perimationDate: "2025-01-10",
    prixHT: 550,
    tva: 19,
    ttc: 654.5,
    status: "Disponible",
    alertQty: 5,
    alertDate: "2024-12-31",
    supplier: "Baraka"
  },
  {
    product: "Lait 1L Candia",
    ref: "LAI-010",
    codebar: "59446889012C",
    dateTime: "2024-06-03 08:10",
    fabricationDate: "2024-05-18",
    perimationDate: "2024-11-18",
    prixHT: 90,
    tva: 9,
    ttc: 98.1,
    status: "Disponible",
    alertQty: 10,
    alertDate: "2024-11-01",
    supplier: "IFRIN"
  },
  {
    product: "Biscuits Choco",
    ref: "BIS-011",
    codebar: "59440011229B",
    dateTime: "2024-06-02 11:03",
    fabricationDate: "2024-04-28",
    perimationDate: "2025-04-28",
    prixHT: 150,
    tva: 19,
    ttc: 178.5,
    status: "Endommagé",
    alertQty: 15,
    alertDate: "2025-01-01",
    supplier: "BN Lova"
  },
  {
    product: "Jus d'orange 2L",
    ref: "JUS-201",
    codebar: "59411324655O",
    dateTime: "2024-06-05 10:44",
    fabricationDate: "2024-05-10",
    perimationDate: "2025-05-10",
    prixHT: 130,
    tva: 19,
    ttc: 154.7,
    status: "Disponible",
    alertQty: 8,
    alertDate: "2025-04-01",
    supplier: "BriZa"
  },
  {
    product: "Eau minérale 0.5L",
    ref: "EAU-001",
    codebar: "59419944321E",
    dateTime: "2024-06-06 13:00",
    fabricationDate: "2024-06-01",
    perimationDate: "2025-06-01",
    prixHT: 20,
    tva: 0,
    ttc: 20,
    status: "Disponible",
    alertQty: 12,
    alertDate: "2025-05-01",
    supplier: "AquaDz"
  },
  {
    product: "Café Moulu 500g",
    ref: "CAF-123",
    codebar: "59416654321C",
    dateTime: "2024-06-04 12:30",
    fabricationDate: "2024-03-10",
    perimationDate: "2025-03-10",
    prixHT: 720,
    tva: 19,
    ttc: 857.0,
    status: "Disponible",
    alertQty: 2,
    alertDate: "2025-02-20",
    supplier: "Barista"
  },
  {
    product: "Savon Liquide 1L",
    ref: "SAV-312",
    codebar: "59417331234S",
    dateTime: "2024-06-02 09:23",
    fabricationDate: "2024-04-16",
    perimationDate: "2026-04-16",
    prixHT: 80,
    tva: 9,
    ttc: 87.2,
    status: "Disponible",
    alertQty: 9,
    alertDate: "2026-04-01",
    supplier: "Aswaq Clean"
  },
  {
    product: "Sardine boîte 120g",
    ref: "SAR-0003",
    codebar: "59417678912N",
    dateTime: "2024-06-04 10:10",
    fabricationDate: "2024-01-20",
    perimationDate: "2026-01-20",
    prixHT: 160,
    tva: 19,
    ttc: 190.4,
    status: "Endommagé",
    alertQty: 1,
    alertDate: "2025-12-23",
    supplier: "SuperFood"
  },
  {
    product: "Fromage 200g",
    ref: "FRO-100",
    codebar: "59417688733F",
    dateTime: "2024-05-28 17:12",
    fabricationDate: "2024-05-01",
    perimationDate: "2024-09-01",
    prixHT: 210,
    tva: 19,
    ttc: 249.9,
    status: "Disponible",
    alertQty: 6,
    alertDate: "2024-08-15",
    supplier: "DairyLand"
  },
  {
    product: "Spaghetti 1kg",
    ref: "SPA-555",
    codebar: "59414444222P",
    dateTime: "2024-06-06 08:45",
    fabricationDate: "2024-03-20",
    perimationDate: "2025-10-20",
    prixHT: 130,
    tva: 9,
    ttc: 141.7,
    status: "Disponible",
    alertQty: 4,
    alertDate: "2025-09-25",
    supplier: "PastaCity"
  },
  {
    product: "Sucre 1kg",
    ref: "SUC-777",
    codebar: "59418428519S",
    dateTime: "2024-06-04 15:55",
    fabricationDate: "2024-05-01",
    perimationDate: "2026-05-01",
    prixHT: 70,
    tva: 9,
    ttc: 76.3,
    status: "Disponible",
    alertQty: 20,
    alertDate: "2026-04-01",
    supplier: "SweetFourn"
  },
  {
    product: "Shampoing 400ml",
    ref: "SHA-101",
    codebar: "59413331450Z",
    dateTime: "2024-06-06 09:12",
    fabricationDate: "2024-02-28",
    perimationDate: "2026-02-28",
    prixHT: 200,
    tva: 19,
    ttc: 238,
    status: "Disponible",
    alertQty: 7,
    alertDate: "2026-02-01",
    supplier: "HairPro"
  },
  {
    product: "Brique de Jus Mangue",
    ref: "JUS-403",
    codebar: "59419119193M",
    dateTime: "2024-05-30 18:44",
    fabricationDate: "2024-05-20",
    perimationDate: "2025-05-20",
    prixHT: 85,
    tva: 19,
    ttc: 101.15,
    status: "Disponible",
    alertQty: 3,
    alertDate: "2025-04-15",
    supplier: "BriZa"
  },
];

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

  // One filter state per column
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  
  // Safe API integration
  const { data: apiInventory, loading, error, refetch } = useSafeMerchantInventory();

  // Transform API data to InventoryRow format with proper validation
  const transformApiInventoryToRows = (apiData: any): InventoryRow[] => {
    console.log('🔍 Raw Inventory API data:', apiData);
    console.log('🔍 Data type:', typeof apiData);
    console.log('🔍 Is array:', Array.isArray(apiData));
    
    // Handle different response formats
    if (!apiData) {
      console.log('❌ No Inventory API data received');
      return [];
    }
    
    // If it's not an array, try to extract data from common response formats
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

  // Demo state, could integrate pagination here
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // "produit endommagé" and "produit disponible" could work as status-quick-filters
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
    
    setInventoryData(prev => [newProduct, ...prev]);
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

  // Show fallback if API failed
  if (error && !loading) {
    return (
      <ApiFallback
        title="Inventory"
        error={error}
        onRetry={refetch}
        onTestApi={() => window.open('http://5.196.209.135/api/merchant/inventory', '_blank')}
      />
    );
  }

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

        {/* Table Wrapper */}
        {!loading && !error && (
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
                {filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan={columnDefs.length} className="p-8 text-center text-gray-400 bg-white rounded-b-2xl">
                      {t("no_data") || "No data found"}
                    </td>
                  </tr>
                ) : (
                  filteredRows.slice(0, rowsPerPage).map((row, idx) => (
                    <tr key={idx} className={`hover:bg-blue-50/60 transition-colors border-b last:border-b-0`}>
                      {columnDefs.map(col => (
                        <td key={col.key} className="px-4 py-4 text-sm whitespace-nowrap">
                          {row[col.key as keyof InventoryRow]}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
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


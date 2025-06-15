import React, { useState, useMemo, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LanguageContext } from "@/contexts/LanguageContext";
import { Filter } from "lucide-react";
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

// Example data, should eventually be fetched from backend!
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
  // Add more rows if desired
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

  // Demo state, could integrate pagination here
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // "produit endommagé" and "produit disponible" could work as status-quick-filters
  const handleStatusQuickFilter = (status: string) => {
    setFilters(f => ({ ...f, status }));
  };

  const filteredRows = useMemo(() => {
    return DUMMY_INVENTORY.filter(row =>
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
  }, [filters]);

  return (
    <div className="space-y-6">
      {/* Title & Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t("inventory") || "Inventory"}</h1>
          <p className="text-gray-600">{t("manage_inventory") || "Start managing your supermarket"}</p>
        </div>
      </div>

      {/* Filtrage + Quick Filters */}
      <div className="flex gap-2 items-center mb-4 flex-wrap">
        {/* Filtrage Dropdown */}
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
        {/* Quick Filter Buttons */}
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

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#0794FE] text-white">
            <tr>
              {columnDefs.map(col => (
                <th key={col.key} className="px-3 py-2 text-left text-xs font-medium">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan={columnDefs.length} className="p-5 text-center text-gray-400">
                  {t("no_data") || "No data found"}
                </td>
              </tr>
            ) : (
              filteredRows.slice(0, rowsPerPage).map((row, idx) => (
                <tr key={idx} className="border-b">
                  {columnDefs.map(col => (
                    <td key={col.key} className="px-3 py-2 text-sm whitespace-nowrap">
                      {row[col.key as keyof InventoryRow]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
          <div className="text-sm text-gray-600 flex items-center gap-2">
            {t("rows_per_page") || "Rows per page"}:
            <select
              value={rowsPerPage}
              onChange={e => setRowsPerPage(Number(e.target.value))}
              className="border rounded px-2 py-1 text-xs"
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
    </div>
  );
};

export default InventorySection;

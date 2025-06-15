
import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, Search, Plus } from "lucide-react";
import { LanguageContext } from '@/contexts/LanguageContext';

interface Product {
  id: string;
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

interface ProductsSectionProps {
  onBack: () => void;
}

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Huile 5L elio",
    reference: "HUI-001",
    barcode: "59446032664B",
    qtyStock: 5,
    qtySold: 45,
    alert: 50,
    buyPrice: 630.00,
    sellPriceHT: 550.00,
    sellPriceTTC: 650.00,
    rotationStatus: "Rapid",
  },
  {
    id: "2",
    name: "Lait 1L Candia",
    reference: "LAI-010",
    barcode: "59446889012C",
    qtyStock: 15,
    qtySold: 32,
    alert: 40,
    buyPrice: 90.00,
    sellPriceHT: 110.00,
    sellPriceTTC: 130.00,
    rotationStatus: "Normal",
  },
  {
    id: "3",
    name: "Biscuits Choco",
    reference: "BIS-011",
    barcode: "59440011229B",
    qtyStock: 28,
    qtySold: 15,
    alert: 20,
    buyPrice: 150.00,
    sellPriceHT: 190.00,
    sellPriceTTC: 210.00,
    rotationStatus: "Slow",
  },
  {
    id: "4",
    name: "Jus d'orange 2L",
    reference: "JUS-201",
    barcode: "59411324655O",
    qtyStock: 16,
    qtySold: 19,
    alert: 25,
    buyPrice: 130.00,
    sellPriceHT: 150.00,
    sellPriceTTC: 170.00,
    rotationStatus: "Normal",
  },
  {
    id: "5",
    name: "Eau minérale 0.5L",
    reference: "EAU-001",
    barcode: "59419944321E",
    qtyStock: 80,
    qtySold: 110,
    alert: 50,
    buyPrice: 20.00,
    sellPriceHT: 25.00,
    sellPriceTTC: 30.00,
    rotationStatus: "Rapid",
  },
  {
    id: "6",
    name: "Café Moulu 500g",
    reference: "CAF-123",
    barcode: "59416654321C",
    qtyStock: 10,
    qtySold: 23,
    alert: 10,
    buyPrice: 720.00,
    sellPriceHT: 800.00,
    sellPriceTTC: 880.00,
    rotationStatus: "Normal",
  },
  {
    id: "7",
    name: "Savon Liquide 1L",
    reference: "SAV-312",
    barcode: "59417331234S",
    qtyStock: 18,
    qtySold: 31,
    alert: 12,
    buyPrice: 80.00,
    sellPriceHT: 98.00,
    sellPriceTTC: 108.00,
    rotationStatus: "Slow",
  },
  {
    id: "8",
    name: "Dentifrice Colgate",
    reference: "DEN-002",
    barcode: "59499922337D",
    qtyStock: 7,
    qtySold: 14,
    alert: 8,
    buyPrice: 70.00,
    sellPriceHT: 80.00,
    sellPriceTTC: 92.00,
    rotationStatus: "Slow",
  },
  {
    id: "9",
    name: "Fromage 200g",
    reference: "FRO-100",
    barcode: "59417688733F",
    qtyStock: 20,
    qtySold: 36,
    alert: 15,
    buyPrice: 210.00,
    sellPriceHT: 230.00,
    sellPriceTTC: 255.00,
    rotationStatus: "Rapid",
  },
  {
    id: "10",
    name: "Spaghetti 1kg",
    reference: "SPA-555",
    barcode: "59414444222P",
    qtyStock: 24,
    qtySold: 40,
    alert: 18,
    buyPrice: 130.00,
    sellPriceHT: 155.00,
    sellPriceTTC: 175.00,
    rotationStatus: "Normal",
  },
  {
    id: "11",
    name: "Chips Lay's 100g",
    reference: "CHI-079",
    barcode: "59418433319C",
    qtyStock: 32,
    qtySold: 55,
    alert: 30,
    buyPrice: 60.00,
    sellPriceHT: 75.00,
    sellPriceTTC: 85.00,
    rotationStatus: "Rapid",
  },
  {
    id: "12",
    name: "Yaourt Vanille",
    reference: "YAU-200",
    barcode: "59415555772Y",
    qtyStock: 13,
    qtySold: 11,
    alert: 16,
    buyPrice: 50.00,
    sellPriceHT: 62.00,
    sellPriceTTC: 68.00,
    rotationStatus: "Slow",
  },
  {
    id: "13",
    name: "Coca-Cola 1L",
    reference: "COL-011",
    barcode: "59419999999C",
    qtyStock: 40,
    qtySold: 75,
    alert: 30,
    buyPrice: 130.00,
    sellPriceHT: 145.00,
    sellPriceTTC: 150.00,
    rotationStatus: "Rapid",
  },
  {
    id: "14",
    name: "Oeufs (paquet de 6)",
    reference: "OEU-006",
    barcode: "59411115666O",
    qtyStock: 8,
    qtySold: 38,
    alert: 20,
    buyPrice: 90.00,
    sellPriceHT: 105.00,
    sellPriceTTC: 120.00,
    rotationStatus: "Normal",
  },
  {
    id: "15",
    name: "Gel Douche Sport 250ml",
    reference: "GEL-025",
    barcode: "59419843543G",
    qtyStock: 17,
    qtySold: 9,
    alert: 10,
    buyPrice: 70.00,
    sellPriceHT: 90.00,
    sellPriceTTC: 98.00,
    rotationStatus: "Slow",
  },
  {
    id: "16",
    name: "Biscottes Croquantes",
    reference: "BIS-330",
    barcode: "59413439833B",
    qtyStock: 12,
    qtySold: 22,
    alert: 14,
    buyPrice: 45.00,
    sellPriceHT: 55.00,
    sellPriceTTC: 62.00,
    rotationStatus: "Normal",
  },
  {
    id: "17",
    name: "Riz 1kg",
    reference: "RIZ-145",
    barcode: "59417845678R",
    qtyStock: 27,
    qtySold: 54,
    alert: 25,
    buyPrice: 93.00,
    sellPriceHT: 110.00,
    sellPriceTTC: 126.00,
    rotationStatus: "Rapid",
  },
  {
    id: "18",
    name: "Margarine 250g",
    reference: "MAR-022",
    barcode: "59417765443M",
    qtyStock: 19,
    qtySold: 15,
    alert: 15,
    buyPrice: 105.00,
    sellPriceHT: 120.00,
    sellPriceTTC: 138.00,
    rotationStatus: "Slow",
  },
  {
    id: "19",
    name: "Pâte à tartiner Choco",
    reference: "PAT-900",
    barcode: "59416661111P",
    qtyStock: 14,
    qtySold: 19,
    alert: 15,
    buyPrice: 160.00,
    sellPriceHT: 200.00,
    sellPriceTTC: 225.00,
    rotationStatus: "Normal",
  },
  {
    id: "20",
    name: "Harissa Tube 70g",
    reference: "HAR-007",
    barcode: "59410007799H",
    qtyStock: 23,
    qtySold: 67,
    alert: 22,
    buyPrice: 30.00,
    sellPriceHT: 42.00,
    sellPriceTTC: 47.00,
    rotationStatus: "Rapid",
  },
];

const ProductsSection = ({ onBack }: ProductsSectionProps) => {
  const { t } = useContext(LanguageContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState('5');
  const [products] = useState<Product[]>(sampleProducts);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          {t('previous_page')}
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('products')}</h1>
          <p className="text-gray-600">{t('dashboard_subtitle')}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder={t('search_product')}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="bg-[#0794FE] hover:bg-[#0670CC] text-white flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {t('add_product')}
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-sm">
            <thead>
              <tr className="bg-[#0794FE] text-white">
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('product')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('reference')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('barcode')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('qty_stock')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('qty_sold')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('alert')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('buy_price')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('sell_price_ht')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('sell_price_ttc')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('rotation_status')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.slice(0, Number(rowsPerPage)).map((product) => (
                <tr key={product.id} className="border-b last:border-0 hover:bg-blue-50/40 transition-colors">
                  <td className="px-4 py-3 text-sm">{product.name}</td>
                  <td className="px-4 py-3 text-sm">{product.reference}</td>
                  <td className="px-4 py-3 text-sm">{product.barcode}</td>
                  <td className="px-4 py-3 text-sm">{product.qtyStock}</td>
                  <td className="px-4 py-3 text-sm">{product.qtySold}</td>
                  <td className="px-4 py-3 text-sm">{product.alert}</td>
                  <td className="px-4 py-3 text-sm">{product.buyPrice.toFixed(2)} DZD</td>
                  <td className="px-4 py-3 text-sm">{product.sellPriceHT.toFixed(2)} DZD</td>
                  <td className="px-4 py-3 text-sm">{product.sellPriceTTC.toFixed(2)} DZD</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="inline-flex items-center gap-1">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      {product.rotationStatus}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center text-gray-400 py-7 bg-white rounded-b-2xl">
                    {t('no_products_found') || "No products found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50 rounded-b-2xl text-xs text-blue-600 font-semibold tracking-wide">
          <div>
            {t('rows_per_page')}:
            <select
              className="mx-2 border border-blue-100 rounded py-1 px-2 text-xs bg-white"
              value={rowsPerPage}
              onChange={e => setRowsPerPage(e.target.value)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
          <span>
            1–{Math.min(filteredProducts.length, Number(rowsPerPage))} of {filteredProducts.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;


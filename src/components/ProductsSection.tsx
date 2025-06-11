
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

const ProductsSection = ({ onBack }: ProductsSectionProps) => {
  const { t } = useContext(LanguageContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState('5');
  
  const [products] = useState<Product[]>([
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
      rotationStatus: "Rapid"
    }
  ]);

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

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0794FE] text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('product')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('reference')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('barcode')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('qty_stock')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('qty_sold')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('alert')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('buy_price')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('sell_price_ht')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('sell_price_ttc')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('rotation_status')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
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
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-gray-600">
            {t('rows_per_page')}: 
            <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
              <SelectTrigger className="w-16 ml-2 inline-flex">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-gray-600">
            1-1 of 1
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;

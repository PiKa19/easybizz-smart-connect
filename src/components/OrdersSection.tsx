
import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Search, Download } from "lucide-react";
import { LanguageContext } from '@/contexts/LanguageContext';

interface Order {
  id: string;
  supplier: string;
  date: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface OrdersSectionProps {
  onBack: () => void;
}

const OrdersSection = ({ onBack }: OrdersSectionProps) => {
  const { t } = useContext(LanguageContext);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [orders] = useState<Order[]>([
    {
      id: "10545",
      supplier: "FRS Semmar",
      date: "15/06/2025",
      amount: 5000.00,
      status: "confirmed"
    }
  ]);

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
          <h1 className="text-2xl font-bold text-gray-800">{t('orders')}</h1>
          <p className="text-gray-600">{t('dashboard_subtitle')}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder={t('search_order')}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0794FE] text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('order_id')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('supplier')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('date')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('amount')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('status')}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{order.id}</td>
                  <td className="px-4 py-3 text-sm">{order.supplier}</td>
                  <td className="px-4 py-3 text-sm">{order.date}</td>
                  <td className="px-4 py-3 text-sm">{order.amount.toFixed(2)} DZD</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        {t('download_bill')}
                      </Button>
                      <Button size="sm" className="bg-[#0794FE] hover:bg-[#0670CC] text-white">
                        {t('learn_more')}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersSection;

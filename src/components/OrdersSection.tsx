
import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Search, Download, Filter } from "lucide-react";
import { LanguageContext } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import OrderDetailsModal from "@/components/OrderDetailsModal";
import OrderFilterDialog from "@/components/OrderFilterDialog";

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

interface FilterState {
  dateFrom: string;
  dateTo: string;
  amountMin: string;
  amountMax: string;
  status: string;
  supplier: string;
}

const OrdersSection = ({ onBack }: OrdersSectionProps) => {
  const { t } = useContext(LanguageContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    dateFrom: '',
    dateTo: '',
    amountMin: '',
    amountMax: '',
    status: '',
    supplier: ''
  });
  
  const [orders] = useState<Order[]>([
    {
      id: "10545",
      supplier: "FRS Semmar",
      date: "15/06/2025",
      amount: 5000.00,
      status: "confirmed"
    }
  ]);

  const applyFilters = (orders: Order[]) => {
    return orders.filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = !filters.status || order.status === filters.status;
      const matchesSupplier = !filters.supplier || order.supplier.toLowerCase().includes(filters.supplier.toLowerCase());
      
      const matchesAmountMin = !filters.amountMin || order.amount >= parseFloat(filters.amountMin);
      const matchesAmountMax = !filters.amountMax || order.amount <= parseFloat(filters.amountMax);
      
      return matchesSearch && matchesStatus && matchesSupplier && matchesAmountMin && matchesAmountMax;
    });
  };

  const filteredOrders = applyFilters(orders);

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

  const handleLearnMore = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
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
        
        <Dialog open={showFilters} onOpenChange={setShowFilters}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <OrderFilterDialog 
              filters={filters}
              onFiltersChange={setFilters}
              onClose={() => setShowFilters(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="bg-[#0794FE] text-white">
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('order_id')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('supplier')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('date')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('amount')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('status')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-0 hover:bg-blue-50/40 transition-colors">
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
                      <Button 
                        size="sm" 
                        className="bg-[#0794FE] hover:bg-[#0670CC] text-white"
                        onClick={() => handleLearnMore(order)}
                      >
                        {t('learn_more')}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-gray-400 py-7 bg-white rounded-b-2xl">
                    {t('no_orders_found') || "No orders found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50 rounded-b-2xl text-xs text-blue-600 font-semibold tracking-wide">
          <div>
            {t('rows_per_page') || 'Rows per page'}:
            <select
              className="mx-2 border border-blue-100 rounded py-1 px-2 text-xs bg-white"
              value="5"
            >
              <option value="5">5</option>
            </select>
          </div>
          <span>
            1–{filteredOrders.length} of {filteredOrders.length}
          </span>
        </div>
      </div>

      {/* Order Details Modal */}
      <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <OrderDetailsModal 
              order={selectedOrder}
              onClose={() => setShowOrderDetails(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersSection;

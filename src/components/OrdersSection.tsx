import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Search, Download, Filter, Plus } from "lucide-react";
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
  onNavigateToBizz: () => void;
}

interface FilterState {
  dateFrom: string;
  dateTo: string;
  amountMin: string;
  amountMax: string;
  status: string;
  supplier: string;
}

const OrdersSection = ({ onBack, onNavigateToBizz }: OrdersSectionProps) => {
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
    },
    {
      id: "10546",
      supplier: "Cevital Industries",
      date: "14/06/2025",
      amount: 12500.00,
      status: "pending"
    },
    {
      id: "10547",
      supplier: "Danone Algerie",
      date: "13/06/2025",
      amount: 8750.00,
      status: "confirmed"
    },
    {
      id: "10548",
      supplier: "Coca-Cola Algeria",
      date: "12/06/2025",
      amount: 3200.00,
      status: "cancelled"
    },
    {
      id: "10549",
      supplier: "La Vache Qui Rit",
      date: "11/06/2025",
      amount: 6800.00,
      status: "confirmed"
    },
    {
      id: "10550",
      supplier: "Elio Industries",
      date: "10/06/2025",
      amount: 15200.00,
      status: "pending"
    },
    {
      id: "10551",
      supplier: "Laiterie Soummam",
      date: "09/06/2025",
      amount: 4500.00,
      status: "confirmed"
    },
    {
      id: "10552",
      supplier: "Sim Corporation",
      date: "08/06/2025",
      amount: 9300.00,
      status: "confirmed"
    },
    {
      id: "10553",
      supplier: "Tchina Food",
      date: "07/06/2025",
      amount: 2750.00,
      status: "pending"
    },
    {
      id: "10554",
      supplier: "Ifri Beverages",
      date: "06/06/2025",
      amount: 7800.00,
      status: "confirmed"
    },
    {
      id: "10555",
      supplier: "Benamor Group",
      date: "05/06/2025",
      amount: 11200.00,
      status: "cancelled"
    },
    {
      id: "10556",
      supplier: "NCA Rouiba",
      date: "04/06/2025",
      amount: 5600.00,
      status: "confirmed"
    },
    {
      id: "10557",
      supplier: "Groupe Batouche",
      date: "03/06/2025",
      amount: 13800.00,
      status: "pending"
    },
    {
      id: "10558",
      supplier: "Saidal Pharma",
      date: "02/06/2025",
      amount: 8900.00,
      status: "confirmed"
    },
    {
      id: "10559",
      supplier: "Henkel Algeria",
      date: "01/06/2025",
      amount: 4200.00,
      status: "confirmed"
    },
    {
      id: "10560",
      supplier: "Unilever Maghreb",
      date: "31/05/2025",
      amount: 16500.00,
      status: "pending"
    },
    {
      id: "10561",
      supplier: "Condor Electronics",
      date: "30/05/2025",
      amount: 22000.00,
      status: "confirmed"
    },
    {
      id: "10562",
      supplier: "Bimo Industries",
      date: "29/05/2025",
      amount: 7200.00,
      status: "cancelled"
    },
    {
      id: "10563",
      supplier: "Société Générale",
      date: "28/05/2025",
      amount: 3800.00,
      status: "confirmed"
    },
    {
      id: "10564",
      supplier: "Groupe Othman",
      date: "27/05/2025",
      amount: 12900.00,
      status: "pending"
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

        <Button 
          className="bg-[#0794FE] hover:bg-[#0670CC] text-white flex items-center gap-2"
          onClick={onNavigateToBizz}
        >
          <Plus className="w-4 h-4" />
          Add Order
        </Button>
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

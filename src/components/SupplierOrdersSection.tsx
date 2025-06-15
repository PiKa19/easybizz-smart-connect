import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown, Download, CreditCard, Truck, Check, XCircle, DollarSign, AlertCircle } from 'lucide-react';

interface Order {
  orderReference: string;
  client: {
    name: string;
    contact: string;
  };
  products: { name: string; qty: number }[];
  orderDate: string;
  deliveryDate: string;
  deliveryStatus: 'Preparing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: 'Dahabiya' | 'CIB' | 'Cash on Delivery';
  totalPrice: number;
  invoiceLink: string;
  notes: string;
  deliveryAddress: string;
  returnStatus?: string;
}

const initialOrders: Order[] = [
  {
    orderReference: 'ORD-10545',
    client: { name: 'Boutique Lina', contact: '07 10 23 55 90' },
    products: [
      { name: 'Huile 5L elio', qty: 1 },
      { name: 'Biscottes Croquantes', qty: 2 },
    ],
    orderDate: '15/06/2025, 09:15',
    deliveryDate: '17/06/2025',
    deliveryStatus: 'Preparing',
    paymentMethod: 'CIB',
    totalPrice: 1850.0,
    invoiceLink: '#',
    notes: 'Deliver in the morning.',
    deliveryAddress: '14 Rue des Oliviers, Alger',
    returnStatus: 'N/A',
  },
  {
    orderReference: 'ORD-10546',
    client: { name: 'Superette Amine', contact: '06 90 17 13 17' },
    products: [{ name: 'Huile Fleurial 3L', qty: 3 }],
    orderDate: '16/06/2025, 10:50',
    deliveryDate: '18/06/2025',
    deliveryStatus: 'Shipped',
    paymentMethod: 'Cash on Delivery',
    totalPrice: 900.0,
    invoiceLink: '#',
    notes: '',
    deliveryAddress: '45 Avenue des Martyrs, Oran',
    returnStatus: 'N/A',
  },
];

const DELIVERY_STATUS_STYLES: Record<Order['deliveryStatus'], string> = {
  Preparing: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  Shipped: 'bg-blue-50 text-blue-700 border border-blue-200',
  Delivered: 'bg-green-50 text-green-700 border border-green-200',
  Cancelled: 'bg-red-50 text-red-700 border border-red-200',
};

const DELIVERY_STATUS_ICON: Record<Order['deliveryStatus'], React.ReactNode> = {
  Preparing: <AlertCircle size={15} className="text-yellow-500 mr-1.5 inline-block" strokeWidth={2.2}/>,
  Shipped: <Truck size={15} className="text-blue-500 mr-1.5 inline-block" strokeWidth={2.2}/>,
  Delivered: <Check size={15} className="text-green-500 mr-1.5 inline-block" strokeWidth={2.2}/>,
  Cancelled: <XCircle size={15} className="text-red-500 mr-1.5 inline-block" strokeWidth={2.2}/>,
};

const PAYMENT_ICON: Record<Order['paymentMethod'], React.ReactNode> = {
  Dahabiya: <DollarSign size={16} className="text-orange-500 mr-1 inline-block" strokeWidth={2}/>,
  CIB: <CreditCard size={16} className="text-emerald-500 mr-1 inline-block" strokeWidth={2}/>,
  "Cash on Delivery": <CreditCard size={16} className="text-blue-400 mr-1 inline-block" strokeWidth={2}/>,
};

const SupplierOrdersSection: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDetails, setOpenDetails] = useState<string | null>(null);

  const filteredOrders = orders.filter(order =>
    order.orderReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="mb-0 flex flex-col md:flex-row items-center justify-between gap-3">
        <div>
          <h2 className="text-3xl font-bold text-[#0794FE] mb-2 tracking-tight">Orders</h2>
          <p className="text-gray-600 mb-2 md:mb-0">Manage, track & update your orders—all in one beautiful view.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Input
            placeholder="🔍 Search by order ref/client"
            className="max-w-xs bg-white border border-blue-200 shadow-inner focus:border-primary"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="bg-[#0794FE] text-white">
                <th className="p-4 text-left font-semibold tracking-wide rounded-tl-2xl">Order Ref.</th>
                <th className="p-4 text-left font-semibold">Client</th>
                <th className="p-4 text-left font-semibold">Order Date</th>
                <th className="p-4 text-left font-semibold">Delivery Date</th>
                <th className="p-4 text-left font-semibold">Status</th>
                <th className="p-4 text-left font-semibold">Price</th>
                <th className="p-4 text-left font-semibold rounded-tr-2xl"></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, i) => (
                <React.Fragment key={order.orderReference}>
                  <tr
                    className={`group transition-colors duration-200 ${i === filteredOrders.length - 1 ? "" : "border-b"} hover:bg-blue-50/60`}
                  >
                    <td className="p-4 font-medium flex items-center gap-1">
                      <span className="rounded text-[#0794FE] font-bold px-2 py-0.5 bg-blue-50 border border-blue-100 mr-2 drop-shadow-sm">{order.orderReference}</span>
                    </td>
                    <td className="p-4 flex flex-col">
                      <span className="font-bold text-gray-700">{order.client.name}</span>
                      <span className="text-xs text-blue-400">{order.client.contact}</span>
                    </td>
                    <td className="p-4">{order.orderDate}</td>
                    <td className="p-4">{order.deliveryDate}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1.5 min-w-[120px] rounded-lg text-xs font-semibold uppercase shadow transition ${DELIVERY_STATUS_STYLES[order.deliveryStatus]}`}>
                        {DELIVERY_STATUS_ICON[order.deliveryStatus]}
                        {order.deliveryStatus}
                      </span>
                    </td>
                    <td className="p-4 font-semibold">{order.totalPrice.toFixed(2)} <span className="text-xs text-gray-400">DZD</span></td>
                    <td className="p-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setOpenDetails(openDetails === order.orderReference ? null : order.orderReference)}
                        className={`flex items-center gap-1 px-4 shadow transition-transform hover:scale-105 font-medium border-blue-200 ${openDetails === order.orderReference ? "bg-blue-50" : "bg-white"}`}
                      >
                        <ChevronDown
                          className={`transition-transform duration-300 ${openDetails === order.orderReference ? "rotate-180" : ""}`}
                          size={17}
                        />
                        Details
                      </Button>
                    </td>
                  </tr>
                  {/* Expandable details row */}
                  {openDetails === order.orderReference && (
                    <tr>
                      <td colSpan={7} className="p-0 bg-blue-50/80">
                        <div className="animate-fade-in flex flex-col md:flex-row gap-4 md:justify-between px-6 py-6 border-t border-blue-100 shadow-inner rounded-b-2xl">
                          {/* Left: details */}
                          <div className="space-y-3 flex-1 text-[15px] font-medium">
                            <div>
                              <span className="font-bold text-[#0794FE]">Products:</span>
                              <ul className="ml-5 mt-1 list-disc text-gray-700">
                                {order.products.map((prod, idx) => (
                                  <li key={idx} className="leading-5">
                                    <span>{prod.name}</span>
                                    <span className="text-xs text-gray-500 ml-2">×{prod.qty}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <span className="font-bold text-[#0794FE]">Payment:</span>
                              <span className="inline-flex items-center ml-2">{PAYMENT_ICON[order.paymentMethod]}{order.paymentMethod}</span>
                            </div>
                            <div>
                              <span className="font-bold text-[#0794FE]">Delivery Address:</span>
                              <span className="ml-2">{order.deliveryAddress}</span>
                            </div>
                            <div>
                              <span className="font-bold text-[#0794FE]">Notes:</span>
                              <span className="ml-2">{order.notes || "-"}</span>
                            </div>
                            <div>
                              <span className="font-bold text-[#0794FE]">Return Status:</span>
                              <span className="ml-2">{order.returnStatus || "N/A"}</span>
                            </div>
                          </div>
                          {/* Right: download invoice button */}
                          <div className="flex flex-col items-start md:justify-end flex-shrink-0 gap-2 min-w-[180px]">
                            <a
                              href={order.invoiceLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center border border-blue-300 bg-white hover:bg-blue-100 text-blue-700 font-semibold rounded-lg px-4 h-11 gap-2 shadow transition-all active:bg-blue-200 focus:ring-2 focus:ring-blue-200"
                              download
                            >
                              <Download className="w-5 h-5 mr-1" />
                              Download Invoice
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-400 py-7 bg-white rounded-b-2xl">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Rows per page panel */}
        <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50 rounded-b-2xl text-xs text-blue-600 font-semibold tracking-wide">
          <div>
            Rows per page:
            <select className="mx-2 border border-blue-100 rounded py-1 px-2 text-xs bg-white">
              <option>5</option>
              <option>10</option>
            </select>
          </div>
          <span>
            1–{filteredOrders.length} of {filteredOrders.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SupplierOrdersSection;


import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown } from 'lucide-react';

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

const DELIVERY_STATUS_COLORS: Record<Order['deliveryStatus'], string> = {
  Preparing: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  Shipped: 'bg-blue-100 text-blue-800 border border-blue-200',
  Delivered: 'bg-green-100 text-green-800 border border-green-200',
  Cancelled: 'bg-red-100 text-red-800 border border-red-200',
};

const SupplierOrdersSection: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDetails, setOpenDetails] = useState<string | null>(null);

  const handleStatusChange = (orderReference: string, newStatus: Order['deliveryStatus']) => {
    setOrders(currentOrders =>
      currentOrders.map(order =>
        order.orderReference === orderReference
          ? { ...order, deliveryStatus: newStatus }
          : order
      )
    );
  };

  const filteredOrders = orders.filter(order =>
    order.orderReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#f7f7f9] min-h-screen">
      <h2 className="text-2xl font-bold mb-1">Orders</h2>
      <p className="text-muted-foreground mb-7">Manage and track your orders, update their status & view order details.</p>
      {/* Filtering/Search Bar */}
      <div className="flex items-center gap-2 mb-4">
        <Button variant="outline" className="text-blue-600 border-blue-400 flex items-center gap-1 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-blue-500 mr-2 inline-block"></span>
          Filtrage
        </Button>
        <Input
          placeholder="Recherche"
          className="max-w-xs"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-[0_4px_16px_0_rgba(70,148,235,0.05)] border mb-10">
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#0794FE] text-white">
                <th className="p-3 text-left rounded-tl-lg">Order Reference</th>
                <th className="p-3 text-left">Client</th>
                <th className="p-3 text-left">Order Date</th>
                <th className="p-3 text-left">Delivery Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left rounded-tr-lg"></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, i) => (
                <React.Fragment key={order.orderReference}>
                  {/* Main row */}
                  <tr className={i === filteredOrders.length - 1 ? "" : "border-b"}>
                    <td className="p-3 font-medium">{order.orderReference}</td>
                    <td className="p-3">
                      <span className="font-bold">{order.client.name}</span>
                      <div className="text-xs text-muted-foreground">{order.client.contact}</div>
                    </td>
                    <td className="p-3">{order.orderDate}</td>
                    <td className="p-3">{order.deliveryDate}</td>
                    <td className="p-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold align-middle ${DELIVERY_STATUS_COLORS[order.deliveryStatus]}`}>
                        {order.deliveryStatus}
                      </span>
                    </td>
                    <td className="p-3 font-semibold">{order.totalPrice.toFixed(2)} DZD</td>
                    <td className="p-3 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setOpenDetails(openDetails === order.orderReference ? null : order.orderReference)}
                        className="flex items-center gap-1 px-4"
                      >
                        <ChevronDown
                          className={`transition-transform duration-200 ${openDetails === order.orderReference ? "rotate-180" : ""}`}
                          size={16}
                        />
                        Details
                      </Button>
                    </td>
                  </tr>
                  {/* Expandable details row */}
                  {openDetails === order.orderReference && (
                    <tr className="bg-[#fafbfc]">
                      <td colSpan={7} className="p-6 pt-2 border-t">
                        <div className="flex flex-col md:flex-row gap-4 md:justify-between">
                          {/* Left: details */}
                          <div className="space-y-2 flex-1 text-[15px]">
                            <div>
                              <span className="font-semibold">Product(s):</span>
                              <ul className="ml-4 mt-1 list-none">
                                {order.products.map((prod, idx) => (
                                  <li key={idx} className="leading-5">
                                    {prod.name}
                                    <span className="text-xs text-muted-foreground ml-1">×{prod.qty}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <span className="font-semibold">Payment:</span> {order.paymentMethod}
                            </div>
                            <div>
                              <span className="font-semibold">Address:</span> {order.deliveryAddress}
                            </div>
                            <div>
                              <span className="font-semibold">Notes / Comments:</span> {order.notes || "-"}
                            </div>
                            <div>
                              <span className="font-semibold">Return Status:</span> {order.returnStatus || "N/A"}
                            </div>
                          </div>
                          {/* Right: download invoice button */}
                          <div className="flex items-start md:justify-end flex-shrink-0">
                            <a
                              href={order.invoiceLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center border border-gray-300 bg-white hover:bg-gray-100 text-gray-800 font-medium rounded px-4 h-10 shadow transition-colors"
                              download
                            >
                              📄 Download Invoice
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
                  <td colSpan={7} className="text-center text-gray-500 py-5">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination/rows (static for demo) */}
        <div className="flex items-center justify-end bg-[#fafbfc] rounded-b-lg px-4 py-2 border-t text-xs text-gray-500">
          Rows per page:
          <select className="mx-2 border rounded py-1 px-2 text-xs">
            <option>5</option><option>10</option>
          </select>
          <span className="text-gray-600">1–{filteredOrders.length} of {filteredOrders.length}</span>
        </div>
      </div>
    </div>
  );
};

export default SupplierOrdersSection;


import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Filter, ChevronDown, ChevronUp } from "lucide-react";

const mockOrders = [
  {
    id: "ORD-10545",
    client: {
      name: "Boutique Lina",
      contact: "07 10 23 55 90"
    },
    products: [
      { name: "Huile 5L elio", qty: 1 },
      { name: "Biscottes Croquantes", qty: 2 },
    ],
    orderDate: "15/06/2025, 09:15",
    deliveryDate: "17/06/2025",
    deliveryStatus: "Preparing",
    paymentMethod: "CIB",
    totalPrice: "1850.00",
    invoiceUrl: "#",
    notes: "Deliver in the morning.",
    address: "14 Rue des Oliviers, Alger",
    returnStatus: "N/A"
  },
  {
    id: "ORD-10546",
    client: {
      name: "Superette Amine",
      contact: "06 90 17 13 17"
    },
    products: [
      { name: "Lait 1L Candia", qty: 10 },
    ],
    orderDate: "16/06/2025, 10:50",
    deliveryDate: "18/06/2025",
    deliveryStatus: "Shipped",
    paymentMethod: "Dahabiya",
    totalPrice: "900.00",
    invoiceUrl: "#",
    notes: "",
    address: "6 Bd Che Guevara, Oran",
    returnStatus: "Returned"
  }
];

const deliveryStatusColors: Record<string, string> = {
  "Preparing": "bg-yellow-100 text-yellow-800",
  "Shipped": "bg-blue-100 text-blue-800",
  "Delivered": "bg-green-100 text-green-800",
  "Returned": "bg-red-100 text-red-800",
};

const SupplierClientsSection = () => {
  const [search, setSearch] = useState("");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Filtering by search
  const filteredOrders = mockOrders.filter(order =>
    order.id.toLowerCase().includes(search.toLowerCase()) ||
    order.client.name.toLowerCase().includes(search.toLowerCase()) ||
    order.products.some(p => p.name.toLowerCase().includes(search.toLowerCase()))
  );

  // Table columns always visible
  // Order Reference | Client Name / Boutique | Order Date | Delivery Date | Delivery Status | Total Price | Details (expand)
  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Clients orders</h1>
      <p className="text-gray-600 mb-6">Manage your retailer orders, track status & view order details.</p>
      
      {/* Top filter and search controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4" />
          <span>Filtrage</span>
        </Button>
        <Input
          placeholder="Recherche"
          className="w-full sm:max-w-xs"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border shadow-sm overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-[#0794FE] text-white text-sm">
              <th className="px-2 py-3 font-medium whitespace-nowrap text-left">Order Reference</th>
              <th className="px-2 py-3 font-medium whitespace-nowrap text-left">👤 Client</th>
              <th className="px-2 py-3 font-medium whitespace-nowrap text-left">📅 Order Date</th>
              <th className="px-2 py-3 font-medium whitespace-nowrap text-left">⌛ Delivery Date</th>
              <th className="px-2 py-3 font-medium whitespace-nowrap text-left">🚚 Status</th>
              <th className="px-2 py-3 font-medium whitespace-nowrap text-left">💰 Price</th>
              <th className="px-2 py-3 font-medium whitespace-nowrap text-left"></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : filteredOrders.map(order => (
              // Main row and detail row
              <React.Fragment key={order.id}>
                <tr className="border-b text-gray-800 hover:bg-gray-50 text-sm">
                  <td className="px-2 py-3 font-semibold">{order.id}</td>
                  <td className="px-2 py-3">
                    <div className="font-medium">{order.client.name}</div>
                    <div className="text-xs text-gray-500">{order.client.contact}</div>
                  </td>
                  <td className="px-2 py-3">{order.orderDate}</td>
                  <td className="px-2 py-3">{order.deliveryDate}</td>
                  <td className="px-2 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${deliveryStatusColors[order.deliveryStatus] || "bg-gray-100 text-gray-800"}`}>
                      {order.deliveryStatus}
                    </span>
                  </td>
                  <td className="px-2 py-3">{order.totalPrice} DZD</td>
                  <td className="px-2 py-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 px-2 py-1"
                      onClick={() => setExpandedRow(expandedRow === order.id ? null : order.id)}
                    >
                      {expandedRow === order.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      Details
                    </Button>
                  </td>
                </tr>
                {expandedRow === order.id && (
                  <tr>
                    <td colSpan={7} className="bg-gray-50 p-0">
                      <div className="px-4 pb-4 pt-3 flex flex-col md:flex-row gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="mb-2">
                            <span className="font-semibold">Product(s):</span>
                            {order.products.map(prod => (
                              <div className="ml-2 text-[15px]" key={prod.name}>{prod.name} <span className="text-xs text-gray-500">x{prod.qty}</span></div>
                            ))}
                          </div>
                          <div className="mb-2"><span className="font-semibold">Payment:</span> {order.paymentMethod}</div>
                          <div className="mb-2"><span className="font-semibold">Address:</span> {order.address}</div>
                          <div className="mb-2"><span className="font-semibold">Notes / Comments:</span> {order.notes || "-"}</div>
                          <div className="mb-2"><span className="font-semibold">Return Status:</span> {order.returnStatus}</div>
                        </div>
                        <div className="flex flex-col md:items-end min-w-[160px]">
                          <a
                            href={order.invoiceUrl}
                            className="flex items-center gap-1 px-2 py-1 border rounded bg-white hover:bg-gray-100 text-sm transition"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="w-4 h-4" /> 
                            Download Invoice
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {/* Pagination control (static) */}
        <div className="flex items-center justify-end p-2 text-xs text-gray-500">
          Rows per page:
          <select className="mx-2 border border-gray-200 rounded px-1 py-0.5">
            <option>5</option>
            <option>10</option>
          </select>
          1-{filteredOrders.length} of {filteredOrders.length}
        </div>
      </div>
    </div>
  );
};

export default SupplierClientsSection;

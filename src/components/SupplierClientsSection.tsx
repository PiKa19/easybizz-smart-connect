
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";

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
  const [filter, setFilter] = useState("");

  // Basic search filtering
  const filteredOrders = mockOrders.filter(order =>
    order.id.toLowerCase().includes(search.toLowerCase()) ||
    order.client.name.toLowerCase().includes(search.toLowerCase()) ||
    order.products.some(p => p.name.toLowerCase().includes(search.toLowerCase()))
  );

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
        <table className="w-full min-w-[1350px]">
          <thead>
            <tr className="bg-[#0794FE] text-white text-sm">
              <th className="px-2 py-3 font-medium whitespace-nowrap text-left">Order Reference</th>
              <th className="px-2 py-3 font-medium whitespace-nowrap text-left">👤 Client Name / Boutique</th>
              <th className="px-2 py-3 font-medium whitespace-nowrap text-left">📦 Product(s) Ordered</th>
              <th className="px-2 py-3 font-medium whitespace-nowrap text-left">🔢 Quantity</th>
              <th className="px-2 py-3 font-medium whitespace-nowrap text-left">📅 Order Date</th>
              <th className="px-2 py-3 font-medium whitespace-nowrap text-left">⌛ Delivery Date</th>
              <th className="px-2 py-3 font-medium whitespace-nowrap text-left">🚚 Delivery Status</th>
              <th className="px-2 py-3 font-medium whitespace-nowrap text-left">💳 Payment Method</th>
              <th className="px-2 py-3 font-medium whitespace-nowrap text-left">💰 Total Price</th>
              <th className="px-2 py-3 font-medium whitespace-nowrap text-left">📄 Invoice Link</th>
              <th className="px-2 py-3 font-medium whitespace-nowrap text-left">✉️ Notes / Comments</th>
              <th className="px-2 py-3 font-medium whitespace-nowrap text-left">📍 Delivery Address</th>
              <th className="px-2 py-3 font-medium whitespace-nowrap text-left">🔁 Return Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={13} className="text-center py-10 text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : filteredOrders.map(order => (
              <tr key={order.id} className="border-b text-gray-800 hover:bg-gray-50 text-sm">
                <td className="px-2 py-3">{order.id}</td>
                <td className="px-2 py-3">
                  <div className="font-medium">{order.client.name}</div>
                  <div className="text-xs text-gray-500">{order.client.contact}</div>
                </td>
                <td className="px-2 py-3">
                  {order.products.map(prod => (
                    <div key={prod.name}>{prod.name}</div>
                  ))}
                </td>
                <td className="px-2 py-3">
                  {order.products.map(prod => (
                    <div key={prod.name}>{prod.qty}</div>
                  ))}
                </td>
                <td className="px-2 py-3">{order.orderDate}</td>
                <td className="px-2 py-3">{order.deliveryDate}</td>
                <td className="px-2 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${deliveryStatusColors[order.deliveryStatus] || "bg-gray-100 text-gray-800"}`}>
                    {order.deliveryStatus}
                  </span>
                </td>
                <td className="px-2 py-3">{order.paymentMethod}</td>
                <td className="px-2 py-3">{order.totalPrice} DZD</td>
                <td className="px-2 py-3">
                  <Button variant="outline" size="sm" className="px-2 py-1" asChild>
                    <a href={order.invoiceUrl}>
                      <Download className="w-3 h-3 mr-1 inline" />
                      Invoice
                    </a>
                  </Button>
                </td>
                <td className="px-2 py-3">{order.notes || "-"}</td>
                <td className="px-2 py-3">{order.address}</td>
                <td className="px-2 py-3">{order.returnStatus}</td>
              </tr>
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

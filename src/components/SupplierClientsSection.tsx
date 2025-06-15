
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, ChevronDown, ChevronUp } from "lucide-react";
import OrderStatusSelect from "./OrderStatusSelect";

const mockOrders = [
  {
    id: "ORD-10545",
    client: { name: "Boutique Lina", contact: "07 10 23 55 90" },
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
    returnStatus: "N/A",
  },
  {
    id: "ORD-10546",
    client: { name: "Superette Amine", contact: "06 90 17 13 17" },
    products: [{ name: "Lait 1L Candia", qty: 10 }],
    orderDate: "16/06/2025, 10:50",
    deliveryDate: "18/06/2025",
    deliveryStatus: "Shipped",
    paymentMethod: "Dahabiya",
    totalPrice: "900.00",
    invoiceUrl: "#",
    notes: "",
    address: "6 Bd Che Guevara, Oran",
    returnStatus: "Returned",
  },
];

const deliveryStatusColors: Record<string, string> = {
  Preparing: "bg-yellow-100 text-yellow-900 border border-yellow-300",
  Shipped: "bg-blue-100 text-blue-900 border border-blue-300",
  Delivered: "bg-green-100 text-green-900 border border-green-300",
  Returned: "bg-red-100 text-red-900 border border-red-300",
};

const paymentBadgeColors: Record<string, string> = {
  CIB: "bg-green-50 text-green-600 border border-green-200",
  Dahabiya: "bg-purple-50 text-purple-700 border border-purple-200",
  "Cash on Delivery": "bg-gray-50 text-gray-700 border border-gray-200",
};

const statusOptions = ["Preparing", "Shipped", "Delivered", "Returned"];

const SupplierClientsSection = () => {
  const [search, setSearch] = useState("");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Use state for delivery statuses per order
  const [orderStatuses, setOrderStatuses] = useState<Record<string, string>>(
    Object.fromEntries(mockOrders.map((o) => [o.id, o.deliveryStatus]))
  );

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrderStatuses((prev) => ({ ...prev, [orderId]: newStatus }));
  };

  const filteredOrders = mockOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.client.name.toLowerCase().includes(search.toLowerCase()) ||
      order.products.some((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Clients orders</h1>
      <p className="text-gray-600 mb-6">
        Manage your retailer orders, track status & view order details.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <Button
          variant="outline"
          className="flex items-center gap-2 w-full sm:w-auto font-semibold shadow hover:shadow-md focus:ring-2 focus:ring-blue-200"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-[#0794FE] mr-1"></span>
          Filtrage
        </Button>
        <Input
          placeholder="Recherche"
          className="w-full sm:max-w-xs shadow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="rounded-xl overflow-hidden shadow-xl border border-blue-100/60 bg-gradient-to-b from-blue-50 to-white">
        <table className="w-full min-w-[650px]">
          <thead>
            <tr className="bg-[#0794FE] text-white text-sm">
              <th className="px-3 py-3 font-semibold whitespace-nowrap text-left">
                Order Reference
              </th>
              <th className="px-3 py-3 font-semibold whitespace-nowrap text-left">
                Client
              </th>
              <th className="px-3 py-3 font-semibold whitespace-nowrap text-left">
                Order Date
              </th>
              <th className="px-3 py-3 font-semibold whitespace-nowrap text-left">
                Delivery Date
              </th>
              <th className="px-3 py-3 font-semibold whitespace-nowrap text-left">
                Status
              </th>
              <th className="px-3 py-3 font-semibold whitespace-nowrap text-left">
                Price
              </th>
              <th className="px-3 py-3 whitespace-nowrap text-left"></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr className="border-b text-gray-900 bg-white hover:bg-blue-50 transition-all text-[15px] group">
                    <td className="px-3 py-3 font-semibold">{order.id}</td>
                    <td className="px-3 py-3">
                      <div className="font-semibold">{order.client.name}</div>
                      <div className="text-xs text-gray-400">
                        {order.client.contact}
                      </div>
                    </td>
                    <td className="px-3 py-3">{order.orderDate}</td>
                    <td className="px-3 py-3">{order.deliveryDate}</td>
                    <td className="px-3 py-3">
                      <OrderStatusSelect
                        value={orderStatuses[order.id]}
                        onChange={(val) => handleStatusChange(order.id, val)}
                      />
                    </td>
                    <td className="px-3 py-3 font-medium text-base">
                      {order.totalPrice} DZD
                    </td>
                    <td className="px-3 py-3 align-middle">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 px-3 py-1 rounded-md shadow transition hover:bg-blue-100 hover:text-blue-700 hover:border-blue-400 animate-fade-in"
                        onClick={() =>
                          setExpandedRow(expandedRow === order.id ? null : order.id)
                        }
                        aria-expanded={expandedRow === order.id}
                        aria-controls={`row-details-${order.id}`}
                      >
                        {expandedRow === order.id ? (
                          <>
                            <ChevronUp className="w-4 h-4" /> Hide
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" /> Details
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={7}
                      className={
                        expandedRow === order.id
                          ? "bg-gradient-to-b from-white via-blue-50/70 to-white border-t-0 transition-all animate-fade-in"
                          : "p-0"
                      }
                      style={{
                        padding: 0,
                        borderTop: 0,
                        height: expandedRow === order.id ? "auto" : 0,
                      }}
                    >
                      <div
                        id={`row-details-${order.id}`}
                        className={`overflow-hidden transition-all duration-300 ${
                          expandedRow === order.id
                            ? "max-h-[500px] py-4 px-6 opacity-100 scale-100"
                            : "max-h-0 p-0 opacity-0 scale-95 pointer-events-none"
                        }`}
                      >
                        {/* Details: Product, Payment, Address, Notes, Invoice, etc */}
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1 min-w-0">
                            <div className="mb-2 mt-2 font-semibold text-gray-700 text-[15px]">
                              Product(s):
                              {order.products.map((prod, idx) => (
                                <div className="ml-2 mt-1 text-[15px] font-normal" key={prod.name}>
                                  {prod.name} <span className="text-xs text-gray-500">x{prod.qty}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mb-2 flex items-center gap-2">
                              <span className="font-semibold">Payment:</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold shadow-sm ${paymentBadgeColors[order.paymentMethod] || "bg-gray-50 text-gray-500 border"}`}>
                                {order.paymentMethod}
                              </span>
                            </div>
                            <div className="mb-2">
                              <span className="font-semibold">Address:</span> {order.address}
                            </div>
                            <div className="mb-2">
                              <span className="font-semibold">Notes / Comments:</span>{" "}
                              <span className="italic text-gray-700">{order.notes || "-"}</span>
                            </div>
                            <div className="mb-2">
                              <span className="font-semibold">Return Status:</span> {order.returnStatus}
                            </div>
                          </div>
                          <div className="flex flex-col items-start md:items-end min-w-[180px]">
                            <a
                              href={order.invoiceUrl}
                              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 text-sm font-medium shadow transition animate-fade-in"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Download className="w-4 h-4" />
                              Download Invoice
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-end p-3 text-xs text-gray-500 bg-white border-t">
          Rows per page:
          <select className="mx-2 border border-gray-200 rounded px-1 py-0.5 shadow-sm focus:ring-2 focus:ring-blue-100">
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


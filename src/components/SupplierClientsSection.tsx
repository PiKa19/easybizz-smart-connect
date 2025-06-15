
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  lastOrder: string; // date string
};

const mockClients: Client[] = [
  {
    id: "CL-1",
    name: "Boutique Lina",
    email: "lina@example.com",
    phone: "07 10 23 55 90",
    totalOrders: 34,
    lastOrder: "2025-06-14T12:10:00Z"
  },
  {
    id: "CL-2",
    name: "Superette Amine",
    email: "amine@example.com",
    phone: "06 90 17 13 17",
    totalOrders: 52,
    lastOrder: "2025-06-15T15:55:00Z"
  },
  {
    id: "CL-3",
    name: "Gros Plan",
    email: "grossplan@example.com",
    phone: "05 50 81 11 14",
    totalOrders: 17,
    lastOrder: "2025-06-13T09:40:00Z"
  },
];

const FILTERS = [
  { key: "latest", label: "Latest Orders" },
  { key: "most_sales", label: "Most Sales" }
];

const SupplierClientsSection = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(FILTERS[0].key);

  const handleAddClient = () => {
    // You could show a dialog/modal in a real app
    alert("Add new client (not yet implemented)");
  };

  // Filtering logic
  let filteredClients = mockClients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );
  if (filter === "most_sales") {
    filteredClients = [...filteredClients].sort((a, b) => b.totalOrders - a.totalOrders);
  }
  if (filter === "latest") {
    filteredClients = [...filteredClients].sort((a, b) =>
      new Date(b.lastOrder).getTime() - new Date(a.lastOrder).getTime()
    );
  }

  return (
    <div className="px-8 py-8 w-full">
      {/* Top section: Title, search, add and filter */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-6 justify-between">
        <h1 className="text-2xl font-bold mb-2">Clients</h1>
        <div className="flex flex-1 gap-3 items-center">
          <Input
            placeholder="Search clients"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72"
          />
          <Button
            variant="default"
            className="flex items-center gap-2"
            onClick={handleAddClient}
          >
            <Plus className="w-4 h-4" />
            Add Client
          </Button>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0">
          {FILTERS.map((f) => (
            <Button
              key={f.key}
              variant={filter === f.key ? "default" : "outline"}
              onClick={() => setFilter(f.key)}
              className="text-sm"
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Clients list */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full text-[15px]">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Total Orders</th>
                <th className="px-4 py-3 text-left">Last Order</th>
                <th className="px-4 py-3 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-500">
                    No clients found.
                  </td>
                </tr>
              ) : (
                filteredClients.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-blue-50">
                    <td className="px-4 py-3 font-medium">{c.name}</td>
                    <td className="px-4 py-3">{c.email}</td>
                    <td className="px-4 py-3">{c.phone}</td>
                    <td className="px-4 py-3">{c.totalOrders}</td>
                    <td className="px-4 py-3">{new Date(c.lastOrder).toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="outline">View</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupplierClientsSection;

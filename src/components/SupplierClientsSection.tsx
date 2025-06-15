
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Client {
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  lastOrder: string;
}

const initialClients: Client[] = [
  {
    name: "Superette Amine",
    email: "amine@example.com",
    phone: "06 90 17 13 17",
    totalOrders: 52,
    lastOrder: "6/15/2025, 4:55:00 PM",
  },
  {
    name: "Boutique Lina",
    email: "lina@example.com",
    phone: "07 10 23 55 90",
    totalOrders: 34,
    lastOrder: "6/14/2025, 1:10:00 PM",
  },
  {
    name: "Gros Plan",
    email: "grossplan@example.com",
    phone: "05 50 81 11 14",
    totalOrders: 17,
    lastOrder: "6/13/2025, 10:40:00 AM",
  },
];

const SupplierClientsSection: React.FC = () => {
  const [search, setSearch] = useState('');
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [activeFilter, setActiveFilter] = useState<'latest' | 'sales'>('latest');

  // Filtering
  const getFilteredClients = () => {
    let filtered = clients.filter(
      (client) =>
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase()) ||
        client.phone.replace(/\s+/g, '').includes(search.replace(/\s+/g, ''))
    );
    if (activeFilter === 'latest') {
      filtered = [...filtered].sort(
        (a, b) =>
          new Date(b.lastOrder).getTime() - new Date(a.lastOrder).getTime()
      );
    } else if (activeFilter === 'sales') {
      filtered = [...filtered].sort((a, b) => b.totalOrders - a.totalOrders);
    }
    return filtered;
  };

  const handleAddClient = () => {
    // Placeholder for add client logic
    alert("Add Client feature coming soon!");
  };

  return (
    <div className="p-6">
      <h2 className="font-bold text-2xl mb-5">Clients</h2>
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-4">
        <Input
          placeholder="Search clients"
          className="w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          className="gap-2"
          onClick={handleAddClient}
        >
          <Plus className="w-4 h-4" />
          Add Client
        </Button>
        <Button
          variant={activeFilter === "latest" ? "default" : "outline"}
          className={activeFilter === "latest" ? "bg-[#151c26] text-white" : ""}
          onClick={() => setActiveFilter("latest")}
        >
          Latest Orders
        </Button>
        <Button
          variant={activeFilter === "sales" ? "default" : "outline"}
          className={activeFilter === "sales" ? "bg-[#151c26] text-white" : ""}
          onClick={() => setActiveFilter("sales")}
        >
          Most Sales
        </Button>
      </div>
      <div className="bg-white rounded-lg border p-3 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4 font-semibold">Name</th>
                <th className="py-2 px-4 font-semibold">Email</th>
                <th className="py-2 px-4 font-semibold">Phone</th>
                <th className="py-2 px-4 font-semibold">Total Orders</th>
                <th className="py-2 px-4 font-semibold">Last Order</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {getFilteredClients().map((client, i) => (
                <tr key={client.email} className="border-t last:border-b-0">
                  <td className="py-2 px-4">{client.name}</td>
                  <td className="py-2 px-4">{client.email}</td>
                  <td className="py-2 px-4">{client.phone}</td>
                  <td className="py-2 px-4">{client.totalOrders}</td>
                  <td className="py-2 px-4">{client.lastOrder}</td>
                  <td className="py-2 px-4">
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
              {getFilteredClients().length === 0 && (
                <tr>
                  <td className="py-2 px-4 text-center text-gray-500" colSpan={6}>
                    No clients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupplierClientsSection;

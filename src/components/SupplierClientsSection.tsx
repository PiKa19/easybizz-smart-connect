
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

const mockClients: Client[] = [
  {
    name: "Superette Amine",
    email: "amine@example.com",
    phone: "06 90 17 13 17",
    totalOrders: 52,
    lastOrder: "6/15/2025, 4:55:00 PM"
  },
  {
    name: "Boutique Lina",
    email: "lina@example.com",
    phone: "07 10 23 55 90",
    totalOrders: 34,
    lastOrder: "6/14/2025, 1:10:00 PM"
  },
  {
    name: "Gros Plan",
    email: "grossplan@example.com",
    phone: "05 50 81 11 14",
    totalOrders: 17,
    lastOrder: "6/13/2025, 10:40:00 AM"
  }
];

type SortType = "latest" | "mostSales";

const SupplierClientsSection: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState<SortType>("latest");
  const [clients, setClients] = useState<Client[]>(mockClients);

  const handleSort = (type: SortType) => {
    setSortType(type);
    let sortedClients = [...clients];
    if (type === "latest") {
      sortedClients.sort((a, b) => new Date(b.lastOrder).getTime() - new Date(a.lastOrder).getTime());
    } else {
      sortedClients.sort((a, b) => b.totalOrders - a.totalOrders);
    }
    setClients(sortedClients);
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase()) ||
      client.phone.replace(/\s/g, "").includes(search.replace(/\s/g, ""))
  );

  return (
    <div className="p-6 md:p-8 w-full">
      <h1 className="font-bold text-2xl mb-6">Clients</h1>
      <div className="flex flex-col gap-3 md:flex-row md:items-center mb-6">
        <Input
          type="text"
          placeholder="Search clients"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm md:mr-4"
        />
        <Button className="bg-black text-white hover:bg-gray-900 md:mr-4">
          <Plus className="w-4 h-4 mr-1" /> Add Client
        </Button>
        <Button
          variant={sortType === "latest" ? "default" : "outline"}
          className={`${sortType === "latest" ? "bg-black text-white" : ""} md:mr-2`}
          onClick={() => handleSort("latest")}
        >
          Latest Orders
        </Button>
        <Button
          variant={sortType === "mostSales" ? "default" : "outline"}
          className={`${sortType === "mostSales" ? "bg-black text-white" : ""}`}
          onClick={() => handleSort("mostSales")}
        >
          Most Sales
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow border px-3 py-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-2 text-left font-semibold text-base">Name</th>
                <th className="py-2 px-2 text-left font-semibold text-base">Email</th>
                <th className="py-2 px-2 text-left font-semibold text-base">Phone</th>
                <th className="py-2 px-2 text-left font-semibold text-base">Total Orders</th>
                <th className="py-2 px-2 text-left font-semibold text-base">Last Order</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No clients found.
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.email} className="border-b hover:bg-gray-50 transition">
                    <td className="py-2 px-2">{client.name}</td>
                    <td className="py-2 px-2">{client.email}</td>
                    <td className="py-2 px-2">{client.phone}</td>
                    <td className="py-2 px-2">{client.totalOrders}</td>
                    <td className="py-2 px-2">{client.lastOrder}</td>
                    <td className="py-2 px-2">
                      <Button
                        className="bg-gray-100 hover:bg-gray-200 text-black border border-gray-300"
                        size="sm"
                        variant="outline"
                      >
                        View
                      </Button>
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


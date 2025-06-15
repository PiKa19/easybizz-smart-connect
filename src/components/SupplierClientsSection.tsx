
import React, { useState } from "react";
import ClientFilterBar from "./ClientFilterBar";
import ClientTable from "./ClientTable";
import type { Client } from "./ClientTableRow";

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
    <div className="p-6 bg-gradient-to-tr from-[#e6f3ff] via-white to-[#f6fbff] min-h-screen transition-colors duration-500">
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-3">
        <div>
          <h2 className="text-3xl font-bold text-[#065fad] mb-2 tracking-tight">Clients</h2>
          <p className="text-muted-foreground mb-2 md:mb-0">View, manage, and access your client base easily.</p>
        </div>
        {/* Styled search bar */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="🔍 Search client name, email, or phone"
            className="max-w-xs bg-white/80 border border-blue-200 shadow-inner focus:border-primary px-3 py-2 rounded"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      <ClientFilterBar
        search={search}
        onSearchChange={setSearch}
        onAddClient={handleAddClient}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <ClientTable clients={getFilteredClients()} />
    </div>
  );
};

export default SupplierClientsSection;

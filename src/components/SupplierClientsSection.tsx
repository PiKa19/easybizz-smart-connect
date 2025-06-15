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
    <div className="p-6">
      <h2 className="font-bold text-2xl mb-5">Clients</h2>
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

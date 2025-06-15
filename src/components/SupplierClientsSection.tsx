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
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
    alert("Add Client feature coming soon!");
  };

  return (
    <div className="space-y-6">
      <div className="mb-0 flex flex-col md:flex-row items-center justify-between gap-3">
        <div>
          <h2 className="text-3xl font-bold text-[#0794FE] mb-2 tracking-tight">Clients</h2>
          <p className="text-gray-600 mb-2 md:mb-0">View, manage, and access your client base easily.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="🔍 Search client name, email, or phone"
            className="max-w-xs bg-white border border-blue-200 shadow-inner focus:border-primary px-3 py-2 rounded"
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
      <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden animate-fade-in mt-4">
        <ClientTable
          clients={getFilteredClients().slice(0, rowsPerPage)}
        />
        <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50 rounded-b-2xl text-xs text-blue-600 font-semibold tracking-wide">
          <div>
            Rows per page:
            <select
              className="mx-2 border border-blue-100 rounded py-1 px-2 text-xs bg-white"
              value={rowsPerPage}
              onChange={e => setRowsPerPage(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <span>
            1–{Math.min(getFilteredClients().length, rowsPerPage)} of {getFilteredClients().length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SupplierClientsSection;

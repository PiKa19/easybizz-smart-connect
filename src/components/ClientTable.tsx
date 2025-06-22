
import React from "react";
import ClientTableRow, { Client } from "./ClientTableRow";

interface ClientTableProps {
  clients: Client[];
  onBack: () => void;
}

const ClientTable: React.FC<ClientTableProps> = ({ clients, onBack }) => (
  <div>
    <div className="mb-4">
      <button 
        onClick={onBack}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Back to Dashboard
      </button>
    </div>
    <div className="bg-white/80 rounded-2xl shadow-xl border border-blue-50 overflow-hidden animate-fade-in mt-5">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-[#0794FE] via-[#43b0f9] to-[#77c7fa] text-white">
              <th className="p-4 text-left font-semibold tracking-wide rounded-tl-2xl">Name</th>
              <th className="p-4 text-left font-semibold">Email</th>
              <th className="p-4 text-center font-semibold">Total Orders</th>
              <th className="p-4 text-center font-semibold">Last Order</th>
              <th className="p-4 text-right font-semibold rounded-tr-2xl"></th>
            </tr>
          </thead>
          <tbody>
            {clients.length > 0 ? (
              clients.map((client) => (
                <ClientTableRow key={client.email} client={client} />
              ))
            ) : (
              <tr>
                <td className="py-6 px-4 text-center text-gray-400" colSpan={5}>
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination bar */}
      <div className="flex items-center justify-end bg-blue-50 rounded-b-2xl px-6 py-3 border-t border-blue-100 text-xs text-blue-600 font-semibold tracking-wide">
        Rows per page:
        <select className="mx-2 border border-blue-100 rounded py-1 px-2 text-xs bg-white">
          <option>5</option>
          <option>10</option>
        </select>
        <span className="ml-2">
          1–{clients.length} of {clients.length}
        </span>
      </div>
    </div>
  </div>
);

export default ClientTable;

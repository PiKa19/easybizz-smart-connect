
import React from "react";
import ClientTableRow, { Client } from "./ClientTableRow";

interface ClientTableProps {
  clients: Client[];
}

const ClientTable: React.FC<ClientTableProps> = ({ clients }) => (
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
          {clients.length > 0 ? (
            clients.map((client) => (
              <ClientTableRow key={client.email} client={client} />
            ))
          ) : (
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
);

export default ClientTable;

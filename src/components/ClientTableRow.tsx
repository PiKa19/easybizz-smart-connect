
import React from "react";
import { Button } from "@/components/ui/button";
import { User, Phone, Mail } from "lucide-react";

export interface Client {
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  lastOrder: string;
}

interface ClientTableRowProps {
  client: Client;
}

const ClientTableRow: React.FC<ClientTableRowProps> = ({ client }) => (
  <tr className="group border-b last:border-b-0 hover:bg-blue-50/60 transition-colors duration-150">
    <td className="py-4 px-4 font-bold text-[#0794FE] text-base flex flex-col gap-0.5">
      <span className="inline-flex items-center gap-1">
        <User size={16} className="inline-block mr-1 text-blue-400" />
        {client.name}
      </span>
      <span className="text-xs text-blue-400 font-normal flex items-center gap-1">
        <Phone size={12} className="mr-0.5" />
        {client.phone}
      </span>
    </td>
    <td className="py-4 px-4 text-gray-700 text-sm">
      <span className="flex items-center gap-1">
        <Mail size={14} className="mr-1" />
        {client.email}
      </span>
    </td>
    <td className="py-4 px-4 text-center text-gray-800 font-semibold">{client.totalOrders}</td>
    <td className="py-4 px-4 text-center text-gray-600">{client.lastOrder}</td>
    <td className="py-4 px-4 text-right">
      <Button size="sm" variant="outline" className="px-4 font-medium shadow transition-transform hover:scale-105 border-blue-200">View</Button>
    </td>
  </tr>
);

export default ClientTableRow;

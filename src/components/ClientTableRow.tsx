
import React from "react";
import { Button } from "@/components/ui/button";

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
  <tr className="border-t last:border-b-0">
    <td className="py-2 px-4">{client.name}</td>
    <td className="py-2 px-4">{client.email}</td>
    <td className="py-2 px-4">{client.phone}</td>
    <td className="py-2 px-4">{client.totalOrders}</td>
    <td className="py-2 px-4">{client.lastOrder}</td>
    <td className="py-2 px-4">
      <Button size="sm" variant="outline">View</Button>
    </td>
  </tr>
);

export default ClientTableRow;

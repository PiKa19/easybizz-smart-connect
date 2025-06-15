
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ClientFilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  onAddClient: () => void;
  activeFilter: 'latest' | 'sales';
  setActiveFilter: (value: 'latest' | 'sales') => void;
}

const ClientFilterBar: React.FC<ClientFilterBarProps> = ({
  search,
  onSearchChange,
  onAddClient,
  activeFilter,
  setActiveFilter,
}) => (
  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-4">
    <Input
      placeholder="Search clients"
      className="w-full md:w-64"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      data-testid="search-input"
    />
    <Button
      className="gap-2"
      onClick={onAddClient}
      data-testid="add-client-button"
    >
      <Plus className="w-4 h-4" />
      Add Client
    </Button>
    <Button
      variant={activeFilter === "latest" ? "default" : "outline"}
      className={activeFilter === "latest" ? "bg-[#151c26] text-white" : ""}
      onClick={() => setActiveFilter("latest")}
      data-testid="latest-filter-button"
    >
      Latest Orders
    </Button>
    <Button
      variant={activeFilter === "sales" ? "default" : "outline"}
      className={activeFilter === "sales" ? "bg-[#151c26] text-white" : ""}
      onClick={() => setActiveFilter("sales")}
      data-testid="sales-filter-button"
    >
      Most Sales
    </Button>
  </div>
);

export default ClientFilterBar;

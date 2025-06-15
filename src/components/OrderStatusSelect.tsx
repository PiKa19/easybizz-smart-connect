
import React from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const statusOptions = [
  { value: "Preparing", label: "Preparing" },
  { value: "Shipped", label: "Shipped" },
  { value: "Delivered", label: "Delivered" },
  { value: "Returned", label: "Returned" },
];

export interface OrderStatusSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const OrderStatusSelect: React.FC<OrderStatusSelectProps> = ({ value, onChange, disabled }) => {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-[140px] py-1 px-3 h-8 rounded-full text-xs font-semibold border">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default OrderStatusSelect;


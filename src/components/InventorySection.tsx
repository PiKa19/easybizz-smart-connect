
import React from 'react';

interface InventorySectionProps {
  onBack: () => void;
}

const InventorySection: React.FC<InventorySectionProps> = ({ onBack }) => {
  return (
    <div>
      <h2>Inventory Section</h2>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default InventorySection;

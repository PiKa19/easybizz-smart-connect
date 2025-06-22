
import React from 'react';

interface BoutiqueSectionProps {
  onBack: () => void;
}

const BoutiqueSection: React.FC<BoutiqueSectionProps> = ({ onBack }) => {
  return (
    <div>
      <h2>Boutique Section</h2>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default BoutiqueSection;


import React from 'react';

interface ProductsSectionProps {
  onBack: () => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ onBack }) => {
  return (
    <div>
      <h2>Products Section</h2>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default ProductsSection;

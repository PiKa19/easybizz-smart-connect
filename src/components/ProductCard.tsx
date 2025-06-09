
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const ProductCard = ({ product, onSelect }: ProductCardProps) => {
  return (
    <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <CardContent className="p-4 text-center">
        <div className="w-full h-32 mb-3 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>
        
        <h3 className="font-semibold text-gray-800 text-sm mb-1">{product.name}</h3>
        <p className="text-xs text-gray-600 mb-3">{product.description}</p>
        
        <Button
          onClick={() => onSelect(product)}
          className="w-full bg-[#E1275C] hover:bg-[#C91F4F] text-white rounded-lg py-2 text-xs font-medium"
        >
          Buy now
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

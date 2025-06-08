
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart, Star } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  volume?: string;
  packaging?: string;
  storage?: string;
  usage?: string;
}

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail = ({ product, onBack }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(150);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to products
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-square bg-gradient-to-br from-orange-400 via-red-500 to-red-700 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-6xl font-bold opacity-80">
                    Coca-Cola®
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-white hover:bg-white/20"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm text-gray-600 ml-2">26 reviews</span>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Coca Cola 2L</h1>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">About :</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Classic Coca-Cola in a large 2-liter PET bottle. Ideal for retail, restaurants, events, and bulk resale.
              Perfect for family gatherings and busy settings.
            </p>
            
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Volume:</span> 2 Liters</div>
              <div><span className="font-medium">Packaging:</span> PET bottle with resealable cap</div>
              <div><span className="font-medium">Shelf-stable and easy to store</span></div>
              <div><span className="font-medium">Ideal for supermarkets, convenience stores, and HoReCa</span></div>
            </div>
          </div>

          {/* Region and Quantity */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>Select...</option>
                <option>Algiers</option>
                <option>Oran</option>
                <option>Constantine</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <p className="text-xs text-gray-500 mb-2">Specify the quantity you want</p>
              
              <div className="relative">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full border-2 border-[#0794FE] rounded-lg px-4 py-3 pr-16 text-lg font-semibold"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg font-semibold text-[#0794FE]">
                  DZD
                </span>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-[#0794FE] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button className="w-full bg-[#E1275C] hover:bg-[#C91F4F] text-white py-3 rounded-lg font-medium">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

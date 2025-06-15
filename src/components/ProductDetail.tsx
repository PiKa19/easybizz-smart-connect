import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Star, ShoppingCart, MessageSquare } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Seller {
  id: number;
  name: string;
  rating: string;
  reviews: number;
  price: string;
  isDefault?: boolean;
  quantityAvailable?: number;
  deliveryAvailable?: boolean;
  paymentMethods?: string[];
}

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
  sellers?: Seller[];
}

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number, seller: Seller) => void;
  onBuyMoreFromSupplier?: (sellerId: number) => void;
  onContactSeller?: (seller: Seller) => void; // Ensure this expects a Seller object
}

const ProductDetail = ({
  product,
  onBack,
  onAddToCart,
  onBuyMoreFromSupplier,
  onContactSeller
}: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(150);
  const [selectedSeller, setSelectedSeller] = useState(
    product.sellers?.find(seller => seller.isDefault) || product.sellers?.[0]
  );

  const handleSellerSelect = (sellerId: string) => {
    const seller = product.sellers?.find(s => s.id === parseInt(sellerId));
    if (seller) {
      setSelectedSeller(seller);
    }
  };

  const handleAddToCart = () => {
    if (selectedSeller) {
      onAddToCart(product, quantity, selectedSeller);
    }
  };

  const handleBuyMoreFromSupplier = (sellerId: number) => {
    if (onBuyMoreFromSupplier) {
      onBuyMoreFromSupplier(sellerId);
    }
  };

  // Modified: onContactSeller triggers the parent callback with the seller object
  const handleContactSeller = (seller: Seller) => {
    if (onContactSeller) {
      onContactSeller(seller); // <-- pass SELLER OBJECT (fix)
    } else if (onBuyMoreFromSupplier) {
      onBuyMoreFromSupplier(seller.id);
    }
  };

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
        {/* Product Image & (MAIN PRICE) */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-square bg-gradient-to-br from-orange-50 to-red-50 relative flex flex-col items-center justify-center">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-gray-600 hover:bg-white/20"
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
            <span className="text-sm text-gray-600 ml-2">50 reviews</span>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-2 bg-blue-100 text-[#0794FE]">{product.category}</Badge>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-gray-600 text-lg">{product.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">About :</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Classic product in high quality packaging. Ideal for retail, restaurants, events, and bulk resale.
              Perfect for family gatherings and busy settings.
            </p>
            
            {product.volume && (
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Volume:</span> {product.volume}</div>
                {product.packaging && <div><span className="font-medium">Packaging:</span> {product.packaging}</div>}
                {product.storage && <div><span className="font-medium">Storage:</span> {product.storage}</div>}
                {product.usage && <div><span className="font-medium">Usage:</span> {product.usage}</div>}
              </div>
            )}
          </div>

          {/* Region and Quantity */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
              <Select defaultValue="algiers">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="algiers">Algiers</SelectItem>
                  <SelectItem value="oran">Oran</SelectItem>
                  <SelectItem value="constantine">Constantine</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <p className="text-xs text-gray-500 mb-2">Specify the quantity you want</p>
              
              <div className="relative">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full border-2 border-[#0794FE] rounded-lg px-4 py-3 text-lg font-semibold"
                />
                {/* Removed DZD label here */}
              </div>
            </div>

            {/* Current Seller Display + Contact Seller Button */}
            {selectedSeller && (
              <div className="bg-blue-50 rounded-lg p-4 flex flex-col gap-3 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">You are buying from</span>
                </div>
                <div className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="font-medium text-gray-800 flex items-center gap-3">
                        {selectedSeller.name}
                        <span className="text-3xl font-bold text-red-600 ml-6">
                          {selectedSeller.price}
                          <span className="text-lg text-gray-700 font-semibold ml-1">DZD</span>
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        ❤️ {selectedSeller.rating} 🛒 {selectedSeller.reviews}
                      </div>
                      {/* --- Updated: Listing info in a row --- */}
                      {(typeof selectedSeller.quantityAvailable !== "undefined" || typeof selectedSeller.deliveryAvailable !== "undefined" || (selectedSeller.paymentMethods && selectedSeller.paymentMethods.length > 0)) && (
                        <div className="flex flex-row flex-wrap gap-8 mt-2 text-sm">
                          {typeof selectedSeller.quantityAvailable !== "undefined" && (
                            <div>
                              <span className="font-medium">Quantity available:</span>{" "}
                              {selectedSeller.quantityAvailable}
                            </div>
                          )}
                          {typeof selectedSeller.deliveryAvailable !== "undefined" && (
                            <div>
                              <span className="font-medium">Delivery:</span>{" "}
                              {selectedSeller.deliveryAvailable ? (
                                <span className="text-green-600">Available</span>
                              ) : (
                                <span className="text-red-600">Not available</span>
                              )}
                            </div>
                          )}
                          {selectedSeller.paymentMethods && selectedSeller.paymentMethods.length > 0 && (
                            <div>
                              <span className="font-medium">Payment Methods:</span>{" "}
                              {selectedSeller.paymentMethods.join(", ")}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Contact Seller Button */}
                <Button
                  className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center gap-2 text-base rounded-xl shadow transition-all"
                  onClick={() => handleContactSeller(selectedSeller)}
                  type="button"
                >
                  <MessageSquare className="w-5 h-5" /> Contact seller
                </Button>
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-[#0794FE] hover:bg-[#0670CC] text-white py-3 rounded-lg font-medium flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Other Sellers Section */}
      {product.sellers && product.sellers.length > 1 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              Offers from {product.sellers.length - 1} other sellers
            </h3>
            <p className="text-sm text-gray-600">Instant delivery and verified sellers</p>
          </div>

          <div className="space-y-3">
            {product.sellers.filter(seller => !seller.isDefault).map((seller) => (
              <Card key={seller.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelectedSeller(seller)}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                      <div>
                        <div className="font-medium text-gray-800">{seller.name}</div>
                        <div className="text-sm text-gray-600">excellent seller</div>
                        <div className="text-sm text-blue-600">
                          ❤️ {seller.rating} 🛒 {seller.reviews}
                        </div>
                        {/* Show more listing info here */}
                        <div className="text-xs text-gray-500 mt-2">
                          {typeof seller.quantityAvailable !== "undefined" && (
                            <div>
                              <span className="font-medium">Qty:</span> {seller.quantityAvailable}
                            </div>
                          )}
                          {typeof seller.deliveryAvailable !== "undefined" && (
                            <div>
                              <span className="font-medium">Delivery:</span>{" "}
                              {seller.deliveryAvailable ? (
                                <span className="text-green-600">Yes</span>
                              ) : (
                                <span className="text-red-600">No</span>
                              )}
                            </div>
                          )}
                          {seller.paymentMethods && seller.paymentMethods.length > 0 && (
                            <div>
                              <span className="font-medium">Pay:</span> {seller.paymentMethods.join(", ")}
                            </div>
                          )}
                        </div>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="p-0 h-auto text-blue-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuyMoreFromSupplier(seller.id);
                          }}
                        >
                          Buy more from this supplier
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-800">DZD {seller.price}</div>
                      <Button size="sm" className="bg-[#0794FE] hover:bg-[#0670CC] text-white">
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

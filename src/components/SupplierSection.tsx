import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Plus, Search, Star, MapPin, Phone, Mail, Globe, MessageSquare, UserPlus, UserMinus } from "lucide-react";
import { LanguageContext } from "@/contexts/LanguageContext";
import MessagingSection from "./MessagingSection";

interface Supplier {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  phone: string;
  email: string;
  website?: string;
  description: string;
  yearsExperience: number;
  minimumOrder: string;
  deliveryTime: string;
  paymentTerms: string;
  isContact: boolean;
  products: Product[];
}

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  inStock: boolean;
}

interface SupplierSectionProps {
  selectedSupplierId?: string;
  onBack?: () => void;
}

const SupplierSection = ({ selectedSupplierId, onBack }: SupplierSectionProps) => {
  const { t } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState<'my-suppliers' | 'find-suppliers' | 'messages'>('my-suppliers');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  // Mock data for suppliers
  const allSuppliers: Supplier[] = [
    {
      id: '1',
      name: 'Fresh Foods Algeria',
      category: 'beverages',
      location: 'Algiers, Algeria',
      rating: 4.8,
      phone: '+213555123456',
      email: 'contact@freshfoods.dz',
      website: 'www.freshfoods.dz',
      description: 'Leading supplier of fresh beverages and juices in Algeria',
      yearsExperience: 15,
      minimumOrder: '500 DZD',
      deliveryTime: '24-48 hours',
      paymentTerms: '30 days',
      isContact: true,
      products: [
        { id: '1', name: 'Orange Juice', price: 150, unit: 'bottle', image: '/placeholder.svg', inStock: true },
        { id: '2', name: 'Apple Juice', price: 180, unit: 'bottle', image: '/placeholder.svg', inStock: true },
        { id: '3', name: 'Water Bottles', price: 25, unit: 'bottle', image: '/placeholder.svg', inStock: true },
      ]
    },
    {
      id: '2',
      name: 'Snack Masters',
      category: 'snacks',
      location: 'Oran, Algeria',
      rating: 4.5,
      phone: '+213556789012',
      email: 'info@snackmasters.dz',
      description: 'Premium snacks and confectionery supplier',
      yearsExperience: 8,
      minimumOrder: '1000 DZD',
      deliveryTime: '48-72 hours',
      paymentTerms: '15 days',
      isContact: false,
      products: [
        { id: '4', name: 'Potato Chips', price: 120, unit: 'pack', image: '/placeholder.svg', inStock: true },
        { id: '5', name: 'Chocolate Bars', price: 200, unit: 'piece', image: '/placeholder.svg', inStock: false },
      ]
    },
    {
      id: '3',
      name: 'Dairy Excellence',
      category: 'dairy',
      location: 'Constantine, Algeria',
      rating: 4.9,
      phone: '+213557345678',
      email: 'sales@dairyexcellence.dz',
      description: 'Fresh dairy products from local farms',
      yearsExperience: 12,
      minimumOrder: '750 DZD',
      deliveryTime: '12-24 hours',
      paymentTerms: '7 days',
      isContact: true,
      products: [
        { id: '6', name: 'Fresh Milk', price: 80, unit: 'liter', image: '/placeholder.svg', inStock: true },
        { id: '7', name: 'Cheese', price: 350, unit: 'kg', image: '/placeholder.svg', inStock: true },
      ]
    },
    {
      id: '4',
      name: 'Clean Pro Supplies',
      category: 'cleaning',
      location: 'Blida, Algeria',
      rating: 4.3,
      phone: '+213558901234',
      email: 'orders@cleanpro.dz',
      description: 'Professional cleaning supplies and equipment',
      yearsExperience: 6,
      minimumOrder: '2000 DZD',
      deliveryTime: '3-5 days',
      paymentTerms: '30 days',
      isContact: false,
      products: [
        { id: '8', name: 'Dish Soap', price: 250, unit: 'bottle', image: '/placeholder.svg', inStock: true },
        { id: '9', name: 'Floor Cleaner', price: 300, unit: 'bottle', image: '/placeholder.svg', inStock: true },
      ]
    }
  ];

  const mySuppliers = allSuppliers.filter(supplier => supplier.isContact);

  // Only calculate filteredSuppliers when relevant
  let filteredSuppliers: Supplier[] = [];
  if (activeTab === 'my-suppliers' || activeTab === 'find-suppliers') {
    filteredSuppliers = (activeTab === 'my-suppliers' ? mySuppliers : allSuppliers).filter(supplier => {
      const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            supplier.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || supplier.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  const toggleContact = (supplierId: string) => {
    console.log(`Toggling contact status for supplier ${supplierId}`);
  };

  const sendMessage = (supplier: Supplier) => {
    console.log(`Opening message window for ${supplier.name}`);
  };

  if (activeTab === 'messages') {
    return <MessagingSection />;
  }

  if (selectedSupplier) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setSelectedSupplier(null)}>
            ← {t('back')}
          </Button>
          <h2 className="text-2xl font-bold text-gray-800">{t('supplier_profile')}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Supplier Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{selectedSupplier.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant={selectedSupplier.isContact ? "destructive" : "default"}
                      onClick={() => toggleContact(selectedSupplier.id)}
                    >
                      {selectedSupplier.isContact ? <UserMinus className="w-4 h-4 mr-1" /> : <UserPlus className="w-4 h-4 mr-1" />}
                      {selectedSupplier.isContact ? t('remove_from_contacts') : t('add_to_contacts')}
                    </Button>
                    <Button size="sm" onClick={() => sendMessage(selectedSupplier)}>
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {t('message_supplier')}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{selectedSupplier.rating}/5</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{selectedSupplier.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{selectedSupplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{selectedSupplier.email}</span>
                  </div>
                  {selectedSupplier.website && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <span>{selectedSupplier.website}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">{t('supplier_info')}</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>{t('description')}:</strong> {selectedSupplier.description}</div>
                    <div><strong>{t('years_experience')}:</strong> {selectedSupplier.yearsExperience} {t('years_experience').toLowerCase()}</div>
                    <div><strong>{t('minimum_order')}:</strong> {selectedSupplier.minimumOrder}</div>
                    <div><strong>{t('delivery_time')}:</strong> {selectedSupplier.deliveryTime}</div>
                    <div><strong>{t('payment_terms')}:</strong> {selectedSupplier.paymentTerms}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Supplier Products */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('supplier_products')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {selectedSupplier.products.map((product) => (
                    <Card key={product.id} className="border">
                      <CardContent className="p-4">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-32 object-cover rounded mb-3"
                        />
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.price} DZD/{product.unit}</p>
                        <Badge variant={product.inStock ? "default" : "destructive"} className="mt-2">
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-[#0794FE]" />
          <h2 className="text-2xl font-bold text-gray-800">{t('supplier_management')}</h2>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {t('add_supplier')}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab('my-suppliers')}
          className={`pb-2 px-1 font-medium ${
            activeTab === 'my-suppliers' 
              ? 'border-b-2 border-[#0794FE] text-[#0794FE]' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {t('my_suppliers')} ({mySuppliers.length})
        </button>
        <button
          onClick={() => setActiveTab('find-suppliers')}
          className={`pb-2 px-1 font-medium ${
            activeTab === 'find-suppliers' 
              ? 'border-b-2 border-[#0794FE] text-[#0794FE]' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {t('find_suppliers')}
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`pb-2 px-1 font-medium ${
            activeTab === 'messages' 
              ? 'border-b-2 border-[#0794FE] text-[#0794FE]' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {t('messages')}
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={t('search_supplier')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={t('filter_by_category')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('all_products')}</SelectItem>
            <SelectItem value="beverages">{t('beverages')}</SelectItem>
            <SelectItem value="snacks">{t('snacks')}</SelectItem>
            <SelectItem value="dairy">{t('dairy')}</SelectItem>
            <SelectItem value="cleaning">{t('cleaning')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Only show Suppliers Grid and no-results on my-suppliers or find-suppliers tab */}
      {(activeTab === 'my-suppliers' || activeTab === 'find-suppliers') && (() => {
        // Only calculate filteredSuppliers when relevant
        const suppliersSource = activeTab === 'my-suppliers' ? mySuppliers : allSuppliers;
        const filteredSuppliers = suppliersSource.filter(supplier => {
          const matchesSearch =
            supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.location.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = selectedCategory === 'all' || supplier.category === selectedCategory;
          return matchesSearch && matchesCategory;
        });

        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSuppliers.map((supplier) => (
                <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{supplier.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{t(supplier.category)}</Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{supplier.rating}</span>
                          </div>
                        </div>
                      </div>
                      {supplier.isContact && (
                        <Badge className="bg-green-100 text-green-800">{t('supplier_contact')}</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{supplier.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{supplier.phone}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">{supplier.description}</p>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setSelectedSupplier(supplier)}
                      >
                        {t('view_profile')}
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => sendMessage(supplier)}
                      >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        {t('message_supplier')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredSuppliers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {activeTab === 'my-suppliers' ? t('no_suppliers_yet') : t('no_suppliers_found')}
                </h3>
                <p className="text-gray-500">
                  {activeTab === 'my-suppliers'
                    ? t('add_suppliers_to_get_started')
                    : t('try_different_search_terms')
                  }
                </p>
              </div>
            )}
          </>
        );
      })()}
    </div>
  );
};

export default SupplierSection;

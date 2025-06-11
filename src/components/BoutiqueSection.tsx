
import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, Search, Plus, Edit, Trash2 } from "lucide-react";
import { LanguageContext } from '@/contexts/LanguageContext';

interface Boutique {
  id: string;
  name: string;
  address: string;
  status: 'Active' | 'Inactive';
}

interface BoutiqueSectionProps {
  onBack: () => void;
}

const BoutiqueSection = ({ onBack }: BoutiqueSectionProps) => {
  const { t } = useContext(LanguageContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBoutique, setSelectedBoutique] = useState('');
  
  const [boutiques] = useState<Boutique[]>([
    {
      id: "1",
      name: "supérette elbaraka",
      address: "123 Main St",
      status: "Active"
    },
    {
      id: "2", 
      name: "Boutique Centre",
      address: "456 Center Ave",
      status: "Inactive"
    },
    {
      id: "3",
      name: "Mini Market Nord", 
      address: "789 North Rd",
      status: "Inactive"
    }
  ]);

  const filteredBoutiques = boutiques.filter(boutique =>
    boutique.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          {t('previous_page')}
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('boutique_management')}</h1>
          <p className="text-gray-600">{t('dashboard_subtitle')}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Select value={selectedBoutique} onValueChange={setSelectedBoutique}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder={t('select_boutique')} />
          </SelectTrigger>
          <SelectContent>
            {boutiques.map((boutique) => (
              <SelectItem key={boutique.id} value={boutique.name}>
                {boutique.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="bg-[#0794FE] hover:bg-[#0670CC] text-white flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {t('add_boutique')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBoutiques.map((boutique) => (
          <Card key={boutique.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{boutique.name}</h3>
                  <Badge variant={boutique.status === 'Active' ? 'default' : 'secondary'}>
                    {boutique.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{boutique.address}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    {t('edit')}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BoutiqueSection;

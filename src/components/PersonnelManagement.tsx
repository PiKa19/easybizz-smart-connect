
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronLeft, Plus, Edit } from "lucide-react";
import SellingOperations from "./SellingOperations";

interface Personnel {
  id: number;
  name: string;
  cashierNumber: string;
  pinCode: string;
  image: string;
}

interface Cashier {
  id: string;
  name: string;
  pinCode: string;
  isActive: boolean;
  image: string;
}

interface PersonnelManagementProps {
  cashier: Cashier;
  onBack: () => void;
}

const PersonnelManagement = ({ cashier, onBack }: PersonnelManagementProps) => {
  const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel | null>(null);
  const [isAddPersonnelOpen, setIsAddPersonnelOpen] = useState(false);
  const [isEditPersonnelOpen, setIsEditPersonnelOpen] = useState(false);
  const [editingPersonnel, setEditingPersonnel] = useState<Personnel | null>(null);
  const [newPersonnel, setNewPersonnel] = useState({ name: '', pinCode: '' });
  const [showAllUsers, setShowAllUsers] = useState(false);

  const [personnel, setPersonnel] = useState<Personnel[]>([
    {
      id: 1,
      name: "Mohamed",
      cashierNumber: "caisse 1",
      pinCode: "1234",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Anis",
      cashierNumber: "caisse 2", 
      pinCode: "5678",
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=150&h=150&fit=crop&crop=face"
    }
  ]);

  const handleAddPersonnel = () => {
    if (newPersonnel.name && newPersonnel.pinCode.length === 4) {
      const newId = Math.max(...personnel.map(p => p.id)) + 1;
      setPersonnel(prev => [...prev, {
        id: newId,
        name: newPersonnel.name,
        cashierNumber: cashier.name,
        pinCode: newPersonnel.pinCode,
        image: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=150&h=150&fit=crop&crop=face`
      }]);
      setNewPersonnel({ name: '', pinCode: '' });
      setIsAddPersonnelOpen(false);
    }
  };

  const handleEditPersonnel = (person: Personnel) => {
    setEditingPersonnel(person);
    setIsEditPersonnelOpen(true);
  };

  const handleUpdatePersonnel = () => {
    if (editingPersonnel) {
      setPersonnel(prev => prev.map(p => 
        p.id === editingPersonnel.id ? editingPersonnel : p
      ));
      setEditingPersonnel(null);
      setIsEditPersonnelOpen(false);
    }
  };

  const handleManagePersonnel = (person: Personnel) => {
    setSelectedPersonnel(person);
  };

  if (selectedPersonnel) {
    return (
      <SellingOperations 
        personnel={selectedPersonnel}
        onBack={() => setSelectedPersonnel(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous Page
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">bonjour, {cashier.name}</h1>
          <p className="text-gray-600">Start managing your supermarket</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personnel.map((person) => (
          <Card key={person.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <img 
                  src={person.image} 
                  alt={person.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{person.name}</h3>
                  <p className="text-sm text-gray-600">{person.cashierNumber}</p>
                  <div className="mt-2">
                    <Badge variant="secondary">Hello World</Badge>
                  </div>
                </div>
                <div className="flex gap-2 w-full">
                  <Button 
                    onClick={() => handleManagePersonnel(person)}
                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
                  >
                    Manager this cashier personnel
                  </Button>
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditPersonnel(person)}
                  className="w-full"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Add Personnel Card */}
        <Card className="hover:shadow-lg transition-shadow border-dashed border-2 border-gray-300">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center text-center space-y-4 h-full min-h-[250px]">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Plus className="w-8 h-8 text-[#0794FE]" />
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Add a cashier personnel</h3>
              </div>
              <Dialog open={isAddPersonnelOpen} onOpenChange={setIsAddPersonnelOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Add personnel
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Personnel</DialogTitle>
                    <DialogDescription>
                      Add a new personnel member to {cashier.name}.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="personnel-name">Personnel Name</Label>
                      <Input
                        id="personnel-name"
                        value={newPersonnel.name}
                        onChange={(e) => setNewPersonnel(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter personnel name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="personnel-pin">PIN Code (4 digits)</Label>
                      <Input
                        id="personnel-pin"
                        type="password"
                        maxLength={4}
                        value={newPersonnel.pinCode}
                        onChange={(e) => setNewPersonnel(prev => ({ ...prev, pinCode: e.target.value.replace(/\D/g, '') }))}
                        placeholder="Enter 4-digit PIN"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddPersonnel} className="bg-[#0794FE] hover:bg-[#0670CC]">
                        Add Personnel
                      </Button>
                      <Button variant="outline" onClick={() => setIsAddPersonnelOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Personnel Dialog */}
      <Dialog open={isEditPersonnelOpen} onOpenChange={setIsEditPersonnelOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Personnel</DialogTitle>
            <DialogDescription>
              Update personnel information.
            </DialogDescription>
          </DialogHeader>
          {editingPersonnel && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-personnel-name">Personnel Name</Label>
                <Input
                  id="edit-personnel-name"
                  value={editingPersonnel.name}
                  onChange={(e) => setEditingPersonnel(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                />
              </div>
              <div>
                <Label htmlFor="edit-personnel-pin">PIN Code (4 digits)</Label>
                <Input
                  id="edit-personnel-pin"
                  type="password"
                  maxLength={4}
                  value={editingPersonnel.pinCode}
                  onChange={(e) => setEditingPersonnel(prev => prev ? ({ ...prev, pinCode: e.target.value.replace(/\D/g, '') }) : null)}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleUpdatePersonnel} className="bg-[#0794FE] hover:bg-[#0670CC]">
                  Update Personnel
                </Button>
                <Button variant="outline" onClick={() => setIsEditPersonnelOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Show All Users Button */}
      <div className="flex justify-center mt-8">
        <Button 
          onClick={() => setShowAllUsers(!showAllUsers)}
          className="bg-[#0794FE] hover:bg-[#0670CC] text-white px-8 py-3 text-lg"
        >
          show all users of all cashiers
        </Button>
      </div>
    </div>
  );
};

export default PersonnelManagement;

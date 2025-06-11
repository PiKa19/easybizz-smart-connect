
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus, Edit, ChevronLeft } from "lucide-react";
import PersonnelManagement from "./PersonnelManagement";

interface Cashier {
  id: string;
  name: string;
  pinCode: string;
  isActive: boolean;
  image: string;
}

interface CashierSectionProps {
  onBack: () => void;
}

const CashierSection = ({ onBack }: CashierSectionProps) => {
  const [selectedCashier, setSelectedCashier] = useState<Cashier | null>(null);
  const [isAddCashierOpen, setIsAddCashierOpen] = useState(false);
  const [isEditCashierOpen, setIsEditCashierOpen] = useState(false);
  const [editingCashier, setEditingCashier] = useState<Cashier | null>(null);
  const [newCashier, setNewCashier] = useState({ name: '', pinCode: '' });

  const [cashiers, setCashiers] = useState<Cashier[]>([
    {
      id: "5678-5642",
      name: "Caisse 1",
      pinCode: "1234",
      isActive: true,
      image: "/lovable-uploads/1afc35c1-4fca-4518-b2e4-24344edc8587.png"
    },
    {
      id: "5678-5642",
      name: "Caisse 2", 
      pinCode: "5678",
      isActive: false,
      image: "/lovable-uploads/1afc35c1-4fca-4518-b2e4-24344edc8587.png"
    }
  ]);

  const handleAddCashier = () => {
    if (newCashier.name && newCashier.pinCode.length === 4) {
      const newId = `${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`;
      setCashiers(prev => [...prev, {
        id: newId,
        name: newCashier.name,
        pinCode: newCashier.pinCode,
        isActive: false,
        image: "/lovable-uploads/1afc35c1-4fca-4518-b2e4-24344edc8587.png"
      }]);
      setNewCashier({ name: '', pinCode: '' });
      setIsAddCashierOpen(false);
    }
  };

  const handleEditCashier = (cashier: Cashier) => {
    setEditingCashier(cashier);
    setIsEditCashierOpen(true);
  };

  const handleUpdateCashier = () => {
    if (editingCashier) {
      setCashiers(prev => prev.map(c => 
        c.id === editingCashier.id ? editingCashier : c
      ));
      setEditingCashier(null);
      setIsEditCashierOpen(false);
    }
  };

  const handleManageCashier = (cashier: Cashier) => {
    setSelectedCashier(cashier);
  };

  if (selectedCashier) {
    return (
      <PersonnelManagement 
        cashier={selectedCashier}
        onBack={() => setSelectedCashier(null)}
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
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cashier Management</h1>
          <p className="text-gray-600">Manage your cashiers and their operations</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Cashiers</h2>
        <Dialog open={isAddCashierOpen} onOpenChange={setIsAddCashierOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0794FE] hover:bg-[#0670CC] text-white flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add a cashier
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Cashier</DialogTitle>
              <DialogDescription>
                Create a new cashier with a unique ID and PIN code.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cashier-name">Cashier Name</Label>
                <Input
                  id="cashier-name"
                  value={newCashier.name}
                  onChange={(e) => setNewCashier(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter cashier name"
                />
              </div>
              <div>
                <Label htmlFor="cashier-pin">PIN Code (4 digits)</Label>
                <Input
                  id="cashier-pin"
                  type="password"
                  maxLength={4}
                  value={newCashier.pinCode}
                  onChange={(e) => setNewCashier(prev => ({ ...prev, pinCode: e.target.value.replace(/\D/g, '') }))}
                  placeholder="Enter 4-digit PIN"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddCashier} className="bg-[#0794FE] hover:bg-[#0670CC]">
                  Add Cashier
                </Button>
                <Button variant="outline" onClick={() => setIsAddCashierOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Cashier Dialog */}
      <Dialog open={isEditCashierOpen} onOpenChange={setIsEditCashierOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Cashier</DialogTitle>
            <DialogDescription>
              Update cashier information.
            </DialogDescription>
          </DialogHeader>
          {editingCashier && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-cashier-name">Cashier Name</Label>
                <Input
                  id="edit-cashier-name"
                  value={editingCashier.name}
                  onChange={(e) => setEditingCashier(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                />
              </div>
              <div>
                <Label htmlFor="edit-cashier-pin">PIN Code (4 digits)</Label>
                <Input
                  id="edit-cashier-pin"
                  type="password"
                  maxLength={4}
                  value={editingCashier.pinCode}
                  onChange={(e) => setEditingCashier(prev => prev ? ({ ...prev, pinCode: e.target.value.replace(/\D/g, '') }) : null)}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleUpdateCashier} className="bg-[#0794FE] hover:bg-[#0670CC]">
                  Update Cashier
                </Button>
                <Button variant="outline" onClick={() => setIsEditCashierOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cashiers.map((cashier) => (
          <Card key={cashier.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <img 
                  src={cashier.image} 
                  alt={cashier.name}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h3 className="font-semibold text-lg">{cashier.name}</h3>
                  <p className="text-sm text-gray-600">cashier ID {cashier.id}</p>
                  <div className="mt-2">
                    <Badge variant={cashier.isActive ? "default" : "secondary"}>
                      {cashier.isActive ? "Hello World" : "Hello World"}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2 w-full">
                  <Button 
                    onClick={() => handleManageCashier(cashier)}
                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
                  >
                    Manager this cashier
                  </Button>
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditCashier(cashier)}
                  className="w-full"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Add Cashier Card */}
        <Card className="hover:shadow-lg transition-shadow border-dashed border-2 border-gray-300">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center text-center space-y-4 h-full min-h-[200px]">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Plus className="w-8 h-8 text-[#0794FE]" />
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Add a cashier</h3>
              </div>
              <Button 
                onClick={() => setIsAddCashierOpen(true)}
                variant="outline"
                className="w-full"
              >
                Add cashier
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CashierSection;

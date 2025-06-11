
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Edit, Save } from "lucide-react";

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfile = ({ isOpen, onClose }: UserProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Baraka",
    email: "baraka@gmail.com",
    companyName: "supérette elbaraka",
    phone: "+213701234567",
    address: "123 Main Street, Algiers",
    idCardNumber: "1234567890123456",
    registreCommerce: "RC-ALG-2023-001234",
    lastLogin: "Wednesday 12th July, 2023 at 17:32:35",
    firstLogin: "July 15th, 2023"
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log("Saving user info:", userInfo);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Section */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Profile</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? <Save className="w-4 h-4 mr-1" /> : <Edit className="w-4 h-4 mr-1" />}
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-[#0794FE] rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                  B
                </div>
                <div className="flex-1">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={userInfo.address}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, address: e.target.value }))}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="idCard">ID Card Number</Label>
                    <Input
                      id="idCard"
                      value={userInfo.idCardNumber}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, idCardNumber: e.target.value }))}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="registre">Registre de Commerce</Label>
                    <Input
                      id="registre"
                      value={userInfo.registreCommerce}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, registreCommerce: e.target.value }))}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Company Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={userInfo.companyName}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, companyName: e.target.value }))}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>
              <div>
                <Label htmlFor="companyEmail">Email</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  value={userInfo.email}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="companyPhone">Phone *</Label>
                <Input
                  id="companyPhone"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>
              <div>
                <Label htmlFor="companyAddress">Address</Label>
                <Input
                  id="companyAddress"
                  value={userInfo.address}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, address: e.target.value }))}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Authentication Details */}
        <div className="px-6 pb-6">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-600">User Name:</Label>
                  <p className="text-gray-800 font-medium">{userInfo.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Last Login:</Label>
                  <p className="text-gray-800">{userInfo.lastLogin}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Registered:</Label>
                  <p className="text-gray-800">{userInfo.firstLogin}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

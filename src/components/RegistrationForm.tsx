
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText } from "lucide-react";

interface RegistrationFormProps {
  onSuccess: () => void;
  onBackToLogin: () => void;
}

const RegistrationForm = ({ onSuccess, onBackToLogin }: RegistrationFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    boutiqueName: "",
    email: "",
    password: "",
    numberOfBoutiques: "",
  });
  const [files, setFiles] = useState({
    idCard: null as File | null,
    commerceRegister: null as File | null,
  });

  const handleFileChange = (type: 'idCard' | 'commerceRegister', file: File | null) => {
    setFiles(prev => ({ ...prev, [type]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically upload files and create the account
    console.log('Registration data:', formData, files);
    onSuccess();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Create Your Boutique Account</h2>
        <p className="text-sm text-gray-600">Fill in the information below to register your boutique</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-gray-700">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
            required
            className="rounded-lg border-gray-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="boutiqueName" className="text-gray-700">Boutique Name</Label>
          <Input
            id="boutiqueName"
            type="text"
            value={formData.boutiqueName}
            onChange={(e) => setFormData(prev => ({ ...prev, boutiqueName: e.target.value }))}
            required
            className="rounded-lg border-gray-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
            className="rounded-lg border-gray-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-700">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            required
            className="rounded-lg border-gray-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="numberOfBoutiques" className="text-gray-700">Number of Boutiques</Label>
          <Select 
            value={formData.numberOfBoutiques} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, numberOfBoutiques: value }))}
          >
            <SelectTrigger className="rounded-lg border-gray-300">
              <SelectValue placeholder="Select number of boutiques" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single Boutique</SelectItem>
              <SelectItem value="multiple">Multiple Boutiques</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ID Card Upload */}
        <div className="space-y-2">
          <Label className="text-gray-700">Copy of Identification Card (PDF)</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange('idCard', e.target.files?.[0] || null)}
              className="hidden"
              id="idCard"
            />
            <label htmlFor="idCard" className="cursor-pointer flex flex-col items-center space-y-2">
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-600">
                {files.idCard ? files.idCard.name : "Click to upload ID card (PDF)"}
              </span>
            </label>
          </div>
        </div>

        {/* Commerce Register Upload */}
        <div className="space-y-2">
          <Label className="text-gray-700">Registre de Commerce (PDF)</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange('commerceRegister', e.target.files?.[0] || null)}
              className="hidden"
              id="commerceRegister"
            />
            <label htmlFor="commerceRegister" className="cursor-pointer flex flex-col items-center space-y-2">
              <FileText className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-600">
                {files.commerceRegister ? files.commerceRegister.name : "Click to upload Commerce Register (PDF)"}
              </span>
            </label>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-[#E1275C] hover:bg-[#C91F4F] text-white rounded-lg py-3 font-medium mt-6"
          disabled={!files.idCard || !files.commerceRegister}
        >
          Continue to Subscription
        </Button>
      </form>

      <div className="text-center">
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-sm text-[#0794FE] hover:underline"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default RegistrationForm;

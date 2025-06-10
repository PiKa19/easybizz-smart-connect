import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Eye, EyeOff } from "lucide-react";

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
    confirmPassword: "",
    numberOfBoutiques: "",
  });
  const [files, setFiles] = useState({
    idCard: null as File | null,
    commerceRegister: null as File | null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleFileChange = (type: 'idCard' | 'commerceRegister', file: File | null) => {
    setFiles(prev => ({ ...prev, [type]: file }));
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.boutiqueName.trim()) {
      newErrors.boutiqueName = "Boutique name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.numberOfBoutiques) {
      newErrors.numberOfBoutiques = "Please select number of boutiques";
    }

    if (!files.idCard) {
      newErrors.idCard = "ID card is required";
    }

    if (!files.commerceRegister) {
      newErrors.commerceRegister = "Commerce register is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Registration data:', formData, files);
      onSuccess();
    }
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
            className={`rounded-lg border-gray-300 ${errors.fullName ? 'border-red-500' : ''}`}
          />
          {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="boutiqueName" className="text-gray-700">Boutique Name</Label>
          <Input
            id="boutiqueName"
            type="text"
            value={formData.boutiqueName}
            onChange={(e) => setFormData(prev => ({ ...prev, boutiqueName: e.target.value }))}
            className={`rounded-lg border-gray-300 ${errors.boutiqueName ? 'border-red-500' : ''}`}
          />
          {errors.boutiqueName && <p className="text-red-500 text-xs">{errors.boutiqueName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className={`rounded-lg border-gray-300 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-700">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className={`rounded-lg border-gray-300 pr-10 ${errors.password ? 'border-red-500' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className={`rounded-lg border-gray-300 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="numberOfBoutiques" className="text-gray-700">Number of Boutiques</Label>
          <Select 
            value={formData.numberOfBoutiques} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, numberOfBoutiques: value }))}
          >
            <SelectTrigger className={`rounded-lg border-gray-300 ${errors.numberOfBoutiques ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="Select number of boutiques" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single Boutique</SelectItem>
              <SelectItem value="multiple">Multiple Boutiques</SelectItem>
            </SelectContent>
          </Select>
          {errors.numberOfBoutiques && <p className="text-red-500 text-xs">{errors.numberOfBoutiques}</p>}
        </div>

        {/* ID Card Upload */}
        <div className="space-y-2">
          <Label className="text-gray-700">Copy of Identification Card (PDF)</Label>
          <div className={`border-2 border-dashed rounded-lg p-4 ${errors.idCard ? 'border-red-500' : 'border-gray-300'}`}>
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
          {errors.idCard && <p className="text-red-500 text-xs">{errors.idCard}</p>}
        </div>

        {/* Commerce Register Upload */}
        <div className="space-y-2">
          <Label className="text-gray-700">Registre de Commerce (PDF)</Label>
          <div className={`border-2 border-dashed rounded-lg p-4 ${errors.commerceRegister ? 'border-red-500' : 'border-gray-300'}`}>
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
          {errors.commerceRegister && <p className="text-red-500 text-xs">{errors.commerceRegister}</p>}
        </div>

        <Button 
          type="submit" 
          className="w-full bg-[#E1275C] hover:bg-[#C91F4F] text-white rounded-lg py-3 font-medium mt-6"
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
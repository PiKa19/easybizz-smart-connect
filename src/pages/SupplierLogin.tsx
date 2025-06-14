
import { useState, useContext, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { LanguageContext } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Upload, FileText } from "lucide-react";

const SupplierLogin = () => {
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // State for supplier registration form
  const [registerForm, setRegisterForm] = useState({
    company: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
    commerceRegister: null as File | null,
  });

  const [registerErrors, setRegisterErrors] = useState<{ [key: string]: string }>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/supplier-dashboard');
    }, 1000);
  };

  const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setRegisterForm(prev => ({
      ...prev,
      [id === "reg-email" ? "email" : id === "confirm-password" ? "confirmPassword" : id === "reg-password" ? "password" : id]:
        type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setRegisterForm(prev => ({
      ...prev,
      commerceRegister: file,
    }));
  };

  const validateRegisterForm = () => {
    const errors: { [key: string]: string } = {};
    if (!registerForm.company.trim()) errors.company = "Company Name is required";
    if (!registerForm.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(registerForm.email)) errors.email = "Email is invalid";
    if (!registerForm.phone.trim()) errors.phone = "Phone Number is required";
    if (!registerForm.password) errors.password = "Password is required";
    else if (registerForm.password.length < 6) errors.password = "Password must be at least 6 characters";
    if (!registerForm.confirmPassword) errors.confirmPassword = "Please confirm your password";
    else if (registerForm.confirmPassword !== registerForm.password) errors.confirmPassword = "Passwords do not match";
    if (!registerForm.commerceRegister) errors.commerceRegister = "Registre de Commerce PDF is required";
    else if (registerForm.commerceRegister.type !== "application/pdf") errors.commerceRegister = "File must be a PDF";
    if (!registerForm.agree) errors.agree = "You must agree to the platform rules and guidelines";
    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegisterForm()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/supplier-dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/5142faa5-d964-4021-b411-2ea1ad268901.png" 
              alt="EasyBizz Logo"
              className="h-8 w-auto"
            />
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link to="/login">
              <Button variant="outline">
                Retailer Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Welcome Back Supplier</h1>
            <p className="text-gray-600">Access your supplier dashboard</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Login</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your supplier account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="supplier@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-[#E1275C] hover:bg-[#C91F4F]"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Registration</CardTitle>
                  <CardDescription>
                    Create your supplier account to start selling
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        type="text"
                        placeholder="Your Company Name"
                        value={registerForm.company}
                        onChange={handleRegisterInputChange}
                        required
                        className={registerErrors.company ? "border border-red-500" : ""}
                      />
                      {registerErrors.company && (
                        <p className="text-xs text-red-500">{registerErrors.company}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="supplier@company.com"
                        value={registerForm.email}
                        onChange={handleRegisterInputChange}
                        required
                        className={registerErrors.email ? "border border-red-500" : ""}
                      />
                      {registerErrors.email && (
                        <p className="text-xs text-red-500">{registerErrors.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+213 XXX XXX XXX"
                        value={registerForm.phone}
                        onChange={handleRegisterInputChange}
                        required
                        className={registerErrors.phone ? "border border-red-500" : ""}
                      />
                      {registerErrors.phone && (
                        <p className="text-xs text-red-500">{registerErrors.phone}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Password</Label>
                      <Input
                        id="reg-password"
                        type="password"
                        value={registerForm.password}
                        onChange={handleRegisterInputChange}
                        required
                        className={registerErrors.password ? "border border-red-500" : ""}
                      />
                      {registerErrors.password && (
                        <p className="text-xs text-red-500">{registerErrors.password}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={registerForm.confirmPassword}
                        onChange={handleRegisterInputChange}
                        required
                        className={registerErrors.confirmPassword ? "border border-red-500" : ""}
                      />
                      {registerErrors.confirmPassword && (
                        <p className="text-xs text-red-500">{registerErrors.confirmPassword}</p>
                      )}
                    </div>
                    
                    {/* Registre de Commerce PDF upload */}
                    <div className="space-y-2">
                      <Label>Registre de Commerce (PDF)</Label>
                      <div className={`border-2 border-dashed rounded-lg p-4 ${registerErrors.commerceRegister ? 'border-red-500' : 'border-gray-300'}`}>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
                          className="hidden"
                          id="commerceRegister"
                        />
                        <label htmlFor="commerceRegister" className="cursor-pointer flex flex-col items-center space-y-2">
                          <FileText className="w-8 h-8 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {registerForm.commerceRegister ? registerForm.commerceRegister.name : "Click to upload Registre de Commerce (PDF)"}
                          </span>
                        </label>
                      </div>
                      {registerErrors.commerceRegister && (
                        <p className="text-xs text-red-500">{registerErrors.commerceRegister}</p>
                      )}
                    </div>

                    {/* Confirmation Checkbox */}
                    <div className="flex items-start gap-2">
                      <input
                        id="agree"
                        type="checkbox"
                        checked={registerForm.agree}
                        onChange={handleRegisterInputChange}
                        className="mt-1"
                      />
                      <label htmlFor="agree" className="text-sm text-gray-700 cursor-pointer">
                        I confirm that I will use the platform while following its rules and guidelines.
                      </label>
                    </div>
                    {registerErrors.agree && (
                      <p className="text-xs text-red-500">{registerErrors.agree}</p>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-[#E1275C] hover:bg-[#C91F4F]"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SupplierLogin;


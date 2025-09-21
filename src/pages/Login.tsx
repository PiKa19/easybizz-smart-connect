import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { LanguageContext } from "@/contexts/LanguageContext";
import { apiService } from "@/lib/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { t, language } = useContext(LanguageContext);
  const navigate = useNavigate();

  // Apply RTL direction for Arabic
  const isRTL = language === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check for the specific allowed user
    if (email === "baraka@gmail.com" && password === "baraka123") {
      // Set authentication token for API requests
      apiService.setAuthToken('baraka_authenticated_token_2024');
      console.log('✅ Authentication token set for user:', email);
      navigate('/dashboard');
    } else {
      setError("Invalid email or password. Please use baraka@gmail.com with password baraka123");
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-blue-50 flex items-center justify-center p-6 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/5142faa5-d964-4021-b411-2ea1ad268901.png" 
            alt="EasyBizz Logo" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800 font-playfair">{t('welcome')}</h1>
          <p className="text-gray-600 mt-2">{t('login_subtitle')}</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">{t('email')}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-lg border-gray-300"
              placeholder={t('email_placeholder')}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">{t('password')}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-lg border-gray-300 pr-10"
                placeholder={t('password_placeholder')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 ${isRTL ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center`}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#E1275C] hover:bg-[#C91F4F] text-white rounded-lg py-3 font-medium"
          >
            {t('login')}
          </Button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-gray-600">
            {t('no_account')}{' '}
            <Link to="/register" className="text-[#0794FE] hover:underline font-medium">
              {t('register')}
            </Link>
          </p>
        </div>

        <div className="text-center mt-4">
          <Link to="/supplier-login" className="text-[#0794FE] hover:underline text-sm">
            {t('supplier_space')}
          </Link>
        </div>
        
        <div className="text-center mt-4">
          <button className="text-sm text-gray-600 hover:text-gray-800">
            {t('forgot_password')}
          </button>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
            {t('back_to_home')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
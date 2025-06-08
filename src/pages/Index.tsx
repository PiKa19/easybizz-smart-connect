
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, BarChart3, Mail, Phone, MapPin } from "lucide-react";
import AuthDialog from "@/components/AuthDialog";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  if (isAuthenticated) {
    return <Dashboard onLogout={() => setIsAuthenticated(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">EASY</span>
            <span className="text-2xl font-bold text-red-500">Bizz</span>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">features</a>
            <a href="#about" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">about</a>
            <a href="#contact" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">contact</a>
          </nav>
          <Button 
            onClick={() => setShowAuth(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-medium"
          >
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 leading-tight">
            Your Smart Business Management Starts Here
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            EasyBizz connects suppliers and entrepreneurs, automates inventory and order management, and helps you grow your business efficiently
          </p>
          <Button 
            onClick={() => setShowAuth(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-medium text-lg"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-900 text-xl">Smart Supplier Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  Connect with the right suppliers using advanced algorithms to find the perfect business partners for your needs
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-900 text-xl">Automated Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  Track and manage your stock in real time with smart automation and alerts
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-900 text-xl">Insightful Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  Make informed decisions with powerful business analytics and real-time insights
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">About EasyBizz</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            EasyBizz is a smart platform designed for entrepreneurs and merchants to 
            streamline their business operations. We help reduce costs, connect with trusted 
            partners, and make data-driven decisions effortlessly
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white rounded-2xl shadow-md p-6">
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-4">
                  "EasyBizz helped me streamline my business operations more than ever. 
                  Now I can focus on scaling rather than managing inventory."
                </p>
                <p className="text-blue-600 font-medium">- Satisfied Customer</p>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl shadow-md p-6">
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-4">
                  "I love how easy it makes tracking my stock and finding the 
                  right partners. It truly helped boost my business efficiency."
                </p>
                <p className="text-blue-600 font-medium">- Happy User</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="bg-white py-12 px-6 mt-16">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">Contact Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-900 mb-2">Email</h3>
              <p className="text-gray-600">EasyBizz@gmail.com</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-900 mb-2">Phone</h3>
              <p className="text-gray-600">+213 778 84 74 73</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-900 mb-2">Location</h3>
              <p className="text-gray-600">PDN Universitas les Koliba, 47000,<br />Tianfa Algeria</p>
            </div>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">All rights reserved easybizz 2025</p>
          </div>
        </div>
      </footer>

      <AuthDialog 
        open={showAuth} 
        onOpenChange={setShowAuth}
        onAuthSuccess={() => {
          setIsAuthenticated(true);
          setShowAuth(false);
        }}
      />
    </div>
  );
};

export default Index;

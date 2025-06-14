import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, BarChart3, Mail, Phone, MapPin } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { LanguageContext } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Index = () => {
  const { t } = useContext(LanguageContext);

  const testimonials = [
    {
      text: "EasyBizz helped me streamline my business operations more than ever. Now I can focus on scaling rather than managing inventory.",
      author: "- Satisfied Customer"
    },
    {
      text: "I love how easy it makes tracking my stock and finding the right partners. It truly helped boost my business efficiency.",
      author: "- Happy User"
    },
    {
      text: "The analytics dashboard gives me insights I never had before. My business decisions are now data-driven and more profitable.",
      author: "- Business Owner"
    },
    {
      text: "Finding reliable suppliers was always a challenge. EasyBizz connected me with the perfect partners for my business needs.",
      author: "- Retailer"
    },
    {
      text: "The automated inventory alerts saved me from stockouts multiple times. This platform is a game-changer for small businesses.",
      author: "- Store Manager"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/5142faa5-d964-4021-b411-2ea1ad268901.png" 
              alt="EasyBizz Logo" 
              className="h-8 w-auto"
            />
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[#0794FE] font-medium hover:text-blue-700 transition-colors">{t('features')}</a>
            <a href="#about" className="text-[#0794FE] font-medium hover:text-blue-700 transition-colors">{t('about')}</a>
            <a href="#contact" className="text-[#0794FE] font-medium hover:text-blue-700 transition-colors">{t('contact')}</a>
          </nav>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link to="/supplier-login">
              <Button className="bg-[#E1275C] hover:bg-[#C91F4F] text-white px-6 py-2 rounded-full font-medium">
                Supplier Space
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-[#E1275C] hover:bg-[#C91F4F] text-white px-6 py-2 rounded-full font-medium">
                {t('sign_in')}
              </Button>
            </Link>
          </div>
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
          <Link to="/register">
            <Button className="bg-[#E1275C] hover:bg-[#C91F4F] text-white px-8 py-3 rounded-full font-medium text-lg">
              Get Started
            </Button>
          </Link>
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
                  <Users className="w-6 h-6 text-[#0794FE]" />
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
                  <Package className="w-6 h-6 text-[#0794FE]" />
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
                  <BarChart3 className="w-6 h-6 text-[#0794FE]" />
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

      {/* Supplier Benefits Section */}
      <section id="supplier-benefits" className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Supplier Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Benefit 1 */}
            <Card className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {/* Storefront Icon */}
                  <Package className="w-6 h-6 text-[#0794FE]" />
                </div>
                <CardTitle className="text-blue-900 text-xl">
                  Direct Access to Boutiques and Retailers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  <span className="font-semibold">No middlemen:</span> Sell directly to store owners and boutiques who are actively seeking products.<br /><br />
                  <span className="font-semibold">Wider reach:</span> Instantly showcase your catalog to a network of verified businesses using the platform.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Benefit 2 */}
            <Card className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {/* Clipboard List Icon (order management) */}
                  <BarChart3 className="w-6 h-6 text-[#0794FE]" />
                </div>
                <CardTitle className="text-blue-900 text-xl">
                  Smart Order Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  Centralized dashboard to receive, confirm, and track orders in real time.<br /><br />
                  Notifications for new orders, delivery deadlines, and payment statuses.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Benefit 3 */}
            <Card className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {/* Tag Icon for promotions */}
                  <Users className="w-6 h-6 text-[#0794FE]" />
                </div>
                <CardTitle className="text-blue-900 text-xl">
                  Promotional Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  Ability to run limited-time discounts, bundle offers, and highlighted listings.<br /><br />
                  Feature products on the homepage or in recommended sections to boutiques.
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
            EasyBizz is a smart platform designed for entrepreneurs and merchants to streamline their business operations. We help reduce costs, connect with trusted partners, and make data-driven decisions effortlessly
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">What Our Users Say</h2>
          
          <div className="max-w-4xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                    <div className="p-1">
                      <Card className="bg-white rounded-2xl shadow-md h-full">
                        <CardContent className="pt-6 flex flex-col justify-between h-full">
                          <p className="text-gray-700 mb-4 text-center">
                            "{testimonial.text}"
                          </p>
                          <p className="text-[#0794FE] font-medium text-center">{testimonial.author}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="bg-[#0794FE] py-12 px-6 mt-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Contact Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-[#0794FE]" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Email</h3>
              <p className="text-blue-100">EasyBizz@gmail.com</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-[#0794FE]" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Phone</h3>
              <p className="text-blue-100">+213 778 84 74 73</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-[#0794FE]" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Location</h3>
              <p className="text-blue-100">Pôle universitaire de Koléa,<br />42003, Tipaza, Algérie</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white border-t border-blue-400 pt-8">
            {/* EASYBIZZ Section */}
            <div>
              <h3 className="font-bold text-lg mb-4">EASYBIZZ</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">À propos</a></li>
                <li><a href="#" className="hover:underline">Notre équipe</a></li>
              </ul>
            </div>

            {/* Resources Section */}
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Blog</a></li>
                <li><a href="#" className="hover:underline">portfolio</a></li>
                <li><a href="#" className="hover:underline">partenariat</a></li>
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Conditions d'utilisation</a></li>
                <li><a href="#" className="hover:underline">Politique des cookies</a></li>
                <li><a href="#" className="hover:underline">Politique de confidentialité</a></li>
              </ul>
            </div>

            {/* Nos produits Section */}
            <div>
              <h3 className="font-bold text-lg mb-4">Nos produits</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Easybizz caisse</a></li>
                <li><a href="#" className="hover:underline">Easybizz</a></li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-blue-400">
            <p className="text-white text-sm">All rights reserved easybizz 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

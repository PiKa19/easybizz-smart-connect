
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-blue-50 flex flex-col">
      {/* Enhanced Hero */}
      <header className="relative">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1600&q=80"
            alt="Hero"
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f8fafc90] to-[#f8fafc]"></div>
        </div>
        <div className="relative z-10 py-8 px-6">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/5142faa5-d964-4021-b411-2ea1ad268901.png" 
                alt="EasyBizz Logo" 
                className="h-10 w-auto md:h-12"
              />
              <span className="font-playfair text-2xl font-bold text-[#0794FE] tracking-tight ml-1 hidden sm:inline">EasyBizz</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-[#0794FE] text-lg font-medium hover:text-blue-700 transition-colors">{t('features')}</a>
              <a href="#about" className="text-[#0794FE] text-lg font-medium hover:text-blue-700 transition-colors">{t('about')}</a>
              <a href="#contact" className="text-[#0794FE] text-lg font-medium hover:text-blue-700 transition-colors">{t('contact')}</a>
            </nav>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Link to="/supplier-login">
                <Button className="bg-[#E1275C] hover:bg-[#C91F4F] text-white px-6 py-2 rounded-full font-semibold shadow">
                  Supplier Space
                </Button>
              </Link>
              <Link to="/login">
                <Button className="bg-[#E1275C] hover:bg-[#C91F4F] text-white px-6 py-2 rounded-full font-semibold shadow">
                  {t('sign_in')}
                </Button>
              </Link>
            </div>
          </div>
          {/* Hero content */}
          <section className="py-24 md:py-32 text-center flex flex-col items-center relative z-10 max-w-4xl mx-auto">
            <h1 className="font-playfair text-5xl md:text-6xl font-extrabold leading-tight text-blue-900 mb-6 tracking-tight drop-shadow-sm">
              Your Smart Business Management Starts <span className="bg-gradient-to-r from-[#0794FE] to-[#E1275C] bg-clip-text text-transparent">Here</span>
            </h1>
            <p className="text-2xl md:text-2xl text-gray-800 mb-8 max-w-2xl mx-auto font-medium">
              EasyBizz connects suppliers and entrepreneurs, automates inventory and order management, and helps you grow your business efficiently
            </p>
            <Link to="/register">
              <Button className="text-lg px-9 py-4 bg-gradient-to-r from-[#E1275C] to-[#0794FE] hover:from-[#C91F4F] hover:to-blue-700 rounded-full font-semibold shadow-lg transition-colors duration-200">
                Get Started
              </Button>
            </Link>
          </section>
        </div>
      </header>

      {/* Feature Section */}
      <section id="features" className="py-20 px-6 relative">
        <div className="absolute -top-20 left-0 w-[40vw] h-[250px] bg-gradient-to-tr from-blue-100/80 to-pink-200/70 rounded-full blur-2xl opacity-40 -z-10"></div>
        <div className="container mx-auto">
          <h2 className="font-playfair text-4xl font-bold text-center text-blue-900 mb-14 tracking-tight">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <Card className="rounded-3xl shadow-xl hover:shadow-2xl transition-shadow p-8 border-0 bg-white/90">
              <CardHeader className="text-center pb-3">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Users className="w-7 h-7 text-[#0794FE]" />
                </div>
                <CardTitle className="text-blue-900 text-2xl tracking-tight">Smart Supplier Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center text-lg">
                  Connect with the right suppliers using advanced algorithms to find the perfect business partners for your needs
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="rounded-3xl shadow-xl hover:shadow-2xl transition-shadow p-8 border-0 bg-white/90">
              <CardHeader className="text-center pb-3">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Package className="w-7 h-7 text-[#0794FE]" />
                </div>
                <CardTitle className="text-blue-900 text-2xl tracking-tight">Automated Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center text-lg">
                  Track and manage your stock in real time with smart automation and alerts
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="rounded-3xl shadow-xl hover:shadow-2xl transition-shadow p-8 border-0 bg-white/90">
              <CardHeader className="text-center pb-3">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <BarChart3 className="w-7 h-7 text-[#0794FE]" />
                </div>
                <CardTitle className="text-blue-900 text-2xl tracking-tight">Insightful Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center text-lg">
                  Make informed decisions with powerful business analytics and real-time insights
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Supplier Benefits */}
      <section id="supplier-benefits" className="py-20 px-6 bg-gradient-to-br from-blue-100 via-pink-100 to-white">
        <div className="container mx-auto">
          <h2 className="font-playfair text-4xl font-bold text-center text-blue-900 mb-14 tracking-tight">Supplier Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <Card className="rounded-3xl shadow-lg hover:shadow-2xl transition-shadow p-8 border-0 bg-white/95">
              <CardHeader className="text-center pb-3">
                <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4 shadow">
                  <Package className="w-7 h-7 text-[#E1275C]" />
                </div>
                <CardTitle className="text-blue-900 text-2xl">Direct Access to Boutiques and Retailers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 text-center text-lg">
                  <span className="font-semibold">No middlemen:</span> Sell directly to store owners and boutiques who are actively seeking products.<br /><br />
                  <span className="font-semibold">Wider reach:</span> Instantly showcase your catalog to a network of verified businesses using the platform.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="rounded-3xl shadow-lg hover:shadow-2xl transition-shadow p-8 border-0 bg-white/95">
              <CardHeader className="text-center pb-3">
                <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4 shadow">
                  <BarChart3 className="w-7 h-7 text-[#E1275C]" />
                </div>
                <CardTitle className="text-blue-900 text-2xl">Smart Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 text-center text-lg">
                  Centralized dashboard to receive, confirm, and track orders in real time.<br /><br />
                  Notifications for new orders, delivery deadlines, and payment statuses.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="rounded-3xl shadow-lg hover:shadow-2xl transition-shadow p-8 border-0 bg-white/95">
              <CardHeader className="text-center pb-3">
                <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4 shadow">
                  <Users className="w-7 h-7 text-[#E1275C]" />
                </div>
                <CardTitle className="text-blue-900 text-2xl">Promotional Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 text-center text-lg">
                  Ability to run limited-time discounts, bundle offers, and highlighted listings.<br /><br />
                  Feature products on the homepage or in recommended sections to boutiques.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="font-playfair text-4xl font-bold text-blue-900 mb-10 tracking-tight">About EasyBizz</h2>
          <p className="text-2xl text-gray-800 leading-relaxed font-medium">
            EasyBizz is a smart platform designed for entrepreneurs and merchants to streamline their business operations. We help reduce costs, connect with trusted partners, and make data-driven decisions effortlessly.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gradient-to-tr from-blue-50 via-pink-50 to-purple-50">
        <div className="container mx-auto">
          <h2 className="font-playfair text-4xl font-bold text-center text-blue-900 mb-14 tracking-tight">What Our Users Say</h2>
          <div className="max-w-4xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                    <div className="p-2">
                      <Card className="bg-white/95 rounded-3xl shadow-md hover:shadow-lg transition h-full">
                        <CardContent className="pt-8 flex flex-col justify-between h-full">
                          <p className="text-gray-800 mb-4 text-center text-lg font-medium">
                            "{testimonial.text}"
                          </p>
                          <p className="text-[#0794FE] font-semibold text-center">{testimonial.author}</p>
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
      <footer id="contact" className="bg-[#0794FE] py-16 px-6 mt-16 rounded-t-3xl shadow-inner">
        <div className="container mx-auto">
          <h2 className="font-playfair text-4xl font-bold text-center text-white mb-14 tracking-tight">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-1">Email</h3>
              <p className="text-blue-100 text-lg">EasyBizz@gmail.com</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-1">Phone</h3>
              <p className="text-blue-100 text-lg">+213 778 84 74 73</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-1">Location</h3>
              <p className="text-blue-100 text-lg">Pôle universitaire de Koléa,<br />42003, Tipaza, Algérie</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-white border-t border-blue-200/60 pt-8">
            <div>
              <h3 className="font-bold text-lg mb-4">EASYBIZZ</h3>
              <ul className="space-y-2 text-base">
                <li><a href="#" className="hover:underline">À propos</a></li>
                <li><a href="#" className="hover:underline">Notre équipe</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2 text-base">
                <li><a href="#" className="hover:underline">Blog</a></li>
                <li><a href="#" className="hover:underline">Portfolio</a></li>
                <li><a href="#" className="hover:underline">Partenariat</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2 text-base">
                <li><a href="#" className="hover:underline">Conditions d'utilisation</a></li>
                <li><a href="#" className="hover:underline">Politique des cookies</a></li>
                <li><a href="#" className="hover:underline">Politique de confidentialité</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Nos produits</h3>
              <ul className="space-y-2 text-base">
                <li><a href="#" className="hover:underline">Easybizz caisse</a></li>
                <li><a href="#" className="hover:underline">Easybizz</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-10 pt-10 border-t border-blue-200/60">
            <p className="text-white text-md tracking-wide">All rights reserved easybizz 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

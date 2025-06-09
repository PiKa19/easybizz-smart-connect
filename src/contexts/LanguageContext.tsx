
import React, { createContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'fr';
  setLanguage: (lang: 'en' | 'fr') => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: "Home",
    bizz: "Bizz",
    analytics: "Analytics", 
    inventory: "Inventory",
    products: "Products",
    historique: "History",
    notification: "Notification",
    cashier: "Cashier",
    settings: "Settings",
    logout: "Logout",
    faq: "FAQ",
    
    // Home page
    welcome: "Welcome",
    dashboard_greeting: "bonjour, supérette elbaraka",
    dashboard_subtitle: "Start managing your supermarket",
    buy_products: "Buy products",
    buy_products_desc: "browse and order directly from suppliers",
    view_analytics: "view analytics",
    view_analytics_desc: "browse and order directly from suppliers",
    inventory_management: "Inventory management",
    inventory_management_desc: "browse and order directly from suppliers",
    
    // Auth
    welcome_back: "Welcome Back",
    login_subtitle: "Fill in the information below in order to access your account.",
    email: "Email",
    password: "Password",
    login: "Login",
    register: "Register",
    email_placeholder: "Enter your email",
    password_placeholder: "Enter your password",
    no_account: "Don't have an account?",
    have_account: "Already have an account?",
    supplier_space: "Supplier Space",
    forgot_password: "Forgot Password?",
    back_to_home: "Back to Home",
    
    // Landing page
    smart_business_management: "Your Smart Business Management Starts Here",
    landing_subtitle: "EasyBizz connects suppliers and entrepreneurs, automates inventory and order management, and helps you grow your business efficiently",
    get_started: "Get Started",
    sign_in: "Sign In",
    key_features: "Key Features",
    smart_supplier_matching: "Smart Supplier Matching",
    smart_supplier_desc: "Connect with the right suppliers using advanced algorithms to find the perfect business partners for your needs",
    automated_inventory: "Automated Inventory",
    automated_inventory_desc: "Track and manage your stock in real time with smart automation and alerts",
    insightful_analytics: "Insightful Analytics", 
    insightful_analytics_desc: "Make informed decisions with powerful business analytics and real-time insights",
    about_easybizz: "About EasyBizz",
    about_desc: "EasyBizz is a smart platform designed for entrepreneurs and merchants to streamline their business operations. We help reduce costs, connect with trusted partners, and make data-driven decisions effortlessly",
    what_users_say: "What Our Users Say",
    contact_us: "Contact Us",
    features: "features",
    about: "about", 
    contact: "contact"
  },
  fr: {
    // Navigation
    home: "Accueil",
    bizz: "Bizz", 
    analytics: "Analytiques",
    inventory: "Inventaire",
    products: "Produits",
    historique: "Historique",
    notification: "Notification",
    cashier: "Caissier",
    settings: "Paramètres",
    logout: "Déconnexion",
    faq: "FAQ",
    
    // Home page
    welcome: "Bienvenue",
    dashboard_greeting: "bonjour, supérette elbaraka",
    dashboard_subtitle: "Commencez à gérer votre supermarché",
    buy_products: "Acheter des produits",
    buy_products_desc: "parcourir et commander directement auprès des fournisseurs",
    view_analytics: "voir les analyses",
    view_analytics_desc: "parcourir et commander directement auprès des fournisseurs",
    inventory_management: "Gestion des stocks",
    inventory_management_desc: "parcourir et commander directement auprès des fournisseurs",
    
    // Auth
    welcome_back: "Bon Retour",
    login_subtitle: "Remplissez les informations ci-dessous pour accéder à votre compte.",
    email: "Email",
    password: "Mot de passe",
    login: "Connexion",
    register: "S'inscrire",
    email_placeholder: "Entrez votre email",
    password_placeholder: "Entrez votre mot de passe",
    no_account: "Vous n'avez pas de compte ?",
    have_account: "Vous avez déjà un compte ?",
    supplier_space: "Espace Fournisseur",
    forgot_password: "Mot de passe oublié ?",
    back_to_home: "Retour à l'accueil",
    
    // Landing page
    smart_business_management: "Votre Gestion d'Entreprise Intelligente Commence Ici",
    landing_subtitle: "EasyBizz connecte les fournisseurs et les entrepreneurs, automatise la gestion des stocks et des commandes, et vous aide à développer votre entreprise efficacement",
    get_started: "Commencer",
    sign_in: "Se Connecter",
    key_features: "Fonctionnalités Clés",
    smart_supplier_matching: "Correspondance Intelligente des Fournisseurs",
    smart_supplier_desc: "Connectez-vous avec les bons fournisseurs en utilisant des algorithmes avancés pour trouver les partenaires commerciaux parfaits pour vos besoins",
    automated_inventory: "Inventaire Automatisé",
    automated_inventory_desc: "Suivez et gérez votre stock en temps réel avec une automatisation intelligente et des alertes",
    insightful_analytics: "Analyses Perspicaces",
    insightful_analytics_desc: "Prenez des décisions éclairées avec des analyses commerciales puissantes et des insights en temps réel",
    about_easybizz: "À Propos d'EasyBizz",
    about_desc: "EasyBizz est une plateforme intelligente conçue pour les entrepreneurs et les commerçants afin de rationaliser leurs opérations commerciales. Nous aidons à réduire les coûts, à se connecter avec des partenaires de confiance et à prendre des décisions basées sur les données sans effort",
    what_users_say: "Ce Que Disent Nos Utilisateurs",
    contact_us: "Nous Contacter",
    features: "fonctionnalités",
    about: "à propos",
    contact: "contact"
  }
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => ''
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

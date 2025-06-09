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
    boutique: "Boutique",
    
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
    manage_product_inventory: "Manage your product inventory",
    
    // Boutique Management
    boutique_management: "Boutique Management",
    add_boutique: "Add Boutique",
    add_new_boutique: "Add New Boutique",
    create_new_boutique_desc: "Create a new boutique to manage your business locations.",
    boutique_name: "Boutique Name",
    enter_boutique_name: "Enter boutique name",
    address: "Address",
    enter_boutique_address: "Enter boutique address",
    active: "Active",
    inactive: "Inactive",
    edit: "Edit",
    cancel: "Cancel",
    
    // Product Management
    add_product: "Add a product",
    add_new_product: "Add New Product",
    add_product_desc: "Add a new product to your inventory.",
    edit_product: "Edit Product",
    edit_product_desc: "Update product information.",
    update_product: "Update Product",
    product_name: "Product Name",
    enter_product_name: "Enter product name",
    reference: "Reference",
    enter_reference: "Enter reference",
    barcode: "Barcode",
    enter_barcode: "Enter barcode",
    quantity_in_stock: "Quantity in Stock",
    enter_quantity_stock: "Enter quantity in stock",
    quantity_sold: "Quantity Sold",
    enter_quantity_sold: "Enter quantity sold",
    alert_level: "Alert Level",
    enter_alert_level: "Enter alert level",
    buying_price_inc_vat: "Buying Price (Inc. VAT)",
    enter_buying_price_inc: "Enter buying price inc. VAT",
    selling_price_exc_vat: "Selling Price (Exc. VAT)",
    enter_selling_price_exc: "Enter selling price exc. VAT",
    selling_price_inc_vat: "Selling Price (Inc. VAT)",
    enter_selling_price_inc: "Enter selling price inc. VAT",
    
    // Table Headers
    product: "Product",
    qty_stock: "Qty Stock",
    qty_sold: "Qty Sold",
    alert: "Alert",
    buy_price_inc: "Buy Price (Inc)",
    sell_price_exc: "Sell Price (Exc)",
    sell_price_inc: "Sell Price (Inc)",
    rotation_status: "Rotation Status",
    action: "Action",
    
    // Status
    rapid: "Rapid",
    normal: "Normal",
    slow: "Slow",
    
    // General
    search: "Search",
    search_product: "Search a product",
    hello: "bonjour",
    start_managing_supermarket: "Start managing your supermarket",
    rows_per_page: "Rows per page",
    of: "of",
    section: "Section",
    section_under_development: "This section is under development",
    cart: "Cart",
    filter_by_category: "Filter by category",
    products_available: "Products Available",
    all_products: "All Products",
    beverages: "Beverages",
    snacks: "Snacks",
    cleaning: "Cleaning",
    meat_poultry: "Meat & Poultry",
    seafood: "Seafood",
    dairy: "Dairy Products",
    frozen: "Frozen Foods",
    canned: "Canned Foods",
    
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
    boutique: "Boutique",
    
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
    manage_product_inventory: "Gérer votre inventaire de produits",
    
    // Boutique Management
    boutique_management: "Gestion des Boutiques",
    add_boutique: "Ajouter Boutique",
    add_new_boutique: "Ajouter Nouvelle Boutique",
    create_new_boutique_desc: "Créer une nouvelle boutique pour gérer vos emplacements commerciaux.",
    boutique_name: "Nom de la Boutique",
    enter_boutique_name: "Entrez le nom de la boutique",
    address: "Adresse",
    enter_boutique_address: "Entrez l'adresse de la boutique",
    active: "Actif",
    inactive: "Inactif",
    edit: "Modifier",
    cancel: "Annuler",
    
    // Product Management
    add_product: "Ajouter un produit",
    add_new_product: "Ajouter Nouveau Produit",
    add_product_desc: "Ajouter un nouveau produit à votre inventaire.",
    edit_product: "Modifier Produit",
    edit_product_desc: "Mettre à jour les informations du produit.",
    update_product: "Mettre à jour Produit",
    product_name: "Nom du Produit",
    enter_product_name: "Entrez le nom du produit",
    reference: "Référence",
    enter_reference: "Entrez la référence",
    barcode: "Code-barres",
    enter_barcode: "Entrez le code-barres",
    quantity_in_stock: "Quantité en Stock",
    enter_quantity_stock: "Entrez la quantité en stock",
    quantity_sold: "Quantité Vendue",
    enter_quantity_sold: "Entrez la quantité vendue",
    alert_level: "Niveau d'Alerte",
    enter_alert_level: "Entrez le niveau d'alerte",
    buying_price_inc_vat: "Prix d'Achat (TTC)",
    enter_buying_price_inc: "Entrez le prix d'achat TTC",
    selling_price_exc_vat: "Prix de Vente (HT)",
    enter_selling_price_exc: "Entrez le prix de vente HT",
    selling_price_inc_vat: "Prix de Vente (TTC)",
    enter_selling_price_inc: "Entrez le prix de vente TTC",
    
    // Table Headers
    product: "Produit",
    qty_stock: "Qté Stock",
    qty_sold: "Qté Vendue",
    alert: "Alerte",
    buy_price_inc: "Prix Achat (TTC)",
    sell_price_exc: "Prix Vente (HT)",
    sell_price_inc: "Prix Vente (TTC)",
    rotation_status: "Statut Rotation",
    action: "Action",
    
    // Status
    rapid: "Rapide",
    normal: "Normal",
    slow: "Lent",
    
    // General
    search: "Rechercher",
    search_product: "Rechercher un produit",
    hello: "bonjour",
    start_managing_supermarket: "Commencez à gérer votre supermarché",
    rows_per_page: "Lignes par page",
    of: "de",
    section: "Section",
    section_under_development: "Cette section est en développement",
    cart: "Panier",
    filter_by_category: "Filtrer par catégorie",
    products_available: "Produits Disponibles",
    all_products: "Tous les Produits",
    beverages: "Boissons",
    snacks: "Collations",
    cleaning: "Nettoyage",
    meat_poultry: "Viande et Volaille",
    seafood: "Fruits de Mer",
    dairy: "Produits Laitiers",
    frozen: "Produits Surgelés",
    canned: "Conserves",
    
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
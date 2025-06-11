import React, { createContext, useState, useEffect } from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

interface LanguageContextProps {
  language: string;
  setLanguage: (lang: string) => void;
  t: i18next.TFunction;
}

const translations = {
  en: {
    home: "Home",
    bizz: "Bizz",
    analytics: "Analytics",
    inventory: "Inventory",
    products: "Products",
    orders: "Orders",
    suppliers: "Suppliers",
    historique: "History",
    notification: "Notification",
    cashier: "Cashier",
    messages: "Messages",
    settings: "Settings",
    logout: "Logout",
    welcome: "Welcome",
    dashboard_greeting: "Here's what's happening with your supermarket today.",
    dashboard_subtitle: "Stay up to date and manage your business effectively.",
    buy_products: "Buy Products",
    buy_products_desc: "Explore and purchase new products for your supermarket.",
    view_analytics: "View Analytics",
    view_analytics_desc: "Analyze your supermarket's performance and trends.",
    inventory_management: "Inventory Management",
    inventory_management_desc: "Manage your stock levels and track product availability.",
    section: "Section under development",
    section_under_development: "This section is currently under development. Please check back later.",
    search_product: "Search for a product...",
    
    // New translations for restored sections
    boutique_management: "Boutique Management",
    select_boutique: "Select boutique",
    add_boutique: "Add Boutique",
    edit: "Edit",
    previous_page: "Previous Page",
    
    // Products section
    product: "Product",
    reference: "Reference", 
    barcode: "Barcode",
    qty_stock: "Qty Stock",
    qty_sold: "Qty Sold",
    alert: "Alert",
    buy_price: "Buy Price",
    sell_price_ht: "Sell Price (HT)",
    sell_price_ttc: "Sell Price (TTC)",
    rotation_status: "Rotation Status",
    add_product: "Add Product",
    rows_per_page: "Rows per page",
    
    // Orders section
    order_id: "Order ID",
    date: "Date",
    amount: "Amount",
    status: "Status",
    actions: "Actions",
    download_bill: "Download Bill",
    learn_more: "Learn More",
    search_order: "Search order ID, supplier",

    // Landing page translations
    features: "Features",
    about: "About",
    contact: "Contact",
    sign_in: "Sign In",
    smart_business_management: "Your Smart Business Management Starts Here",
    landing_subtitle: "EasyBizz connects suppliers and entrepreneurs, automates inventory and order management, and helps you grow your business efficiently",
    get_started: "Get Started",
    key_features: "Key Features",
    smart_supplier_matching: "Smart Supplier Matching",
    smart_supplier_desc: "Connect with verified suppliers that match your business needs and location.",
    automated_inventory: "Automated Inventory",
    automated_inventory_desc: "Track stock levels, get alerts, and automate reordering to never run out.",
    insightful_analytics: "Insightful Analytics",
    insightful_analytics_desc: "Make data-driven decisions with comprehensive business insights.",
    about_easybizz: "About EasyBizz",
    about_desc: "EasyBizz is designed to empower small and medium businesses with smart tools for supplier management, inventory tracking, and business analytics. Our platform simplifies complex business operations, helping entrepreneurs focus on growth rather than administrative tasks.",
    what_users_say: "What Our Users Say",

    // Auth translations
    welcome_back: "Welcome Back",
    login_subtitle: "Fill in the information below to access your account.",
    email: "Email",
    password: "Password",
    email_placeholder: "Enter your email",
    password_placeholder: "Enter your password",
    login: "Login",
    no_account: "Don't have an account?",
    register: "Register",
    supplier_space: "Supplier Space",
    forgot_password: "Forgot Password?",
    back_to_home: "Back to Home",
    have_account: "Already have an account?",

    // Supplier section translations
    supplier_management: "Supplier Management",
    my_suppliers: "My Suppliers",
    find_suppliers: "Find Suppliers",
    add_supplier: "Add Supplier",
    search_supplier: "Search suppliers...",
    filter_by_category: "Filter by category",
    all_products: "All Categories",
    beverages: "Beverages",
    snacks: "Snacks",
    dairy: "Dairy",
    cleaning: "Cleaning",
    view_profile: "View Profile",
    message_supplier: "Message",
    supplier_contact: "Contact",
    no_suppliers_yet: "No suppliers yet",
    no_suppliers_found: "No suppliers found",
    add_suppliers_to_get_started: "Add suppliers to get started",
    try_different_search_terms: "Try different search terms",
    back: "Back",
    supplier_profile: "Supplier Profile",
    add_to_contacts: "Add to Contacts",
    remove_from_contacts: "Remove from Contacts",
    supplier_info: "Supplier Information",
    description: "Description",
    years_experience: "Years of Experience",
    minimum_order: "Minimum Order",
    delivery_time: "Delivery Time",
    payment_terms: "Payment Terms",
    supplier_products: "Products",
  },
  fr: {
    home: "Accueil",
    bizz: "Bizz",
    analytics: "Analytique",
    inventory: "Inventaire",
    products: "Produits",
    orders: "Commandes",
    suppliers: "Fournisseurs",
    historique: "Historique",
    notification: "Notification",
    cashier: "Caissier",
    messages: "Messages",
    settings: "Paramètres",
    logout: "Déconnexion",
    welcome: "Bienvenue",
    dashboard_greeting: "Voici ce qui se passe dans votre supermarché aujourd'hui.",
    dashboard_subtitle: "Restez à jour et gérez votre entreprise efficacement.",
    buy_products: "Acheter des Produits",
    buy_products_desc: "Explorez et achetez de nouveaux produits pour votre supermarché.",
    view_analytics: "Voir les Analytiques",
    view_analytics_desc: "Analysez les performances et les tendances de votre supermarché.",
    inventory_management: "Gestion des Stocks",
    inventory_management_desc: "Gérez vos niveaux de stock et suivez la disponibilité des produits.",
    section: "Section en développement",
    section_under_development: "Cette section est actuellement en développement. Veuillez revenir plus tard.",
    search_product: "Rechercher un produit...",
    
    // New translations for restored sections
    boutique_management: "Gestion des Boutiques",
    select_boutique: "Sélectionner boutique",
    add_boutique: "Ajouter Boutique",
    edit: "Modifier",
    previous_page: "Page Précédente",
    
    // Products section
    product: "Produit",
    reference: "Référence",
    barcode: "Code-barres",
    qty_stock: "Qté Stock",
    qty_sold: "Qté Vendu",
    alert: "Alerte",
    buy_price: "Prix Achat",
    sell_price_ht: "Prix Vente HT",
    sell_price_ttc: "Prix Vente TTC",
    rotation_status: "Statut Rotation",
    add_product: "Ajouter Produit",
    rows_per_page: "Lignes par page",
    
    // Orders section
    order_id: "ID Commande",
    date: "Date",
    amount: "Montant",
    status: "Statut",
    actions: "Actions",
    download_bill: "Télécharger Facture",
    learn_more: "En Savoir Plus",
    search_order: "Rechercher ID commande, fournisseur",

    // Landing page translations
    features: "Fonctionnalités",
    about: "À propos",
    contact: "Contact",
    sign_in: "Se connecter",
    smart_business_management: "Votre Gestion d'Entreprise Intelligente Commence Ici",
    landing_subtitle: "EasyBizz connecte les fournisseurs et entrepreneurs, automatise la gestion des stocks et commandes, et vous aide à développer votre entreprise efficacement",
    get_started: "Commencer",
    key_features: "Fonctionnalités Clés",
    smart_supplier_matching: "Correspondance Intelligente de Fournisseurs",
    smart_supplier_desc: "Connectez-vous avec des fournisseurs vérifiés qui correspondent à vos besoins et localisation.",
    automated_inventory: "Inventaire Automatisé",
    automated_inventory_desc: "Suivez les niveaux de stock, recevez des alertes et automatisez les commandes.",
    insightful_analytics: "Analyses Perspicaces",
    insightful_analytics_desc: "Prenez des décisions basées sur les données avec des insights complets.",
    about_easybizz: "À propos d'EasyBizz",
    about_desc: "EasyBizz est conçu pour autonomiser les petites et moyennes entreprises avec des outils intelligents pour la gestion des fournisseurs, le suivi des stocks et l'analyse commerciale. Notre plateforme simplifie les opérations complexes, aidant les entrepreneurs à se concentrer sur la croissance plutôt que sur les tâches administratives.",
    what_users_say: "Ce que disent nos utilisateurs",

    // Auth translations
    welcome_back: "Bon retour",
    login_subtitle: "Remplissez les informations ci-dessous pour accéder à votre compte.",
    email: "Email",
    password: "Mot de passe",
    email_placeholder: "Entrez votre email",
    password_placeholder: "Entrez votre mot de passe",
    login: "Connexion",
    no_account: "Vous n'avez pas de compte ?",
    register: "S'inscrire",
    supplier_space: "Espace Fournisseur",
    forgot_password: "Mot de passe oublié ?",
    back_to_home: "Retour à l'accueil",
    have_account: "Vous avez déjà un compte ?",

    // Supplier section translations
    supplier_management: "Gestion des Fournisseurs",
    my_suppliers: "Mes Fournisseurs",
    find_suppliers: "Trouver des Fournisseurs",
    add_supplier: "Ajouter Fournisseur",
    search_supplier: "Rechercher fournisseurs...",
    filter_by_category: "Filtrer par catégorie",
    all_products: "Toutes Catégories",
    beverages: "Boissons",
    snacks: "Collations",
    dairy: "Produits Laitiers",
    cleaning: "Nettoyage",
    view_profile: "Voir Profil",
    message_supplier: "Message",
    supplier_contact: "Contact",
    no_suppliers_yet: "Aucun fournisseur encore",
    no_suppliers_found: "Aucun fournisseur trouvé",
    add_suppliers_to_get_started: "Ajoutez des fournisseurs pour commencer",
    try_different_search_terms: "Essayez différents termes de recherche",
    back: "Retour",
    supplier_profile: "Profil Fournisseur",
    add_to_contacts: "Ajouter aux Contacts",
    remove_from_contacts: "Retirer des Contacts",
    supplier_info: "Informations Fournisseur",
    description: "Description",
    years_experience: "Années d'Expérience",
    minimum_order: "Commande Minimum",
    delivery_time: "Temps de Livraison",
    payment_terms: "Conditions de Paiement",
    supplier_products: "Produits",
  }
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translations.en },
      fr: { translation: translations.fr },
    },
    fallbackLng: 'fr',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export const LanguageContext = createContext<LanguageContextProps>({
  language: 'fr',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(i18next.language);

  useEffect(() => {
    i18next.on('languageChanged', (lng) => {
      setLanguage(lng);
    });

    return () => {
      i18next.off('languageChanged');
    };
  }, []);

  const value: LanguageContextProps = {
    language,
    setLanguage: (lang: string) => {
      i18next.changeLanguage(lang);
    },
    t: i18next.t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
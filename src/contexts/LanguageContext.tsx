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

import React, { createContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    welcome: "Welcome",
    dashboard_greeting: "Start managing your supermarket",
    dashboard_subtitle: "Manage your business efficiently",
    home: "Home",
    boutique: "Boutique",
    bizz: "Bizz",
    analytics: "Analytics",
    inventory: "Inventory",
    products: "Products",
    orders: "Orders",
    suppliers: "Suppliers",
    historique: "History",
    notification: "Notifications",
    cashier: "Cashier",
    settings: "Settings",
    logout: "Logout",
    buy_products: "Buy Products",
    buy_products_desc: "Browse and purchase products from suppliers",
    view_analytics: "View Analytics",
    view_analytics_desc: "Monitor your business performance",
    inventory_management: "Inventory Management",
    inventory_management_desc: "Track and manage your stock",
    section: "Section",
    section_under_development: "This section is under development",
    search_product: "Search products...",
    previous_page: "Previous page",
    add_product: "Add Product",
    product: "Product",
    reference: "Reference",
    barcode: "Barcode",
    qty_stock: "Qty Stock",
    qty_sold: "Qty Sold",
    alert: "Alert",
    buy_price: "Buy Price",
    sell_price_ht: "Sell Price HT",
    sell_price_ttc: "Sell Price TTC",
    rotation_status: "Rotation Status",
    rows_per_page: "Rows per page",
    cart: "Cart",
    'order_id': "Order ID",
    'customer': "Customer",
    'total': "Total",
    'status': "Status",
    'date': "Date",
    'processing': "Processing",
    'completed': "Completed",
    'pending': "Pending",
    'view_details': "View Details"
  },
  fr: {
    welcome: "Bienvenue",
    dashboard_greeting: "Commencez à gérer votre supermarché",
    dashboard_subtitle: "Gérez votre entreprise efficacement",
    home: "Accueil",
    boutique: "Boutique",
    bizz: "Bizz",
    analytics: "Analyses",
    inventory: "Inventaire",
    products: "Produits",
    orders: "Commandes",
    suppliers: "Fournisseurs",
    historique: "Historique",
    notification: "Notifications",
    cashier: "Caissier",
    settings: "Paramètres",
    logout: "Déconnexion",
    buy_products: "Acheter des produits",
    buy_products_desc: "Parcourir et acheter des produits auprès des fournisseurs",
    view_analytics: "Voir les analyses",
    view_analytics_desc: "Surveillez les performances de votre entreprise",
    inventory_management: "Gestion des stocks",
    inventory_management_desc: "Suivez et gérez vos stocks",
    section: "Section",
    section_under_development: "Cette section est en cours de développement",
    search_product: "Rechercher des produits...",
    previous_page: "Page précédente",
    add_product: "Ajouter un produit",
    product: "Produit",
    reference: "Référence",
    barcode: "Code-barres",
    qty_stock: "Qté Stock",
    qty_sold: "Qté Vendue",
    alert: "Alerte",
    buy_price: "Prix d'achat",
    sell_price_ht: "Prix de vente HT",
    sell_price_ttc: "Prix de vente TTC",
    rotation_status: "Statut de rotation",
    rows_per_page: "Lignes par page",
    cart: "Panier",
    'order_id': "ID Commande",
    'customer': "Client",
    'total': "Total",
    'status': "Statut",
    'date': "Date",
    'processing': "En cours",
    'completed': "Terminé",
    'pending': "En attente",
    'view_details': "Voir les détails"
  }
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

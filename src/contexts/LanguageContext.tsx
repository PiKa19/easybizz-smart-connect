import React, { createContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation & Header
    welcome: "Welcome",
    features: "Features",
    about: "About",
    contact: "Contact",
    sign_in: "Sign In",
    supplier_space: "Supplier Space",
    
    // Dashboard
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
    
    // Homepage Content
    hero_title: "Your Smart Business Management Starts Here",
    hero_subtitle: "EasyBizz connects suppliers and entrepreneurs, automates inventory and order management, and helps you grow your business efficiently",
    get_started: "Get Started",
    key_features: "Key Features",
    smart_supplier_matching: "Smart Supplier Matching",
    smart_supplier_desc: "Connect with the right suppliers using advanced algorithms to find the perfect business partners for your needs",
    automated_inventory: "Automated Inventory",
    automated_inventory_desc: "Track and manage your stock in real time with smart automation and alerts",
    insightful_analytics: "Insightful Analytics",
    insightful_analytics_desc: "Make informed decisions with powerful business analytics and real-time insights",
    
    // Supplier Benefits
    supplier_benefits: "Supplier Benefits",
    direct_access_title: "Direct Access to Boutiques and Retailers",
    direct_access_desc: "No middlemen: Sell directly to store owners and boutiques who are actively seeking products.\n\nWider reach: Instantly showcase your catalog to a network of verified businesses using the platform.",
    smart_order_management: "Smart Order Management",
    smart_order_desc: "Centralized dashboard to receive, confirm, and track orders in real time.\n\nNotifications for new orders, delivery deadlines, and payment statuses.",
    promotional_tools: "Promotional Tools",
    promotional_tools_desc: "Ability to run limited-time discounts, bundle offers, and highlighted listings.\n\nFeature products on the homepage or in recommended sections to boutiques.",
    
    // About & Testimonials
    about_easybizz: "About EasyBizz",
    about_desc: "EasyBizz is a smart platform designed for entrepreneurs and merchants to streamline their business operations. We help reduce costs, connect with trusted partners, and make data-driven decisions effortlessly",
    what_users_say: "What Our Users Say",
    
    // Contact
    contact_us: "Contact Us",
    email: "Email",
    phone: "Phone",
    location: "Location",
    
    // Authentication
    login: "Login",
    register: "Register",
    password: "Password",
    email_placeholder: "Enter your email",
    password_placeholder: "Enter your password",
    login_subtitle: "Sign in to your account",
    no_account: "Don't have an account?",
    have_account: "Already have an account?",
    forgot_password: "Forgot Password?",
    back_to_home: "Back to Home",
    
    // Business Operations
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
    
    // Product Management
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
    
    // Orders
    order_id: "Order ID",
    customer: "Customer",
    total: "Total",
    status: "Status",
    date: "Date",
    processing: "Processing",
    completed: "Completed",
    pending: "Pending",
    view_details: "View Details",
    
    // Suppliers
    supplier_management: "Supplier Management",
    my_suppliers: "My Suppliers",
    find_suppliers: "Find Suppliers",
    messages: "Messages",
    search_supplier: "Search suppliers...",
    filter_by_category: "Filter by category",
    all_products: "All Products",
    beverages: "Beverages",
    snacks: "Snacks",
    dairy: "Dairy",
    cleaning: "Cleaning",
    view_profile: "View Profile",
    message_supplier: "Message Supplier",
    no_suppliers_yet: "No suppliers yet",
    no_suppliers_found: "No suppliers found",
    add_suppliers_to_get_started: "Add suppliers to get started",
    try_different_search_terms: "Try different search terms",
    select_conversation: "Select conversation",
    start_conversation: "Start conversation",
    supplier_contact: "Contact",
    add_to_contacts: "Add to contacts",
    remove_from_contacts: "Remove from contacts",
    supplier_info: "Supplier Info",
    description: "Description",
    years_experience: "Years Experience",
    minimum_order: "Minimum Order",
    delivery_time: "Delivery Time",
    payment_terms: "Payment Terms",
    supplier_products: "Supplier Products",
    online: "Online",
    offline: "Offline",
    last_seen: "Last seen",
    type_message: "Type a message...",
    
    // Common Actions
    back: "Back",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    add: "Add",
    search: "Search",
    filter: "Filter",
    clear_filters: "Clear filters",
    no_data: "No data found",
    loading: "Loading...",
    
    // Footer
    all_rights_reserved: "All rights reserved easybizz 2025"
  },
  
  fr: {
    // Navigation & Header
    welcome: "Bienvenue",
    features: "Fonctionnalités",
    about: "À propos",
    contact: "Contact",
    sign_in: "Se connecter",
    supplier_space: "Espace Fournisseur",
    
    // Dashboard
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
    
    // Homepage Content
    hero_title: "Votre Gestion d'Entreprise Intelligente Commence Ici",
    hero_subtitle: "EasyBizz connecte les fournisseurs et les entrepreneurs, automatise la gestion des stocks et des commandes, et vous aide à développer votre entreprise efficacement",
    get_started: "Commencer",
    key_features: "Fonctionnalités Clés",
    smart_supplier_matching: "Correspondance Intelligente de Fournisseurs",
    smart_supplier_desc: "Connectez-vous avec les bons fournisseurs en utilisant des algorithmes avancés pour trouver les partenaires commerciaux parfaits pour vos besoins",
    automated_inventory: "Inventaire Automatisé",
    automated_inventory_desc: "Suivez et gérez votre stock en temps réel avec une automatisation intelligente et des alertes",
    insightful_analytics: "Analyses Perspicaces",
    insightful_analytics_desc: "Prenez des décisions éclairées avec des analyses commerciales puissantes et des insights en temps réel",
    
    // Supplier Benefits
    supplier_benefits: "Avantages Fournisseurs",
    direct_access_title: "Accès Direct aux Boutiques et Détaillants",
    direct_access_desc: "Pas d'intermédiaires : Vendez directement aux propriétaires de magasins et boutiques qui recherchent activement des produits.\n\nPortée plus large : Présentez instantanément votre catalogue à un réseau d'entreprises vérifiées utilisant la plateforme.",
    smart_order_management: "Gestion Intelligente des Commandes",
    smart_order_desc: "Tableau de bord centralisé pour recevoir, confirmer et suivre les commandes en temps réel.\n\nNotifications pour les nouvelles commandes, les délais de livraison et les statuts de paiement.",
    promotional_tools: "Outils Promotionnels",
    promotional_tools_desc: "Possibilité de lancer des remises à durée limitée, des offres groupées et des annonces mises en évidence.\n\nMettez en vedette des produits sur la page d'accueil ou dans les sections recommandées aux boutiques.",
    
    // About & Testimonials
    about_easybizz: "À Propos d'EasyBizz",
    about_desc: "EasyBizz est une plateforme intelligente conçue pour les entrepreneurs et commerçants afin de rationaliser leurs opérations commerciales. Nous aidons à réduire les coûts, à se connecter avec des partenaires de confiance et à prendre des décisions basées sur les données sans effort",
    what_users_say: "Ce Que Disent Nos Utilisateurs",
    
    // Contact
    contact_us: "Nous Contacter",
    email: "Email",
    phone: "Téléphone",
    location: "Localisation",
    
    // Authentication
    login: "Connexion",
    register: "S'inscrire",
    password: "Mot de passe",
    email_placeholder: "Entrez votre email",
    password_placeholder: "Entrez votre mot de passe",
    login_subtitle: "Connectez-vous à votre compte",
    no_account: "Vous n'avez pas de compte ?",
    have_account: "Vous avez déjà un compte ?",
    forgot_password: "Mot de passe oublié ?",
    back_to_home: "Retour à l'accueil",
    
    // Business Operations
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
    
    // Product Management
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
    
    // Orders
    order_id: "ID Commande",
    customer: "Client",
    total: "Total",
    status: "Statut",
    date: "Date",
    processing: "En cours",
    completed: "Terminé",
    pending: "En attente",
    view_details: "Voir les détails",
    
    // Suppliers
    supplier_management: "Gestion des Fournisseurs",
    my_suppliers: "Mes Fournisseurs",
    find_suppliers: "Trouver des Fournisseurs",
    messages: "Messages",
    search_supplier: "Rechercher des fournisseurs...",
    filter_by_category: "Filtrer par catégorie",
    all_products: "Tous les Produits",
    beverages: "Boissons",
    snacks: "Collations",
    dairy: "Produits Laitiers",
    cleaning: "Nettoyage",
    view_profile: "Voir le Profil",
    message_supplier: "Contacter le Fournisseur",
    no_suppliers_yet: "Aucun fournisseur pour le moment",
    no_suppliers_found: "Aucun fournisseur trouvé",
    add_suppliers_to_get_started: "Ajoutez des fournisseurs pour commencer",
    try_different_search_terms: "Essayez des termes de recherche différents",
    select_conversation: "Sélectionner une conversation",
    start_conversation: "Commencer une conversation",
    supplier_contact: "Contact",
    add_to_contacts: "Ajouter aux contacts",
    remove_from_contacts: "Retirer des contacts",
    supplier_info: "Infos Fournisseur",
    description: "Description",
    years_experience: "Années d'Expérience",
    minimum_order: "Commande Minimum",
    delivery_time: "Délai de Livraison",
    payment_terms: "Conditions de Paiement",
    supplier_products: "Produits du Fournisseur",
    online: "En ligne",
    offline: "Hors ligne",
    last_seen: "Vu pour la dernière fois",
    type_message: "Tapez un message...",
    
    // Common Actions
    back: "Retour",
    save: "Enregistrer",
    cancel: "Annuler",
    edit: "Modifier",
    delete: "Supprimer",
    add: "Ajouter",
    search: "Rechercher",
    filter: "Filtrer",
    clear_filters: "Effacer les filtres",
    no_data: "Aucune donnée trouvée",
    loading: "Chargement...",
    
    // Footer
    all_rights_reserved: "Tous droits réservés easybizz 2025"
  },
  
  ar: {
    // Navigation & Header
    welcome: "مرحباً",
    features: "الميزات",
    about: "حول",
    contact: "اتصل بنا",
    sign_in: "تسجيل الدخول",
    supplier_space: "مساحة المورد",
    
    // Dashboard
    dashboard_greeting: "ابدأ في إدارة السوبر ماركت الخاص بك",
    dashboard_subtitle: "أدر عملك بكفاءة",
    home: "الرئيسية",
    boutique: "البوتيك",
    bizz: "بيز",
    analytics: "التحليلات",
    inventory: "المخزون",
    products: "المنتجات",
    orders: "الطلبات",
    suppliers: "الموردين",
    historique: "التاريخ",
    notification: "الإشعارات",
    cashier: "الصراف",
    settings: "الإعدادات",
    logout: "تسجيل الخروج",
    
    // Homepage Content
    hero_title: "إدارة أعمالك الذكية تبدأ هنا",
    hero_subtitle: "إيزي بيز يربط الموردين ورجال الأعمال، ويؤتمت إدارة المخزون والطلبات، ويساعدك على تنمية عملك بكفاءة",
    get_started: "ابدأ الآن",
    key_features: "الميزات الرئيسية",
    smart_supplier_matching: "مطابقة ذكية للموردين",
    smart_supplier_desc: "تواصل مع الموردين المناسبين باستخدام خوارزميات متقدمة للعثور على الشركاء التجاريين المثاليين لاحتياجاتك",
    automated_inventory: "مخزون آلي",
    automated_inventory_desc: "تتبع وإدارة مخزونك في الوقت الفعلي مع الأتمتة الذكية والتنبيهات",
    insightful_analytics: "تحليلات بصيرة",
    insightful_analytics_desc: "اتخذ قرارات مدروسة مع تحليلات الأعمال القوية والرؤى في الوقت الفعلي",
    
    // Supplier Benefits
    supplier_benefits: "فوائد الموردين",
    direct_access_title: "وصول مباشر للبوتيكات وتجار التجزئة",
    direct_access_desc: "لا وسطاء: بع مباشرة لأصحاب المتاجر والبوتيكات الذين يبحثون بنشاط عن المنتجات.\n\nوصول أوسع: اعرض كتالوجك فوراً لشبكة من الشركات المعتمدة التي تستخدم المنصة.",
    smart_order_management: "إدارة ذكية للطلبات",
    smart_order_desc: "لوحة تحكم مركزية لاستقبال وتأكيد وتتبع الطلبات في الوقت الفعلي.\n\nإشعارات للطلبات الجديدة ومواعيد التسليم وحالات الدفع.",
    promotional_tools: "أدوات ترويجية",
    promotional_tools_desc: "القدرة على تشغيل خصومات محدودة الوقت وعروض الحزم والقوائم المميزة.\n\nعرض المنتجات على الصفحة الرئيسية أو في الأقسام الموصى بها للبوتيكات.",
    
    // About & Testimonials
    about_easybizz: "حول إيزي بيز",
    about_desc: "إيزي بيز هي منصة ذكية مصممة لرجال الأعمال والتجار لتبسيط عمليات أعمالهم. نحن نساعد في تقليل التكاليف والتواصل مع شركاء موثوقين واتخاذ قرارات مدفوعة بالبيانات دون عناء",
    what_users_say: "ما يقوله مستخدمونا",
    
    // Contact
    contact_us: "اتصل بنا",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    location: "الموقع",
    
    // Authentication
    login: "تسجيل الدخول",
    register: "التسجيل",
    password: "كلمة المرور",
    email_placeholder: "أدخل بريدك الإلكتروني",
    password_placeholder: "أدخل كلمة المرور",
    login_subtitle: "سجل الدخول إلى حسابك",
    no_account: "ليس لديك حساب؟",
    have_account: "لديك حساب بالفعل؟",
    forgot_password: "نسيت كلمة المرور؟",
    back_to_home: "العودة للرئيسية",
    
    // Business Operations
    buy_products: "شراء المنتجات",
    buy_products_desc: "تصفح وشراء المنتجات من الموردين",
    view_analytics: "عرض التحليلات",
    view_analytics_desc: "راقب أداء عملك",
    inventory_management: "إدارة المخزون",
    inventory_management_desc: "تتبع وإدارة مخزونك",
    section: "القسم",
    section_under_development: "هذا القسم قيد التطوير",
    search_product: "البحث عن المنتجات...",
    previous_page: "الصفحة السابقة",
    add_product: "إضافة منتج",
    
    // Product Management
    product: "المنتج",
    reference: "المرجع",
    barcode: "الباركود",
    qty_stock: "كمية المخزون",
    qty_sold: "الكمية المباعة",
    alert: "تنبيه",
    buy_price: "سعر الشراء",
    sell_price_ht: "سعر البيع بدون ضريبة",
    sell_price_ttc: "سعر البيع شامل الضريبة",
    rotation_status: "حالة الدوران",
    rows_per_page: "صفوف لكل صفحة",
    cart: "السلة",
    
    // Orders
    order_id: "رقم الطلب",
    customer: "العميل",
    total: "المجموع",
    status: "الحالة",
    date: "التاريخ",
    processing: "قيد المعالجة",
    completed: "مكتمل",
    pending: "في الانتظار",
    view_details: "عرض التفاصيل",
    
    // Suppliers
    supplier_management: "إدارة الموردين",
    my_suppliers: "مورديّ",
    find_suppliers: "العثور على موردين",
    messages: "الرسائل",
    search_supplier: "البحث عن موردين...",
    filter_by_category: "تصفية حسب الفئة",
    all_products: "جميع المنتجات",
    beverages: "المشروبات",
    snacks: "الوجبات الخفيفة",
    dairy: "منتجات الألبان",
    cleaning: "التنظيف",
    view_profile: "عرض الملف الشخصي",
    message_supplier: "مراسلة المورد",
    no_suppliers_yet: "لا يوجد موردون بعد",
    no_suppliers_found: "لم يتم العثور على موردين",
    add_suppliers_to_get_started: "أضف موردين للبدء",
    try_different_search_terms: "جرب مصطلحات بحث مختلفة",
    select_conversation: "اختر محادثة",
    start_conversation: "ابدأ محادثة",
    supplier_contact: "جهة اتصال",
    add_to_contacts: "إضافة لجهات الاتصال",
    remove_from_contacts: "إزالة من جهات الاتصال",
    supplier_info: "معلومات المورد",
    description: "الوصف",
    years_experience: "سنوات الخبرة",
    minimum_order: "الحد الأدنى للطلب",
    delivery_time: "وقت التسليم",
    payment_terms: "شروط الدفع",
    supplier_products: "منتجات المورد",
    online: "متصل",
    offline: "غير متصل",
    last_seen: "آخر ظهور",
    type_message: "اكتب رسالة...",
    
    // Common Actions
    back: "رجوع",
    save: "حفظ",
    cancel: "إلغاء",
    edit: "تعديل",
    delete: "حذف",
    add: "إضافة",
    search: "بحث",
    filter: "تصفية",
    clear_filters: "مسح المرشحات",
    no_data: "لا توجد بيانات",
    loading: "جاري التحميل...",
    
    // Footer
    all_rights_reserved: "جميع الحقوق محفوظة إيزي بيز 2025"
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
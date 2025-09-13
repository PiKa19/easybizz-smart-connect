import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";

interface HomeNavigationGridProps {
  menuItems: Array<{ id: string; label: string; icon: React.ComponentType<{ className?: string }> }>;
  activeSection: string;
  setActiveSection: (id: string) => void;
  menuDescriptions: Record<string, string>;
}

const gradientMap: Record<string, string> = {
  home: "from-[#e0f2ff] to-[#f3faff]",
  boutique: "from-[#f6e5fd] to-[#f6faff]",
  bizz: "from-[#e4fbfb] to-[#f3faff]",
  analytics: "from-[#e0ebff] to-[#f3faff]",
  inventory: "from-[#e4f8ee] to-[#f3faff]",
  products: "from-[#fff2e5] to-[#f3faff]",
  orders: "from-[#fef7e0] to-[#f3faff]",
  suppliers: "from-[#ede5fd] to-[#f3faff]",
  historique: "from-[#e5f7f6] to-[#f3faff]",
  notification: "from-[#ffe5ed] to-[#f3faff]",
  cashier: "from-[#fff2e5] to-[#f3faff]",
  settings: "from-[#e9ecef] to-[#f7f8fa]",
};

const HomeNavigationGrid = ({
  menuItems,
  activeSection,
  setActiveSection,
  menuDescriptions
}) => (
  <div className="grid gap-4 lg:gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
    {menuItems.map((item) => {
      // If the item is the boutique, use custom icon and accent
      const isBoutique = item.id === "boutique";
      return (
        <Card
          key={item.id}
          className={`transition duration-200 hover:scale-[1.02] lg:hover:scale-[1.025] hover:shadow-xl cursor-pointer shadow-md border-0 h-36 lg:h-48 flex flex-col justify-between 
            ${activeSection === item.id ? 'ring-2 ring-[#0794FE]' : 'ring-0'} 
            bg-gradient-to-br ${gradientMap[item.id] || 'from-[#f5faff] to-[#e5eeff]'}`}
          onClick={() => setActiveSection(item.id)}
          style={{
            backgroundBlendMode: "lighten"
          }}
        >
          <CardContent className="flex flex-col items-center justify-center h-full p-4 lg:p-8 relative">

            <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-lg flex items-center justify-center mb-2 lg:mb-3 bg-white bg-opacity-80 shadow-md">
              {isBoutique ? (
                <ShoppingBag className="w-6 h-6 lg:w-8 lg:h-8 text-pink-500" strokeWidth={2.2} />
              ) : (
                <item.icon className="w-6 h-6 lg:w-8 lg:h-8 text-[#0794FE]" />
              )}
            </div>
            <h3 className="font-semibold text-gray-800 mb-1 text-sm lg:text-lg text-center">{item.label}</h3>
            <p className="text-xs text-gray-500 text-center hidden lg:block">{menuDescriptions[item.id]}</p>
          </CardContent>
        </Card>
      )
    })}
  </div>
);

export default HomeNavigationGrid;

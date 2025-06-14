
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

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

const HomeNavigationGrid: React.FC<HomeNavigationGridProps> = ({
  menuItems,
  activeSection,
  setActiveSection,
  menuDescriptions
}) => (
  <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
    {menuItems.map((item) => (
      <Card
        key={item.id}
        className={`transition duration-200 hover:scale-[1.025] hover:shadow-xl cursor-pointer shadow-md border-0 h-48 flex flex-col justify-between 
          ${activeSection === item.id ? 'ring-2 ring-[#0794FE]' : 'ring-0'} 
          bg-gradient-to-br ${gradientMap[item.id] || 'from-[#f5faff] to-[#e5eeff]'}`}
        onClick={() => setActiveSection(item.id)}
        style={{
          minHeight: "184px",
          backgroundBlendMode: "lighten"
        }}
      >
        <CardContent className="flex flex-col items-center justify-center h-full p-8 relative">
          <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-3 bg-white bg-opacity-80 shadow-md">
            <item.icon className="w-8 h-8 text-[#0794FE]" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-1 text-lg">{item.label}</h3>
          <p className="text-xs text-gray-500">{menuDescriptions[item.id]}</p>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default HomeNavigationGrid;


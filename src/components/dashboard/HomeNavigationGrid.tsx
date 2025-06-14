
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface HomeNavigationGridProps {
  menuItems: Array<{ id: string; label: string; icon: React.ComponentType<{ className?: string }> }>;
  activeSection: string;
  setActiveSection: (id: string) => void;
  menuDescriptions: Record<string, string>;
}

const HomeNavigationGrid: React.FC<HomeNavigationGridProps> = ({
  menuItems,
  activeSection,
  setActiveSection,
  menuDescriptions
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {menuItems.map((item) => (
      <Card
        key={item.id}
        className={`hover:shadow-lg cursor-pointer transition-shadow h-44 flex flex-col justify-between ${activeSection === item.id ? 'ring-2 ring-[#0794FE]' : ''}`}
        onClick={() => setActiveSection(item.id)}
      >
        <CardContent className="flex flex-col items-center text-center justify-center h-full p-6">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: "#F3F6FB" }}>
            <item.icon className="w-7 h-7 text-[#0794FE]" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-1 text-lg">{item.label}</h3>
          <p className="text-xs text-gray-500">{menuDescriptions[item.id]}</p>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default HomeNavigationGrid;


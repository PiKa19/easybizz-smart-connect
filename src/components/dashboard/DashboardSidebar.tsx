
import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface DashboardSidebarProps {
  menuItems: Array<{ id: string; label: string; icon: React.ComponentType<{ className?: string }> }>;
  activeSection: string;
  setActiveSection: (id: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  menuItems, activeSection, setActiveSection
}) => (
  <aside className="w-64 h-[calc(100vh-73px)] bg-gradient-to-b from-[#e0f1ff] to-[#f6fbff] shadow-sm">
    <nav className="p-4 space-y-2">
      {menuItems.map((item) => {
        const isBoutique = item.id === "boutique";
        return (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 
              ${activeSection === item.id
                ? 'bg-[#0794FE] text-white shadow-lg'
                : 'text-gray-700 hover:bg-[#e8f3fc] hover:text-[#0794FE]'}`
            }
          >
            {isBoutique ? (
              <ShoppingBag className="w-5 h-5 text-pink-500" strokeWidth={2.1} />
            ) : (
              <item.icon className="w-5 h-5" />
            )}
            <span className="font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  </aside>
);

export default DashboardSidebar;

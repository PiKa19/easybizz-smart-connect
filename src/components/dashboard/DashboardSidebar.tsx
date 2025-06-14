
import React from 'react';

interface DashboardSidebarProps {
  menuItems: Array<{ id: string; label: string; icon: React.ComponentType<{ className?: string }> }>;
  activeSection: string;
  setActiveSection: (id: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ menuItems, activeSection, setActiveSection }) => (
  <aside className="w-64 bg-white h-[calc(100vh-73px)] shadow-sm">
    <nav className="p-4 space-y-2">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveSection(item.id)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
            activeSection === item.id
              ? 'bg-[#0794FE] text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <item.icon className="w-5 h-5" />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  </aside>
);

export default DashboardSidebar;

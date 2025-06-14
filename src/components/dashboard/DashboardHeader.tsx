
import React from 'react';
import { Search, Bell, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LanguageSwitcher from '../LanguageSwitcher';

interface DashboardHeaderProps {
  daysLeft: number;
  onSubscriptionClick: () => void;
  onProfileOpen: () => void;
  onLogout: () => void;
  t: (key: string) => string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  daysLeft,
  onSubscriptionClick,
  onProfileOpen,
  onLogout,
  t
}) => (
  <header className="bg-white shadow-sm border-b">
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-4">
        <img
          src="/lovable-uploads/5142faa5-d964-4021-b411-2ea1ad268901.png"
          alt="EasyBizz Logo"
          className="h-8 w-auto"
        />
      </div>
      <div className="flex items-center gap-4">
        <button
          className="relative flex items-center rounded-lg px-3 py-1 bg-[#E1275C] text-white font-semibold text-sm shadow hover:bg-[#C91F4F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E1275C]"
          title="Your subscription days left"
          onClick={onSubscriptionClick}
          type="button"
        >
          {daysLeft} days left
        </button>
        <LanguageSwitcher />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={t('search_product')}
            className="w-64 pl-10"
          />
        </div>
        <Button variant="ghost" size="sm">
          <Bell className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onProfileOpen}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-[#0794FE] rounded-lg flex items-center justify-center text-white font-bold">
            B
          </div>
          <span className="hidden md:inline">Baraka</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">{t('logout')}</span>
        </Button>
      </div>
    </div>
  </header>
);

export default DashboardHeader;

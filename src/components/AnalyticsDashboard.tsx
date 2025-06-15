
import React from "react";
import SalesKPIs from "./analytics/SalesKPIs";
import InventoryKPIs from "./analytics/InventoryKPIs";
import CustomerKPIs from "./analytics/CustomerKPIs";
import ProfitabilityKPIs from "./analytics/ProfitabilityKPIs";
import FinancialKPIs from "./analytics/FinancialKPIs";
import TrendKPIs from "./analytics/TrendKPIs";
import OrderManagementKPIs from "./analytics/OrderManagementKPIs";
import StaffKPIs from "./analytics/StaffKPIs";

export default function AnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-blue-50 via-white to-white px-2 md:px-8 py-8 rounded-3xl">
      <div className="mb-6 text-3xl md:text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
        <span role="img" aria-label="chart" className="text-4xl">📊</span>
        Performance Management Dashboard
      </div>
      <div className="bg-white/70 shadow rounded-3xl p-6 mb-8 flex flex-wrap gap-4 items-center">
        {/* Filters UI */}
        <div>
          <label className="block text-[11px] text-gray-500 mb-1 font-bold uppercase">Date range</label>
          <select className="rounded-lg border-gray-200 px-3 py-1.5 bg-white shadow-sm font-semibold text-xs focus:ring-primary/40 transition">
            <option>This Week</option>
            <option>Last Week</option>
            <option>This Month</option>
            <option>Last Month</option>
          </select>
        </div>
        <div>
          <label className="block text-[11px] text-gray-500 mb-1 font-bold uppercase">Service</label>
          <select className="rounded-lg border-gray-200 px-3 py-1.5 bg-white shadow-sm font-semibold text-xs focus:ring-primary/40 transition">
            <option>All</option>
          </select>
        </div>
        <div>
          <label className="block text-[11px] text-gray-500 mb-1 font-bold uppercase">Posts</label>
          <select className="rounded-lg border-gray-200 px-3 py-1.5 bg-white shadow-sm font-semibold text-xs focus:ring-primary/40 transition">
            <option>All</option>
          </select>
        </div>
      </div>
      <div className="space-y-12 pb-10">
        <SalesKPIs />
        <InventoryKPIs />
        <CustomerKPIs />
        <ProfitabilityKPIs />
        <FinancialKPIs />
        <TrendKPIs />
        <OrderManagementKPIs />
        <StaffKPIs />
      </div>
    </div>
  );
}

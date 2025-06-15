import React from "react";
import {
  BarChart,
  LineChart,
  AreaChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

// Dummy data remains
const categories = [ "Beverages", "Dairy", "Bakery", "Household", "Snacks", "Produce" ];
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min: number, max: number, decimals = 2) => +(Math.random() * (max - min) + min).toFixed(decimals);

const kpis = {
  sales: {
    totalSales: randomInt(80000, 250000),
    salesByCategory: categories.map((c) => ({ category: c, amount: randomInt(2000, 25000) })),
    salesBySupplier: [
      { supplier: "FRS Semmar", amount: randomInt(10000, 50000) },
      { supplier: "Top Fresh", amount: randomInt(10000, 50000) },
      { supplier: "Dairy Star", amount: randomInt(10000, 50000) },
    ],
    avgBasket: randomFloat(5, 35),
    topSelling: [
      { name: "Huile 5L elio", sales: 400 },
      { name: "Lait 1L Candia", sales: 320 },
      { name: "Coca-Cola 1L", sales: 275 },
    ],
    underperforming: [
      { name: "Yaourt Vanille", sales: 23 },
      { name: "Dentifrice Colgate", sales: 19 },
    ],
  },
  financial: {
    revenue: 24500,
    revenueChange: 0.13,
    profitMargin: 9.5,
    profitMarginChange: 0.01,
    roi: 19.1,
    roiChange: 0.08,
    clv: 2176,
    clvChange: 0.023,
  },
  metrics: {
    ebitda: Array(19).fill(0).map((_, i) => ({
      x: i + 1,
      layer1: randomInt(1000, 2000),
      layer2: randomInt(1200, 3100),
    })),
    csat: [
      { time: "09:00", score: 1 },
      { time: "10:00", score: 2 },
      { time: "11:00", score: 1.5 },
      { time: "12:00", score: 3 },
      { time: "13:00", score: 2 },
      { time: "14:00", score: 2.5 },
      { time: "15:00", score: 3 },
    ]
  },
  trends: {
    netProfit: Array(8).fill(0).map((_, i) => ({
      x: i+1, value: randomInt(4,12)
    })),
    debtEquity: Array(8).fill(0).map((_, i) => ({
      x: i+1, green: randomInt(2,5), gray: randomInt(2,7)
    })),
  }
};

const formatDZD = (amount: number) =>
  amount.toLocaleString("en-US", { style: "currency", currency: "DZD", maximumFractionDigits: 0 }).replace("DZD", "DZD");

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-gray-100 p-6 transition-all hover:shadow-xl hover:scale-[1.025] ${className || ""}`}>
    {children}
  </div>
);

const StatCard = ({
  label, value, change, isMoney, unit
}: {
  label: string,
  value: number | string,
  change?: number,
  isMoney?: boolean,
  unit?: string,
}) => (
  <Card className="flex flex-col gap-2 items-start min-w-[130px] border-0 ring-1 ring-primary/10">
    <span className="text-xs font-medium text-primary/90">{label}</span>
    <span className="text-3xl font-bold text-gray-900 drop-shadow-sm">
      {isMoney ? (typeof value === "number" ? "$" + value : value) : value}
      {unit && <span className="ml-1 text-lg text-gray-500">{unit}</span>}
    </span>
    {typeof change === "number" && (
      <span className={`flex items-center text-xs font-semibold ${change > 0 ? "text-green-500" : "text-gray-400"} transition-all`}>
        <span className="inline-block animate-pulse">{change > 0 ? "▲" : "▼"}</span>
        &nbsp;{Math.abs(change * 100).toFixed(1)}%
        <span className="ml-1 text-gray-400 font-normal">vs prev 7d</span>
      </span>
    )}
  </Card>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-bold mb-2 text-gray-800/80 text-lg tracking-wide flex items-center gap-2">
    <span className="inline-block w-1 h-4 bg-primary/50 rounded-full mr-2" />
    {children}
  </h3>
);

const AnalyticsDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-50 via-white to-white rounded-3xl px-2 md:px-8 py-6 animate-fade-in">

      {/* Header */}
      <div className="mb-2">
        <div className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">Performance Management Dashboard</div>
        {/* Filter Row */}
        <div className="my-3 flex flex-col md:flex-row gap-3">
          <div>
            <label className="block text-[11px] text-gray-500 mb-1 font-bold uppercase">Auto date range</label>
            <select className="rounded-lg border-gray-200 px-3 py-1.5 bg-white shadow-sm font-semibold text-sm focus:ring-primary/40 transition">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] text-gray-500 mb-1 font-bold uppercase">Services</label>
            <select className="rounded-lg border-gray-200 px-3 py-1.5 bg-white shadow-sm font-semibold text-sm focus:ring-primary/40 transition">
              <option>All</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] text-gray-500 mb-1 font-bold uppercase">Posts</label>
            <select className="rounded-lg border-gray-200 px-3 py-1.5 bg-white shadow-sm font-semibold text-sm focus:ring-primary/40 transition">
              <option>All</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-7 mt-4">
        {/* Main Analytics Charts (left section 4/6) */}
        <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-7">
          {/* Net Profit Margin */}
          <Card>
            <SectionTitle>Net Profit Margin</SectionTitle>
            <ResponsiveContainer width="100%" height={170}>
              <BarChart data={kpis.trends.netProfit} barGap={8}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#EFEFEF" />
                <XAxis dataKey="x" axisLine={false} tickLine={false} tick={{ fill: "#989CA9", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#989CA9", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#4AC47E" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          {/* Debt-to-Equity Ratio (composite) */}
          <Card>
            <SectionTitle>Debt-to-Equity Ratio</SectionTitle>
            <ResponsiveContainer width="100%" height={170}>
              <BarChart data={kpis.trends.debtEquity}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#EFEFEF" />
                <XAxis dataKey="x" axisLine={false} tickLine={false} tick={{ fill: "#989CA9", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#989CA9", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="gray" stackId="a" fill="#DDDDE0" radius={[6, 6, 0, 0]} />
                <Bar dataKey="green" stackId="a" fill="#6EC2C1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* EBITDA Area Chart (row 2, spans 2 cols) */}
          <div className="md:col-span-2">
            <Card>
              <SectionTitle>
                Earnings Before Interest, Taxes, Depreciation &amp; Amortization (EBITDA)
              </SectionTitle>
              <ResponsiveContainer width="100%" height={210}>
                <AreaChart data={kpis.metrics.ebitda}>
                  <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#EFEFEF" />
                  <XAxis dataKey="x" axisLine={false} tickLine={false} tick={{ fill: "#989CA9", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#989CA9", fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="layer1" stackId="1" stroke="#7DB5FF" fill="#C1DBFF" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="layer2" stackId="1" stroke="#A488FF" fill="#E8E2FF" fillOpacity={0.4} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
        {/* KPIs right column (2/6) */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-7">
          <StatCard
            label="Revenue"
            value={kpis.financial.revenue}
            change={kpis.financial.revenueChange}
            isMoney
          />
          <StatCard
            label="Avg Profit Margin"
            value={kpis.financial.profitMargin + "%"}
            change={kpis.financial.profitMarginChange}
          />
          <StatCard
            label="Return On Investment (ROI)"
            value={kpis.financial.roi + "%"}
            change={kpis.financial.roiChange}
          />
          <StatCard
            label="CLV"
            value={formatDZD(kpis.financial.clv)}
            change={kpis.financial.clvChange}
          />
        </div>
        {/* Row below: CSAT line chart */}
        <div className="lg:col-span-4">
          <Card>
            <SectionTitle>Customer Satisfaction Score (CSAT)</SectionTitle>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={kpis.metrics.csat}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#EFEFEF" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#989CA9", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#989CA9", fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#4787FC" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

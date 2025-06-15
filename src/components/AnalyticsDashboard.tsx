
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
  <div className={`bg-white rounded-2xl shadow border border-gray-100 p-6 transition hover:shadow-lg ${className || ""}`}>{children}</div>
);

const StatCard = ({
  label, value, change, isMoney, unit
}: {
  label: string,
  value: number|string,
  change?: number,
  isMoney?: boolean,
  unit?: string,
}) => (
  <Card className="flex flex-col gap-2 items-start min-w-[125px]">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-3xl font-semibold text-gray-800">
      {isMoney ? (typeof value === "number" ? `$${value}` : value) : value}
      {unit && <span className="ml-1 text-lg text-gray-500">{unit}</span>}
    </span>
    {typeof change === "number" && (
      <span className={`flex items-center text-xs font-medium ${change > 0 ? "text-green-500" : "text-gray-400"}`}>
        {change > 0 ? "↑" : "↓"} {Math.abs(change*100).toFixed(1)}%
        <span className="ml-1 text-gray-400 font-normal">vs previous 7 days</span>
      </span>
    )}
  </Card>
);

const AnalyticsDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 rounded-2xl p-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Performance Management Dashboard
        </div>
        {/* Filter Row */}
        <div className="my-3 flex flex-col sm:flex-row gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Auto date range</label>
            <select className="rounded border-gray-200 px-3 py-1.5 bg-white shadow">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Services</label>
            <select className="rounded border-gray-200 px-3 py-1.5 bg-white shadow">
              <option>All</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Posts</label>
            <select className="rounded border-gray-200 px-3 py-1.5 bg-white shadow">
              <option>All</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mt-2">
        {/* Main Analytics Charts (left section 4/6) */}
        <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Net Profit Margin */}
          <Card>
            <h3 className="font-semibold mb-2 text-gray-700">Net Profit Margin</h3>
            <ResponsiveContainer width="100%" height={170}>
              <BarChart data={kpis.trends.netProfit} barGap={8}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#ECECEC" />
                <XAxis dataKey="x" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#66C27C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          {/* Debt-to-Equity Ratio (composite) */}
          <Card>
            <h3 className="font-semibold mb-2 text-gray-700">Debt-to-Equity Ratio</h3>
            <ResponsiveContainer width="100%" height={170}>
              <BarChart data={kpis.trends.debtEquity}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#ECECEC" />
                <XAxis dataKey="x" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="gray" stackId="a" fill="#C6C6C6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="green" stackId="a" fill="#66C27C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* EBITDA Area Chart (row 2, spans 2 cols) */}
          <div className="md:col-span-2">
            <Card>
              <h3 className="font-semibold mb-2 text-gray-700">Earnings Before Interest, Taxes, Depreciation, and Amortization (EBITDA)</h3>
              <ResponsiveContainer width="100%" height={210}>
                <AreaChart data={kpis.metrics.ebitda}>
                  <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#ECECEC" />
                  <XAxis dataKey="x" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="layer1" stackId="1" stroke="#7998FF" fill="#C7D8FF" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="layer2" stackId="1" stroke="#867AE9" fill="#D6C9FA" fillOpacity={0.4} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
        {/* KPIs right column (2/6) */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-6">
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
            <h3 className="font-semibold mb-2 text-gray-700">Customer Satisfaction Score (CSAT)</h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={kpis.metrics.csat}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#ECECEC" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#4787FC" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

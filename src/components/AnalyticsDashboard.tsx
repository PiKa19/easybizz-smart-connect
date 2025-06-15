
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomFloat = (min: number, max: number, decimals = 2) =>
  +(Math.random() * (max - min) + min).toFixed(decimals);

const categories = [
  "Beverages",
  "Dairy",
  "Bakery",
  "Household",
  "Snacks",
  "Produce",
];

// Dummy KPIs
const kpis = {
  sales: {
    totalSales: randomInt(80000, 250000),
    salesByCategory: categories.map((c) => ({
      category: c,
      amount: randomInt(2000, 25000),
    })),
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
  inventory: {
    stockLevels: 5900,
    fastMoving: ["Coca-Cola 1L", "Biscottes Croquantes"],
    slowMoving: ["Margarine 250g", "Yaourt Vanille"],
    outOfStock: ["Savon Liquide 1L"],
    nearExpiry: ["Lait 1L Candia (4 days)"],
    restock: ["Eau minérale 0.5L", "Riz 1kg"],
  },
  customers: {
    totalCustomers: 1340,
    repeatCustomers: 487,
    avgOrderFreq: randomFloat(1.7, 4),
    clv: randomInt(5400, 18000),
    satisfaction: randomFloat(3.5, 5).toFixed(2),
  },
  profitability: {
    grossProfit: randomInt(39000, 78000),
    profitMargin: randomFloat(15, 37),
    netIncome: randomInt(20000, 45000),
    breakEven: randomInt(10000, 29000),
  },
  financial: {
    pendingPayments: randomInt(9000, 24000),
    overdueInvoices: randomInt(3, 21),
    paymentsByMethod: [
      { type: "Cash", amount: 54000 },
      { type: "Card", amount: 32000 },
      { type: "Cheque", amount: 9700 },
    ],
    refundRate: randomFloat(0.5, 5),
  },
  trends: {
    salesData: Array(14)
      .fill(0)
      .map((_, i) => ({
        date: `Day ${i + 1}`,
        Sales: randomInt(1800, 6000),
      })),
    seasonalData: [
      { month: "Jan", sales: 18000 },
      { month: "Feb", sales: 15200 },
      { month: "Mar", sales: 16770 },
      { month: "Apr", sales: 18550 },
      { month: "May", sales: 23300 },
      { month: "Jun", sales: 21000 },
      { month: "Jul", sales: 22500 },
    ],
    orderVolume: [
      { week: "W1", orders: 42 },
      { week: "W2", orders: 56 },
      { week: "W3", orders: 67 },
      { week: "W4", orders: 40 },
    ],
  },
  orders: {
    totalOrders: 399,
    completed: 340,
    cancelled: 25,
    returned: 10,
    avgDelivery: 1.7,
  },
  staff: {
    salesPerCashier: [
      { name: "Ahmed", sales: 113 },
      { name: "Farida", sales: 140 },
    ],
    activityLogs: 76,
    refundsPerCashier: [
      { name: "Ahmed", refunds: 2 },
      { name: "Farida", refunds: 1 },
    ],
  },
};

const sectionCard =
  "rounded-2xl shadow-xl border border-blue-100 p-6 bg-white animate-fade-in-scale";

// Small helper to format numbers DZD
const formatDZD = (amount: number) =>
  amount.toLocaleString("en-US", { style: "currency", currency: "DZD", maximumFractionDigits: 0 }).replace("DZD", "DZD");

const AnalyticsDashboard = () => {
  return (
    <div className="space-y-7">
      {/* 1. Sales */}
      <div className={sectionCard}>
        <CardHeader>
          <CardTitle>🛍️ Sales KPIs</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <CardContent>
            <CardTitle className="text-lg">Total Sales</CardTitle>
            <div className="text-2xl font-bold mt-2">{formatDZD(kpis.sales.totalSales)}</div>
          </CardContent>
          <CardContent>
            <CardTitle className="text-lg">Average Basket Size</CardTitle>
            <div className="text-2xl font-bold mt-2">{kpis.sales.avgBasket} items</div>
          </CardContent>
          <CardContent>
            <CardTitle className="text-lg">Top-Selling Products</CardTitle>
            <ul className="mt-2 text-sm">
              {kpis.sales.topSelling.map((item) => (
                <li key={item.name}>✓ {item.name} ({item.sales})</li>
              ))}
            </ul>
          </CardContent>
          <CardContent>
            <CardTitle className="text-lg">Underperforming Products</CardTitle>
            <ul className="mt-2 text-sm">
              {kpis.sales.underperforming.map((item) => (
                <li key={item.name}>⛔ {item.name} ({item.sales})</li>
              ))}
            </ul>
          </CardContent>
        </div>
        <div className="mt-5 flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2 h-40">
            <CardDescription>Sales by Category</CardDescription>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={kpis.sales.salesByCategory}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#0794FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 h-40">
            <CardDescription>Sales by Supplier</CardDescription>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={kpis.sales.salesBySupplier}>
                <XAxis dataKey="supplier" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#09AF8A" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* 2. Inventory */}
      <div className={sectionCard}>
        <CardHeader>
          <CardTitle>📦 Inventory KPIs</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          <CardContent>
            <CardTitle className="text-lg">Current Stock Levels</CardTitle>
            <div className="text-2xl font-bold mt-2">{kpis.inventory.stockLevels}</div>
          </CardContent>
          <CardContent>
            <CardTitle className="text-lg">Fast/Slow Movers</CardTitle>
            <div className="mt-2 text-sm">
              <strong>Fast:</strong> {kpis.inventory.fastMoving.join(", ")}<br />
              <strong>Slow:</strong> {kpis.inventory.slowMoving.join(", ")}
            </div>
          </CardContent>
          <CardContent>
            <CardTitle className="text-lg">Restock / Alerts</CardTitle>
            <div className="mt-2 text-sm">
              <span>OOS: {kpis.inventory.outOfStock.join(", ") || "None"}</span>
              <br />
              <span>Near Exp: {kpis.inventory.nearExpiry.join(", ") || "None"}</span>
              <br />
              <span>Restock: {kpis.inventory.restock.join(", ")}</span>
            </div>
          </CardContent>
        </div>
      </div>
      {/* 3. Customers */}
      <div className={sectionCard}>
        <CardHeader>
          <CardTitle>👥 Customer KPIs</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <CardContent>
            <CardTitle className="text-lg">Total Customers</CardTitle>
            <div className="text-2xl font-bold mt-2">{kpis.customers.totalCustomers}</div>
          </CardContent>
          <CardContent>
            <CardTitle className="text-lg">Repeat Customers</CardTitle>
            <div className="text-2xl font-bold mt-2">{kpis.customers.repeatCustomers}</div>
          </CardContent>
          <CardContent>
            <CardTitle className="text-lg">Avg Order Freq</CardTitle>
            <div className="text-2xl font-bold mt-2">{kpis.customers.avgOrderFreq} / mo</div>
          </CardContent>
          <CardContent>
            <CardTitle className="text-lg">CLV</CardTitle>
            <div className="text-2xl font-bold mt-2">{formatDZD(kpis.customers.clv)}</div>
          </CardContent>
          <CardContent>
            <CardTitle className="text-lg">Satisfaction</CardTitle>
            <div className="text-2xl font-bold mt-2">{kpis.customers.satisfaction} / 5</div>
          </CardContent>
        </div>
      </div>
      {/* 4. Profitability */}
      <div className={sectionCard}>
        <CardHeader>
          <CardTitle>📈 Profitability KPIs</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <CardContent>
            <CardTitle className="text-lg">Gross Profit</CardTitle>
            <div className="text-2xl font-bold mt-2">{formatDZD(kpis.profitability.grossProfit)}</div>
          </CardContent>
          <CardContent>
            <CardTitle className="text-lg">Margin per Product</CardTitle>
            <div className="text-2xl font-bold mt-2">{kpis.profitability.profitMargin}%</div>
          </CardContent>
          <CardContent>
            <CardTitle className="text-lg">Net Income</CardTitle>
            <div className="text-2xl font-bold mt-2">{formatDZD(kpis.profitability.netIncome)}</div>
          </CardContent>
          <CardContent>
            <CardTitle className="text-lg">Break-Even Point</CardTitle>
            <div className="text-2xl font-bold mt-2">{formatDZD(kpis.profitability.breakEven)}</div>
          </CardContent>
        </div>
      </div>
      {/* 5. Financial */}
      <div className={sectionCard}>
        <CardHeader>
          <CardTitle>💸 Financial KPIs</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <CardContent>
            <CardTitle className="text-lg">Pending Payments</CardTitle>
            <div className="text-2xl font-bold mt-2">{formatDZD(kpis.financial.pendingPayments)}</div>
          </CardContent>
          <CardContent>
            <CardTitle className="text-lg">Overdue Invoices</CardTitle>
            <div className="text-2xl font-bold mt-2">{kpis.financial.overdueInvoices}</div>
          </CardContent>
          <CardContent>
            <CardTitle className="text-lg">Refund Rate</CardTitle>
            <div className="text-2xl font-bold mt-2">{kpis.financial.refundRate}%</div>
          </CardContent>
          <CardContent>
            <CardTitle className="text-lg">Payments by Method</CardTitle>
            <ul className="mt-2 text-sm">
              {kpis.financial.paymentsByMethod.map((item) => (
                <li key={item.type}>
                  {item.type}: {formatDZD(item.amount)}
                </li>
              ))}
            </ul>
          </CardContent>
        </div>
      </div>
      {/* 6. Trends */}
      <div className={sectionCard}>
        <CardHeader>
          <CardTitle>📅 Trend KPIs</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-44">
            <CardDescription>Daily Sales (2 Weeks)</CardDescription>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={kpis.trends.salesData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="Sales" stroke="#0794FE" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="h-44">
            <CardDescription>Order Volume Trends</CardDescription>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={kpis.trends.orderVolume}>
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#09AF8A" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="h-44">
            <CardDescription>Seasonal Sales</CardDescription>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={kpis.trends.seasonalData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#fbbf24" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* 7. Order Management */}
      <div className={sectionCard}>
        <CardHeader>
          <CardTitle>🧾 Order Management KPIs</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <CardContent>
            <CardTitle className="text-lg">Total Orders</CardTitle>
            <div className="text-2xl font-bold mt-2">{kpis.orders.totalOrders}</div>
          </CardContent>
          <CardContent>
            <CardTitle className="text-lg">Completed vs Cancelled</CardTitle>
            <div className="mt-2 text-sm">
              <span className="text-green-600">✔ {kpis.orders.completed}</span>{" "}
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-red-600">⛔ {kpis.orders.cancelled}</span>
            </div>
          </CardContent>
          <CardContent>
            <CardTitle className="text-lg">Return Rate</CardTitle>
            <div className="text-2xl font-bold mt-2">{kpis.orders.returned}</div>
          </CardContent>
          <CardContent>
            <CardTitle className="text-lg">Avg Delivery Time</CardTitle>
            <div className="text-2xl font-bold mt-2">{kpis.orders.avgDelivery} days</div>
          </CardContent>
        </div>
      </div>
      {/* 8. Staff KPIs */}
      <div className={sectionCard}>
        <CardHeader>
          <CardTitle>👨‍💼 Staff/Cashier KPIs</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CardContent>
            <CardTitle className="text-lg">Sales per Cashier</CardTitle>
            <ul className="mt-2 text-sm">
              {kpis.staff.salesPerCashier.map((c) => (
                <li key={c.name}>
                  {c.name}: {c.sales}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardContent>
            <CardTitle className="text-lg">Activity Logs</CardTitle>
            <div className="text-2xl font-bold mt-2">{kpis.staff.activityLogs}</div>
          </CardContent>
          <CardContent>
            <CardTitle className="text-lg">Refunds per Cashier</CardTitle>
            <ul className="mt-2 text-sm">
              {kpis.staff.refundsPerCashier.map((c) => (
                <li key={c.name}>
                  {c.name}: {c.refunds}
                </li>
              ))}
            </ul>
          </CardContent>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;


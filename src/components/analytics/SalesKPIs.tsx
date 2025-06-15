
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const productCategories = ["Beverages", "Dairy", "Bakery", "Produce", "Snacks", "Household"];
const suppliers = ["FRS Semmar", "Top Fresh", "Dairy Star", "ElMazraa"];

const categorySales = productCategories.map(cat => ({
  name: cat,
  sales: randomInt(4000, 30000),
}));

const supplierSales = suppliers.map(sup => ({
  name: sup,
  sales: randomInt(9000, 40000),
}));

const topProducts = [
  { name: "Huile 5L elio", sales: randomInt(350, 600) },
  { name: "Lait 1L Candia", sales: randomInt(200, 400) },
  { name: "Coca-Cola 1L", sales: randomInt(150, 350) },
];

const underProducts = [
  { name: "Yaourt Vanille", sales: randomInt(10, 35) },
  { name: "Dentifrice Colgate", sales: randomInt(5, 30) },
];

export default function SalesKPIs() {
  return (
    <section>
      <h2 className="flex gap-2 text-lg font-bold mb-4">
        Sales KPIs
      </h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="text-sm font-semibold text-gray-500 mb-2">Total Sales</div>
          <div className="text-3xl font-bold text-indigo-600">
            {randomInt(90000, 210000).toLocaleString()} DZD
          </div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="text-sm font-semibold text-gray-500 mb-2">Avg. Basket Size</div>
          <div className="text-3xl font-bold text-purple-600">
            {randomInt(8, 40)} DZD
          </div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="text-sm font-semibold text-gray-500 mb-2">Top-Selling Products</div>
          <ul>
            {topProducts.map((p) => (
              <li key={p.name} className="flex justify-between text-base">
                <span>{p.name}</span>
                <span className="font-semibold">{p.sales}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="text-sm font-semibold text-gray-500 mb-2">Underperforming Products</div>
          <ul>
            {underProducts.map((p) => (
              <li key={p.name} className="flex justify-between text-base">
                <span>{p.name}</span>
                <span className="font-semibold">{p.sales}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500 mb-2">Sales by Product Category</div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categorySales} margin={{ top: 5, right: 20, left: 10, bottom: 20 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500 mb-2">Sales by Supplier</div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={supplierSales} margin={{ top: 5, right: 20, left: 10, bottom: 20 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#06b6d4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

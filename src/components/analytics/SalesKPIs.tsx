
import React from "react";

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const productCategories = ["Beverages", "Dairy", "Bakery", "Produce", "Snacks", "Household"];
const suppliers = ["FRS Semmar", "Top Fresh", "Dairy Star", "ElMazraa"];

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
       <span role="img" aria-label="sales">🛍️</span> Sales KPIs
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
          <div className="font-semibold text-gray-500">Sales by Product Category</div>
          <ul className="mt-1">{productCategories.map(cat =>
            <li key={cat} className="flex justify-between">
              <span>{cat}</span>
              <span className="font-semibold">{randomInt(4000, 30000)} DZD</span>
            </li>
          )}</ul>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500">Sales by Supplier</div>
          <ul className="mt-1">{suppliers.map(sup =>
            <li key={sup} className="flex justify-between">
              <span>{sup}</span>
              <span className="font-semibold">{randomInt(9000, 40000)} DZD</span>
            </li>
          )}</ul>
        </div>
      </div>
    </section>
  );
}

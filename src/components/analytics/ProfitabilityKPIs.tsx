
import React from "react";
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function ProfitabilityKPIs() {
  return (
    <section>
      <h2 className="flex gap-2 text-lg font-bold mb-4">
        Profitability KPIs
      </h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="text-sm font-semibold text-gray-500 mb-2">Gross Profit</div>
          <div className="text-3xl font-bold text-green-600">{randomInt(20000, 80000).toLocaleString()} DZD</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="text-sm font-semibold text-gray-500 mb-2">Profit Margin per Product</div>
          <div className="text-3xl font-bold text-purple-600">{randomInt(9, 35)}%</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="text-sm font-semibold text-gray-500 mb-2">Net Income</div>
          <div className="text-3xl font-bold text-blue-700">{randomInt(7000, 54000).toLocaleString()} DZD</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="text-sm font-semibold text-gray-500 mb-2">Break-Even Point</div>
          <div className="text-3xl font-bold text-orange-600">{randomInt(31000, 60000).toLocaleString()} DZD</div>
        </div>
      </div>
    </section>
  );
}

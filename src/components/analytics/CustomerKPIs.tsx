
import React from "react";

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function CustomerKPIs() {
  return (
    <section>
      <h2 className="flex gap-2 text-lg font-bold mb-4">
        <span role="img" aria-label="customers">👥</span> Customer KPIs
      </h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500">Total Customers</div>
          <div className="text-3xl font-bold text-indigo-600">{randomInt(900, 3200)}</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500">Repeat Customers</div>
          <div className="text-3xl font-bold text-green-600">{randomInt(350, 1500)}</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500">Avg. Order Frequency</div>
          <div className="text-3xl font-bold text-purple-600">{randomInt(1, 4)} orders/mo</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500">Customer Lifetime Value (CLV)</div>
          <div className="text-3xl font-bold text-yellow-600">{randomInt(1800, 6000)} DZD</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500">Client Satisfaction Score</div>
          <div className="text-3xl font-bold text-blue-600">{randomInt(70, 99)}%</div>
        </div>
      </div>
    </section>
  );
}

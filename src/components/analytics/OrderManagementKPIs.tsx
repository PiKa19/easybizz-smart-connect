
import React from "react";
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function OrderManagementKPIs() {
  return (
    <section>
      <h2 className="flex gap-2 text-lg font-bold mb-4">
        Order Management KPIs
      </h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500">Total Orders</div>
          <div className="text-3xl font-bold text-indigo-600">{randomInt(900, 5100)}</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500">Completed vs Cancelled Orders</div>
          <div className="text-xl font-bold">
            <span className="text-green-600">{randomInt(700, 5000)}</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-red-500">{randomInt(5, 75)}</span>
          </div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500">Return Rate</div>
          <div className="text-3xl font-bold text-orange-600">{randomInt(1, 7)}%</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500">Avg. Delivery Time</div>
          <div className="text-3xl font-bold text-blue-600">{randomInt(1, 4)}d</div>
        </div>
      </div>
    </section>
  );
}

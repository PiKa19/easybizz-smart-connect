
import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const orderFrequency = [
  { frequency: "1/mo", count: randomInt(800, 1000) },
  { frequency: "2/mo", count: randomInt(700, 900) },
  { frequency: "3/mo", count: randomInt(500, 800) },
  { frequency: "4/mo", count: randomInt(200, 600) },
];

export default function CustomerKPIs() {
  return (
    <section>
      <h2 className="flex gap-2 text-lg font-bold mb-4">Customer KPIs</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500">Total Customers</div>
          <div className="text-3xl font-bold text-indigo-600">{randomInt(900, 3200)}</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500">Repeat Customers</div>
          <div className="text-3xl font-bold text-green-600">{randomInt(350, 1500)}</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4 col-span-2">
          <div className="font-semibold text-gray-500 mb-2">Avg. Order Frequency</div>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderFrequency}>
                <XAxis dataKey="frequency" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#f59e42" />
              </BarChart>
            </ResponsiveContainer>
          </div>
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

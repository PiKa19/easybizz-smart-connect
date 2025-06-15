
import React from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const trends = [
  { period: "Day", value: randomInt(1800, 7100) },
  { period: "Week", value: randomInt(11000, 48000) },
  { period: "Month", value: randomInt(52000, 210000) },
  { period: "Season", value: randomInt(8000, 23000) },
  { period: "Order Vol.", value: randomInt(400, 1200) }
];

export default function TrendKPIs() {
  return (
    <section>
      <h2 className="flex gap-2 text-lg font-bold mb-4">
        Trend KPIs
      </h2>
      <div className="bg-white/80 rounded-xl shadow p-4 mb-4">
        <div className="font-semibold text-gray-500 mb-2">Sales Trend</div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trends}>
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} name="Sales" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {trends.map((t) =>
          <div key={t.period} className="bg-white/80 rounded-xl shadow p-4">
            <div className="font-semibold text-gray-500">{t.period} Sales/Volume</div>
            <div className="text-3xl font-bold text-indigo-600">{t.value.toLocaleString()}</div>
          </div>
        )}
      </div>
    </section>
  );
}

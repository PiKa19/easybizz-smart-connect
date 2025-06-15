
import React from "react";
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const trends = [
  { label: "Daily Sales", value: randomInt(1800, 7100) },
  { label: "Weekly Sales", value: randomInt(11000, 48000) },
  { label: "Monthly Sales", value: randomInt(52000, 210000) },
  { label: "Seasonal Trends", value: randomInt(8000, 23000) },
  { label: "Order Volume Trends", value: randomInt(400, 1200) }
];

export default function TrendKPIs() {
  return (
    <section>
      <h2 className="flex gap-2 text-lg font-bold mb-4">
        <span role="img" aria-label="trends">📅</span> Trend KPIs
      </h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {trends.map((t) =>
          <div key={t.label} className="bg-white/80 rounded-xl shadow p-4">
            <div className="font-semibold text-gray-500">{t.label}</div>
            <div className="text-3xl font-bold text-indigo-600">{t.value.toLocaleString()}</div>
          </div>
        )}
      </div>
    </section>
  );
}

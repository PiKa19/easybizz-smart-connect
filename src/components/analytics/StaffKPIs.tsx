
import React from "react";
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const cashiers = ["Amine", "Sonia", "Karim", "Ines"];
const logs = ["10:03 Sale Amine", "10:05 Refund Ines", "10:08 Sale Sonia"];

export default function StaffKPIs() {
  return (
    <section>
      <h2 className="flex gap-2 text-lg font-bold mb-4">
        <span role="img" aria-label="staff">👨‍💼</span> Staff/Cashier KPIs
      </h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500">Sales per Cashier</div>
          <ul>
            {cashiers.map(name =>
              <li key={name} className="flex justify-between">
                <span>{name}</span>
                <span className="font-bold text-indigo-600">{randomInt(110, 800)}</span>
              </li>
            )}
          </ul>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500">Cashier Activity Logs</div>
          <ul>
            {logs.map(item =>
              <li key={item}>{item}</li>
            )}
          </ul>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500">Refunds per Cashier</div>
          <ul>
            {cashiers.map(name =>
              <li key={name} className="flex justify-between">
                <span>{name}</span>
                <span className="font-bold text-blue-600">{randomInt(0, 8)}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

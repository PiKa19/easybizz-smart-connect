
import React from "react";
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function FinancialKPIs() {
  return (
    <section>
      <h2 className="flex gap-2 text-lg font-bold mb-4">
        <span role="img" aria-label="financial">💸</span> Financial KPIs
      </h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500">Pending Payments</div>
          <div className="text-3xl font-bold text-orange-500">{randomInt(2, 17)}</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500">Overdue Invoices</div>
          <div className="text-3xl font-bold text-red-600">{randomInt(0, 7)}</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500">Payments by Method</div>
          <ul>
            <li className="flex justify-between"><span>Cash</span><span>{randomInt(30, 90)}%</span></li>
            <li className="flex justify-between"><span>Card</span><span>{randomInt(5, 45)}%</span></li>
          </ul>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500">Refund Rate</div>
          <div className="text-3xl font-bold text-purple-600">{randomInt(1, 7)}%</div>
        </div>
      </div>
    </section>
  );
}

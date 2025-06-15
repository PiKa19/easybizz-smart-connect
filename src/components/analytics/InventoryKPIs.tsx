
import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const stockList = [
  { name: "Lait 1L Candia", stock: randomInt(10, 80), movement: randomInt(5, 20) },
  { name: "Coca-Cola 1L", stock: randomInt(0, 45), movement: randomInt(2, 7) },
  { name: "Huile 5L elio", stock: randomInt(5, 150), movement: randomInt(1, 10) }
];

const fastMoving = stockList.filter(item => item.movement > 7);
const slowMoving = stockList.filter(item => item.movement <= 7);

export default function InventoryKPIs() {
  return (
    <section>
      <h2 className="flex gap-2 text-lg font-bold mb-4">
        Inventory KPIs
      </h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="text-sm font-semibold text-gray-500 mb-2">Current Stock Levels</div>
          <ul>
            {stockList.map(item =>
              <li key={item.name} className="flex justify-between">
                <span>{item.name}</span>
                <span className={`font-bold ${item.stock < 10 ? 'text-red-500' : 'text-green-600'}`}>{item.stock}</span>
              </li>
            )}
          </ul>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="text-sm font-semibold text-gray-500 mb-2">Stock Movement</div>
          <div className="h-36 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockList}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="movement" fill="#6366f1" name="Movement per week" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="text-sm font-semibold text-gray-500 mb-2">Out-of-Stock Alerts</div>
          <div className="text-3xl font-bold text-red-600">{randomInt(0, 3)}</div>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="text-sm font-semibold text-gray-500 mb-2">Near Expiry Products</div>
          <div className="text-3xl font-bold text-orange-500">{randomInt(0, 2)}</div>
        </div>
      </div>
      <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500 mb-2">Fast Moving Products</div>
          <ul>
            {fastMoving.length === 0 ? <li className="text-gray-400">No data</li> : fastMoving.map(item =>
              <li key={item.name} className="flex justify-between">
                <span>{item.name}</span>
                <span className="font-bold">{item.movement}</span>
              </li>
            )}
          </ul>
        </div>
        <div className="bg-white/80 rounded-xl shadow p-4">
          <div className="font-semibold text-gray-500 mb-2">Slow Moving Products</div>
          <ul>
            {slowMoving.length === 0 ? <li className="text-gray-400">No data</li> : slowMoving.map(item =>
              <li key={item.name} className="flex justify-between">
                <span>{item.name}</span>
                <span className="font-bold">{item.movement}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="mt-4 bg-white/80 rounded-xl shadow p-4">
        <div className="font-semibold text-gray-500 mb-2">Restock Recommendations</div>
        <ul>
          {stockList
            .filter(item => item.stock < 15)
            .map(item =>
              <li key={item.name} className="flex justify-between">
                <span>{item.name}</span>
                <span className="font-semibold">{item.stock}</span>
              </li>
            )
          }
        </ul>
      </div>
    </section>
  );
}

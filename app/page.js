"use client";

import { useState } from "react";

export default function Home() {
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);
  const [color, setColor] = useState("yellow");
  const [table, setTable] = useState([]);
  const [stats, setStats] = useState(null);

  const colorNames = {
    yellow: "Жёлтый",
    lightgreen: "Зелёный",
    lightblue: "Синий",
    lightcoral: "Красный",
    violet: "Фиолетовый",
  };

  const createTable = () => {
    const newTable = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => "")
    );
    setTable(newTable);
    setStats(null);
  };

  const toggleColor = (r, c) => {
    const newTable = [...table];
    newTable[r][c] =
      newTable[r][c] === color ? "" : color;
    setTable(newTable);
  };

  const countStats = () => {
    const flat = table.flat();
    const total = flat.length;
    const colored = flat.filter((c) => c !== "").length;
    const empty = total - colored;

    const colorCounts = {};
    flat.forEach((c) => {
      if (c) colorCounts[c] = (colorCounts[c] || 0) + 1;
    });

    setStats({ total, colored, empty, colorCounts });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 to-zinc-200 p-8 font-sans text-zinc-800">
      <h2 className="text-center text-3xl font-bold mb-6">Интерактивная таблица</h2>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <label>
          Строки:{" "}
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            className="border rounded-lg p-2 w-16"
          />
        </label>
        <label>
          Столбцы:{" "}
          <input
            type="number"
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            className="border rounded-lg p-2 w-16"
          />
        </label>
        <label>
          Цвет:{" "}
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border rounded-lg p-2"
          >
            <option value="yellow">Жёлтый</option>
            <option value="lightgreen">Зелёный</option>
            <option value="lightblue">Синий</option>
            <option value="lightcoral">Красный</option>
            <option value="violet">Фиолетовый</option>
          </select>
        </label>
        <button
          onClick={createTable}
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
        >
          Создать таблицу
        </button>
        <button
          onClick={countStats}
          className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
        >
          Посчитать статистику
        </button>
      </div>

      <div className="flex justify-center">
        <table className="border-collapse shadow-lg rounded-lg overflow-hidden">
          <tbody>
            {table.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td
                    key={c}
                    onClick={() => toggleColor(r, c)}
                    className="w-12 h-12 border cursor-pointer transition-transform hover:scale-105"
                    style={{ backgroundColor: cell }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {stats && (
        <div className="mt-6 text-center bg-zinc-100 rounded-lg p-4 shadow">
          <p>Всего ячеек: {stats.total}</p>
          <p>Закрашенных: {stats.colored}</p>
          <p>Пустых: {stats.empty}</p>
          <h4 className="font-semibold mt-2">По цветам:</h4>
          {Object.entries(stats.colorCounts).map(([clr, count]) => (
            <p key={clr}>
              {colorNames[clr] || clr}: {count}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

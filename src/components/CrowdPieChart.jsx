import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 🎨 Define pie chart colors
const COLORS = ["#34d399", "#facc15", "#f87171", "#60a5fa", "#a78bfa"];

// 🔧 Normalize keys like "Andhra Pradesh" => "Andhra_Pradesh"
const normalizeKey = (str) => str.replace(/\s+/g, "_");

// 🧠 Mock crowd data (time-based)
const crowdDataByCity = {
  Andhra_Pradesh: [
        { time: "8 AM", crowd: 80 },
        { time: "10 AM", crowd: 45 },
        { time: "12 PM", crowd: 70 },
        { time: "2 PM", crowd: 85 },
        { time: "4 PM", crowd: 60 },
    ],
    Arunachal_Pradesh: [
        { time: "8 AM", crowd: 50 },
        { time: "10 AM", crowd: 30 },
        { time: "12 PM", crowd: 40 },
        { time: "2 PM", crowd: 55 },
        { time: "4 PM", crowd: 45 },
    ],
    Assam: [
        { time: "8 AM", crowd: 65 },
        { time: "10 AM", crowd: 35 },
        { time: "12 PM", crowd: 50 },
        { time: "2 PM", crowd: 75 },
        { time: "4 PM", crowd: 55 },
    ],
    Bihar: [
        { time: "8 AM", crowd: 70 },
        { time: "10 AM", crowd: 40 },
        { time: "12 PM", crowd: 60 },
        { time: "2 PM", crowd: 80 },
        { time: "4 PM", crowd: 50 },
    ],
    Chhattisgarh: [
        { time: "8 AM", crowd: 75 },
        { time: "10 AM", crowd: 50 },
        { time: "12 PM", crowd: 65 },
        { time: "2 PM", crowd: 90 },
        { time: "4 PM", crowd: 70 },
    ],
    Goa: [
        { time: "8 AM", crowd: 60 },
        { time: "10 AM", crowd: 30 },
        { time: "12 PM", crowd: 50 },
        { time: "2 PM", crowd: 70 },
        { time: "4 PM", crowd: 40 },
    ],
    Gujarat: [
        { time: "8 AM", crowd: 85 },
        { time: "10 AM", crowd: 55 },
        { time: "12 PM", crowd: 75 },
        { time: "2 PM", crowd: 95 },
        { time: "4 PM", crowd: 80 },
    ],
    Haryana: [
        { time: "8 AM", crowd: 90 },
        { time: "10 AM", crowd: 60 },
        { time: "12 PM", crowd: 80 },
        { time: "2 PM", crowd: 100 },
        { time: "4 PM", crowd: 70 },
    ],
    Himachal_Pradesh: [
        { time: "8 AM", crowd: 55 },
        { time: "10 AM", crowd: 25 },
        { time: "12 PM", crowd: 45 },
        { time: "2 PM", crowd: 65 },
        { time: "4 PM", crowd: 50 },
    ],
    Jharkhand: [
        { time: "8 AM", crowd: 70 },
        { time: "10 AM", crowd: 40 },
        { time: "12 PM", crowd: 60 },
        { time: "2 PM", crowd: 80 },
        { time: "4 PM", crowd: 55 },
    ],
    Karnataka: [
        { time: "8 AM", crowd: 95 },
        { time: "10 AM", crowd: 65 },
        { time: "12 PM", crowd: 85 },
        { time: "2 PM", crowd: 100 },
        { time: "4 PM", crowd: 75 },
    ],
    Kerala: [
        { time: "8 AM", crowd: 80 },
        { time: "10 AM", crowd: 50 },
        { time: "12 PM", crowd: 70 },
        { time: "2 PM", crowd: 90 },
        { time: "4 PM", crowd: 60 },
    ],
    Madhya_Pradesh: [
        { time: "8 AM", crowd: 75 },
        { time: "10 AM", crowd: 55 },
        { time: "12 PM", crowd: 65 },
        { time: "2 PM", crowd: 85 },
        { time: "4 PM", crowd: 70 },
    ],
    Maharashtra: [
        { time: "8 AM", crowd: 90 },
        { time: "10 AM", crowd: 60 },
        { time: "12 PM", crowd: 80 },
        { time: "2 PM", crowd: 100 },
        { time: "4 PM", crowd: 75 },
    ],
    Manipur: [
        { time: "8 AM", crowd: 50 },
        { time: "10 AM", crowd: 30 },
        { time: "12 PM", crowd: 40 },
        { time: "2 PM", crowd: 55 },
        { time: "4 PM", crowd: 45 },
    ],
    Meghalaya: [
        { time: "8 AM", crowd: 60 },
        { time: "10 AM", crowd: 35 },
        { time: "12 PM", crowd: 50 },
        { time: "2 PM", crowd: 70 },
        { time: "4 PM", crowd: 55 },
    ],
    Mizoram: [
        { time: "8 AM", crowd: 40 },
        { time: "10 AM", crowd: 20 },
        { time: "12 PM", crowd: 30 },
        { time: "2 PM", crowd: 45 },
        { time: "4 PM", crowd: 35 },
    ],
    Nagaland: [
        { time: "8 AM", crowd: 55 },
        { time: "10 AM", crowd: 25 },
        { time: "12 PM", crowd: 40 },
        { time: "2 PM", crowd: 60 },
        { time: "4 PM", crowd: 50 },
    ],
    Odisha: [
        { time: "8 AM", crowd: 70 },
        { time: "10 AM", crowd: 40 },
        { time: "12 PM", crowd: 60 },
        { time: "2 PM", crowd: 80 },
        { time: "4 PM", crowd: 55 },
    ],
    Punjab: [
        { time: "8 AM", crowd: 85 },
        { time: "10 AM", crowd: 55 },
        { time: "12 PM", crowd: 75 },
        { time: "2 PM", crowd: 90 },
        { time: "4 PM", crowd: 70 },
    ],
    Rajasthan: [
        { time: "8 AM", crowd: 60 },
        { time: "10 AM", crowd: 35 },
        { time: "12 PM", crowd: 50 },
        { time: "2 PM", crowd: 80 },
        { time: "4 PM", crowd: 65 },
    ],
    Sikkim: [
        { time: "8 AM", crowd: 30 },
        { time: "10 AM", crowd: 15 },
        { time: "12 PM", crowd: 25 },
        { time: "2 PM", crowd: 35 },
        { time: "4 PM", crowd: 20 },
    ],
    TamilNadu: [
        { time: "8 AM", crowd: 90 },
        { time: "10 AM", crowd: 60 },
        { time: "12 PM", crowd: 80 },
        { time: "2 PM", crowd: 100 },
        { time: "4 PM", crowd: 75 },
    ],
    Telangana: [
        { time: "8 AM", crowd: 85 },
        { time: "10 AM", crowd: 55 },
        { time: "12 PM", crowd: 75 },
        { time: "2 PM", crowd: 90 },
        { time: "4 PM", crowd: 70 },
    ],
    Tripura: [
        { time: "8 AM", crowd: 40 },
        { time: "10 AM", crowd: 20 },
        { time: "12 PM", crowd: 30 },
        { time: "2 PM", crowd: 45 },
        { time: "4 PM", crowd: 35 },
    ],
    Uttar_Pradesh: [
        { time: "8 AM", crowd: 95 },
        { time: "10 AM", crowd: 65 },
        { time: "12 PM", crowd: 85 },
        { time: "2 PM", crowd: 100 },
        { time: "4 PM", crowd: 75 },
    ],
    Uttarakhand: [
        { time: "8 AM", crowd: 70 },
        { time: "10 AM", crowd: 40 },
        { time: "12 PM", crowd: 60 },
        { time: "2 PM", crowd: 80 },
        { time: "4 PM", crowd: 55 },
    ],
    West_Bengal: [
        { time: "8 AM", crowd: 80 },
        { time: "10 AM", crowd: 50 },
        { time: "12 PM", crowd: 70 },
        { time: "2 PM", crowd: 90 },
        { time: "4 PM", crowd: 60 },
    ],

};

const CrowdPieChart = ({ place }) => {
  const normalizedKey = normalizeKey(place);
  const rawData = crowdDataByCity[normalizedKey] || [];

  // 📊 Transform to chart-compatible format
  const data = rawData.map((entry) => ({
    name: entry.time,
    value: entry.crowd,
  }));

  // ⚠️ If no data, show fallback message
  if (data.length === 0) {
    return (
      <p className="text-center text-red-500 mt-4">
        ⚠️ No crowd chart data available for{" "}
        <strong>{place}</strong>
      </p>
    );
  }

  return (
    <div className="w-full max-w-3xl mt-6">
      <h3 className="text-xl font-bold text-center mb-4">
        🥧 Crowd Summary for <span className="text-indigo-600">{place}</span>
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CrowdPieChart;

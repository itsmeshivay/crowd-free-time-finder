import React from "react";
import crowdData from "../crowdData";

const normalizeKey = (place) => place.replace(/\s+/g, "_");

const CrowdInsights = ({ place }) => {
  const data = crowdData[normalizeKey(place)];
  if (!data) return null;

  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg px-6 py-5 max-w-xl text-center animate-fadeSlide">
      <h3 className="text-xl font-bold text-indigo-700 mb-3">📊 Crowd Insights for {place}</h3>
      <p className="text-gray-800 mb-2">
        <strong>✅ Best Time:</strong> {data.bestTime}
      </p>
      <p className="text-gray-800 mb-2">
        <strong>👥 Crowd Level:</strong> {data.crowdLevel}
      </p>
      <p className="text-gray-600 italic">💡 {data.tip}</p>
    </div>
  );
};

export default CrowdInsights;

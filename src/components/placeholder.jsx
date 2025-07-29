import React, { useState } from "react";

const PlaceSelector = ({ onPlaceSelect }) => {
  const [selectedPlace, setSelectedPlace] = useState("");
  const places =  [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
];

  const handleChange = (e) => {
    const place = e.target.value;
    setSelectedPlace(place);
    onPlaceSelect(place);
  };

  return (
    <div className="w-full max-w-md text-center mt-6">
      <label className="block text-xl font-semibold text-gray-700 mb-2 tracking-wide">
        🌍 Choose Your City
      </label>
      <select
  value={selectedPlace}
  onChange={handleChange}
  className="w-full px-5 py-3 rounded-xl bg-gray-100 shadow-inner border-none text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="" disabled>-- Select your location --</option>
  {places.map((place) => (
    <option key={place} value={place}>{place}</option>
  ))}
</select>

      
    </div>
  );
};

export default PlaceSelector;

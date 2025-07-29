import React, { useEffect, useState } from "react";

const SmartSuggestion = ({ place }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const suggestionDB = {
    AndhraPradesh: [
        "🌊 Visit the beaches early in the morning for a peaceful experience.",
        "🍽️ Try local cuisine at lunchtime for the best flavors.",
        "🏞️ Avoid peak hours at tourist spots to enjoy them fully."
    ],
    ArunachalPradesh: [
        "🏔️ Best time to visit is during the spring for blooming flowers.",
        "🚶‍♂️ Wear sturdy shoes for trekking in hilly areas.",
        "🌌 Stargazing is best at night – find a quiet spot!"
    ],
    Assam: [
        "🌿 Visit tea gardens in the morning for a refreshing experience.",
        "🦋 Explore wildlife sanctuaries early to catch animal sightings.",
        "🍵 Don't miss the local tea – best enjoyed in the afternoon."
    ],
    Bihar: [
        "🏛️ Visit historical sites early to avoid crowds.",
        "🍽️ Try local dishes at lunchtime for authentic flavors.",
        "🚶‍♀️ Wear comfortable shoes for exploring ancient ruins."
    ],
    Chhattisgarh: [
        "🌳 Best time to visit waterfalls is during the monsoon.",
        "🏞️ Explore tribal villages for a unique cultural experience.",
        "🌄 Early mornings are perfect for nature walks."
    ],
    Goa: [
        "🏖️ Beaches are best visited in the early morning.",
        "🍹 Enjoy sunset views at beach shacks in the evening.",
        "🚴‍♂️ Rent a bike to explore the quieter parts of Goa."
    ],
    Gujarat: [
        "🌅 Visit the Rann of Kutch during sunrise for stunning views.",
        "🕌 Explore historical sites early to avoid the heat.",
        "🍽️ Try local street food in the evening for a vibrant experience."
    ],
    Haryana: [
        "🏞️ Visit parks early in the morning for a peaceful stroll.",
        "🚴‍♀️ Cycling is a great way to explore the countryside.",
        "🍽️ Try local cuisine at lunchtime for the best flavors."
    ],
    HimachalPradesh: [
        "🏔️ Best time to visit hill stations is during the summer.",
        "🚶‍♂️ Trekking is best done in the early morning.",
        "🌌 Stargazing is amazing at night – find a quiet spot!"
    ],
    Jharkhand: [
        "🌳 Visit waterfalls early in the morning for a serene experience.",
        "🏞️ Explore national parks during the day for wildlife sightings.",
        "🍽️ Try local dishes at lunchtime for authentic flavors."
    ],
    Karnataka: [
        "🌄 Best time to visit is during the monsoon for lush greenery.",
        "🚶‍♀️ Explore historical sites early to avoid crowds.",
        "☕ Enjoy coffee at local cafes in the morning."
    ],
    Kerala: [
        "🌴 Backwaters are best visited in the early morning.",
        "🍽️ Try local seafood dishes for the best flavors.",
        "🚣‍♂️ Houseboat rides are more enjoyable in the morning."
    ],
    MadhyaPradesh: [
        "🏰 Visit historical sites early to avoid crowds.",
        "🌳 Explore national parks during the day for wildlife sightings.",
        "🍽️ Try local dishes at lunchtime for authentic flavors."
    ],
    Maharashtra: [
        "🌅 Visit beaches early in the morning for a peaceful experience.",
        "🚖 Use public transport to avoid traffic in Mumbai.",
        "🍽️ Try local street food in the evening for a vibrant experience."
    ],
    Manipur: [
        "🏞️ Best time to visit Loktak Lake is during sunrise.",
        "🚶‍♂️ Explore local markets in the morning for fresh produce.",
        "🌌 Stargazing is amazing at night – find a quiet spot!"
    ],
    Meghalaya: [
        "🌧️ Visit waterfalls during the monsoon for stunning views.",
        "🚶‍♀️ Trekking is best done in the early morning.",
        "🍽️ Try local dishes at lunchtime for authentic flavors."
    ],
    Mizoram: [
        "🏞️ Best time to visit is during the spring for blooming flowers.",
        "🚶‍♂️ Wear sturdy shoes for trekking in hilly areas.",
        "🌌 Stargazing is best at night – find a quiet spot!"
    ],
    Nagaland: [
        "🏞️ Visit during the Hornbill Festival for a cultural experience.",
        "🚶‍♀️ Explore local markets in the morning for fresh produce.",
        "🌌 Stargazing is amazing at night – find a quiet spot!"
    ],
    Odisha: [
        "🏖️ Beaches are best visited in the early morning.",
        "🍽️ Try local cuisine at lunchtime for the best flavors.",
        "🏛️ Visit temples early to avoid crowds."
    ],
    Punjab: [
        "🌅 Visit the Golden Temple early in the morning for tranquility.",
        "🍽️ Try local dishes at lunchtime for authentic flavors.",
        "🚶‍♀️ Explore local markets in the evening for vibrant experiences."
    ],
    Rajasthan: [
        "🏰 Visit forts early in the morning for stunning views.",
        "🌞 Avoid peak heat between 1-3 PM.",
        "🍽️ Try local cuisine at lunchtime for the best flavors."
    ],
    Sikkim: [
        "🏔️ Best time to visit is during the spring for blooming flowers.",
        "🚶‍♂️ Wear sturdy shoes for trekking in hilly areas.",
        "🌌 Stargazing is best at night – find a quiet spot!"
    ],
    TamilNadu: [
        "🏖️ Beaches are best visited in the early morning.",
        "🍽️ Try local cuisine at lunchtime for the best flavors.",
        "🏛️ Visit temples early to avoid crowds."
    ],
    Telangana: [
        "🌅 Visit historical sites early to avoid crowds.",
        "🍽️ Try local dishes at lunchtime for authentic flavors.",
        "🚶‍♀️ Explore local markets in the evening for vibrant experiences."
    ],
    Tripura: [
        "🏞️ Best time to visit is during the spring for blooming flowers.",
        "🚶‍♂️ Wear sturdy shoes for trekking in hilly areas.",
        "🌌 Stargazing is best at night – find a quiet spot!"
    ],
    UttarPradesh: [
        "🏰 Visit historical sites early to avoid crowds.",
        "🍽️ Try local dishes at lunchtime for authentic flavors.",
        "🚶‍♀️ Explore local markets in the evening for vibrant experiences."
    ],
    Uttarakhand: [
        "🏞️ Best time to visit hill stations is during the summer.",
        "🚶‍♂️ Trekking is best done in the early morning.",
        "🌌 Stargazing is amazing at night – find a quiet spot!"
    ],
    WestBengal: [
        "🌅 Visit the Sundarbans early in the morning for wildlife sightings.",
        "🍽️ Try local sweets at lunchtime for the best flavors.",
        "🚶‍♀️ Explore local markets in the evening for vibrant experiences."
    ],
};


  useEffect(() => {
    if (place) {
      setLoading(true);
      setSuggestions([]);

      // Simulate fetch
      setTimeout(() => {
        setSuggestions(suggestionDB[place] || ["🤔 No suggestions found for this location."]);
        setLoading(false);
      }, 1000); // Simulate delay
    }
  }, [place]);

  return (
    <div className="smart-suggestion-box">
      <h2 className="text-2xl md:text-3xl font-extrabold typewriter">🤖 Smart Suggestions for {place}</h2>
      {loading ? (
        <p>⏳ Fetching smart suggestions for <strong>{place}</strong>...</p>
      ) : (
        <ul className="list-disc list-inside text-gray-700 font-medium space-y-1">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="text-gray-700">{suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SmartSuggestion;

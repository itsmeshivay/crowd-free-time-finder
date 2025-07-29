import React, { useState } from "react";

import Header from "./components/Header";
import PlaceSelector from "./components/placeholder";
import CrowdInsights from "./components/CrowdInsights";
import PdfDownloadButton from "./components/PdfDownloadButton";
import CrowdPieChart from "./components/CrowdPieChart";
import SmartSuggestion from "./components/SmartSuggestion";
import crowdData from "./crowdData";
import StateGrid from "./components/Stategrid";
import IndiaMap from "./components/IndiaMap";
import Footer from "./components/Footer";






// 🔧 Normalizing keys like "Madhya Pradesh" => "Madhya_Pradesh"
const normalizeKey = (place) => place.replace(/\s+/g, "_");

const Home = () => {
  const [selectedPlace, setSelectedPlace] = useState("");

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);

    // Stop any existing speech
    window.speechSynthesis.cancel();

    const key = normalizeKey(place);
    const placeData = crowdData[key];

    let message;
    if (placeData) {
      message = `You selected ${place}. Best time to visit is ${placeData.bestTime}. Crowd level is ${placeData.crowdLevel}. Tip: ${placeData.tip}`;
    } else {
      message = `You selected ${place}. Sorry, crowd data is currently not available.`;
    }

    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gray-100">
  
      <Header />
      

      <main className="flex flex-col items-center justify-center min-h-[70vh] py-10 px-4 gap-6 animate-pageEntry">
        <PlaceSelector onPlaceSelect={handlePlaceSelect} />

        {selectedPlace && (
          <div id="report" className="w-full flex flex-col items-center gap-6">
            {/* ✅ Place Confirmation */}
            <p className="mt-6 text-lg text-green-700 font-medium bg-green-100 px-4 py-2 rounded-lg shadow-sm animate-fadeSlide">
              ✅ You selected: <span className="font-bold">{selectedPlace}</span>
            </p>

            {/* 🎤 Speech Buttons */}
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => {
                  const msg = `You selected ${selectedPlace}. Best time to visit is 10 AM. Crowd level is low.`;
                  window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
                }}
                className="speak-btn"
              >
                🔊 Speak Again
              </button>

              <button
                onClick={() => window.speechSynthesis.cancel()}
                className="stop-btn"
              >
                🛑 Stop Speaking
              </button>
            </div>

            {/* 📊 Insights + Suggestions + Chart + PDF Download */}
            <div className="w-full max-w-4xl flex flex-col items-center justify-start gap-6 px-4">
              
              {/* 🧠 Insight Box */}
              <div className="w-full flex justify-center">
                <div className="insight-box bg-white p-4 rounded-lg shadow-md max-w-2xl text-center animate-fadeSlide">
                  <CrowdInsights place={selectedPlace} />
                </div>
              </div>

              {/* 💡 Smart Suggestions */}
              <div className="w-full flex justify-start">
                <div className="insight-box bg-white p-4 rounded-lg shadow-md max-w-2xl text-center animate-fadeSlide">
                  <SmartSuggestion place={selectedPlace} />
                </div>
              </div>

              {/* 🥧 Chart (Pie) */}
              <div className=" insight-box bg-white p-4 rounded-lg shadow-md max-w-2xl text-center animate-fadeSlide">
                  <CrowdPieChart place={selectedPlace} />
                   </div>


              {/* 📄 PDF Download */}
              <div className="flex items-center justify-center gap-4 w-full">
              
                   <PdfDownloadButton />
                   
                <span className="shivam">📄 Button for PDF Download</span>
              </div>
          
                
            </div>
          </div>
            



        )}
      </main>



       <div>
      <StateGrid />
    </div>
    <div>
    <IndiaMap/>
    </div>
    
   <Footer/>
    </div>
    
  );
};

export default Home;

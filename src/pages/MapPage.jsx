import React, { useEffect, useState } from 'react';
import IndiaCesiumMap from '../components/IndiaMap3D';
import Footer from '../components/Footer';
import Header from '../components/Header';

const MapPage = () => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize); 

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {isDesktop ? (

        <>
        <div className="bg-white shadow-md p-4 mb-4"  style={{ margiTop: '20px' , width: '100%' , height: '100px' }}>
          
          <h2 className="text-2xl font-bold text-center mb-4" style={{fontFamily:"cursive", fontSize:"5rem", fontWeight:"2vw"}}>India Map</h2>
          <p className="text-center text-gray-600" style={{fontFamily:"cursive", fontSize:"1.5rem", fontWeight:"1vw"}}>
            Explore the 3D map of India. This feature is optimized for desktop screens.
          </p>
        </div>
   
        <div
          className="h-[80vh] w-full flex items-center justify-center" style={{ marginButtom: '20px' , }}
        >
       
          <IndiaCesiumMap />
        </div>
        </>
      ) : (
        <div className="text-center text-red-600 font-semibold mt-20 text-lg">
          📵 Sorry! This page is only available on desktop screens.
        </div>
      )}
    
    </div>
  );
};

export default MapPage;

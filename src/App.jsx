// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import SignInSignUp from './components/SingUp';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import MapPage from './pages/MapPage';
import Footer from './components/Footer'; // ✅ Add this

import { Ion } from "cesium";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YzhmMTQ4Yi04NGJkLTRlMGEtOWE5Yi0xOWE3OThhMzdmMDIiLCJpZCI6MzIzNTk1LCJpYXQiOjE3NTMxMjIxODJ9.AjW_e3RfrbTMZ49ImdopnyQS7PcMGUG-AeDb3zE8_9c"

  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (user) setIsLoggedIn(true);
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <Router>
          <>
            <Routes>
              <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/about" element={<About />} />
             < Route path="/contact" element={<Contact />} />
              <Route path="/map" element={<MapPage />} />
            </Routes>
            <Footer setIsLoggedIn={setIsLoggedIn} /> {/* ✅ Footer with logout */}
          </>
        </Router>
      ) : (
        <SignInSignUp setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

export default App;

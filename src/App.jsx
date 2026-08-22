import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import NotFound from "./components/NotFound";

import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import Destinations from "./Pages/Destinations";
import DestinationDetails from "./Pages/DestinationDetails";
import Hotels from "./Pages/Hotels";
import HotelDetails from "./Pages/HotelDetails";
import Activities from "./Pages/Activities";
import ActivityDetails from "./Pages/ActivityDetails";
import About from "./Pages/About";

import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

import "./index.css";

const Dashboard = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h2>Dashboard (Person 2)</h2>
  </div>
);

const Login = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h2>Login (Person 1)</h2>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Navbar />

          <main>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                path="/destinations"
                element={<Destinations />}
              />

              <Route
                path="/destinations/:id"
                element={<DestinationDetails />}
              />

              <Route
                path="/hotels"
                element={<Hotels />}
              />

              <Route
                path="/hotels/:id"
                element={<HotelDetails />}
              />

              <Route
                path="/activities"
                element={<Activities />}
              />

              <Route
                path="/activities/:id"
                element={<ActivityDetails />}
              />

              <Route path="/about" element={<About />} />

              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/login" element={<Login />} />

              <Route path="/contact" element={<Contact />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
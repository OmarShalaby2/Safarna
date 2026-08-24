// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import PlanTrip from "./pages/PlanTrip";
import Recommendations from "./pages/Recommendations";
import TripItinerary from "./pages/TripItinerary";
import Dashboard from "./pages/Dashboard";
import SavedTrips from "./pages/SavedTrips";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />
        <Route path="/plan-trip" element={<PlanTrip />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/trip-itinerary" element={<TripItinerary />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/saved-trips" element={<SavedTrips />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import NotFound from './components/NotFound';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';

// Dummy components to simulate other Person's pages
const Home = () => <div style={{padding: '2rem', textAlign: 'center'}}><h2>Home Page (Person 4)</h2></div>;
const Destinations = () => <div style={{padding: '2rem', textAlign: 'center'}}><h2>Destinations Page (Person 4)</h2></div>;
const Dashboard = () => <div style={{padding: '2rem', textAlign: 'center'}}><h2>Dashboard (Person 2)</h2></div>;
const Login = () => <div style={{padding: '2rem', textAlign: 'center'}}><h2>Login (Person 1)</h2></div>;

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/destinations" element={<Destinations />} />
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

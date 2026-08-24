// src/components/Navbar.jsx
import { NavLink, Link } from "react-router-dom";
import { Moon, Sun, Compass, Globe } from "lucide-react";
import { useTrip } from "../context/TripContext";
import { t } from "../data/translations";

const linkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive ? "text-primary-light" : "text-ink dark:text-white/80 hover:text-primary-light"
  }`;

export default function Navbar() {
  const { darkMode, setDarkMode, lang, setLang, user, logout } = useTrip();

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-ink/90 backdrop-blur border-b border-gray-100 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center">
            <Compass size={18} />
          </span>
          <div className="leading-tight">
            <p className="font-heading font-bold text-primary dark:text-primary-light">Safarna</p>
            <p className="text-[10px] text-muted hidden sm:block">Smart trips, unforgettable memories</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={linkClass} end>{t(lang, "home")}</NavLink>
          <NavLink to="/destinations" className={linkClass}>{t(lang, "destinations")}</NavLink>
          <NavLink to="/plan-trip" className={linkClass}>{t(lang, "planTrip")}</NavLink>
          <NavLink to="/dashboard" className={linkClass}>{t(lang, "dashboard")}</NavLink>
          <NavLink to="/about" className={linkClass}>{t(lang, "about")}</NavLink>
          <NavLink to="/contact" className={linkClass}>{t(lang, "contact")}</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface dark:hover:bg-white/10 text-muted"
            title="Switch language"
          >
            <Globe size={18} />
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface dark:hover:bg-white/10 text-muted"
            title="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/profile" className="text-sm font-medium hover:text-primary-light">
                {user.name}
              </Link>
              <button onClick={logout} className="btn-secondary !px-3 !py-1.5 text-xs">
                {t(lang, "logout")}
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary !px-4 !py-2 text-sm">
              {t(lang, "login")}
            </Link>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="md:hidden flex items-center gap-4 overflow-x-auto px-4 pb-2 text-xs">
        <NavLink to="/" className={linkClass} end>{t(lang, "home")}</NavLink>
        <NavLink to="/destinations" className={linkClass}>{t(lang, "destinations")}</NavLink>
        <NavLink to="/plan-trip" className={linkClass}>{t(lang, "planTrip")}</NavLink>
        <NavLink to="/dashboard" className={linkClass}>{t(lang, "dashboard")}</NavLink>
        <NavLink to="/profile" className={linkClass}>{t(lang, "profile")}</NavLink>
      </nav>
    </header>
  );
}

// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { Compass, Facebook, Instagram, Twitter } from "lucide-react";
import { useTrip } from "../context/TripContext";
import { t } from "../data/translations";

export default function Footer() {
  const { lang } = useTrip();

  return (
    <footer className="bg-ink text-white/80 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-9 h-9 rounded-xl bg-primary-light text-white flex items-center justify-center">
              <Compass size={18} />
            </span>
            <span className="font-heading font-bold text-white">Safarna</span>
          </div>
          <p className="text-sm text-white/60">{t(lang, "footerTagline")}</p>
        </div>

        <div>
          <p className="font-semibold text-white mb-3">{t(lang, "footerExplore")}</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/destinations" className="hover:text-primary-light">{t(lang, "destinations")}</Link></li>
            <li><Link to="/plan-trip" className="hover:text-primary-light">{t(lang, "planTrip")}</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary-light">{t(lang, "dashboard")}</Link></li>
            <li><Link to="/admin" className="hover:text-primary-light">{t(lang, "footerAdminDashboard")}</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white mb-3">{t(lang, "footerCompany")}</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-primary-light">{t(lang, "about")}</Link></li>
            <li><Link to="/contact" className="hover:text-primary-light">{t(lang, "contact")}</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white mb-3">{t(lang, "footerFollow")}</p>
          <div className="flex gap-3">
            <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-light cursor-pointer">
              <Facebook size={16} />
            </span>
            <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-light cursor-pointer">
              <Instagram size={16} />
            </span>
            <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-light cursor-pointer">
              <Twitter size={16} />
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Safarna. {t(lang, "footerRights")}
      </div>
    </footer>
  );
}

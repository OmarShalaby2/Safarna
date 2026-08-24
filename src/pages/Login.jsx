// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";
import { useTrip } from "../context/TripContext";
import { t } from "../data/translations";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser, lang } = useTrip();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError(t(lang, "errorFillEmailPassword"));
      return;
    }
    const result = loginUser(email, password);
    if (!result.success) {
      setError(t(lang, result.error === "wrongPassword" ? "errorWrongPassword" : "errorFillEmailPassword"));
      return;
    }
    navigate("/dashboard");
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="card w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <span className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center mb-2">
            <Compass size={20} />
          </span>
          <p className="font-heading font-bold text-primary text-lg">Safarna</p>
          <p className="font-semibold mt-2">{t(lang, "welcomeBack")}</p>
          <p className="text-xs text-muted">{t(lang, "loginToContinue")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {error && <p className="text-xs text-red-500">{error}</p>}
          <input
            type="email"
            placeholder={t(lang, "email")}
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder={t(lang, "password")}
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-end">
            <button type="button" className="text-xs text-primary-light">{t(lang, "forgotPassword")}</button>
          </div>
          <button type="submit" className="btn-primary w-full">{t(lang, "login")}</button>
        </form>

        <p className="text-center text-xs text-muted mt-4">
          {t(lang, "noAccount")}{" "}
          <Link to="/register" className="text-primary-light font-semibold">{t(lang, "register")}</Link>
        </p>

        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
          <span className="text-[11px] text-muted">{t(lang, "orContinueWith")}</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
        </div>

        <div className="flex gap-3 justify-center">
          <button className="btn-secondary flex-1 text-sm">{t(lang, "google")}</button>
          <button className="btn-secondary flex-1 text-sm">{t(lang, "facebook")}</button>
        </div>
      </div>
    </div>
  );
}

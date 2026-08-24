// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";
import { useTrip } from "../context/TripContext";
import { t } from "../data/translations";

export default function Register() {
  const navigate = useNavigate();
  const { registerUser, lang } = useTrip();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError(t(lang, "errorFillAllFields"));
      return;
    }
    const result = registerUser(form.name, form.email, form.password);
    if (!result.success) {
      setError(t(lang, "errorAccountExists"));
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
          <p className="font-semibold mt-2">{t(lang, "createYourAccount")}</p>
          <p className="text-xs text-muted">{t(lang, "startPlanningSmarter")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {error && <p className="text-xs text-red-500">{error}</p>}
          <input
            placeholder={t(lang, "fullName")}
            className="input-field"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder={t(lang, "email")}
            className="input-field"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder={t(lang, "password")}
            className="input-field"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit" className="btn-primary w-full">{t(lang, "createAccountBtn")}</button>
        </form>

        <p className="text-center text-xs text-muted mt-4">
          {t(lang, "alreadyHaveAccount")}{" "}
          <Link to="/login" className="text-primary-light font-semibold">{t(lang, "login")}</Link>
        </p>
      </div>
    </div>
  );
}

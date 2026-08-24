// src/pages/Profile.jsx
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useTrip } from "../context/TripContext";
import { t } from "../data/translations";

export default function Profile() {
  const { user, lang } = useTrip();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    password: "",
  });
  const [saved, setSaved] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  function handleSubmit(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-heading text-2xl font-bold mb-6">{t(lang, "myProfile")}</h1>

      <div className="card">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs text-muted">{user.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm font-medium">{t(lang, "fullName")}</label>
            <input
              className="input-field mt-1"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">{t(lang, "email")}</label>
            <input
              className="input-field mt-1"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">{t(lang, "phone")}</label>
            <input
              className="input-field mt-1"
              placeholder="+20 101 234 5678"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">{t(lang, "newPassword")}</label>
            <input
              type="password"
              className="input-field mt-1"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            {saved ? t(lang, "savedCheck") : t(lang, "editProfile")}
          </button>
        </form>
      </div>
    </div>
  );
}

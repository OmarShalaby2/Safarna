// src/pages/Contact.jsx
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTrip } from "../context/TripContext";
import { t } from "../data/translations";

export default function Contact() {
  const { lang } = useTrip();
  const subjects = [
    { key: "General Inquiry", labelKey: "subjectGeneral" },
    { key: "Trip Support", labelKey: "subjectSupport" },
    { key: "Partnership", labelKey: "subjectPartnership" },
    { key: "Report a Problem", labelKey: "subjectReport" },
  ];
  const [form, setForm] = useState({ name: "", email: "", subject: "General Inquiry", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "General Inquiry", message: "" });
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-2 gap-10">
      <div>
        <h1 className="font-heading text-2xl font-bold mb-1">{t(lang, "contactTitle")}</h1>
        <p className="text-muted text-sm mb-6">{t(lang, "contactSubtitle")}</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {sent && <p className="text-sm text-green-600">{t(lang, "messageSent")}</p>}
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              placeholder={t(lang, "placeholderFullName")}
              className="input-field"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder={t(lang, "placeholderEmail")}
              className="input-field"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <select
            className="input-field"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          >
            {subjects.map((s) => (
              <option key={s.key} value={s.key}>{t(lang, s.labelKey)}</option>
            ))}
          </select>
          <textarea
            placeholder={t(lang, "placeholderMessage")}
            rows={5}
            className="input-field resize-none"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <button type="submit" className="btn-primary w-full">{t(lang, "sendMessage")}</button>
        </form>
      </div>

      <div className="space-y-4">
        <div className="card flex items-center gap-3">
          <Mail size={18} className="text-primary" />
          <span className="text-sm">support@safarna.com</span>
        </div>
        <div className="card flex items-center gap-3">
          <Phone size={18} className="text-primary" />
          <span className="text-sm">+20 123 456 7890</span>
        </div>
        <div className="card flex items-center gap-3">
          <MapPin size={18} className="text-primary" />
          <span className="text-sm">{t(lang, "egypt")}</span>
        </div>
        <div className="card h-48 flex items-center justify-center text-muted text-sm">
          {t(lang, "mapPlaceholder")}
        </div>
      </div>
    </div>
  );
}

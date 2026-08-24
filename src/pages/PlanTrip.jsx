// src/pages/PlanTrip.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Landmark, Mountain, Waves, Utensils, ShoppingBag, Trees, Check } from "lucide-react";
import destinations from "../data/destinations.json";
import { useTrip } from "../context/TripContext";
import { t, tf } from "../data/translations";

const STEP_KEYS = ["stepBasicInfo", "stepInterests", "stepItineraryStyle", "stepReview"];

const PREFERENCES = [
  { key: "History", icon: Landmark, labelKey: "prefHistory" },
  { key: "Adventure", icon: Mountain, labelKey: "prefAdventure" },
  { key: "Relaxation", icon: Waves, labelKey: "prefRelaxation" },
  { key: "Food", icon: Utensils, labelKey: "prefFood" },
  { key: "Shopping", icon: ShoppingBag, labelKey: "prefShopping" },
  { key: "Nature", icon: Trees, labelKey: "prefNature" },
];

const STYLES = [
  { key: "packed", labelKey: "stylePackedLabel", descKey: "stylePackedDesc" },
  { key: "balanced", labelKey: "styleBalancedLabel", descKey: "styleBalancedDesc" },
  { key: "relaxed", labelKey: "styleRelaxedLabel", descKey: "styleRelaxedDesc" },
];

export default function PlanTrip() {
  const navigate = useNavigate();
  const { tripForm, updateTripForm, generatePlan, lang } = useTrip();
  const [step, setStep] = useState(1);
  const [style, setStyle] = useState("balanced");

  function togglePreference(key) {
    const exists = tripForm.preferences.includes(key);
    const preferences = exists
      ? tripForm.preferences.filter((p) => p !== key)
      : [...tripForm.preferences, key];
    updateTripForm({ preferences });
  }

  function handleNext() {
    if (step < STEP_KEYS.length) {
      setStep(step + 1);
    } else {
      generatePlan();
      navigate("/recommendations");
    }
  }

  function handleBack() {
    if (step > 1) setStep(step - 1);
  }

  const canProceedStep1 = tripForm.destinationId && tripForm.budget > 0 && tripForm.days > 0;
  const selectedDestination = destinations.find((d) => d.id === tripForm.destinationId);
  const selectedDestName = selectedDestination
    ? (lang === "ar" ? selectedDestination.nameAr || selectedDestination.name : selectedDestination.name)
    : null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-heading text-2xl font-bold mb-1">{t(lang, "planTripTitle")}</h1>
      <p className="text-muted text-sm mb-6">{tf(lang, "stepOf", { step, total: STEP_KEYS.length })}</p>

      {/* Stepper */}
      <div className="flex items-center mb-8">
        {STEP_KEYS.map((labelKey, i) => {
          const num = i + 1;
          const active = num === step;
          const done = num < step;
          return (
            <div key={labelKey} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    done
                      ? "bg-primary text-white"
                      : active
                      ? "bg-primary-light text-white"
                      : "bg-surface dark:bg-white/10 text-muted"
                  }`}
                >
                  {done ? <Check size={14} /> : num}
                </div>
                <span className="text-[11px] text-muted mt-1 hidden sm:block">{t(lang, labelKey)}</span>
              </div>
              {i < STEP_KEYS.length - 1 && (
                <div className={`h-0.5 flex-1 mx-2 ${done ? "bg-primary" : "bg-gray-200 dark:bg-white/10"}`} />
              )}
            </div>
          );
        })}
      </div>

      <div className="card">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">{t(lang, "fieldDestination")}</label>
              <select
                className="input-field mt-1"
                value={tripForm.destinationId}
                onChange={(e) => updateTripForm({ destinationId: e.target.value })}
              >
                <option value="">{t(lang, "selectDestination")}</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>{lang === "ar" ? d.nameAr || d.name : d.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">{t(lang, "fieldStartDate")}</label>
                <input
                  type="date"
                  className="input-field mt-1"
                  value={tripForm.startDate}
                  onChange={(e) => updateTripForm({ startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">{t(lang, "fieldEndDate")}</label>
                <input
                  type="date"
                  className="input-field mt-1"
                  value={tripForm.endDate}
                  onChange={(e) => updateTripForm({ endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">{t(lang, "fieldTravelers")}</label>
                <input
                  type="number"
                  min={1}
                  className="input-field mt-1"
                  value={tripForm.people}
                  onChange={(e) => updateTripForm({ people: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">{t(lang, "fieldDays")}</label>
                <input
                  type="number"
                  min={1}
                  className="input-field mt-1"
                  value={tripForm.days}
                  onChange={(e) => updateTripForm({ days: Number(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">{t(lang, "fieldBudget")}</label>
              <input
                type="number"
                min={0}
                step={100}
                className="input-field mt-1"
                value={tripForm.budget}
                onChange={(e) => updateTripForm({ budget: Number(e.target.value) })}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="font-medium mb-1">{t(lang, "interestsQuestion")}</p>
            <p className="text-xs text-muted mb-4">{t(lang, "selectAllApply")}</p>
            <div className="grid grid-cols-3 gap-3">
              {PREFERENCES.map(({ key, icon: Icon, labelKey }) => {
                const active = tripForm.preferences.includes(key);
                return (
                  <button
                    key={key}
                    onClick={() => togglePreference(key)}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm transition-colors ${
                      active
                        ? "bg-primary text-white border-primary"
                        : "border-gray-200 dark:border-white/10 hover:border-primary-light"
                    }`}
                  >
                    <Icon size={20} />
                    {t(lang, labelKey)}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <p className="font-medium mb-1">{t(lang, "itineraryStyleQuestion")}</p>
            {STYLES.map((s) => (
              <button
                key={s.key}
                onClick={() => setStyle(s.key)}
                className={`w-full text-start rounded-xl border p-4 transition-colors ${
                  style === s.key
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >
                <p className="font-semibold">{t(lang, s.labelKey)}</p>
                <p className="text-xs text-muted">{t(lang, s.descKey)}</p>
              </button>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3 text-sm">
            <p className="font-semibold text-base">{t(lang, "reviewYourTrip")}</p>
            <div className="grid grid-cols-2 gap-y-2 text-muted">
              <span>{t(lang, "reviewDestination")}</span>
              <span className="text-ink dark:text-white font-medium">
                {selectedDestName || "—"}
              </span>
              <span>{t(lang, "reviewTravelers")}</span>
              <span className="text-ink dark:text-white font-medium">{tripForm.people}</span>
              <span>{t(lang, "reviewDays")}</span>
              <span className="text-ink dark:text-white font-medium">{tripForm.days}</span>
              <span>{t(lang, "reviewBudget")}</span>
              <span className="text-ink dark:text-white font-medium">{tripForm.budget.toLocaleString()} {t(lang, "egp")}</span>
              <span>{t(lang, "reviewInterests")}</span>
              <span className="text-ink dark:text-white font-medium">
                {tripForm.preferences.length > 0
                  ? tripForm.preferences.map((p) => t(lang, `pref${p}`)).join(", ")
                  : t(lang, "balanced")}
              </span>
              <span>{t(lang, "reviewItineraryStyle")}</span>
              <span className="text-ink dark:text-white font-medium">
                {t(lang, STYLES.find((s) => s.key === style)?.labelKey)}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={handleBack} disabled={step === 1} className="btn-secondary disabled:opacity-40">
          {t(lang, "back")}
        </button>
        <button
          onClick={handleNext}
          disabled={step === 1 && !canProceedStep1}
          className="btn-primary disabled:opacity-40"
        >
          {step === STEP_KEYS.length ? t(lang, "createMyTrip") : t(lang, "next")}
        </button>
      </div>
    </div>
  );
}

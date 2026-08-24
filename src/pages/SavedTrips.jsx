// src/pages/SavedTrips.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Pencil, X, Landmark, Mountain, Waves, Utensils, ShoppingBag, Trees } from "lucide-react";
import destinations from "../data/destinations.json";
import { useTrip } from "../context/TripContext";
import { t } from "../data/translations";

const PREFERENCES = [
  { key: "History", icon: Landmark, labelKey: "prefHistory" },
  { key: "Adventure", icon: Mountain, labelKey: "prefAdventure" },
  { key: "Relaxation", icon: Waves, labelKey: "prefRelaxation" },
  { key: "Food", icon: Utensils, labelKey: "prefFood" },
  { key: "Shopping", icon: ShoppingBag, labelKey: "prefShopping" },
  { key: "Nature", icon: Trees, labelKey: "prefNature" },
];

export default function SavedTrips() {
  const { savedTrips, deleteSavedTrip, updateSavedTrip, lang } = useTrip();
  const [editingTrip, setEditingTrip] = useState(null); // الرحلة اللي بيتم تعديلها دلوقتي
  const [editForm, setEditForm] = useState(null);

  function openEdit(trip) {
    setEditingTrip(trip);
    setEditForm({
      budget: trip.budget,
      days: trip.days,
      people: trip.people,
      preferences: [...(trip.preferences || [])],
    });
  }

  function closeEdit() {
    setEditingTrip(null);
    setEditForm(null);
  }

  function toggleEditPreference(key) {
    setEditForm((prev) => {
      const exists = prev.preferences.includes(key);
      const preferences = exists
        ? prev.preferences.filter((p) => p !== key)
        : [...prev.preferences, key];
      return { ...prev, preferences };
    });
  }

  function handleSaveEdit(e) {
    e.preventDefault();
    if (!editingTrip || !editForm) return;
    updateSavedTrip(editingTrip.id, editForm);
    closeEdit();
  }

  function handleDelete(id) {
    if (window.confirm(t(lang, "confirmDeleteTrip"))) {
      deleteSavedTrip(id);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-heading text-2xl font-bold mb-1">{t(lang, "savedTripsTitle")}</h1>
      <p className="text-muted text-sm mb-6">{t(lang, "savedTripsSubtitle")}</p>

      {savedTrips.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted mb-4">{t(lang, "noSavedTrips")}</p>
          <Link to="/plan-trip" className="btn-primary">{t(lang, "planTrip")}</Link>
        </div>
      )}

      <div className="space-y-4">
        {savedTrips.map((trip) => {
          const dest = destinations.find((d) => d.id === trip.destinationId);
          const destName = dest ? (lang === "ar" ? dest.nameAr || dest.name : dest.name) : "";
          return (
            <div key={trip.id} className="card flex flex-col sm:flex-row gap-4">
              <img
                src={dest?.image}
                alt={destName}
                className="w-full sm:w-32 h-32 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{destName}</p>
                    <p className="text-xs text-muted">
                      {trip.days} {t(lang, "fieldDays")} · {trip.people} {t(lang, "fieldTravelers")} ·{" "}
                      {trip.updatedAt ? t(lang, "updatedOn") : t(lang, "savedOn")}{" "}
                      {new Date(trip.updatedAt || trip.savedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => openEdit(trip)}
                      className="text-muted hover:text-primary"
                      title={t(lang, "editTripTitle")}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(trip.id)}
                      className="text-muted hover:text-red-500"
                      title={t(lang, "deleteTripTitle")}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3 text-xs">
                  <span className="bg-surface dark:bg-white/10 px-2 py-1 rounded-full">
                    🏨 {trip.hotel?.name}
                  </span>
                  <span className="bg-surface dark:bg-white/10 px-2 py-1 rounded-full">
                    💰 {trip.totalSpent.toLocaleString()} {t(lang, "egp")} {t(lang, "spentLabel")}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Trip Modal */}
      {editingTrip && editForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={closeEdit}
        >
          <div
            className="card w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-1">
              <h2 className="font-heading text-lg font-bold">{t(lang, "editTripModalTitle")}</h2>
              <button onClick={closeEdit} className="text-muted hover:text-ink dark:hover:text-white">
                <X size={20} />
              </button>
            </div>
            <p className="text-xs text-muted mb-4">{t(lang, "editTripModalSubtitle")}</p>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">{t(lang, "fieldTravelers")}</label>
                  <input
                    type="number"
                    min={1}
                    required
                    className="input-field mt-1"
                    value={editForm.people}
                    onChange={(e) => setEditForm((p) => ({ ...p, people: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">{t(lang, "fieldDays")}</label>
                  <input
                    type="number"
                    min={1}
                    required
                    className="input-field mt-1"
                    value={editForm.days}
                    onChange={(e) => setEditForm((p) => ({ ...p, days: Number(e.target.value) }))}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">{t(lang, "fieldBudget")}</label>
                <input
                  type="number"
                  min={0}
                  step={100}
                  required
                  className="input-field mt-1"
                  value={editForm.budget}
                  onChange={(e) => setEditForm((p) => ({ ...p, budget: Number(e.target.value) }))}
                />
              </div>

              <div>
                <p className="text-sm font-medium mb-2">{t(lang, "interestsQuestion")}</p>
                <div className="grid grid-cols-3 gap-2">
                  {PREFERENCES.map(({ key, icon: Icon, labelKey }) => {
                    const active = editForm.preferences.includes(key);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => toggleEditPreference(key)}
                        className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-xs transition-colors ${
                          active
                            ? "bg-primary text-white border-primary"
                            : "border-gray-200 dark:border-white/10 hover:border-primary-light"
                        }`}
                      >
                        <Icon size={16} />
                        {t(lang, labelKey)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={closeEdit} className="btn-secondary">
                  {t(lang, "cancel")}
                </button>
                <button type="submit" className="btn-primary">
                  {t(lang, "saveChanges")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// src/pages/AdminDashboard.jsx
// لوحة تحكم الأدمن: إضافة / تعديل / حذف الفنادق، الأماكن، الأنشطة، المطاعم، الوجهات
// البيانات دلوقتي متصلة مباشرة بـ JSON Server (REST API حقيقي) بدل localStorage.
// شغّل السيرفر قبل استخدام الصفحة دي: npm run server (أو npm run dev:full)
import { useEffect, useState } from "react";
import { Trash2, Pencil, Plus, X, RefreshCw, WifiOff } from "lucide-react";
import { useTrip } from "../context/TripContext";
import { t } from "../data/translations";
import {
  fetchEntity,
  createEntityItem,
  updateEntityItem,
  deleteEntityItem,
  ApiError,
} from "../api/adminApi";

const ENTITIES = {
  destinations: { labelKey: "entityDestinations", fields: ["id", "name", "nameAr", "rating", "bestTime"] },
  hotels: { labelKey: "entityHotels", fields: ["id", "destinationId", "name", "pricePerNight", "rating"] },
  places: { labelKey: "entityPlaces", fields: ["id", "destinationId", "name", "entryFee", "category"] },
  activities: { labelKey: "entityActivities", fields: ["id", "destinationId", "name", "price", "category"] },
  restaurants: { labelKey: "entityRestaurants", fields: ["id", "destinationId", "name", "avgMealPrice", "category"] },
};

export default function AdminDashboard() {
  const { lang } = useTrip();
  const [tab, setTab] = useState("hotels");
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [editing, setEditing] = useState(null); // item being edited, or {} for new
  const [mutating, setMutating] = useState(false);

  async function loadItems(entity) {
    setStatus("loading");
    try {
      const data = await fetchEntity(entity);
      setItems(data);
      setStatus("ready");
    } catch (err) {
      setItems([]);
      setStatus("error");
    }
  }

  useEffect(() => {
    loadItems(tab);
  }, [tab]);

  async function handleDelete(id) {
    if (!window.confirm(t(lang, "confirmDeleteRecord"))) return;
    setMutating(true);
    try {
      await deleteEntityItem(tab, id);
      setItems((prev) => prev.filter((it) => it.id !== id));
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : String(err));
    } finally {
      setMutating(false);
    }
  }

  async function handleSave(item, isNew) {
    setMutating(true);
    try {
      if (isNew) {
        const created = await createEntityItem(tab, item);
        setItems((prev) => [...prev, created]);
      } else {
        const updated = await updateEntityItem(tab, item.id, item);
        setItems((prev) => prev.map((it) => (it.id === item.id ? updated : it)));
      }
      setEditing(null);
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : String(err));
    } finally {
      setMutating(false);
    }
  }

  const fields = ENTITIES[tab].fields;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-heading text-2xl font-bold mb-1">{t(lang, "adminDashboardTitle")}</h1>
      <p className="text-muted text-sm mb-6">{t(lang, "adminDashboardSubtitle")}</p>

      <div className="flex gap-2 overflow-x-auto mb-6">
        {Object.entries(ENTITIES).map(([key, cfg]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap ${
              tab === key ? "bg-primary text-white" : "bg-white dark:bg-[#1a2233] border border-gray-200 dark:border-white/10 text-muted"
            }`}
          >
            {t(lang, cfg.labelKey)}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => loadItems(tab)}
          className="text-muted hover:text-primary flex items-center gap-1 text-sm"
          title={t(lang, "retry")}
        >
          <RefreshCw size={14} className={status === "loading" ? "animate-spin" : ""} />
        </button>
        <button
          onClick={() => setEditing({})}
          disabled={status !== "ready"}
          className="btn-primary !px-4 !py-2 text-sm flex items-center gap-1 disabled:opacity-40"
        >
          <Plus size={16} /> {t(lang, "addRecordPrefix")} {t(lang, ENTITIES[tab].labelKey)}
        </button>
      </div>

      {status === "error" && (
        <div className="card flex flex-col items-center text-center gap-3 py-10">
          <WifiOff size={28} className="text-red-400" />
          <p className="font-semibold">{t(lang, "serverOfflineTitle")}</p>
          <p className="text-sm text-muted max-w-sm">{t(lang, "serverOfflineDesc")}</p>
          <button onClick={() => loadItems(tab)} className="btn-secondary text-sm">
            {t(lang, "retry")}
          </button>
        </div>
      )}

      {status === "loading" && (
        <div className="card py-10 text-center text-muted text-sm">{t(lang, "loading")}</div>
      )}

      {status === "ready" && (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-start text-muted border-b border-gray-100 dark:border-white/10">
                {fields.map((f) => (
                  <th key={f} className="py-2 px-2 text-start font-medium capitalize">{f}</th>
                ))}
                <th className="py-2 px-2 text-end">{t(lang, "actions")}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 dark:border-white/5">
                  {fields.map((f) => (
                    <td key={f} className="py-2 px-2">{String(item[f] ?? "—")}</td>
                  ))}
                  <td className="py-2 px-2 text-end">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditing(item)} className="text-primary hover:text-primary-light">
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={mutating}
                        className="text-red-400 hover:text-red-500 disabled:opacity-40"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={fields.length + 1} className="text-center text-muted py-6">
                    {t(lang, "noRecordsYet")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <AdminFormModal
          fields={fields}
          initial={editing}
          mutating={mutating}
          lang={lang}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function AdminFormModal({ fields, initial, mutating, lang, onClose, onSave }) {
  const isNew = !initial.id;
  const [form, setForm] = useState(() => {
    const base = {};
    fields.forEach((f) => (base[f] = initial[f] ?? ""));
    if (!base.id) base.id = `id_${Date.now()}`;
    return base;
  });

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form, isNew);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <div className="card w-full max-w-sm relative">
        <button onClick={onClose} className="absolute top-4 end-4 text-muted hover:text-ink">
          <X size={18} />
        </button>
        <p className="font-semibold mb-4">{isNew ? t(lang, "addRecord") : t(lang, "editRecord")}</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          {fields.map((f) => (
            <div key={f}>
              <label className="text-xs font-medium capitalize">{f}</label>
              <input
                className="input-field mt-1"
                value={form[f]}
                disabled={f === "id" && !isNew}
                onChange={(e) => setForm({ ...form, [f]: e.target.value })}
              />
            </div>
          ))}
          <button type="submit" disabled={mutating} className="btn-primary w-full disabled:opacity-50">
            {mutating ? t(lang, "saving") : t(lang, "save")}
          </button>
        </form>
      </div>
    </div>
  );
}

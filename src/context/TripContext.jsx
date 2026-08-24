// src/context/TripContext.jsx
// إدارة الحالة العامة (Global State) عن طريق React Context API
import { createContext, useContext, useEffect, useState } from "react";
import { planTrip as runPlanTrip } from "../utils/budgetCalculator";

const TripContext = createContext(null);

const STORAGE_KEYS = {
  trips: "safarna_saved_trips", // legacy key (كان بيحفظ كل الرحلات مع بعض بدون تفرقة بين المستخدمين)
  tripsByUser: "safarna_trips_by_user", // { "email@x.com": [trip, trip, ...] }
  users: "safarna_users", // { "email@x.com": { name, password } }
  user: "safarna_user",
  theme: "safarna_theme",
  lang: "safarna_lang",
};

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function TripProvider({ children }) {
  // بيانات إدخال الرحلة (Step 1-3 في Plan My Trip)
  const [tripForm, setTripForm] = useState({
    destinationId: "",
    budget: 8000,
    days: 4,
    people: 2,
    preferences: [],
    startDate: "",
    endDate: "",
  });

  // نتيجة آخر خطة تم حسابها
  const [currentPlan, setCurrentPlan] = useState(null);

  // كل حسابات المستخدمين المسجلين: { email: { name, password } }
  const [users, setUsers] = useState(() => readStorage(STORAGE_KEYS.users, {}));

  // كل الرحلات المحفوظة، مقسّمة حسب إيميل صاحبها: { email: [trip, ...] }
  const [tripsByUser, setTripsByUser] = useState(() => readStorage(STORAGE_KEYS.tripsByUser, {}));

  // المستخدم الحالي (تسجيل دخول وهمي / Mock Auth)
  const [user, setUser] = useState(() => readStorage(STORAGE_KEYS.user, null));

  // الرحلات المحفوظة الخاصة بالمستخدم المسجل دخوله دلوقتي فقط
  const [savedTrips, setSavedTrips] = useState(() => {
    const currentUser = readStorage(STORAGE_KEYS.user, null);
    const allTrips = readStorage(STORAGE_KEYS.tripsByUser, {});
    return currentUser ? allTrips[currentUser.email] || [] : [];
  });

  // الوضع الليلي
  const [darkMode, setDarkMode] = useState(() => readStorage(STORAGE_KEYS.theme, false));

  // اللغة
  const [lang, setLang] = useState(() => readStorage(STORAGE_KEYS.lang, "en"));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.tripsByUser, JSON.stringify(tripsByUser));
  }, [tripsByUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.lang, JSON.stringify(lang));
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  function updateTripForm(patch) {
    setTripForm((prev) => ({ ...prev, ...patch }));
  }

  function generatePlan(formOverride) {
    const form = formOverride || tripForm;
    const plan = runPlanTrip(form);
    setCurrentPlan(plan);
    return plan;
  }

  function saveCurrentTrip() {
    if (!currentPlan || !user) return;
    const tripToSave = {
      ...currentPlan,
      id: `trip_${Date.now()}`,
      savedAt: new Date().toISOString(),
    };
    const updated = [tripToSave, ...savedTrips];
    setSavedTrips(updated);
    setTripsByUser((prev) => ({ ...prev, [user.email]: updated }));
    return tripToSave;
  }

  function deleteSavedTrip(id) {
    const updated = savedTrips.filter((t) => t.id !== id);
    setSavedTrips(updated);
    if (user) {
      setTripsByUser((prev) => ({ ...prev, [user.email]: updated }));
    }
  }

  // تعديل رحلة محفوظة: بناخد المدخلات الجديدة (ميزانية / أيام / أشخاص / تفضيلات)
  // ونعيد حساب الخطة بالكامل (فندق + أماكن + أنشطة + مطاعم + جدول يومي) بنفس اللوجيك المستخدم في الإنشاء
  function updateSavedTrip(id, formPatch) {
    const existing = savedTrips.find((t) => t.id === id);
    if (!existing) return null;

    const newForm = {
      destinationId: existing.destinationId,
      budget: Number(formPatch.budget),
      days: Number(formPatch.days),
      people: Number(formPatch.people),
      preferences: formPatch.preferences || [],
    };

    const recalculatedPlan = runPlanTrip(newForm);

    const updatedTrip = {
      ...recalculatedPlan,
      id: existing.id,
      savedAt: existing.savedAt,
      updatedAt: new Date().toISOString(),
    };

    const updated = savedTrips.map((t) => (t.id === id ? updatedTrip : t));
    setSavedTrips(updated);
    if (user) {
      setTripsByUser((prev) => ({ ...prev, [user.email]: updated }));
    }
    return updatedTrip;
  }

  // إنشاء حساب جديد (Sign Up): إيميل جديد يبدأ بدون أي رحلات محفوظة على الإطلاق
  function registerUser(name, email, password) {
    const normalizedEmail = email.trim().toLowerCase();
    if (users[normalizedEmail]) {
      return { success: false, error: "accountExists" };
    }
    const newUser = { name: name || normalizedEmail.split("@")[0] || "Traveler", email: normalizedEmail, password };
    setUsers((prev) => ({ ...prev, [normalizedEmail]: newUser }));
    // حساب جديد تمامًا: مفيش أي رحلات قديمة مرتبطة بيه
    setTripsByUser((prev) => ({ ...prev, [normalizedEmail]: [] }));
    setSavedTrips([]);
    setUser({ name: newUser.name, email: newUser.email });
    return { success: true, user: newUser };
  }

  // تسجيل الدخول (Login): لو الحساب موجود قبل كده، بترجعله رحلاته المحفوظة زي ما هي
  function loginUser(email, password) {
    const normalizedEmail = email.trim().toLowerCase();
    const existing = users[normalizedEmail];

    if (!existing) {
      // مفيش حساب مسجل بالإيميل ده قبل كده — سجّليه كحساب جديد (بدون رحلات)
      return registerUser(normalizedEmail.split("@")[0], normalizedEmail, password);
    }

    if (existing.password && existing.password !== password) {
      return { success: false, error: "wrongPassword" };
    }

    setUser({ name: existing.name, email: existing.email });
    setSavedTrips(tripsByUser[normalizedEmail] || []);
    return { success: true, user: existing };
  }

  function logout() {
    setUser(null);
    setSavedTrips([]);
  }

  const value = {
    tripForm,
    updateTripForm,
    currentPlan,
    generatePlan,
    savedTrips,
    saveCurrentTrip,
    deleteSavedTrip,
    updateSavedTrip,
    user,
    registerUser,
    loginUser,
    logout,
    darkMode,
    setDarkMode,
    lang,
    setLang,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrip must be used within TripProvider");
  return ctx;
}

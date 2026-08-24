// src/utils/budgetCalculator.js
// كل اللوجيك الخاص بتوزيع الميزانية وترشيح الفنادق/الأماكن/الأنشطة/المطاعم
// مبني بالكامل على JavaScript logic بدون AI أو Machine Learning

import hotelsData from "../data/hotels.json";
import placesData from "../data/places.json";
import activitiesData from "../data/activities.json";
import restaurantsData from "../data/restaurants.json";

// نسب توزيع الميزانية الافتراضية (زي الديزاين سيستم بالظبط)
export const BUDGET_ALLOCATION = {
  hotel: 0.4,
  food: 0.2,
  transportation: 0.15,
  places: 0.125,
  activities: 0.05,
  remaining: 0.075,
};

// تكلفة تقريبية للمواصلات الداخلية لكل يوم (تاكسي / أوبر / نقل بين الأماكن)
const TRANSPORT_PER_DAY = 250;

function byDestination(list, destinationId) {
  return list.filter((item) => item.destinationId === destinationId);
}

/**
 * يرشح أفضل فندق يناسب الميزانية المخصصة له
 */
export function recommendHotel(destinationId, hotelBudgetTotal, nights) {
  const hotels = byDestination(hotelsData, destinationId);
  if (hotels.length === 0 || nights <= 0) return null;

  const affordable = hotels
    .map((h) => ({ ...h, totalPrice: h.pricePerNight * nights }))
    .filter((h) => h.totalPrice <= hotelBudgetTotal)
    .sort((a, b) => b.rating - a.rating || b.pricePerNight - a.pricePerNight);

  if (affordable.length > 0) return affordable[0];

  // لو مفيش فندق يدخل في الميزانية، رجّع الأرخص المتاح كأقرب حل
  const cheapest = [...hotels].sort(
    (a, b) => a.pricePerNight - b.pricePerNight
  )[0];
  return { ...cheapest, totalPrice: cheapest.pricePerNight * nights, overBudget: true };
}

/**
 * يرشح الأماكن السياحية حسب الميزانية المتاحة وتفضيلات المستخدم وعدد الأيام
 */
export function recommendPlaces(destinationId, placesBudget, preferences, days) {
  const places = byDestination(placesData, destinationId);
  const maxPlaces = Math.max(days, 2); // مكان أو اتنين في اليوم بحد أقصى معقول

  const scored = places
    .map((p) => ({
      ...p,
      matchesPreference: preferences.length === 0 || preferences.some(
        (pref) => pref.toLowerCase() === p.category.toLowerCase()
      ),
    }))
    .sort((a, b) => (b.matchesPreference - a.matchesPreference) || a.entryFee - b.entryFee);

  const chosen = [];
  let spent = 0;
  for (const place of scored) {
    if (chosen.length >= maxPlaces) break;
    if (spent + place.entryFee <= placesBudget) {
      chosen.push(place);
      spent += place.entryFee;
    }
  }
  return { chosen, spent };
}

/**
 * يرشح الأنشطة حسب الميزانية المتاحة وتفضيلات المستخدم
 */
export function recommendActivities(destinationId, activitiesBudget, preferences, days) {
  const activities = byDestination(activitiesData, destinationId);
  const maxActivities = Math.max(Math.round(days / 1.5), 1);

  const scored = activities
    .map((a) => ({
      ...a,
      matchesPreference: preferences.length === 0 || preferences.some(
        (pref) => pref.toLowerCase() === a.category.toLowerCase()
      ),
    }))
    .sort((a, b) => (b.matchesPreference - a.matchesPreference) || a.price - b.price);

  const chosen = [];
  let spent = 0;
  for (const activity of scored) {
    if (chosen.length >= maxActivities) break;
    if (spent + activity.price <= activitiesBudget) {
      chosen.push(activity);
      spent += activity.price;
    }
  }
  return { chosen, spent };
}

/**
 * يرشح المطاعم حسب ميزانية الأكل المتاحة
 */
export function recommendRestaurants(destinationId, foodBudget, people, days) {
  const restaurants = byDestination(restaurantsData, destinationId);
  const mealsCount = days * 2; // غدا وعشاء تقريبا لكل يوم
  const budgetPerMeal = foodBudget / Math.max(mealsCount, 1) / Math.max(people, 1);

  const sorted = [...restaurants].sort(
    (a, b) => b.rating - a.rating
  );

  const affordable = sorted.filter((r) => r.avgMealPrice <= budgetPerMeal * 1.2);
  const pool = affordable.length > 0 ? affordable : sorted;

  // نختار حتى 3 مطاعم مختلفة للتنويع في الرحلة
  return pool.slice(0, 3);
}

/**
 * يبني جدول الرحلة يوم بيوم بناءً على العناصر المختارة
 */
export function generateItinerary({ days, hotel, places, activities, restaurants }) {
  const itinerary = [];
  const placesPool = [...places];
  const activitiesPool = [...activities];
  const restaurantsPool = restaurants.length > 0 ? restaurants : [{ name: "Local Restaurant" }];

  for (let day = 1; day <= days; day++) {
    const dayPlan = { day, items: [] };

    if (day === 1 && hotel) {
      dayPlan.items.push({ icon: "🏨", key: "itineraryHotelCheckin", vars: { name: hotel.name } });
    }

    if (day === days) {
      // آخر يوم: وقت حر + تسوق + تسجيل خروج
      dayPlan.items.push({ icon: "🌿", key: "itineraryFreeTime" });
      dayPlan.items.push({ icon: "🛍️", key: "itineraryShopping" });
      if (hotel) dayPlan.items.push({ icon: "🏨", key: "itineraryHotelCheckout" });
      itinerary.push(dayPlan);
      continue;
    }

    // كل يوم ناخد مكان سياحي واحد ونشاط واحد لو متاحين
    const place = placesPool.shift();
    if (place) dayPlan.items.push({ icon: "🏛️", key: "itineraryVisitPlace", vars: { name: place.name } });

    const activity = activitiesPool.shift();
    if (activity) dayPlan.items.push({ icon: "🎯", key: null, rawLabel: activity.name });

    const restaurant = restaurantsPool[(day - 1) % restaurantsPool.length];
    dayPlan.items.push({ icon: "🍽️", key: "itineraryDinnerAt", vars: { name: restaurant.name } });

    itinerary.push(dayPlan);
  }

  return itinerary;
}

/**
 * الدالة الرئيسية: بتاخد بيانات الرحلة كاملة وترجع خطة كاملة
 * (فندق + أماكن + أنشطة + مطاعم + توزيع ميزانية + جدول يومي)
 */
export function planTrip({ destinationId, budget, days, people, preferences = [] }) {
  const nights = Math.max(days - 1, 1);

  const hotelBudget = budget * BUDGET_ALLOCATION.hotel;
  const foodBudget = budget * BUDGET_ALLOCATION.food;
  const transportBudget = Math.min(budget * BUDGET_ALLOCATION.transportation, TRANSPORT_PER_DAY * days);
  const placesBudget = budget * BUDGET_ALLOCATION.places;
  const activitiesBudget = budget * BUDGET_ALLOCATION.activities;

  const hotel = recommendHotel(destinationId, hotelBudget, nights);
  const { chosen: places, spent: placesSpent } = recommendPlaces(
    destinationId,
    placesBudget,
    preferences,
    days
  );
  const { chosen: activities, spent: activitiesSpent } = recommendActivities(
    destinationId,
    activitiesBudget,
    preferences,
    days
  );
  const restaurants = recommendRestaurants(destinationId, foodBudget, people, days);

  const hotelCost = hotel ? hotel.totalPrice : 0;
  const totalSpent = hotelCost + foodBudget + transportBudget + placesSpent + activitiesSpent;
  const remaining = Math.max(budget - totalSpent, 0);

  const breakdown = [
    { key: "hotel", labelKey: "budget_hotel", icon: "🏨", value: Math.round(hotelCost) },
    { key: "food", labelKey: "budget_food", icon: "🍽️", value: Math.round(foodBudget) },
    { key: "transportation", labelKey: "budget_transportation", icon: "🚕", value: Math.round(transportBudget) },
    { key: "places", labelKey: "budget_places", icon: "🏛️", value: Math.round(placesSpent) },
    { key: "activities", labelKey: "budget_activities", icon: "🎯", value: Math.round(activitiesSpent) },
    { key: "remaining", labelKey: "budget_remaining", icon: "💰", value: Math.round(remaining) },
  ];

  const itinerary = generateItinerary({ days, hotel, places, activities, restaurants });

  const isFeasible = hotel && !hotel.overBudget && totalSpent <= budget * 1.05;

  return {
    destinationId,
    budget,
    days,
    people,
    preferences,
    hotel,
    places,
    activities,
    restaurants,
    breakdown,
    totalSpent: Math.round(totalSpent),
    remaining: Math.round(remaining),
    itinerary,
    isFeasible,
  };
}

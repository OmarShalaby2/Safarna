// src/api/adminApi.js
// طبقة اتصال حقيقية بين لوحة تحكم الأدمن وسيرفر JSON Server (json-server)
// شغّل السيرفر بالأمر: npm run server  (بيشتغل على http://localhost:3001)
// أو شغّل الاتنين مع بعض بالأمر: npm run dev:full

const API_BASE_URL = "http://localhost:3001";

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch (err) {
    // فشل الاتصال بالكامل (السيرفر مش شغال / مشكلة شبكة)
    throw new ApiError("NETWORK_ERROR", 0);
  }

  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}`, response.status);
  }

  if (response.status === 204) return null; // No Content (بعد الحذف مثلاً)
  return response.json();
}

// GET /entity  -> كل السجلات
export function fetchEntity(entity) {
  return request(`/${entity}`);
}

// POST /entity -> إضافة سجل جديد
export function createEntityItem(entity, item) {
  return request(`/${entity}`, {
    method: "POST",
    body: JSON.stringify(item),
  });
}

// PUT /entity/:id -> تعديل سجل بالكامل
export function updateEntityItem(entity, id, item) {
  return request(`/${entity}/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(item),
  });
}

// DELETE /entity/:id -> حذف سجل
export function deleteEntityItem(entity, id) {
  return request(`/${entity}/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

export { ApiError };

import { fetchAPI } from "./api";

export async function loginUser(email, password) {
  const users = await fetchAPI(
    `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  );

  if (!users || users.length === 0) {
    throw new Error("Invalid email or password");
  }

  return users[0];
}

export async function registerUser(userData) {
  const existingUsers = await fetchAPI(
    `/users?email=${encodeURIComponent(userData.email)}`
  );

  if (existingUsers && existingUsers.length > 0) {
    throw new Error("Email already exists");
  }

  const newUserPayload = {
    ...userData,
    budgetCurrency: userData.budgetCurrency || "EGP",
    role: "user",
  };

  return fetchAPI("/users", {
    method: "POST",
    body: JSON.stringify(newUserPayload),
  });
}

export const getUser = (id) => fetchAPI(`/users/${id}`);

export const updateUser = (id, updates) =>
  fetchAPI(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });

export const deleteUser = (id) =>
  fetchAPI(`/users/${id}`, { method: "DELETE" });
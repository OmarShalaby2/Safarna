import { fetchAPI } from "./api";

// Create (Register - defaults to standard user)
export const registerUser = (userData) => {
	const newUserPayload = {
		...userData,
		role: "user",
	};

	return fetchAPI("/users", {
		method: "POST",
		body: JSON.stringify(newUserPayload),
	});
};

// Read (Login Simulation)
export const loginUser = async (email, password) => {
	const users = await fetchAPI(`/users?email=${email}&password=${password}`);
	if (users.length === 0) throw new Error("Invalid email or password");
	return users[0];
};

// Read (Get specific user)
export const getUser = (id) => fetchAPI(`/users/${id}`);

// Update (Profile or Budget)
export const updateUser = (id, updates) =>
	fetchAPI(`/users/${id}`, { method: "PATCH", body: JSON.stringify(updates) });

// Delete (Remove account)
export const deleteUser = (id) =>
	fetchAPI(`/users/${id}`, { method: "DELETE" });

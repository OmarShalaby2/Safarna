import { fetchAPI } from "./api";

export const getRestaurants = (destinationId = null) => {
	const query = destinationId ? `?destinationId=${destinationId}` : "";
	return fetchAPI(`/restaurants${query}`);
};

export const getRestaurantById = (id) => fetchAPI(`/restaurants/${id}`);

export const createRestaurant = (data) =>
	fetchAPI("/restaurants", { method: "POST", body: JSON.stringify(data) });

export const updateRestaurant = (id, data) =>
	fetchAPI(`/restaurants/${id}`, {
		method: "PATCH",
		body: JSON.stringify(data),
	});

export const deleteRestaurant = (id) =>
	fetchAPI(`/restaurants/${id}`, { method: "DELETE" });

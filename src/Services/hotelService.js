import { fetchAPI } from "./api";

export const getHotels = (destinationId = null) => {
	const query = destinationId ? `?destinationId=${destinationId}` : "";
	return fetchAPI(`/hotels${query}`);
};

export const getHotelById = (id) => fetchAPI(`/hotels/${id}`);

export const createHotel = (data) =>
	fetchAPI("/hotels", { method: "POST", body: JSON.stringify(data) });

export const updateHotel = (id, data) =>
	fetchAPI(`/hotels/${id}`, { method: "PATCH", body: JSON.stringify(data) });

export const deleteHotel = (id) =>
	fetchAPI(`/hotels/${id}`, { method: "DELETE" });

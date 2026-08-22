import { fetchAPI } from "./api";

export const getDestinations = () => fetchAPI("/destinations");

export const getDestinationById = (id) => fetchAPI(`/destinations/${id}`);

export const createDestination = (data) =>
	fetchAPI("/destinations", { method: "POST", body: JSON.stringify(data) });

export const updateDestination = (id, data) =>
	fetchAPI(`/destinations/${id}`, {
		method: "PATCH",
		body: JSON.stringify(data),
	});

export const deleteDestination = (id) =>
	fetchAPI(`/destinations/${id}`, { method: "DELETE" });

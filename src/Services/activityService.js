import { fetchAPI } from "./api";

export const getActivities = (destinationId = null, type = null) => {
	let query = "";
	if (destinationId && type)
		query = `?destinationId=${destinationId}&type=${type}`;
	else if (destinationId) query = `?destinationId=${destinationId}`;
	else if (type) query = `?type=${type}`;

	return fetchAPI(`/activities${query}`);
};

export const getActivityById = (id) => fetchAPI(`/activities/${id}`);

export const createActivity = (data) =>
	fetchAPI("/activities", { method: "POST", body: JSON.stringify(data) });

export const updateActivity = (id, data) =>
	fetchAPI(`/activities/${id}`, {
		method: "PATCH",
		body: JSON.stringify(data),
	});

export const deleteActivity = (id) =>
	fetchAPI(`/activities/${id}`, { method: "DELETE" });

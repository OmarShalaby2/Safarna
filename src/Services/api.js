const BASE_URL = "http://localhost:5000";

export const fetchAPI = async (endpoint, options = {}) => {
	const response = await fetch(`${BASE_URL}${endpoint}`, {
		headers: { "Content-Type": "application/json", ...options.headers },
		...options,
	});
	if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
	return response.json();
};
    
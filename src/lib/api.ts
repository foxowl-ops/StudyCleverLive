const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export const fetchApi = async (path: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${path}`;
  const res = await fetch(url, options);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    try {
      (error as any).info = await res.json();
    } catch (e) {
      // The response might not be JSON
      (error as any).info = await res.text();
    }
    (error as any).status = res.status;
    throw error;
  }
  // Handle cases where the response is empty
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return res.json();
  }
  return {};
};

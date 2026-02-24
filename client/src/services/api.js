const BASE_URL = 'http://localhost:3000/api';

export const apiRequest = async (endpoint, method = 'GET', body = null, key = null) => {
  const headers = { 'Content-Type': 'application/json' };
  if (key) headers['x-api-key'] = key;

  // Add a timestamp to GET requests to prevent 304 Caching
  const url = method === 'GET' 
    ? `http://localhost:3000/api${endpoint}${endpoint.includes('?') ? '&' : '?'}t=${Date.now()}`
    : `http://localhost:3000/api${endpoint}`;

  try {
    const response = await fetch(url, {
      method,
      headers,
      cache: 'no-store', // Tell browser not to cache
      body: body ? JSON.stringify(body) : null,
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || data.message || "Request failed");
    
    return data;
  } catch (error) {
    return { isError: true, message: error.message };
  }
};
/*
export const apiRequest = async (endpoint, method = 'GET', body = null, key = null) => {
  const headers = { 'Content-Type': 'application/json' };
  if (key) headers['x-api-key'] = key;

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || data.message || 'Request failed');
    }
    return data;
  } catch (error) {
    return { error: "Connection Failed", details: error.message };
  }
};
*/
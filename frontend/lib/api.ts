const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, '') || '/api';

export async function fetchFromApi(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  getLogs: () => fetchFromApi('/logs/'),
  getMetrics: () => fetchFromApi('/dashboard-metrics/'),
  getStats: () => fetchFromApi('/activity-stats/'),
  getBlockedIPs: () => fetchFromApi('/blocked-ips/'),
  simulate: () => fetchFromApi('/simulate/'),
  detect: (data: any) => fetchFromApi('/detect/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

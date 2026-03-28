const API_BASE = "http://127.0.0.1:8000";

export async function listLeads() {
  const response = await fetch(`${API_BASE}/leads`);
  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }
  return response.json();
}

export async function createLead(payload) {
  const response = await fetch(`${API_BASE}/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create lead");
  }

  return response.json();
}

import { useEffect, useState } from "react";
import API_BASE from "../config/api";

const emptyForm = {
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  property_address: "",
  city: "",
  state: "",
  zip: "",
  status: "New",
  notes: "",
};

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function loadLeads() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/leads`);
      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }
      const data = await response.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        `Could not load leads from ${API_BASE}/leads. Make sure the FastAPI backend is running on port 8000.`
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`Save failed with ${response.status}`);
      }

      setForm(emptyForm);
      await loadLeads();
    } catch (err) {
      setError(`Could not save lead to ${API_BASE}/leads.`);
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Leads</h1>
      <p>Track prospects and new opportunities.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "24px" }}>
        <section style={cardStyle}>
          <h2 style={sectionTitle}>New Lead</h2>
          <form onSubmit={handleSubmit}>
            <div style={grid2}>
              <input name="first_name" placeholder="First name" value={form.first_name} onChange={updateField} style={inputStyle} />
              <input name="last_name" placeholder="Last name" value={form.last_name} onChange={updateField} style={inputStyle} />
              <input name="phone" placeholder="Phone" value={form.phone} onChange={updateField} style={inputStyle} />
              <input name="email" placeholder="Email" value={form.email} onChange={updateField} style={inputStyle} />
              <input name="property_address" placeholder="Property address" value={form.property_address} onChange={updateField} style={{ ...inputStyle, gridColumn: "1 / span 2" }} />
              <input name="city" placeholder="City" value={form.city} onChange={updateField} style={inputStyle} />
              <input name="state" placeholder="State" value={form.state} onChange={updateField} style={inputStyle} />
              <input name="zip" placeholder="ZIP" value={form.zip} onChange={updateField} style={inputStyle} />
              <select name="status" value={form.status} onChange={updateField} style={inputStyle}>
                <option>New</option>
                <option>Contacted</option>
                <option>Inspection Scheduled</option>
                <option>Claim Pending</option>
                <option>Approved</option>
                <option>Lost</option>
              </select>
              <textarea name="notes" placeholder="Notes" value={form.notes} onChange={updateField} style={{ ...inputStyle, gridColumn: "1 / span 2", minHeight: 110, resize: "vertical" }} />
            </div>
            <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
              <button type="submit" disabled={saving} style={primaryButton}>
                {saving ? "Saving..." : "Save Lead"}
              </button>
              <button type="button" onClick={loadLeads} style={secondaryButton}>Refresh</button>
            </div>
          </form>
        </section>

        <section style={cardStyle}>
          <h2 style={sectionTitle}>Lead List</h2>
          {loading ? <p>Loading leads...</p> : null}
          {error ? <p style={{ color: "#b42318" }}>{error}</p> : null}
          {!loading && !error && leads.length === 0 ? <p>No leads yet.</p> : null}
          {!loading && leads.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td>{`${lead.first_name || ""} ${lead.last_name || ""}`.trim() || "—"}</td>
                      <td>{lead.phone || "—"}</td>
                      <td>{lead.property_address || "—"}</td>
                      <td>{lead.status || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #d8dde6",
  borderRadius: 10,
  boxShadow: "0 2px 8px rgba(16, 24, 40, 0.04)",
  padding: 20,
};

const sectionTitle = {
  marginTop: 0,
  marginBottom: 16,
  fontSize: 20,
};

const grid2 = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #c9cfd6",
  boxSizing: "border-box",
  fontSize: 14,
};

const primaryButton = {
  background: "#0176d3",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "10px 16px",
  cursor: "pointer",
};

const secondaryButton = {
  background: "#fff",
  color: "#16325c",
  border: "1px solid #c9cfd6",
  borderRadius: 8,
  padding: "10px 16px",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

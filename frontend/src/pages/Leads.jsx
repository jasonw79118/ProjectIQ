
import { useEffect, useState } from "react";
import "../styles/leads.css";

const API_BASE = "http://127.0.0.1:8000";

const emptyForm = {
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  property_address: "",
  city: "",
  state: "",
  zip: "",
  source: "",
  notes: "",
};

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadLeads() {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${API_BASE}/leads`);
      if (!response.ok) throw new Error("Unable to load leads.");
      const data = await response.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Could not load leads. Make sure the FastAPI backend is running on port 8000.");
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

  async function saveLead(event) {
    event.preventDefault();
    try {
      setSaving(true);
      setError("");
      const response = await fetch(`${API_BASE}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Unable to save lead.");
      setForm(emptyForm);
      await loadLeads();
    } catch (err) {
      setError("Could not save lead. Check that the backend is running and accepting requests.");
    } finally {
      setSaving(false);
    }
  }

  async function convertLead(id) {
    try {
      const response = await fetch(`${API_BASE}/leads/${id}/convert`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Unable to convert lead.");
      await loadLeads();
    } catch (err) {
      setError("Could not convert the lead.");
    }
  }

  return (
    <div className="leads-page">
      <div className="page-header">
        <div>
          <h1>Leads</h1>
          <p>Track prospects, inspections, and new roofing opportunities.</p>
        </div>
      </div>

      {error ? <div className="alert-error">{error}</div> : null}

      <div className="lead-layout">
        <section className="card form-card">
          <div className="card-header">
            <h2>New Lead</h2>
            <span className="subtle-text">Create a lead record for a new prospect.</span>
          </div>

          <form className="lead-form" onSubmit={saveLead}>
            <div className="form-grid two-col">
              <div className="field">
                <label htmlFor="first_name">First Name</label>
                <input id="first_name" name="first_name" value={form.first_name} onChange={updateField} />
              </div>

              <div className="field">
                <label htmlFor="last_name">Last Name</label>
                <input id="last_name" name="last_name" value={form.last_name} onChange={updateField} />
              </div>

              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" value={form.phone} onChange={updateField} />
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={updateField} />
              </div>

              <div className="field field-span-2">
                <label htmlFor="property_address">Property Address</label>
                <input id="property_address" name="property_address" value={form.property_address} onChange={updateField} />
              </div>

              <div className="field">
                <label htmlFor="city">City</label>
                <input id="city" name="city" value={form.city} onChange={updateField} />
              </div>

              <div className="field">
                <label htmlFor="state">State</label>
                <input id="state" name="state" value={form.state} onChange={updateField} />
              </div>

              <div className="field">
                <label htmlFor="zip">ZIP</label>
                <input id="zip" name="zip" value={form.zip} onChange={updateField} />
              </div>

              <div className="field">
                <label htmlFor="source">Lead Source</label>
                <input id="source" name="source" value={form.source} onChange={updateField} />
              </div>

              <div className="field field-span-2">
                <label htmlFor="notes">Notes</label>
                <textarea id="notes" name="notes" rows="4" value={form.notes} onChange={updateField} />
              </div>
            </div>

            <div className="form-actions">
              <button className="primary-btn" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Lead"}
              </button>
            </div>
          </form>
        </section>

        <section className="card list-card">
          <div className="card-header">
            <h2>Lead List</h2>
            <span className="subtle-text">{leads.length} total lead{leads.length === 1 ? "" : "s"}</span>
          </div>

          {loading ? (
            <div className="empty-state">Loading leads...</div>
          ) : leads.length === 0 ? (
            <div className="empty-state">No leads found yet.</div>
          ) : (
            <div className="table-wrap">
              <table className="lead-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td>{`${lead.first_name || ""} ${lead.last_name || ""}`.trim() || "—"}</td>
                      <td>{lead.phone || "—"}</td>
                      <td>{lead.email || "—"}</td>
                      <td>{lead.property_address || "—"}</td>
                      <td>
                        <span className="status-pill">{lead.status || "new"}</span>
                      </td>
                      <td>
                        <button
                          className="secondary-btn"
                          type="button"
                          onClick={() => convertLead(lead.id)}
                          disabled={lead.status === "converted"}
                        >
                          {lead.status === "converted" ? "Converted" : "Convert"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

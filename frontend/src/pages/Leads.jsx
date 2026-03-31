import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

const emptyForm = {
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  property_address: "",
  city: "",
  state: "TX",
  zip: "",
  source: "Website",
  status: "New Lead",
  notes: "",
};

export default function Leads() {
  const [form, setForm] = useState(emptyForm);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadLeads() {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${API_BASE_URL}/leads`);
      if (!response.ok) throw new Error("Failed to load leads.");
      const data = await response.json();
      setLeads(data);
    } catch (err) {
      setError("Could not load leads. Make sure the FastAPI backend is running on port 8000.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  function onChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Save failed");
      setForm(emptyForm);
      setMessage("Lead saved.");
      await loadLeads();
    } catch (err) {
      setError("Lead save failed. Check that the FastAPI backend is running.");
    } finally {
      setSaving(false);
    }
  }

  async function convertLead(leadId) {
    setError("");
    setMessage("");
    try {
      const response = await fetch(`${API_BASE_URL}/leads/${leadId}/convert`, { method: "POST" });
      if (!response.ok) throw new Error("Convert failed");
      const data = await response.json();
      setMessage(`Lead converted to customer: ${data.customer.display_name}`);
      await loadLeads();
    } catch (err) {
      setError("Could not convert the lead into a customer.");
    }
  }

  return (
    <div className="page-stack">
      <div className="page-header">
        <div>
          <h1>Leads</h1>
          <p>Track incoming prospects and convert them into customer records.</p>
        </div>
      </div>

      {error ? <div className="alert-error">{error}</div> : null}
      {message ? <div className="alert-success">{message}</div> : null}

      <div className="card-grid card-grid-2">
        <section className="card">
          <div className="card-header">
            <h2>New Lead</h2>
            <span className="badge">Phase 2</span>
          </div>
          <form className="form-grid" onSubmit={onSubmit}>
            <label>
              First Name
              <input name="first_name" value={form.first_name} onChange={onChange} required />
            </label>
            <label>
              Last Name
              <input name="last_name" value={form.last_name} onChange={onChange} required />
            </label>
            <label>
              Phone
              <input name="phone" value={form.phone} onChange={onChange} />
            </label>
            <label>
              Email
              <input name="email" value={form.email} onChange={onChange} />
            </label>
            <label className="full-span">
              Property Address
              <input name="property_address" value={form.property_address} onChange={onChange} />
            </label>
            <label>
              City
              <input name="city" value={form.city} onChange={onChange} />
            </label>
            <label>
              State
              <input name="state" value={form.state} onChange={onChange} />
            </label>
            <label>
              ZIP
              <input name="zip" value={form.zip} onChange={onChange} />
            </label>
            <label>
              Source
              <select name="source" value={form.source} onChange={onChange}>
                <option>Website</option>
                <option>Referral</option>
                <option>Door Knock</option>
                <option>Social</option>
                <option>Phone Call</option>
              </select>
            </label>
            <label>
              Status
              <select name="status" value={form.status} onChange={onChange}>
                <option>New Lead</option>
                <option>Contacted</option>
                <option>Inspection Scheduled</option>
                <option>Estimate Sent</option>
                <option>Claim Pending</option>
              </select>
            </label>
            <label className="full-span">
              Notes
              <textarea name="notes" rows="4" value={form.notes} onChange={onChange} />
            </label>
            <div className="full-span actions-row">
              <button className="primary-btn" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Lead"}
              </button>
            </div>
          </form>
        </section>

        <section className="card">
          <div className="card-header">
            <h2>Lead Summary</h2>
            <span className="badge">{leads.length} total</span>
          </div>
          <div className="metrics-grid">
            <div className="metric-card">
              <span className="metric-label">Open Leads</span>
              <strong>{leads.filter((lead) => lead.status !== "Converted").length}</strong>
            </div>
            <div className="metric-card">
              <span className="metric-label">Converted</span>
              <strong>{leads.filter((lead) => lead.status === "Converted").length}</strong>
            </div>
            <div className="metric-card">
              <span className="metric-label">Inspection Scheduled</span>
              <strong>{leads.filter((lead) => lead.status === "Inspection Scheduled").length}</strong>
            </div>
            <div className="metric-card">
              <span className="metric-label">Website Source</span>
              <strong>{leads.filter((lead) => lead.source === "Website").length}</strong>
            </div>
          </div>
        </section>
      </div>

      <section className="card">
        <div className="card-header">
          <h2>Lead List</h2>
          <button className="secondary-btn" type="button" onClick={loadLeads}>Refresh</button>
        </div>
        {loading ? (
          <p>Loading leads...</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Source</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan="6">No leads yet.</td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id}>
                      <td>{lead.first_name} {lead.last_name}</td>
                      <td>{lead.phone || "-"}</td>
                      <td>{lead.property_address || "-"}</td>
                      <td><span className="status-pill">{lead.status}</span></td>
                      <td>{lead.source || "-"}</td>
                      <td>
                        <button
                          className="table-action-btn"
                          type="button"
                          onClick={() => convertLead(lead.id)}
                          disabled={lead.status === "Converted"}
                        >
                          {lead.status === "Converted" ? "Converted" : "Convert"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

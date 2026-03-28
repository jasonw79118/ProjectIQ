import { useEffect, useMemo, useState } from "react";
import { listLeads, createLead } from "../services/api";

const emptyLead = {
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  property_address: "",
  city: "",
  state: "",
  zip: "",
  source: "",
  status: "New Lead",
  notes: "",
};

export default function Leads() {
  const [lead, setLead] = useState(emptyLead);
  const [leads, setLeads] = useState([]);
  const [message, setMessage] = useState("Loading leads...");
  const [saving, setSaving] = useState(false);

  async function loadLeads() {
    try {
      const data = await listLeads();
      setLeads(data);
      setMessage(data.length ? "" : "No leads yet. Add your first lead below.");
    } catch (error) {
      setMessage("Could not load leads. Make sure the FastAPI backend is running on port 8000.");
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  const leadName = useMemo(() => `${lead.first_name} ${lead.last_name}`.trim(), [lead]);

  function handleChange(event) {
    const { name, value } = event.target;
    setLead((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await createLead(lead);
      setLead(emptyLead);
      setMessage("Lead saved.");
      await loadLeads();
    } catch (error) {
      setMessage("Lead save failed. Check that the backend is running and CORS is enabled.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1>Leads</h1>
        <p>Create and track new prospects for roofing, construction, and insurance work.</p>
      </div>

      <div className="two-column-grid">
        <div className="card">
          <h2>New Lead</h2>
          <form className="lead-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>First Name</label>
              <input name="first_name" value={lead.first_name} onChange={handleChange} required />
            </div>

            <div className="form-row">
              <label>Last Name</label>
              <input name="last_name" value={lead.last_name} onChange={handleChange} required />
            </div>

            <div className="form-row">
              <label>Phone</label>
              <input name="phone" value={lead.phone} onChange={handleChange} />
            </div>

            <div className="form-row">
              <label>Email</label>
              <input name="email" value={lead.email} onChange={handleChange} />
            </div>

            <div className="form-row">
              <label>Property Address</label>
              <input name="property_address" value={lead.property_address} onChange={handleChange} />
            </div>

            <div className="form-row split">
              <div>
                <label>City</label>
                <input name="city" value={lead.city} onChange={handleChange} />
              </div>
              <div>
                <label>State</label>
                <input name="state" value={lead.state} onChange={handleChange} />
              </div>
              <div>
                <label>ZIP</label>
                <input name="zip" value={lead.zip} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row split">
              <div>
                <label>Source</label>
                <input name="source" value={lead.source} onChange={handleChange} placeholder="Referral, ad, web, etc." />
              </div>
              <div>
                <label>Status</label>
                <select name="status" value={lead.status} onChange={handleChange}>
                  <option>New Lead</option>
                  <option>Contacted</option>
                  <option>Inspection Scheduled</option>
                  <option>Estimate Sent</option>
                  <option>Claim Pending</option>
                  <option>Approved</option>
                  <option>Contract Signed</option>
                  <option>Lost</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <label>Notes</label>
              <textarea name="notes" rows="4" value={lead.notes} onChange={handleChange} />
            </div>

            <div className="form-actions">
              <button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Lead"}
              </button>
              <span className="form-helper">{leadName ? `Preparing record for ${leadName}` : "Enter lead details"}</span>
            </div>
          </form>
        </div>

        <div className="card">
          <h2>Lead List</h2>
          {message ? <div className="status-message">{message}</div> : null}

          <div className="list-stack">
            {leads.map((item) => (
              <div key={item.id} className="list-item">
                <div className="list-item-header">
                  <strong>{item.first_name} {item.last_name}</strong>
                  <span className="pill">{item.status}</span>
                </div>
                <div>{item.property_address || "No property address yet"}</div>
                <div className="muted">{item.phone || "No phone"} · {item.email || "No email"}</div>
                <div className="muted">Source: {item.source || "Not set"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

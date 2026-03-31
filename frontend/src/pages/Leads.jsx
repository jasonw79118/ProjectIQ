import { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
const emptyForm = { first_name:"", last_name:"", phone:"", email:"", property_address:"", city:"", state:"", zip:"", source:"", notes:"" };

export default function Leads() {
  const [form, setForm] = useState(emptyForm);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadLeads() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE}/leads`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch {
      setError(`Could not load leads from ${API_BASE}. Make sure the FastAPI backend is running on port 8000.`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadLeads(); }, []);

  function onChange(e) {
    const { name, value } = e.target;
    setForm(current => ({ ...current, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setForm(emptyForm);
      await loadLeads();
    } catch {
      setError(`Could not save lead to ${API_BASE}. Make sure the FastAPI backend is running on port 8000.`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page-grid">
      <div className="card">
        <div className="card-header">
          <div><div className="eyebrow">Lead intake</div><h2>New Lead</h2></div>
        </div>
        <form onSubmit={onSubmit} className="form-grid">
          <label className="field"><span>First name</span><input name="first_name" value={form.first_name} onChange={onChange} required /></label>
          <label className="field"><span>Last name</span><input name="last_name" value={form.last_name} onChange={onChange} required /></label>
          <label className="field"><span>Phone</span><input name="phone" value={form.phone} onChange={onChange} /></label>
          <label className="field"><span>Email</span><input name="email" value={form.email} onChange={onChange} /></label>
          <label className="field field-span-2"><span>Property address</span><input name="property_address" value={form.property_address} onChange={onChange} /></label>
          <label className="field"><span>City</span><input name="city" value={form.city} onChange={onChange} /></label>
          <label className="field"><span>State</span><input name="state" value={form.state} onChange={onChange} /></label>
          <label className="field"><span>ZIP</span><input name="zip" value={form.zip} onChange={onChange} /></label>
          <label className="field"><span>Lead source</span><input name="source" value={form.source} onChange={onChange} /></label>
          <label className="field field-span-2"><span>Notes</span><textarea name="notes" value={form.notes} onChange={onChange} rows="4" /></label>
          <div className="actions field-span-2"><button className="primary-button" type="submit" disabled={saving}>{saving ? "Saving..." : "Save lead"}</button></div>
        </form>
      </div>

      <div className="card">
        <div className="card-header">
          <div><div className="eyebrow">Pipeline</div><h2>Lead List</h2></div>
          <button className="secondary-button" onClick={loadLeads} type="button">Refresh</button>
        </div>

        {error ? <div className="error-banner">{error}</div> : null}

        {loading ? (
          <div className="empty-state">Loading leads…</div>
        ) : leads.length === 0 ? (
          <div className="empty-state">No leads yet. Add your first lead above.</div>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>Address</th><th>Source</th></tr></thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.first_name} {lead.last_name}</td>
                    <td>{lead.phone || "—"}</td>
                    <td>{lead.email || "—"}</td>
                    <td>{lead.property_address || "—"}</td>
                    <td>{lead.source || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCustomers() {
      try {
        const response = await fetch(`${API_BASE_URL}/customers`);
        if (!response.ok) throw new Error("Failed to load customers");
        const data = await response.json();
        setCustomers(data);
      } catch (err) {
        setError("Could not load customers. Make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    }
    loadCustomers();
  }, []);

  return (
    <div className="page-stack">
      <div className="page-header">
        <div>
          <h1>Customers</h1>
          <p>Converted leads land here so the contractor can start managing active relationships.</p>
        </div>
      </div>

      {error ? <div className="alert-error">{error}</div> : null}

      <section className="card">
        <div className="card-header">
          <h2>Customer List</h2>
          <span className="badge">{customers.length} total</span>
        </div>
        {loading ? (
          <p>Loading customers...</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Source Lead</th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan="5">No customers yet. Convert a lead from the Leads page.</td>
                  </tr>
                ) : (
                  customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.display_name}</td>
                      <td>{customer.primary_phone || "-"}</td>
                      <td>{customer.primary_email || "-"}</td>
                      <td>{customer.mailing_address || "-"}</td>
                      <td>{customer.source_lead_id || "-"}</td>
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

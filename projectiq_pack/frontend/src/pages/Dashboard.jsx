const cardStyle = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  padding: "18px",
  boxShadow: "0 6px 18px rgba(15, 23, 42, 0.04)",
};

export default function Dashboard() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Dashboard</h1>
      <p style={{ color: "#6b7280", marginBottom: "24px" }}>
        ProjectIQ starter shell is running.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div style={cardStyle}>
          <div style={{ color: "#6b7280" }}>Open Leads</div>
          <div style={{ fontSize: "2rem", fontWeight: 700 }}>0</div>
        </div>
        <div style={cardStyle}>
          <div style={{ color: "#6b7280" }}>Active Jobs</div>
          <div style={{ fontSize: "2rem", fontWeight: 700 }}>0</div>
        </div>
        <div style={cardStyle}>
          <div style={{ color: "#6b7280" }}>Open Claims</div>
          <div style={{ fontSize: "2rem", fontWeight: 700 }}>0</div>
        </div>
        <div style={cardStyle}>
          <div style={{ color: "#6b7280" }}>Invoices Due</div>
          <div style={{ fontSize: "2rem", fontWeight: 700 }}>0</div>
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>Next build targets</h2>
        <ul style={{ marginBottom: 0 }}>
          <li>Leads module</li>
          <li>Customer and property records</li>
          <li>Jobs and claims tracking</li>
          <li>Documents and photos upload</li>
          <li>Branding settings</li>
        </ul>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{
        width: "250px",
        background: "#1e3a8a",
        color: "white",
        padding: "20px"
      }}>
        <h2>ProjectIQ</h2>

        <nav style={{ marginTop: "20px" }}>
          <div><Link to="/" style={link}>Dashboard</Link></div>
          <div><Link to="/leads" style={link}>Leads</Link></div>
          <div><Link to="/customers" style={link}>Customers</Link></div>
          <div><Link to="/jobs" style={link}>Jobs</Link></div>
          <div><Link to="/claims" style={link}>Claims</Link></div>
          <div><Link to="/calendar" style={link}>Calendar</Link></div>
          <div><Link to="/documents" style={link}>Documents</Link></div>
          <div><Link to="/invoices" style={link}>Invoices</Link></div>
          <div><Link to="/settings" style={link}>Settings</Link></div>
        </nav>
      </div>

      {/* Main content */}
      <div style={{ flex: 1 }}>
        
        {/* Header */}
        <div style={{
          padding: "15px",
          borderBottom: "1px solid #ddd"
        }}>
          <strong>ProjectIQ Dashboard</strong>
        </div>

        {/* Page content */}
        <div style={{ padding: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

const link = {
  color: "white",
  textDecoration: "none",
  display: "block",
  padding: "8px 0"
};
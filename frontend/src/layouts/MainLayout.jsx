import { Link, useLocation } from "react-router-dom";
import "./MainLayout.css";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/leads", label: "Leads" },
  { to: "/customers", label: "Customers" },
  { to: "/jobs", label: "Jobs" },
  { to: "/claims", label: "Claims" },
  { to: "/calendar", label: "Calendar" },
  { to: "/documents", label: "Documents" },
  { to: "/invoices", label: "Invoices" },
  { to: "/settings", label: "Branding" },
];

export default function MainLayout({ children }) {
  const location = useLocation();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-title">ProjectIQ</div>
          <div className="brand-subtitle">Roofing Operations</div>
        </div>

        <nav className="nav-list">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-link ${active ? "active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <div className="topbar-title">ProjectIQ</div>
            <div className="topbar-subtitle">Phase 1 foundation</div>
          </div>
        </header>

        <section className="page-content">{children}</section>
      </main>
    </div>
  );
}

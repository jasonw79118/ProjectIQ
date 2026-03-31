import { NavLink } from "react-router-dom";
const items = [
  ["/","Dashboard"],["/leads","Leads"],["/customers","Customers"],["/jobs","Jobs"],
  ["/claims","Claims"],["/calendar","Calendar"],["/documents","Documents"],
  ["/invoices","Invoices"],["/settings","Branding"]
];
export default function MainLayout({ children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-kicker">PROJECT MANAGEMENT</div>
        <h1>ProjectIQ</h1>
        <p>Roofing, claims, and construction operations</p>
        <nav className="nav-list">
          {items.map(([to,label]) => (
            <NavLink key={to} to={to} end={to === "/"} className={({isActive}) => `nav-link${isActive ? " nav-link-active" : ""}`}>{label}</NavLink>
          ))}
        </nav>
      </aside>
      <main className="main-panel">
        <header className="topbar">
          <div className="topbar-title">ProjectIQ</div>
          <div className="topbar-subtitle">Salesforce-style admin workspace</div>
        </header>
        <section className="page-wrap">{children}</section>
      </main>
    </div>
  );
}

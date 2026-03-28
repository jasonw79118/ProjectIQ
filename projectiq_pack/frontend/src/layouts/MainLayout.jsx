import { Link } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/leads", label: "Leads" },
  { to: "/customers", label: "Customers" },
  { to: "/jobs", label: "Jobs" },
  { to: "/claims", label: "Claims" },
  { to: "/calendar", label: "Calendar" },
  { to: "/documents", label: "Documents" },
  { to: "/invoices", label: "Invoices" },
  { to: "/settings", label: "Branding / Settings" },
];

export default function MainLayout({ children }) {
  return (
    <div style={styles.appShell}>
      <aside style={styles.sidebar}>
        <div style={styles.brandWrap}>
          <div style={styles.brandBadge}>PIQ</div>
          <div>
            <div style={styles.brandName}>ProjectIQ</div>
            <div style={styles.brandSub}>Contractor Operations</div>
          </div>
        </div>

        <nav style={styles.nav}>
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} style={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main style={styles.mainArea}>
        <header style={styles.header}>
          <div>
            <div style={styles.headerTitle}>ProjectIQ</div>
            <div style={styles.headerSub}>Roofing • Claims • Construction</div>
          </div>
        </header>

        <section style={styles.content}>{children}</section>
      </main>
    </div>
  );
}

const styles = {
  appShell: {
    display: "flex",
    minHeight: "100vh",
    background: "#f5f7fb",
    color: "#1f2937",
  },
  sidebar: {
    width: "260px",
    background: "#173b7a",
    color: "#ffffff",
    padding: "24px 18px",
    boxSizing: "border-box",
  },
  brandWrap: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "28px",
  },
  brandBadge: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    background: "#f28c28",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
  },
  brandName: {
    fontSize: "1.15rem",
    fontWeight: 700,
    lineHeight: 1.1,
  },
  brandSub: {
    fontSize: "0.82rem",
    opacity: 0.85,
    marginTop: "2px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  navLink: {
    color: "#ffffff",
    textDecoration: "none",
    padding: "10px 12px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.06)",
    fontWeight: 500,
  },
  mainArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  header: {
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    padding: "18px 24px",
  },
  headerTitle: {
    fontSize: "1.25rem",
    fontWeight: 700,
  },
  headerSub: {
    color: "#6b7280",
    fontSize: "0.9rem",
    marginTop: "4px",
  },
  content: {
    padding: "24px",
  },
};

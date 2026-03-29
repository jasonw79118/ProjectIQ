import { NavLink } from 'react-router-dom'

const navItems = [
  ['/', 'Dashboard'],
  ['/leads', 'Leads'],
  ['/customers', 'Customers'],
  ['/jobs', 'Jobs'],
  ['/claims', 'Claims'],
  ['/calendar', 'Calendar'],
  ['/documents', 'Documents'],
  ['/invoices', 'Invoices'],
  ['/settings', 'Branding'],
]

export default function MainLayout({ children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">PIQ</div>
          <div>
            <div className="brand-title">ProjectIQ</div>
            <div className="brand-subtitle">Contractor Ops</div>
          </div>
        </div>

        <div className="sidebar-section-label">Workspace</div>
        <nav className="nav-list">
          {navItems.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `nav-item${isActive ? ' active' : ''}`
              }
            >
              <span className="nav-dot" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-title">Salesforce-style goal</div>
          <div className="sidebar-footer-copy">
            Clean admin shell, strong tables, card layouts, and contractor branding.
          </div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <div className="eyebrow">ProjectIQ Platform</div>
            <h1 className="page-title">Roofing, Claims, and Construction Operations</h1>
          </div>
          <div className="topbar-actions">
            <button className="secondary-btn">New Lead</button>
            <button className="primary-btn">Create Job</button>
          </div>
        </header>

        <section className="content-region">{children}</section>
      </main>
    </div>
  )
}

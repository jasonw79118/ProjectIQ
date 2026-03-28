function StatCard({ title, value, detail }) {
  return (
    <div className="card stat-card">
      <div className="card-label">{title}</div>
      <div className="card-value">{value}</div>
      <div className="card-detail">{detail}</div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Starter overview for ProjectIQ operations.</p>
      </div>

      <div className="stats-grid">
        <StatCard title="Open Leads" value="12" detail="Follow-up queue placeholder" />
        <StatCard title="Active Jobs" value="5" detail="Production and claim work" />
        <StatCard title="Open Claims" value="4" detail="Carrier and supplement tracking" />
        <StatCard title="Invoices Due" value="3" detail="Customer and insurance billing" />
      </div>

      <div className="two-column-grid">
        <div className="card">
          <h2>Today</h2>
          <ul>
            <li>9:00 AM — Roof inspection</li>
            <li>11:30 AM — Adjuster meeting</li>
            <li>2:00 PM — Material delivery check</li>
          </ul>
        </div>

        <div className="card">
          <h2>Recent uploads</h2>
          <ul>
            <li>Carrier scope.pdf</li>
            <li>Front slope hail photos</li>
            <li>Signed contract.pdf</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const metricCards = [
  ['Open Leads', '24', '+6 this week'],
  ['Active Jobs', '18', '6 in production'],
  ['Open Claims', '11', '3 awaiting scope'],
  ['Invoices Due', '$42,380', '7 open balances'],
]

const jobs = [
  ['Smith Residence', 'Insurance Review', 'Apr 1'],
  ['Hill Commercial', 'Production Scheduled', 'Apr 3'],
  ['Baker Residence', 'Supplement Submitted', 'Mar 31'],
  ['North Ridge HOA', 'Final Inspection', 'Apr 5'],
]

export default function Dashboard() {
  return (
    <div className="stack-lg">
      <section className="hero-card">
        <div>
          <div className="eyebrow">Executive Snapshot</div>
          <h2 className="section-title">Contractor-branded operations dashboard</h2>
          <p className="muted-copy">
            This shell is built to evolve into a Salesforce-style platform with dashboards,
            records, automation, AI claim extraction, and strong document workflows.
          </p>
        </div>
        <div className="hero-actions">
          <button className="primary-btn">Send Prospect Form</button>
          <button className="secondary-btn">Upload Claim Document</button>
        </div>
      </section>

      <section className="metric-grid">
        {metricCards.map(([label, value, detail]) => (
          <article key={label} className="metric-card">
            <div className="metric-label">{label}</div>
            <div className="metric-value">{value}</div>
            <div className="metric-detail">{detail}</div>
          </article>
        ))}
      </section>

      <section className="two-col-grid">
        <article className="panel-card">
          <div className="panel-header">
            <h3>Pipeline</h3>
            <span className="pill">Live</span>
          </div>
          <div className="kanban-row">
            <div className="kanban-col">
              <div className="kanban-title">New</div>
              <div className="kanban-card">6 inspection requests</div>
              <div className="kanban-card">2 storm canvass leads</div>
            </div>
            <div className="kanban-col">
              <div className="kanban-title">Claims</div>
              <div className="kanban-card">4 adjuster meetings</div>
              <div className="kanban-card">3 scopes received</div>
            </div>
            <div className="kanban-col">
              <div className="kanban-title">Production</div>
              <div className="kanban-card">5 material orders</div>
              <div className="kanban-card">2 punch list holds</div>
            </div>
          </div>
        </article>

        <article className="panel-card">
          <div className="panel-header">
            <h3>Upcoming Jobs</h3>
            <button className="text-btn">Open Calendar</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Job</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(([job, status, date]) => (
                <tr key={job}>
                  <td>{job}</td>
                  <td>{status}</td>
                  <td>{date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>
    </div>
  )
}

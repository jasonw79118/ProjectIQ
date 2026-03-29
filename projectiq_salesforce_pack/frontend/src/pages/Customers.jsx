export default function Customers() {
  return (
    <div className="stack-lg">
      <section className="panel-card">
        <div className="panel-header">
          <h2>Customers</h2>
          <button className="primary-btn">Add Customer</button>
        </div>
        <p className="muted-copy">
          This customers module is ready for the next build phase. The layout is set for a Salesforce-style data table, record detail drawer, and action workflow.
        </p>
      </section>

      <section className="panel-card">
        <div className="panel-header">
          <h3>Starter View</h3>
          <button className="secondary-btn">Filter</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Owner</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sample Record A</td>
              <td>Open</td>
              <td>Office</td>
              <td>Today</td>
            </tr>
            <tr>
              <td>Sample Record B</td>
              <td>In Progress</td>
              <td>Field</td>
              <td>Yesterday</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}

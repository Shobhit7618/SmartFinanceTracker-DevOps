const Trends = () => {
  return (
    <div>
      <div className="alert alert-warning border-start border-5 border-warning shadow-sm" role="alert">
        <h5 className="alert-heading fw-bold">Disclaimer</h5>
        <p className="mb-0">These trends are generated based on available user data and simulated algorithms. Financial decisions should not be based solely on these automated insights.</p>
      </div>

      <h2 className="h3 mb-4">Smart Trends & AI Insights</h2>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card card-custom h-100 p-4">
            <h5 className="fw-bold mb-3">Spending Behavior</h5>
            <p className="text-muted">Based on your recent activity, your spending in "Food" has increased by 15% compared to last month.</p>
            <div className="progress mt-3" style={{ height: '10px' }}>
              <div className="progress-bar bg-danger" role="progressbar" style={{ width: '75%' }}></div>
            </div>
            <p className="text-end small mt-1 text-muted">High Intensity</p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card card-custom h-100 p-4">
             <h5 className="fw-bold mb-3">Unusual Detection</h5>
             <div className="alert alert-success m-0">No unusual high-value transactions detected in the last 7 days.</div>
          </div>
        </div>
        
        <div className="col-12">
            <div className="card card-custom p-4">
                <h5 className="fw-bold mb-4">Activity Heatmap</h5>
                <div className="d-flex flex-wrap gap-1">
                    {[...Array(28)].map((_, i) => (
                        <div key={i} className={`flex-grow-1 rounded ${Math.random() > 0.5 ? 'bg-success' : 'bg-light border'}`} style={{ height: '40px', minWidth: '40px', opacity: Math.random() + 0.2 }} title="Activity Level"></div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
export default Trends;
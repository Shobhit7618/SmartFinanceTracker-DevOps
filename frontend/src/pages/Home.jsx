import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { FaChartLine, FaHandHoldingUsd, FaRobot, FaCheckCircle, FaQuestionCircle } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      {/* 1. HERO SECTION (Updated for Auto Height) */}
      <section 
        id="home" 
        className="d-flex align-items-center text-center" 
        style={{ 
          // REMOVED minHeight: '100vh'
          // Added padding to give space top and bottom based on text
          paddingTop: '150px', 
          paddingBottom: '100px',
          
          // Background settings remain the same
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.pexels.com/photos/128867/coins-currency-investment-insurance-128867.jpeg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container">
          <div className="py-4"> {/* Reduced internal padding slightly */}
            <h1 className="display-3 fw-bold text-white mb-4">
              Master Your Money with <span className="text-success">IntelliFinance</span>
            </h1>
            <p className="lead text-light mx-auto w-75 mb-5 fs-4" style={{ opacity: 0.9 }}>
              Stop guessing where your money goes. Track income, manage loans, calculate EMIs, and visualize your financial future with our AI-powered dashboard.
            </p>
            
            <div className="d-flex justify-content-center gap-3">
              <Link to="/signup" className="btn btn-success btn-lg px-5 py-3 rounded-pill shadow fw-bold">Start Tracking Now</Link>
              <a href="#features" className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill shadow-sm">Explore Features</a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="py-5 bg-white">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h6 className="text-success fw-bold text-uppercase ls-md">Workflow</h6>
            <h2 className="fw-bold display-6">How It Works</h2>
          </div>
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="p-4 rounded-3 bg-light h-100 border shadow-sm">
                <div className="display-4 text-success mb-3 fw-bold">1</div>
                <h4 className="fw-bold">Add Transactions</h4>
                <p className="text-muted">Log your daily income, expenses, and loan details in seconds using our intuitive interface.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 rounded-3 bg-light h-100 border shadow-sm">
                <div className="display-4 text-success mb-3 fw-bold">2</div>
                <h4 className="fw-bold">Analyze Data</h4>
                <p className="text-muted">Our system automatically categorizes your spending and generates easy-to-read charts and graphs.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 rounded-3 bg-light h-100 border shadow-sm">
                <div className="display-4 text-success mb-3 fw-bold">3</div>
                <h4 className="fw-bold">Get Insights</h4>
                <p className="text-muted">Receive AI-driven trends and alerts to optimize your savings and manage debt effectively.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DETAILED FEATURES SECTION */}
      <section id="features" className="py-5 bg-light">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h6 className="text-success fw-bold text-uppercase">Capabilities</h6>
            <h2 className="fw-bold display-6">Powerful Features for Modern Finance</h2>
          </div>

          {/* Feature 1 */}
          <div className="row align-items-center mb-5">
            <div className="col-md-6 order-md-2">
              <img src="https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg" className="img-fluid rounded shadow" alt="Analytics" />
            </div>
            <div className="col-md-6 order-md-1">
              <div className="p-4">
                <div className="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle mb-3" style={{width:'60px', height:'60px'}}>
                  <FaChartLine size={30} />
                </div>
                <h3 className="fw-bold mb-3">Smart Analytics & Visualizations</h3>
                <p className="lead text-muted">Don't just look at numbers. See the story behind your money.</p>
                <ul className="list-unstyled mt-3 space-y-2">
                  <li className="d-flex align-items-center mb-2"><FaCheckCircle className="text-success me-2"/> Interactive Pie & Bar Charts</li>
                  <li className="d-flex align-items-center mb-2"><FaCheckCircle className="text-success me-2"/> Monthly Income vs Expense Comparison</li>
                  <li className="d-flex align-items-center mb-2"><FaCheckCircle className="text-success me-2"/> Category-wise Spending Breakdown</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="row align-items-center mb-5">
            <div className="col-md-6">
              <img src="https://images.pexels.com/photos/8293750/pexels-photo-8293750.jpeg" className="img-fluid rounded shadow" alt="Loans" />
            </div>
            <div className="col-md-6">
              <div className="p-4">
                <div className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle mb-3" style={{width:'60px', height:'60px'}}>
                  <FaHandHoldingUsd size={30} />
                </div>
                <h3 className="fw-bold mb-3">Comprehensive Loan Management</h3>
                <p className="lead text-muted">Stay on top of your debts. Manage loans, track repayments, and calculate EMIs instantly.</p>
                <ul className="list-unstyled mt-3">
                  <li className="d-flex align-items-center mb-2"><FaCheckCircle className="text-primary me-2"/> Track Principal & Interest separately</li>
                  <li className="d-flex align-items-center mb-2"><FaCheckCircle className="text-primary me-2"/> Integrated EMI Calculator</li>
                  <li className="d-flex align-items-center mb-2"><FaCheckCircle className="text-primary me-2"/> Loan Repayment History Logs</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="row align-items-center">
             <div className="col-md-6 order-md-2">
              <img src="https://images.pexels.com/photos/18069230/pexels-photo-18069230.png" className="img-fluid rounded shadow" alt="AI Trends" />
            </div>
            <div className="col-md-6 order-md-1">
              <div className="p-4">
                <div className="d-inline-flex align-items-center justify-content-center bg-warning text-white rounded-circle mb-3" style={{width:'60px', height:'60px'}}>
                  <FaRobot size={30} />
                </div>
                <h3 className="fw-bold mb-3">AI-Driven Financial Trends</h3>
                <p className="lead text-muted">Let Artificial Intelligence detect unusual spending and predict your financial health.</p>
                <ul className="list-unstyled mt-3">
                  <li className="d-flex align-items-center mb-2"><FaCheckCircle className="text-warning me-2"/> Unusual Spending Detection Alerts</li>
                  <li className="d-flex align-items-center mb-2"><FaCheckCircle className="text-warning me-2"/> Heatmaps for High Activity Days</li>
                  <li className="d-flex align-items-center mb-2"><FaCheckCircle className="text-warning me-2"/> Investment ROI Predictions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="py-5 bg-dark text-white">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why Choose IntelliFinance?</h2>
            <p className="text-secondary">We provide the tools you need to succeed.</p>
          </div>
          <div className="row g-4">
            {[
              { title: "100% Secure", text: "Your data is encrypted and stored securely." },
              { title: "Cloud Sync", text: "Access your dashboard from any device, anywhere." },
              { title: "Export Data", text: "Download your financial reports in CSV format." },
              { title: "Free to Use", text: "Get started with core features absolutely free." }
            ].map((item, i) => (
              <div key={i} className="col-md-3">
                <div className="p-4 border border-secondary rounded text-center h-100">
                  <h4 className="fw-bold text-success mb-3">{item.title}</h4>
                  <p className="text-gray-400 small">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="py-5 bg-white">
        <div className="container py-5" style={{ maxWidth: '800px' }}>
          <div className="text-center mb-5">
            <FaQuestionCircle className="text-success mb-3" size={40} />
            <h2 className="fw-bold">Frequently Asked Questions</h2>
          </div>
          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                  Is my financial data safe?
                </button>
              </h2>
              <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Yes! We use industry-standard encryption to ensure your personal and financial data is never accessible to unauthorized users.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                  Can I track my investments here?
                </button>
              </h2>
              <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Absolutely. You can log investment entries, set expected ROI percentages, and track your estimated returns over time.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                  Is there a mobile app?
                </button>
              </h2>
              <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Currently, IntelliFinance is a responsive web application that works perfectly on mobile browsers. A native app is coming soon!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-5 bg-success text-white text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">Ready to Take Control?</h2>
          <p className="lead mb-4">Join thousands of users tracking their finance intelligently.</p>
          <Link to="/signup" className="btn btn-light btn-lg rounded-pill px-5 text-success fw-bold">Create Free Account</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default Home;
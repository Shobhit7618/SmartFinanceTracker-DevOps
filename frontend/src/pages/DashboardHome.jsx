import { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const DashboardHome = () => {
  const [transactions, setTransactions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Initial Form State
  const initialFormState = { type: 'Income', amount: '', category: '', description: '', linkedLoanId: '', investmentRoi: '' };
  const [form, setForm] = useState(initialFormState);

  // Helper function to get config with headers
  const getConfig = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        'x-auth-token': token // Explicitly sending the token
      }
    };
  };

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/data/all', getConfig());
      setTransactions(res.data.transactions);
    } catch(err) { 
      console.error("Error fetching data:", err); 
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send data with the explicit token configuration
      await axios.post('http://localhost:5001/api/transactions', form, getConfig());
      
      // Close modal and refresh data
      setShowAddModal(false);
      setForm(initialFormState); 
      fetchData();
      alert("Transaction Saved Successfully!"); 
    } catch (err) {
      console.error("Error saving transaction:", err);
      // Detailed error message for debugging
      const errorMsg = err.response?.data?.msg || err.message || "Unknown Error";
      alert(`Failed to save. Error: ${errorMsg}`);
    }
  };

  // Safe Math for Analytics
  const income = transactions.filter(t => t.type === 'Income').reduce((acc, c) => acc + (c.amount || 0), 0);
  const expense = transactions.filter(t => t.type === 'Expense').reduce((acc, c) => acc + (c.amount || 0), 0);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        <button onClick={() => setShowAddModal(true)} className="btn btn-success shadow-sm">+ Add Transaction</button>
      </div>

      {/* Analytics Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card card-custom border-start border-4 border-success p-3">
            <div className="text-muted small fw-bold text-uppercase mb-1">Total Income</div>
            <div className="h4 mb-0 fw-bold text-gray-800">₹{income}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-custom border-start border-4 border-danger p-3">
            <div className="text-muted small fw-bold text-uppercase mb-1">Total Expense</div>
            <div className="h4 mb-0 fw-bold text-gray-800">₹{expense}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-custom border-start border-4 border-primary p-3">
            <div className="text-muted small fw-bold text-uppercase mb-1">Net Balance</div>
            <div className="h4 mb-0 fw-bold text-gray-800">₹{income - expense}</div>
          </div>
        </div>
      </div>

      {/* Trend Graph */}
      <div className="card card-custom shadow-sm mb-4">
         <div className="card-header bg-white py-3">
             <h6 className="m-0 fw-bold text-primary">Spend vs Income Trend</h6>
         </div>
         <div className="card-body" style={{ height: '300px' }}>
            <Bar data={{
                labels: ['Income', 'Expense'],
                datasets: [{ label: 'Amount', data: [income, expense], backgroundColor: ['#198754', '#dc3545'] }]
            }} options={{ maintainAspectRatio: false }} />
         </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Transaction</h5>
                <button className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <select className="form-select mb-3" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                    <option value="Investment">Investment</option>
                    <option value="Loan">Loan</option>
                    <option value="LoanRepayment">Loan Repayment</option>
                  </select>
                  
                  <input type="number" placeholder="Amount" className="form-control mb-3" required 
                         value={form.amount} onChange={e => setForm({...form, amount: Number(e.target.value)})} />
                  
                  <input type="text" placeholder="Category (e.g. Food, Salary)" className="form-control mb-3" required 
                         value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
                  
                  <input type="text" placeholder="Description" className="form-control mb-3" 
                         value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                  
                  {/* Conditional Fields */}
                  {form.type === 'Investment' && (
                    <input type="number" placeholder="Expected ROI %" className="form-control mb-3" 
                           onChange={e => setForm({...form, investmentRoi: e.target.value})} />
                  )}
                   {form.type === 'LoanRepayment' && (
                    <select className="form-select mb-3" onChange={e => setForm({...form, linkedLoanId: e.target.value})}>
                        <option value="">Select Loan to Repay</option>
                        {transactions.filter(t => t.type === 'Loan').map(l => (
                            <option key={l._id} value={l._id}>{l.category} - {l.amount}</option>
                        ))}
                    </select>
                  )}
                </div>
                <div className="modal-footer">
                   <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Close</button>
                   <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DashboardHome;
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

const Analytics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/data/all').then(res => setData(res.data.transactions));
  }, []);

  const getCatData = (type) => {
    const filtered = data.filter(t => t.type === type);
    const categories = {};
    filtered.forEach(t => categories[t.category] = (categories[t.category] || 0) + t.amount);
    return {
        labels: Object.keys(categories),
        datasets: [{
            data: Object.values(categories),
            backgroundColor: ['#198754', '#0d6efd', '#ffc107', '#dc3545', '#6f42c1']
        }]
    };
  };

  return (
    <div>
      <h2 className="h3 mb-4 text-gray-800">Analytics</h2>
      
      <div className="row g-3 mb-4">
        {['Income', 'Expense', 'Investment', 'Loan'].map(type => (
           <div className="col-6 col-md-3" key={type}>
             <div className="card card-custom p-3 text-center">
               <div className="text-muted small">{type}</div>
               <div className="h5 fw-bold">₹{data.filter(t=>t.type===type).reduce((a,b)=>a+b.amount,0)}</div>
             </div>
           </div>
        ))}
      </div>

      <hr className="my-5" />

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card card-custom p-4 h-100">
            <h5 className="card-title text-center">Expense Breakdown</h5>
            <div className="d-flex justify-content-center h-100">
                <Pie data={getCatData('Expense')} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card card-custom p-4 h-100">
            <h5 className="card-title text-center">Income Breakdown</h5>
             <div className="d-flex justify-content-center h-100">
                <Pie data={getCatData('Income')} />
            </div>
          </div>
        </div>
        <div className="col-12">
           <div className="card card-custom p-4">
             <h5 className="card-title">Income vs Expense vs Loan</h5>
             <div style={{ height: '300px' }}>
                <Bar data={{
                    labels: ['Income', 'Expense', 'Loan'],
                    datasets: [{
                        label: 'Amount',
                        data: [
                            data.filter(t=>t.type==='Income').reduce((a,b)=>a+b.amount,0),
                            data.filter(t=>t.type==='Expense').reduce((a,b)=>a+b.amount,0),
                            data.filter(t=>t.type==='Loan').reduce((a,b)=>a+b.amount,0)
                        ],
                        backgroundColor: ['#198754', '#dc3545', '#ffc107']
                    }]
                }} options={{maintainAspectRatio:false}} />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
export default Analytics;
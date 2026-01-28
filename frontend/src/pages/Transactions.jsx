import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Papa from 'papaparse';

const Transactions = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5001/api/data/all').then(res => setData(res.data.transactions));
  }, []);

  const filteredData = data.filter(t => {
    const matchType = filter === 'All' ? true : t.type === filter;
    const matchSearch = t.category.toLowerCase().includes(search.toLowerCase()) || 
                        t.description?.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const downloadCSV = () => {
    const csv = Papa.unparse(filteredData.map(({ _id, userId, ...rest }) => rest));
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'transactions.csv'; a.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if(file) {
       Papa.parse(file, {
          header: true,
          complete: (results) => alert("Parsed " + results.data.length + " rows.")
       });
    }
  };

  const totalIn = filteredData.filter(t => t.type === 'Income').reduce((acc, c) => acc + c.amount, 0);
  const totalOut = filteredData.filter(t => t.type === 'Expense').reduce((acc, c) => acc + c.amount, 0);

  return (
    <div>
      <div className="card card-custom p-4 mb-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div className="d-flex gap-2">
            <input type="text" placeholder="Search..." className="form-control" onChange={e => setSearch(e.target.value)} />
            <select className="form-select" onChange={e => setFilter(e.target.value)}>
                <option value="All">All Types</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
                <option value="Loan">Loan</option>
            </select>
          </div>
          <div className="d-flex gap-2">
            <button onClick={downloadCSV} className="btn btn-primary btn-sm">Export CSV</button>
            <label className="btn btn-success btn-sm m-0">
                Import CSV <input type="file" hidden accept=".csv" onChange={handleImport} />
            </label>
          </div>
        </div>
      </div>

      <div className="card card-custom shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Description</th>
                <th className="text-end">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(t => (
                <tr key={t._id}>
                  <td>{moment(t.date).format('DD MMM YYYY')}</td>
                  <td><span className={`badge ${t.type === 'Income' ? 'bg-success' : 'bg-danger'}`}>{t.type}</span></td>
                  <td className="fw-bold">{t.category}</td>
                  <td className="text-muted small">{t.description}</td>
                  <td className={`text-end fw-bold ${t.type === 'Income' ? 'text-success' : 'text-danger'}`}>
                    {t.type === 'Income' ? '+' : '-'}₹{t.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-dark text-white p-3 rounded mt-3 d-flex justify-content-between">
        <span>Total In: ₹{totalIn}</span>
        <span>Total Out: ₹{totalOut}</span>
      </div>
    </div>
  );
};
export default Transactions;
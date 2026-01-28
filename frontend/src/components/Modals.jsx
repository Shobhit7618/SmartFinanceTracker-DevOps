import { useState } from 'react';

export const ToolsModal = ({ isOpen, onClose }) => {
  const [tool, setTool] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Financial Tools</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {!tool ? (
              <div className="d-grid gap-2">
                <button onClick={() => setTool('EMI')} className="btn btn-outline-primary py-3">EMI Calculator</button>
                <button onClick={() => setTool('ROI')} className="btn btn-outline-success py-3">ROI Calculator</button>
              </div>
            ) : (
              <div>
                <button onClick={() => setTool(null)} className="btn btn-sm btn-link text-decoration-none mb-3">&larr; Back</button>
                {tool === 'EMI' ? <EMICalculator /> : <ROICalculator />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EMICalculator = () => {
  const [p, setP] = useState(0);
  const [r, setR] = useState(0);
  const [n, setN] = useState(0);
  const [emi, setEmi] = useState(0);

  const calculate = () => {
    const monthlyRate = r / 12 / 100;
    const calc = p * monthlyRate * (Math.pow(1 + monthlyRate, n) / (Math.pow(1 + monthlyRate, n) - 1));
    setEmi(calc.toFixed(2));
  };

  return (
    <div>
      <h6>EMI Calculator</h6>
      <input type="number" placeholder="Loan Amount" className="form-control mb-2" onChange={e=>setP(e.target.value)}/>
      <input type="number" placeholder="Rate (% p.a)" className="form-control mb-2" onChange={e=>setR(e.target.value)}/>
      <input type="number" placeholder="Tenure (Months)" className="form-control mb-2" onChange={e=>setN(e.target.value)}/>
      <button onClick={calculate} className="btn btn-primary w-100">Calculate</button>
      {emi > 0 && <div className="alert alert-info mt-2 text-center">EMI: ₹{emi}</div>}
    </div>
  );
};

const ROICalculator = () => {
  const [amt, setAmt] = useState(0);
  const [rate, setRate] = useState(0);
  const [time, setTime] = useState(0);
  const [res, setRes] = useState(null);

  const calculate = () => {
    const ret = (amt * (rate/100) * (time/12));
    setRes(ret.toFixed(2));
  };

  return (
    <div>
      <h6>ROI Calculator</h6>
      <input type="number" placeholder="Invested Amount" className="form-control mb-2" onChange={e=>setAmt(e.target.value)}/>
      <input type="number" placeholder="Interest %" className="form-control mb-2" onChange={e=>setRate(e.target.value)}/>
      <input type="number" placeholder="Duration (Months)" className="form-control mb-2" onChange={e=>setTime(e.target.value)}/>
      <button onClick={calculate} className="btn btn-success w-100">Calculate</button>
      {res && <div className="alert alert-success mt-2 text-center">Estimated Return: ₹{res}</div>}
    </div>
  );
};
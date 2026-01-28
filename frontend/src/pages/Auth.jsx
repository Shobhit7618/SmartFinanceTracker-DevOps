import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/Footer';

// NOTICE THE "export" KEYWORD HERE
export const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Updated port to 5001 as discussed
      const res = await axios.post('http://localhost:5001/api/auth/login', formData);
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) { alert(err.response?.data?.msg || 'Login failed'); }
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <div className="card card-custom p-4 w-100" style={{ maxWidth: '400px' }}>
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="email" placeholder="Email" className="form-control" onChange={e => setFormData({...formData, email: e.target.value})} required />
            </div>
            <div className="mb-3">
              <input type="password" placeholder="Password" className="form-control" onChange={e => setFormData({...formData, password: e.target.value})} required />
            </div>
            <button className="btn btn-success w-100">Login</button>
          </form>
          <p className="mt-3 text-center">Don't have an account? <Link to="/signup" className="text-success">Signup</Link></p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// NOTICE THE "export" KEYWORD HERE TOO
export const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword) return alert("Passwords don't match");
    try {
      // Updated port to 5001
      const res = await axios.post('http://localhost:5001/api/auth/register', formData);
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) { alert(err.response?.data?.msg || 'Signup failed'); }
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <div className="card card-custom p-4 w-100" style={{ maxWidth: '400px' }}>
          <h2 className="text-center mb-4">Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
               <input type="text" placeholder="Name" className="form-control" onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="mb-3">
               <input type="email" placeholder="Email" className="form-control" onChange={e => setFormData({...formData, email: e.target.value})} required />
            </div>
            <div className="mb-3">
               <input type="password" placeholder="Password" className="form-control" onChange={e => setFormData({...formData, password: e.target.value})} required />
            </div>
            <div className="mb-3">
               <input type="password" placeholder="Confirm Password" className="form-control" onChange={e => setFormData({...formData, confirmPassword: e.target.value})} required />
            </div>
            <button className="btn btn-success w-100">Signup</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
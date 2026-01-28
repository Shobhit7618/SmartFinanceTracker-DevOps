import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaRupeeSign } from 'react-icons/fa';

const Navbar = ({ toggleTools }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-boxy">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center brand-text" to="/">
          <FaRupeeSign className="me-1" /> IntelliFinance
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-3">
            {!user ? (
              <>
                {/* UPDATED LINKS TO WORK FROM ANY PAGE */}
                <li className="nav-item"><a className="nav-link" href="/#home">Home</a></li>
                <li className="nav-item"><a className="nav-link" href="/#features">Features</a></li>
                <li className="nav-item">
                  <Link className="btn btn-success rounded-pill px-4" to="/login">Login</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/dashboard/analytics">Analytics</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/dashboard/transactions">Transactions</Link></li>
                <li className="nav-item"><button className="btn nav-link" onClick={toggleTools}>Tools</button></li>
                <li className="nav-item"><Link className="nav-link" to="/dashboard/trends">Trends</Link></li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-outline-danger btn-sm rounded-pill ms-2">Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
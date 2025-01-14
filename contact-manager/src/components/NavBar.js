import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();  // useNavigate hook to navigate programmatically

  // Check if the user is logged in
  const isLoggedIn = JSON.parse(localStorage.getItem('loggedIn'));
  const loggedInUser = localStorage.getItem('loggedInUser'); // Get the email or username of the logged-in user

  const handleLogout = () => {
    // Remove logged-in user data from localStorage
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loggedInUser');
    
    // Redirect to Login page
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light"> {/* Light background */}
      <div className="container-fluid">
        <Link className="navbar-brand" to="/contacts">Contact Manager</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-dark">Welcome, {loggedInUser}</span> {/* Dark text color */}
                </li>
                {location.pathname === '/contacts' && (
                  <li className="nav-item">
                    <button className="btn btn-outline-dark" onClick={handleLogout}>Logout</button> {/* Dark button outline */}
                  </li>
                )}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/login">Login</Link> {/* Dark text color */}
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/register">Register</Link> {/* Dark text color */}
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
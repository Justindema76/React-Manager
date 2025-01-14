import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email and password fields
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    // Get the list of users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user by email and check the password
    const user = storedUsers.find(user => user.email === email && user.password === password);

    if (user) {
      // User found, log them in
      localStorage.setItem('loggedIn', JSON.stringify(true));
      localStorage.setItem('loggedInUser', email); // Store the logged-in user's email

      // Redirect to the ContactManager page
      navigate('/contacts');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
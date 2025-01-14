import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    // Get the list of registered users from localStorage (if any)
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the user already exists
    if (storedUsers.some(user => user.email === email)) {
      setError('This email is already registered.');
      return;
    }

    // Add the new user to the users array
    const newUser = { email, password };
    storedUsers.push(newUser);

    // Store the updated users array in localStorage
    localStorage.setItem('users', JSON.stringify(storedUsers));

    // Initialize an empty contact list for the new user
    const userContacts = [];
    localStorage.setItem(`contacts_${email}`, JSON.stringify(userContacts));

    // Log the user in by setting login state
    localStorage.setItem('loggedIn', JSON.stringify(true)); // Mark as logged in
    localStorage.setItem('loggedInUser', email); // Store the email of the logged-in user

    // Redirect to the ContactManager (home page after login)
    navigate('/contacts');
  };

  return (
    <div className="container">
      <h2>Register</h2>
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
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default Register;
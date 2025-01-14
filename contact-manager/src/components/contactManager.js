import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ContactManager() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [error, setError] = useState('');

  // Get the logged-in user's email
  const loggedInUser = localStorage.getItem('loggedInUser');

  useEffect(() => {
    if (!loggedInUser) {
      // If the user is not logged in, redirect to the login page
      navigate('/login');
    } else {
      // Load the user's contact list from localStorage
      const userContacts = JSON.parse(localStorage.getItem(`contacts_${loggedInUser}`)) || [];
      setContacts(userContacts);
    }
  }, [loggedInUser, navigate]);

  const handleAddContact = () => {
    if (!newContactName || !newContactEmail) {
      setError('Please provide both name and email for the contact.');
      return;
    }

    // Create a new contact object
    const newContact = { name: newContactName, email: newContactEmail };

    // Update the contacts in localStorage
    const updatedContacts = [...contacts, newContact];
    localStorage.setItem(`contacts_${loggedInUser}`, JSON.stringify(updatedContacts));
    setContacts(updatedContacts);
    setNewContactName('');
    setNewContactEmail('');
    setError('');
  };

  return (
    <div className="container">
      <h2>Contact Manager</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label htmlFor="contactName" className="form-label">Contact Name</label>
        <input 
          type="text" 
          className="form-control" 
          id="contactName" 
          placeholder="Enter contact's name" 
          value={newContactName}
          onChange={(e) => setNewContactName(e.target.value)} 
        />
      </div>

      <div className="mb-3">
        <label htmlFor="contactEmail" className="form-label">Contact Email</label>
        <input 
          type="email" 
          className="form-control" 
          id="contactEmail" 
          placeholder="Enter contact's email"
          value={newContactEmail}
          onChange={(e) => setNewContactEmail(e.target.value)} 
        />
      </div>

      <button onClick={handleAddContact} className="btn btn-primary">Add Contact</button>

      <h3 className="mt-4">My Contacts</h3>
      <ul className="list-group mt-3">
        {contacts.map((contact, index) => (
          <li key={index} className="list-group-item">
            <strong>{contact.name}</strong> - {contact.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactManager;
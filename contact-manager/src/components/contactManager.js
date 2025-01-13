import React, { useState, useEffect } from "react";

const ContactManager = () => {
  const [contacts, setContacts] = useState(() => {
    // Load contacts from localStorage on initial render
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : [];
  });

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Save contacts to localStorage whenever the contacts array changes
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = () => {
    if (contactName && contactEmail) {
      setContacts([...contacts, { name: contactName, email: contactEmail }]);
      setContactName("");
      setContactEmail("");
    }
  };

  const deleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Contact Manager</h2>

      {/* Form for Adding Contacts */}
      <div className="card p-4 shadow">
        <div className="mb-3">
          <label htmlFor="contactName" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="contactName"
            className="form-control"
            placeholder="Enter name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contactEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="contactEmail"
            className="form-control"
            placeholder="Enter email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100" onClick={addContact}>
          Add Contact
        </button>
      </div>

      {/* Search Bar */}
      <div className="input-group mt-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Contact List */}
      <div className="mt-4">
        <h3 className="mb-3">Contact List</h3>
        {filteredContacts.length > 0 ? (
          <ul className="list-group">
            {filteredContacts.map((contact, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{contact.name}</strong> - {contact.email}
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteContact(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No contacts found.</p>
        )}
      </div>
    </div>
  );
};

export default ContactManager;

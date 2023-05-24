import React from 'react';
import './../styles/ContactList.css';
const ContactList = ({ contacts, handleEdit, handleDelete }) => {

  console.log("contacts list: ", contacts)
  return (
    <div >
      <h2>Contact List</h2>
      <ul className="contact-list">
        {contacts?.map(contact => (
          <li key={contact?.id} className="contact-item">
            <strong>{contact?.name}</strong>
            <p>Email: {contact?.email}</p>
            <p>Phone: {contact?.phone}</p>
            <div className="contact-actions">
              <button className="edit-button" onClick={() => handleEdit(contact)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(contact.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
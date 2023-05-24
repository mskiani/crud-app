import logo from './logo.svg';
import './App.css';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import BulkContactForm from './components/BulkContactForm';
import { useEffect, useState } from 'react';
import EditContact from './components/EditContact';
import Modal from './components/Modal';
import axios from 'axios';

function App() {


  const [contacts, setContacts] = useState([])
  const [formData, setFormData] = useState({})

  const [openEditModal, setOpenEditModal] = useState(false)
  const [openBulkUploadModal, setOpeBulkEditModal] = useState(false)


  function addContact(newContact) {
    axios.post('http://localhost:3001/contacts', newContact)
      .then(response => setContacts([...contacts, response.data]))
      .catch(error => console.error(error));
  }

  function deleteContact(contactId) {
    // Delete the contact using the API
    axios.delete(`http://localhost:3001/contacts/${contactId}`)
      .then(() => {
        const updatedContacts = contacts.filter(c => c.id !== contactId);
        setContacts(updatedContacts);
      })
      .catch(error => console.error(error));
  }

  function editContact(data) {
    setFormData(data)
    setOpenEditModal(true)
  }


  function addBulkContacts(contacts) {
    //   setContacts(prev => [...prev, ...contacts])



    contacts.forEach((element, index) => {
      axios.post('http://localhost:3001/contacts', element)
        .then(response => index == contacts.length - 1 ? setContacts([...contacts, response.data]) : "")
        .catch(error => console.error(error));
    });

    // setContacts([...contacts, response.data])
  }


  function updatecontact(contact) {

    // Update the contact using the API
    axios.put(`http://localhost:3001/contacts/${contact.id}`, contact)
      .then(response => {
        const updatedContacts = contacts.map(c => (c.id === contact.id ? response.data : c));
        setContacts(updatedContacts);
      })
      .catch(error => console.error(error));

    setFormData({})
    setOpenEditModal(false)

  }


  useEffect(() => {
    // Fetch contacts from the API
    axios.get('http://localhost:3001/contacts')
      .then(response => setContacts(response.data))
      .catch(error => console.error(error));
  }, []);


  return (
    <div className="App">

      <button onClick={() => setOpeBulkEditModal(true)}>Bulk Upload</button>
      <ContactList contacts={contacts} handleDelete={deleteContact} handleEdit={editContact} />
      <ContactForm addContact={addContact} />
      {openBulkUploadModal && <Modal title="Upload Bulk Contacts" setIsOpen={setOpeBulkEditModal} Children={<BulkContactForm addBulkContacts={addBulkContacts} onClose={() => setOpeBulkEditModal(false)} />} />}
      {openEditModal && <Modal title="Edit Contact" setIsOpen={setOpenEditModal} Children={<EditContact defaultValues={formData} editContact={updatecontact} />} />}
    </div>
  );
}

export default App;

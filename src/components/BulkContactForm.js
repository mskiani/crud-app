import React, { useState } from 'react';
import "./../styles/BulkcontactForm.css"


const BulkContactForm = ({ addBulkContacts, onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);


    const handleFileChange = e => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const contents = e.target.result;
                const contacts = parseCSV(contents);

                addBulkContacts(contacts);
                setSelectedFile(null);
                onClose()
            };

            reader.readAsText(selectedFile);

        }
    };

    const parseCSV = csvContent => {
        // CSV parsing logic here
        // Assuming CSV is formatted as: name,email,phone
        const lines = csvContent.split('\n');
        const contacts = [];

        for (let i = 1; i < lines.length; i++) {
            const [name, email, phone] = lines[i].split(',');

            if (name && email && phone) {
                contacts.push({
                    id: Date.now() + i,
                    name,
                    email,
                    phone
                });
            }
        }

        return contacts;
    };



    return (
        <div className='bulk-contact-form-container'>


            <div className="modal-overlay">
                <div className="modal">

                    <form className="bulk-contact-form" onSubmit={handleSubmit}>
                        <label htmlFor="csvFile" className="file-label">
                            Select CSV File:
                        </label>
                        <input
                            type="file"
                            id="csvFile"
                            accept=".csv"
                            onChange={handleFileChange}
                        />
                        <div>
                            <button type="submit" disabled={!selectedFile}>
                                Submit Bulk Contacts
                            </button>
                            <button className="close-modal-button" onClick={onClose}>
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default BulkContactForm;

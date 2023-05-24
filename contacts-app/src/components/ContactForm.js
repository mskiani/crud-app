import React from 'react';
import { useForm } from 'react-hook-form';
import './../styles/ContactForm.css';

const ContactForm = ({ addContact }) => {


    var defaultValues = {
        name: "",
        email: "",
        phone: ""
    }

    const { register, handleSubmit, reset, } = useForm({ defaultValues });

    const onSubmit = data => {
        // Create a new contact object
        const newContact = {
            id: Date.now(),
            ...data
        };

        // Add the new contact

        addContact({ ...newContact });


        // Reset the form
        reset()
    }


    return (
        <div className="contact-form-container">
            <h2>Add New Contact </h2>
            <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input required type="text" id="name" {...register('name')} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input required type="email" id="email" {...register('email')} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input required type="tel" id="phone" {...register('phone')} />
                </div>
                <button type="submit">Add Contact</button>
            </form>
        </div>
    );
};

export default ContactForm;

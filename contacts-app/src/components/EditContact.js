import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './../styles/ContactForm.css';

const EditContact = ({ defaultValues, editContact }) => {




    const { register, handleSubmit, reset, } = useForm({ defaultValues });



    const onSubmit = data => {
        // Create a new contact object
        const newContact = {
            id: Date.now(),
            ...data
        };

        // Add the new contact

        editContact({ ...data });


        // Reset the form
        reset()



    };
    return (
        <div className="contact-form-container">

            <form onSubmit={handleSubmit(onSubmit)}>
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

                <div className='bottom-buttons'>
                    <button type="submit">Update</button>
                    <button
                        className={""}
                        onClick={() => () => { }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditContact;

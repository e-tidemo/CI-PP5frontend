import React, { useState, useEffect } from 'react';
import axios from 'axios';
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        contactChoices: '4'
    });

    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        // Fetch CSRF token from Django
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('/csrf-token/');
                setCsrfToken(response.data.csrfToken);
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
            }
        };

        fetchCsrfToken();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/contact-us/', formData, {
                headers: {
                    'X-CSRFToken': csrfToken // Include CSRF token in request headers
                }
            });
            // Log the submitted message
            console.log('Submitted message:', formData);
            // Redirect to the success page or display a success message
        } catch (error) {
            console.error('Error submitting contact form:', error);
            // Handle error here (e.g., display an error message)
        }
    };

    return (
        <div>
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label><br />
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required /><br />
                <label htmlFor="email">Email:</label><br />
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br />
                <label htmlFor="subject">Subject:</label><br />
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required /><br />
                <label htmlFor="message">Message:</label><br />
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required /><br />
                <label htmlFor="contactChoices">Contact Reason:</label><br />
                <select id="contactChoices" name="contactChoices" value={formData.contactChoices} onChange={handleChange}>
                    <option value="1">Report user</option>
                    <option value="2">Business inquiries</option>
                    <option value="3">Feedback about website</option>
                    <option value="4">Other questions</option>
                </select><br /><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Contact;

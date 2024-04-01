import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import btnStyles from "../../styles/Button.module.css"; 
import styles from "../../styles/Contact.module.css";

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
        <Container className={`${styles.Container} justify-content-center align-items-center vh-100`}>
            <div>
                <h1>Contact Us</h1>
                <Form onSubmit={handleSubmit} className={styles.Form}>
                    <Form.Group controlId="name">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="subject">
                        <Form.Label>Subject:</Form.Label>
                        <Form.Control type="text" name="subject" value={formData.subject} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="message">
                        <Form.Label>Message:</Form.Label>
                        <Form.Control as="textarea" rows={3} name="message" value={formData.message} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="contactChoices">
                        <Form.Label>Contact Reason:</Form.Label>
                        <Form.Control as="select" name="contactChoices" value={formData.contactChoices} onChange={handleChange}>
                            <option value="1">Report user</option>
                            <option value="2">Business inquiries</option>
                            <option value="3">Feedback about website</option>
                            <option value="4">Other questions</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" className={`${btnStyles.Button} ${btnStyles.Green}`} type="submit">Submit</Button>
                </Form>
            </div>
        </Container>
    );
};

export default Contact;

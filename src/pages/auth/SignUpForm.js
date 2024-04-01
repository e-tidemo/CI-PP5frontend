import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';

import styles from "../../styles/SignUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";

const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
    });
    const { username, email, password1, password2 } = signUpData;

    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleChange = (event) => {

        setSignUpData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }
        ));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!username || !password1 || !password2) {
            // If any of the required fields are empty, set an error and return
            setErrors({ message: 'Please fill in all required fields.' });
            return;
        }
        try {
            await axios.post("/dj-rest-auth/registration/", signUpData);
            history.push("/signin");
        } catch (err) {
            if (err.response) {
                const errorData = err.response.data;
                // Check if username error exists in the response data
                if (errorData.username) {
                    // Set the error message to be displayed on the sign-up page
                    setErrors({ message: errorData.username.join(', ') });
                } else {
                    // If no specific username error message found, set a generic error message
                    setErrors({ message: 'An error occurred while signing up.' });
                }
            } else {
                // Handle network errors or other unexpected errors
                setErrors({ message: 'An error occurred while signing up.' });
            }
        }
    };

    return (
        <Row className={styles.Row}>
            <Col className="my-auto py-2 p-md-2" md={6}>
                <Container className={`${appStyles.Content} p-4 `}>
                    <h1 className={styles.Header}>sign up</h1>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label className="d-none">Username</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.username?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {errors.message}
                            </Alert>
                        ))}
                        <Form.Group controlId="email">
                            <Form.Label className="d-none">Email</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password1">
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="password"
                                placeholder="Password"
                                name="password1"
                                value={password1}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password2">
                            <Form.Label className="d-none">Confirm password</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="password"
                                placeholder="Confirm password"
                                name="password2"
                                value={password2}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
                            type="submit"
                        >
                            Sign up
                        </Button>
                        {errors.message && (
                            <Alert variant="warning" className="mt-3">
                                {errors.message}
                            </Alert>
                        )}
                    </Form>
                </Container>
                <Container className={`mt-3 ${appStyles.Content}`}>
                    <Link className={styles.Link} to="/signin">
                        Already have an account? <span>Sign in</span>
                    </Link>
                </Container>
            </Col>
            <Col
                md={6}
                className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
            >
                <Image
                    className={`${appStyles.FillerImage}`}
                    src={"sign-up"} alt="Image of a blank paper, an ink bottle and two fountain pens"
                />
            </Col>
        </Row>
    );
};

export default SignUpForm;
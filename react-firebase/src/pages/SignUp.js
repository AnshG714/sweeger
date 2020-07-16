import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { Form, Button, Container } from "react-bootstrap";
import app from "../config/Firebase";
import NavigationBar from "../components/NavigationBar"

const SignUp = ({ history }) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            const currentUser = app.auth().currentUser;
            await currentUser.sendEmailVerification();
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    return (
        <div>
            <NavigationBar />
            <Container>
                <h1>Sign Up</h1>
                <Form onSubmit={handleSignUp}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Sign Up
                </Button>
                </Form>
            </Container>
        </div>
    );
};

export default withRouter(SignUp);
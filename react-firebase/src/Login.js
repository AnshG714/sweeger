import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./config/base.js";
import { AuthContext } from "./Auth.js";
import { Form, Button, Container } from "react-bootstrap";

const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser && !currentUser.emailVerified) {
        return <Redirect to="/verify-email" />;
    } else if (currentUser && currentUser.emailVerified) {
        return <Redirect to="/" />;
    }

    return (
        <Container>
            <h1>Log in</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Log in
                </Button>
            </Form>
        </Container>
    );
};

export default withRouter(Login);
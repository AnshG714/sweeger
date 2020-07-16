import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Form, Button, Container, Navbar } from "react-bootstrap";
import app from "../config/Firebase.js";
import { AuthContext } from "../actions/Auth.js";
import NavigationBar from "../components/NavigationBar";

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
        <div>
            <NavigationBar />
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
        </div>
    );
};

export default withRouter(Login);
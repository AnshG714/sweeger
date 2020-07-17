import React, { useState, useContext } from 'react';
import { withRouter, Redirect } from "react-router";
import { Alert, Button } from 'react-bootstrap';
import app from "../config/Firebase.js";
import { AuthContext } from "../actions/Auth.js";

export default function VerifyEmail() {
    const [show, setShow] = useState(true);

    const { currentUser } = useContext(AuthContext);

    const onCreate= () => {
        const db = app.database();
        db.ref("users/" + currentUser.uid).set({
            email: currentUser.email,
        });
        db.ref("prefs/" + currentUser.uid).set({
            frequency: "null",
            keywords: "null",
        });
    }

    if (currentUser && currentUser.emailVerified) {
        onCreate();
        return <Redirect to="/" />;
    }


    if (show) {
        return (
            <Alert
                variant="danger"
                onClose={() => setShow(false)}
                dismissible
            >
                <Alert.Heading>Your email is not verified!</Alert.Heading>
                <p>
                    Please check your mail box to verify your email.
                    Refresh page after email is verified.
        </p>
            </Alert>
        );
    }
    return <Button variant="warning" size="sm" block onClick={() => setShow(true)}> Show Alert </Button>;
}

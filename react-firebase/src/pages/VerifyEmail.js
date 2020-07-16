import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';

export default function VerifyEmail() {
    const [show, setShow] = useState(true);

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
        </p>
            </Alert>
        );
    }
    return <Button variant="warning" size="sm" block onClick={() => setShow(true)}> Show Alert </Button>;
}

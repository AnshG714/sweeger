import React from 'react';
import { Navbar, Nav } from "react-bootstrap";

const NavigationBar = () => {
    return (
        <Navbar expand="sm" variant="dark" bg="dark">
            <Navbar.Brand href="/">Sweeger</Navbar.Brand>
            <Nav className="ml-auto" variant="pills" defaultActiveKey="/">
                <Nav.Item>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/signup">Sign Up</Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    )
}

export default NavigationBar 

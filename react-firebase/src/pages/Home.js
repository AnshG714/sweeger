import React from "react";
import app from "../config/Firebase";
import { Button, Container } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar"

const Home = () => {
  return (
    <div>
      <NavigationBar />
      <Container>
        <h1>Home</h1>
        <Button onClick={() => app.auth().signOut()}>Sign Out</Button>
      </Container>
    </div>
  );
};

export default Home;
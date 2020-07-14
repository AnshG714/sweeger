import React from "react";
import app from "./config/base";
import { Button, Container } from "react-bootstrap";

const Home = () => {
  return (
      <Container>
          <h1>Home</h1>
          <Button onClick={() => app.auth().signOut()}>Sign Out</Button>
      </Container>
  );
};

export default Home;
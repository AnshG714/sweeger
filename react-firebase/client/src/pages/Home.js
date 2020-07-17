import React, { useEffect, useContext, useState } from "react";
import app from "../config/Firebase";
import { Button, Container, InputGroup } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import { AuthContext } from "../actions/Auth.js";

const Home = () => {

  const { currentUser } = useContext(AuthContext);

  const { uid } = currentUser;
  const [email, setEmail] = useState();
  const [frequency, setFrequency] = useState("null");
  const [keywords, setKeywords] = useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const db = app.database();
      const user = await db.ref("users/" + uid).once("value");
      setEmail(user.val().email);
      const pref = await db.ref("prefs/" + uid).once("value");
      setKeywords(pref.val().keywords);
      setFrequency(pref.val().frequency);
    };
    fetchData();
  }, []);

  const onUpdate = () => {
    const db = app.database();
    db.ref('prefs/' + uid).set({
      frequency: frequency,
      keywords: keywords,
    });
  }

  const send = () => {
    const lst = keywords.split(",");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, keywords: lst }),
    };

    fetch("/api/sendKeywords", requestOptions)
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));

    onUpdate();
  };

  return (
    <div>
      <NavigationBar />
      <Container>
        <h1>Home</h1>
        <h4>
          Welcome to Sweeger! Please enter a comma-separated list of things you
          want to receive emails about.
        </h4>
        <ul>{email}</ul>
        {/* <Form onSubmit={send}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Topics you subscribed to</Form.Label>
            <Form.Control as="textarea" rows="3" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Get articles
          </Button>
        </Form> */}
        {/* <InputGroup>
        <InputGroup.Text className="inputBox"
          rows={5}
          value={keywords}
          onchange=
        </InputGroup> */}
        <textarea
          className="inputBox"
          rows={5}
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        ></textarea>{" "}
        <br />
        <Button onClick={() => send()}>Get articles</Button> <br />
        <br />
        <Button onClick={() => app.auth().signOut()}>Sign Out</Button>
      </Container>
    </div>
  );
};

export default Home;

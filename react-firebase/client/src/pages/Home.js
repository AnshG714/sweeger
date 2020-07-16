import React, { useEffect, useContext, useState } from "react";
import app from "../config/Firebase";
import { Button, Container } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import { AuthContext } from "../actions/Auth.js";

const Home = () => {
  const [user, setUser] = useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const db = app.database();
      const data = await db.ref("users/742881651").once("value");
      console.log(data);
      setUser(data.val());
    };
    fetchData();
  }, []);

  // const onCreate = () => {
  //   const db = firebase.firestore();
  //   db.collection("spells").add({ name: newSpellName });
  // };

  // const writeUserData = useCallback(
  //   async event => {
  //     event.preventDefault();
  //     callback
  //   },
  //   [input],
  // )

  const { currentUser } = useContext(AuthContext);

  const { email, uid } = currentUser;
  const [keywords, setKeywords] = useState("");

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
  };

  // console.log({email, uid});

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

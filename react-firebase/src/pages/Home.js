import React, { useEffect, useContext, useState } from "react";
import app from "../config/Firebase";
import { Button, Container } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar"
import { AuthContext } from "../actions/Auth.js";

const Home = () => {

  const [user, setUser] = useState();
  const [prefs, setPrefs] = useState([]);


  React.useEffect(() => {
    const fetchData = async () => {
      const db = app.database();
      const data = await db.ref('users/742881651').once('value');
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
  // console.log({email, uid});

  return (
    <div>
      <NavigationBar />
      <Container>
        <h1>Home</h1>
        <ul>
          {user}
        </ul>
        <Button onClick={() => app.auth().signOut()}>Sign Out</Button>
      </Container>
    </div>
  );
};

export default Home;
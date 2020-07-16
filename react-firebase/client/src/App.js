import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./actions/Auth";
import PrivateRoute from "./actions/PrivateRoute";
import VerifyEmail from "./pages/VerifyEmail";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/verify-email" component={VerifyEmail} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from './components/BubblePage';
import "./styles.scss";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token'));

  function loginCallback() {
    setLoggedIn(true);
  }

  function logout(event) {
    event.preventDefault();
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  return (
    <Router>
      <h1>Welcome to the Bubble App!</h1>
      {loggedIn && (
        <>
          <div>
            <a href="" onClick={logout}>Logout</a>
          </div>
          <br/>
        </>
      )}
      <div className="App">
        {/*<Route exact path="/" component={Login} />*/}
        <Route
          exact
          path="/"
          render={(props)=><Login {...props} loginCallback={loginCallback} />}
        />
        <PrivateRoute path='/bubbles' component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;

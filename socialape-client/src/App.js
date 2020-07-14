import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";
import jwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute";

/** Page */
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

// Components
import Navbar from "./components/Navbar";
const theme = createMuiTheme(themeFile);

let isAuthenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    isAuthenticated = false;
    localStorage.clear();
  } else {
    isAuthenticated = true;
  }
}
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar></Navbar>
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute
                  exact
                  path="/login"
                  component={login}
                  authenticated={isAuthenticated}
                />
                <AuthRoute
                  exact
                  path="/signup"
                  component={signup}
                  authenticated={isAuthenticated}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

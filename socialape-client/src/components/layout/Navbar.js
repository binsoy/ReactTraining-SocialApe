import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CustomButton from "../../util/CustomButton";
import PostScream from "../scream/PostScream";
import Notifications from "./Notifications";

// MUI stuffs
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

//icons
import HomeIcon from "@material-ui/icons/Home";

class Navbar extends Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {isAuthenticated ? (
            <Fragment>
              <PostScream />
              <Link to="/">
                <CustomButton tip="Home">
                  <HomeIcon />
                </CustomButton>
              </Link>
              <Notifications />
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propType = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(Navbar);

import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Axios from "axios";

import Scream from "../components/Scream";

class home extends Component {
  state = {
    screams: null,
  };
  componentDidMount() {
    Axios.get("/screams").then((res) => {
      this.setState({
        screams: res.data,
      });
    });
  }
  render() {
    let recentScreamsMarkup = this.state.screams ? (
      this.state.screams.map((scream) => (
        <Scream key={scream.screamId} scream={scream}></Scream>
      ))
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;

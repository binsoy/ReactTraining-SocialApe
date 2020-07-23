import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// MUI Stuffs
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";

//icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

//Redux
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.commonStyles,
});

const StaticProfile = (props) => {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, website, location },
  } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
        </div>
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/useres/${handle}`}
            color="primary"
            variant="h5"
          >
            @{handle}
          </MuiLink>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <Fragment>
              <LocationOn color="primary" /> <span>{location}</span>
              <hr />
            </Fragment>
          )}
          {website && (
            <Fragment>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {" "}
                {website}
              </a>
              <hr />
            </Fragment>
          )}
          <CalendarToday color="primary" />{" "}
          <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
        </div>
      </div>
    </Paper>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaticProfile);

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CustomButton from "../../util/CustomButton";
import dayjs from "dayjs";

// MUI Stuffs
import Dialog from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

//Redux
import { connect } from "react-redux";
import { getScream } from "../../redux/actions/dataActions";
import LikeButton from "./LikeButton";

const styles = (theme) => ({
  common: { ...theme },
  separator: {
    border: "none",
    margin: 4,
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
});

class ScreamDialog extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.props.getScream(this.props.screamId);
  };

  handleClose = () => {
    this.setState({ open: false, errors: {} });
  };

  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
      },
      ui: { loading },
    } = this.props;

    const dialogMarkUp = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={2}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.separator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.separator} />
          <Typography variant="body1">{body}</Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} Likes</span>
          <CustomButton tip="comments">
            <ChatIcon color="primary" />
          </CustomButton>
          <span>{commentCount} Comments</span>
        </Grid>
      </Grid>
    );
    return (
      <Fragment>
        <CustomButton
          onClick={this.handleOpen}
          tip="Expand scream"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </CustomButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <CustomButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon color="primary" />
          </CustomButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkUp}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ScreamDialog.propTypes = {
  ui: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  getScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  ui: state.ui,
});

export default connect(mapStateToProps, { getScream })(
  withStyles(styles)(ScreamDialog)
);

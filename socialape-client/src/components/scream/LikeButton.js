import React, { Component } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../../util/CustomButton";
import PropTypes from "prop-types";

// icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

// Redux
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";

class LikeButton extends Component {
  isLikedScream = () => {
    return (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.screamId
      )
    );
  };

  likeScream = () => {
    console.log("heheheh", this.props.screamId);
    this.props.likeScream(this.props.screamId);
  };

  unlikeScream = () => {
    this.props.unlikeScream(this.props.screamId);
  };

  render() {
    const { isAuthenticated } = this.props.user;
    const likeButton = !isAuthenticated ? (
      <Link to="/login">
        <CustomButton tip="Like">
          <FavoriteBorder color="primary" />
        </CustomButton>
      </Link>
    ) : this.isLikedScream() ? (
      <CustomButton tip="Undo like" onClick={this.unlikeScream}>
        <FavoriteIcon color="primary" />
      </CustomButton>
    ) : (
      <CustomButton tip="Like" onClick={this.likeScream}>
        <FavoriteBorder color="primary" />
      </CustomButton>
    );

    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeScream,
  unlikeScream,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);

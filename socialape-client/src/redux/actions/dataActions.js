import {
  SET_SCREAMS,
  SET_SCREAM,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  POST_SCREAM,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from "../types";
import Axios from "axios";

/** Get all screams */
export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  Axios.get("/screams")
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAMS,
        payload: [],
      });
    });
};

/** Get a scream */
export const getScream = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  Axios.get(`/scream/${screamId}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data,
      });
      dispatch({
        type: STOP_LOADING_UI,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

/** Like a scream */
export const likeScream = (screamId) => (dispatch) => {
  Axios.get(`/scream/${screamId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

/** Unlike a scream */
export const unlikeScream = (screamId) => (dispatch) => {
  Axios.get(`/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

/** Post a scream */
export const postScream = (newScream) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  Axios.post("/scream", newScream)
    .then((res) => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

/** Submit a comment */
export const submitComment = (screamId, commentData) => (dispatch) => {
  Axios.post(`/scream/${screamId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

/** Delete a scream */
export const deleteScream = (screamId) => (dispatch) => {
  Axios.delete(`/scream/${screamId}`)
    .then((res) => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamId,
      });
    })
    .catch((err) => console.log(err));
};

/** Get user data */
export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  Axios.get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data.screams,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_SCREAMS,
        payload: null,
      });
    });
};

/** Clear scream dialog erros */
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

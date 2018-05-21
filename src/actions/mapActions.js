import * as types from '../constants/actionTypes';
import axios from "axios";
import * as constants from "../constants/constants";

export function loadTracksSuccess(waypoints) {
  return {type: types.LOAD_TRACKS_SUCCESS, waypoints};
}

export function loadTracks() {
  return (dispatch => {
    return axios.get(constants.BACK_END_HOST).then(waypoints => {
      dispatch(loadTracksSuccess(waypoints.data));
    }).catch(error => {
      throw(error);
    });
  })
}

// RESIZE MARKERS BY ZOOM LEVEL
export function resetMarkerSize(zoom) {
  return {
    type: types.RESET_MARKER_SIZE,
    zoom,
  };
}

// HANDLE INFO WINDOWS
export const openInfoBox = (key) => {
  return {
    type: types.OPEN_INFO_BOX,
    key
  };
};

export const closeInfoBox = () => {
  return {type: types.CLOSE_INFO_BOX};
};

// CALCULATE ANIMATION COORDINATES
export const calculateAnimationCoordinates = (newCoordinates) => {
  return {
    type: types.CALCULATE_ANIMATION_COORDINATES,
    newCoordinates,
  };
};


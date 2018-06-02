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

// UPDATE MARKER SIZE WHEN MAP IS ZOOMED
export const updateMarker = (zoom) => {
  return {
    type: types.UPDATE_MARKER_SIZE,
    zoom
  };
};


// ANIMATION ACTIONS
let timer = null;
export function animationStart(speed) {
  return (dispatch => {
    timer = setInterval(() => {
      dispatch(animationPropagate());
      }, speed);
    dispatch({type: types.ANIMATION_START});
    dispatch(animationPropagate());
  });
}

export const animationPropagate = () => {
  return {
    type: types.ANIMATION_PROPAGATE,
  };
};

export const animationPause = () => {
  clearInterval(timer);
  return {type: types.ANIMATION_PAUSE};
};

export const animationReset = () => {
  clearInterval(timer);
  return {type: types.ANIMATION_RESET};
};

export const updateSpeed = (speed) => {
  return {
    type: types.UPDATE_SPEED,
    speed,
  };
};


import * as types from '../constants/actionTypes';

const mapReducer = (state = [], action) => {
  switch(action.type) {
    case types.LOAD_TRACKS_SUCCESS:
      return action.waypoints;

    default:
      return state;
  }
};

export default mapReducer;

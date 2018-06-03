import * as types from '../constants/actionTypes';

const initialState = {
  zoom: 6,
};

export default function  zoomReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_MARKER_SIZE:
      return {
        zoom: action.zoom
      };

    default:
      return state;
  }
}

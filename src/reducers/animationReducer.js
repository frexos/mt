import * as types from '../constants/actionTypes';

const animationReducer = (state = {}, action) => {
  switch(action.type) {
    case types.CALCULATE_ANIMATION_COORDINATES:
      return action.newCoordinates;

    default:
      return state;
  }
};

export default animationReducer;

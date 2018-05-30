import * as types from '../constants/actionTypes';

const initialState = {
  counter: -1
};

const animationReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.ANIMATION_START:
      return {
        counter: 0
      };

    case types.ANIMATION_PROPAGATE:
      return {
        counter: state.counter + 1
      };

    case types.ANIMATION_PAUSE:
      return {
        counter: state.counter
      };

    case types.ANIMATION_RESET:
      return {
        counter: 0
      };

    default:
      return state;
  }
};

export default animationReducer;

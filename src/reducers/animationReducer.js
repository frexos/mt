import * as types from '../constants/actionTypes';

const initialState = {
  counter: -1,
  running: false,
};

const animationReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.ANIMATION_START:
      return {
        counter: state.counter,
        running: true,
      };

    case types.ANIMATION_PROPAGATE:
      return {
        counter: state.counter + 1,
        running: state.running,
      };

    case types.ANIMATION_PAUSE:
      return {
        counter: state.counter,
        running: false,
      };

    case types.ANIMATION_RESET:
      return {
        counter: 0,
        running: false,
      };

    default:
      return state;
  }
};

export default animationReducer;

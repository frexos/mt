import * as types from '../constants/actionTypes';

const initialState = {
  counter: -1,
  running: false,
  speed: 1,
};

const animationReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.ANIMATION_START:
      return {
        counter: state.counter,
        running: true,
        speed: state.speed,
      };

    case types.ANIMATION_PROPAGATE:
      return {
        counter: state.counter + 1,
        running: state.running,
        speed: state.speed,
      };

    case types.ANIMATION_PAUSE:
      return {
        counter: state.counter,
        running: false,
        speed: state.speed,
      };

    case types.ANIMATION_RESET:
      return {
        counter: 0,
        running: false,
        speed: state.speed,
      };

    case types.UPDATE_SPEED:
      return {
        counter: state.counter,
        running: state.running,
        speed: action.speed,
      };

    case types.ANIMATION_PROGRESS:
      return {
        counter: action.counter,
        running: false,
        speed: state.speed,
      };

    default:
      return state;
  }
};

export default animationReducer;

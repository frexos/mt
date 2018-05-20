import * as types from '../constants/actionTypes';

const initialState = {
  isOpen: false,
  key: '',
};

export default function  infoBoxReducer(state = initialState, action) {
  switch (action.type) {
    case types.OPEN_INFO_BOX:
      return {
        isOpen: true,
        key: action.key
      };
    case types.CLOSE_INFO_BOX:
      return initialState;
    default:
      return state;
  }
}

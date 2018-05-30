import {combineReducers} from 'redux';
import fuelSavings from './fuelSavingsReducer';
import waypoints from './mapReducer';
import infoBoxProps from './infoBoxReducer';
import animation from './animationReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  waypoints,
  infoBoxProps,
  animation,
  fuelSavings,
  routing: routerReducer
});

export default rootReducer;

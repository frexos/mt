import {combineReducers} from 'redux';
import waypoints from './mapReducer';
import infoBoxProps from './infoBoxReducer';
import zoomLevel from './zoomReducer';
import animation from './animationReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  waypoints,
  infoBoxProps,
  zoomLevel,
  animation,
  routing: routerReducer
});

export default rootReducer;

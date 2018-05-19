import {combineReducers} from 'redux';
import fuelSavings from './fuelSavingsReducer';
import waypoints from './mapReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  waypoints,
  fuelSavings,
  routing: routerReducer
});

export default rootReducer;

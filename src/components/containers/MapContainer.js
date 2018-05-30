import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {calculatePosition} from '../../selectors';
import {bindActionCreators} from 'redux';
import * as mapActions from '../../actions/mapActions';
import MapPage from '../MapPage';

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    // FUNCTION TO RESET IN CASE OF ANIMATION END
    if (prevProps.animation.counter === this.props.animationCoords.length - 2) {
      (() => {prevProps.actions.animationReset()})();
    }
  }

  render() {
    // console.log('waypoints');
    // console.log(this.props);

    if (this.props.waypoints.length > 0) {
      const waypoints = this.props.waypoints.slice().reverse();
      const infoBoxProps = this.props.infoBoxProps;
      const animationSpeed = 1000;
      // FUNCTION TO DISPATCH ANIMATION START
      const animationStart = () => this.props.actions.animationStart();
      // FUNCTION TO DISPATCH ANIMATION PAUSE
      const animationPause = () => this.props.actions.animationPause();

      // FUNCTION THAT RETURNS CHANGING ANIMATION COORDINATES
      const getAnimatedPosition = (coordsArray, counter) => {
        let animationCoords = counter < 0? coordsArray[coordsArray.length -1] : coordsArray[counter];
        return animationCoords;
      };

      return (
        <MapPage
          waypoints = {waypoints}
          animatedPosition = {getAnimatedPosition}
          coordsArray = {this.props.animationCoords}
          counter = {this.props.animation.counter}
          infoBoxProps = {infoBoxProps}
          onRequestOpen = {(key) => {this.props.actions.openInfoBox(key)}}
          closeInfoBox = {this.props.actions.closeInfoBox}
          animationStart = {animationStart}
          animationPause = {animationPause}
        />
      );
    } else {
      return (
        <div>loading...</div>
      );
    }

  }
}

MapContainer.propTypes = {
  waypoints: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    openInfoBox: PropTypes.func.isRequired,
    closeInfoBox: PropTypes.func.isRequired,
  }),
  infoBoxProps: PropTypes.object.isRequired,
  // animationCoordinates: PropTypes.object.isRequired,
};



function mapStateToProps(state) {

  return {
    waypoints: state.waypoints,
    infoBoxProps: state.infoBoxProps,
    animation: state.animation,
    animationCoords: state.waypoints.length> 0? calculatePosition(state) : null,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign({}, mapActions), dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);

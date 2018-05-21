import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mapActions from '../../actions/mapActions';
import MapPage from '../MapPage';

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('waypoints');
    console.log(this.props);
    console.log(this.props.infoBoxProps);
    const waypoints = this.props.waypoints.slice().reverse();

    console.log(waypoints);
    const infoBoxProps = this.props.infoBoxProps;
    const animationSpeed = 1000;

    // ANIMATION
    this.props.actions.calculateAnimationCoordinates({
      lat: waypoints[0].LAT,
      lon: waypoints[0].LON,
    });
    const getNewCoordinates = (lat, lon,  bearing, speed, interval) => {
      const distance = speed*0.000514444*interval; // Calculate distance-km travelled at speed-knots
      const R = 6371 // Earth Radius in Km
      let latDist = Math.asin(Math.sin(Math.PI / 180 * lat) * Math.cos(distance / R) + Math.cos(Math.PI / 180 * lat) * Math.sin(distance / R) * Math.cos(Math.PI / 180 * bearing));
      let lonDist = Math.PI / 180 * lon + Math.atan2(Math.sin( Math.PI / 180 * bearing) * Math.sin(distance / R) * Math.cos( Math.PI / 180 * lat ), Math.cos(distance / R) - Math.sin( Math.PI / 180 * lat) * Math.sin(latDist));

      let newCoordinates = {
          lat: 180 / Math.PI * latDist,
          lon: 180 / Math.PI * lonDist
      };

      this.props.actions.calculateAnimationCoordinates(newCoordinates)
    };

    setInterval(getNewCoordinates(this.props.animationCoordinates.lat, this.props.animationCoordinates.lon, waypoints[0].HEADING, waypoints[0].SPEED, animationSpeed), animationSpeed);
    // END ANIMATION

    return (
      <MapPage
        waypoints = {waypoints}
        animationCoordinates = {this.props.animationCoordinates}
        infoBoxProps = {infoBoxProps}
        onRequestOpen = {(key) => {this.props.actions.openInfoBox(key)}}
        closeInfoBox = {this.props.actions.closeInfoBox}
      />
    );
  }
}

MapContainer.propTypes = {
  waypoints: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    openInfoBox: PropTypes.func.isRequired,
    closeInfoBox: PropTypes.func.isRequired,
  }),
  infoBoxProps: PropTypes.object.isRequired,
  animationCoordinates: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    waypoints: state.waypoints,
    infoBoxProps: state.infoBoxProps,
    animationCoordinates: state.animationCoordinates,
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

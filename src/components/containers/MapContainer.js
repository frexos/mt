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
    console.log(this.props.waypoints);
    console.log(this.props.infoBoxProps);
    const waypoints = this.props.waypoints;
    const infoBoxProps = this.props.infoBoxProps;

    return (
      <MapPage
        waypoints = {waypoints.slice().reverse()}
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
};

function mapStateToProps(state) {
  return {
    waypoints: state.waypoints,
    infoBoxProps: state.infoBoxProps,
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

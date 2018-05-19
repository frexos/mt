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
    // console.log('waypoints');
    // console.log(this.props);

    return (
      <MapPage />
    );
  }
}

MapContainer.propTypes = {
  waypoints: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    waypoints: state.waypoints,
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

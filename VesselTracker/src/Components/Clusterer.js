import React from 'react';
import MyMarker from './MyMarker';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
// solves issues with leaflet.css import
import 'leaflet/dist/leaflet.css';

// Setting custom icon for clusterer group
// NOTE: iconCreateFunction is running by leaflet, which is not support ES6 arrow func syntax
const waypointsClustererOptions = {
	iconCreateFunction: function (cluster) {
		const children = cluster.getChildCount();
		return L.divIcon({
			html: '<span>' +children +'</span>',
			className: 'custom-cluster-waypoints',
		});
	},
};

class Clusterer extends React.Component {
	render() {
		let polylineLayer, waypointsLayer
		this.props.type ? waypointsLayer = <MyMarker data={this.props.data} icon={'arrow'}/>
										: polylineLayer = <MyMarker data={this.props.data} icon={'circle'}/>;

		return (
			<div>
				<MarkerClusterGroup options={waypointsClustererOptions}>
					{waypointsLayer}
				</MarkerClusterGroup>
				{polylineLayer}
			</div>
		)
	}

}

export default Clusterer;
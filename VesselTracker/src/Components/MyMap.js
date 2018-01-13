import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import Control from './Control.js';
import L from 'leaflet';
import Clusterer from './Clusterer.js'
// solves issues with leaflet.css import
import 'leaflet/dist/leaflet.css';

class MyMap extends React.Component {
	state = {
		coords: [],
		polylinePoints: [],
		map: null,
		isWaypoints: true,
	}

	componentDidMount = () => {
		this.setState({map: this.leafletMap.leafletElement});
	}

	componentWillMount = () => {
		this.setState({coords: this.getCoords()});
		this.setState({polylinePoints: this.polylinePoints()});
	}

	// get coords from server response, coords are used to set map bounds
	getCoords = () => {
		let coords = [];
		this.props.data.map((x, i) => {
			return coords.push(this.props.data[i].coords);
		});
		return coords;
	}

	// creates polyline points based on coords
	polylinePoints = () => {
		const points = [];
		for(let value of this.props.data) {
			points.push(new L.LatLng(value.coords[0], value.coords[1]));
		}			
		return points;
	}

	// adds a polyline
	addPolyline = () => {
		let polyline = new L.Polyline(this.polylinePoints(this.props.data), {color:'#3989FC',weight:3,opacity: 0.9});
		polyline.name = 'polyline';
		this.state.map.addLayer(polyline); 
	}

	// a non elegant way to remove a polyline, but seems to be the only one 
	removePolyline = () => {
		for (let i in this.leafletMap.leafletElement._layers) {
			if(this.leafletMap.leafletElement._layers[i].name === 'polyline') {
				this.leafletMap.leafletElement.removeLayer(this.leafletMap.leafletElement._layers[i]);
			}
		}
	}

	// decides if waypoints or marker with polyline will be rendered
	handlePolyline = (btnClicked) => {
		if(btnClicked === 'waypoints') {
			this.addPolyline();
			this.setState({isWaypoints: false});
		} else {
			this.removePolyline();
			this.setState({isWaypoints: true})
		}
	}

	render() {
		return (
			<Map ref={map=>{this.leafletMap = map;}} bounds={this.state.coords} className='map'>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
				/>
				<Control onclick={this.handlePolyline}/>
				<Clusterer type={this.state.isWaypoints} data={this.props.data}/>
			</Map>
		)
	}
}

export default MyMap;

				

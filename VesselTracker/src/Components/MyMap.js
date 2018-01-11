import React from 'react';
import MyMarker from './MyMarker';
import { Map, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Control from './Control.js';
import L from 'leaflet';
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

	// get coords from server response
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

	// removes a polyline
	removePolyline = () => {
		for (let i in this.leafletMap.leafletElement._layers) {
			if(this.leafletMap.leafletElement._layers[i].name === 'polyline') {
				this.leafletMap.leafletElement.removeLayer(this.leafletMap.leafletElement._layers[i]);
			}
		}
	}

	// decides if a polyline or simple waypoints will be rendered
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
		let mapLayer;
		this.state.isWaypoints ? mapLayer = <MyMarker data={this.props.data} icon={'arrow'}/> 
													 : mapLayer = <MyMarker data={this.props.data} icon={'circle'}/>;
		return (
			<Map ref={map=>{this.leafletMap = map;}} bounds={this.state.coords} className='map'>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
				/>
				<Control onclick={this.handlePolyline}/>
				<MarkerClusterGroup>
					{mapLayer}
				</MarkerClusterGroup>;
			</Map>
		)
	}
}

export default MyMap;

				

import React from 'react';
import { Marker } from 'react-leaflet';
import MyPopup from './MyPopup';
import { CircleIcon } from './MarkerIcon';

const MyMarker = (props) => {
	let markers = props.data.map((x, i) => {
		return (
			<Marker key={i} position={props.data[i].coords} icon={CircleIcon} >
				<MyPopup popupInfo={props.data[i]}>
				</MyPopup>
			</Marker>
		)
	});
	return markers;
}

export default MyMarker;
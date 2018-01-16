import React from 'react';
import MyPopup from './MyPopup';
import { CircleIcon, ArrowIcon } from './MarkerIcon';
import RotatedMarker from 'react-leaflet-rotatedmarker';
import { headingToInteger } from './Calculations.js';

const MyMarker = (props) => {
	let markerIcon;
	props.icon === 'arrow' ? markerIcon = ArrowIcon : markerIcon = CircleIcon;
	let markers = props.data.map((x, i) => {
		return (
			<RotatedMarker key={i} rotationAngle={headingToInteger(props.data[i].heading)} rotationOrigin={'center'} position={props.data[i].coords} icon={ markerIcon } >
				<MyPopup popupInfo={props.data[i]}>
				</MyPopup>
			</RotatedMarker>
		)
	});
	return markers;
}

export default MyMarker;
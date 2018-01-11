import L from 'leaflet';
import circleIcon from '../assets/images/circle.png';
import arrowIcon from '../assets/images/arrow.png';

const ArrowIcon = L.icon({
	iconUrl: arrowIcon,
	iconSize: [38.7, 23.25],
	iconAnchor: [19.35, 11.55]
});

const CircleIcon = L.icon({
	iconUrl: circleIcon,
	iconSize: [40, 40],
	iconAnchor: [20, 20]
});

export {CircleIcon, ArrowIcon};    
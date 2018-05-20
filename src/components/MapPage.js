import React from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline} from 'react-google-maps';
import {InfoBox} from 'react-google-maps/lib/components/addons/InfoBox';
import '../styles/about-page.css';

// Since this component is simple and static, there's no parent container for it.

const MTMap = withScriptjs(withGoogleMap(props => {
  const getTrackCoordinates = () => {
    let trackCoordinates = [];
    props.waypoints.forEach(i => {
      trackCoordinates.push({lat: parseFloat(i.LAT), lng: parseFloat(i.LON)});
    });
    return trackCoordinates;
  };
  const getCoordinatesFromSpeed = (lat, lon, speed, heading, animationSpeed) => {
    const getNewCoordinates = (lat, lon,  bearing, distance) => {
      const R = 6371 // Earth Radius in Km
      let latDist = Math.asin(Math.sin(Math.PI / 180 * lat) * Math.cos(distance / R) + Math.cos(Math.PI / 180 * lat) * Math.sin(distance / R) * Math.cos(Math.PI / 180 * bearing));
      let lonDist = Math.PI / 180 * lon + Math.atan2(Math.sin( Math.PI / 180 * bearing) * Math.sin(distance / R) * Math.cos( Math.PI / 180 * lat ), Math.cos(distance / R) - Math.sin( Math.PI / 180 * lat) * Math.sin(latDist));

      return [180 / Math.PI * latDist , 180 / Math.PI * lonDist];
    };

    setInterval(getNewCoordinates, 1000);
    setTimeout( getCoordinatesFromSpeed, animationSpeed );
  };
  let icon = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    size: new google.maps.Size(8, 9),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 8),
  };
  console.log('map page waypoints: ');
  // console.log(props.infoWindowProps);

  return (
    <GoogleMap
      defaultZoom={3}
      defaultCenter={{ lat: parseFloat(props.waypoints[0].LAT), lng: parseFloat(props.waypoints[0].LON) }}
    >
      {props.waypoints.map((waypointItem, key) => (
        <Marker
          position = {{ lat: parseFloat(waypointItem.LAT), lng: parseFloat(waypointItem.LON) }}
          key = {key}
          icon =  {icon}
          onMouseOver = {() => {props.onRequestOpen(key)}}
          onMouseOut = {props.closeInfoBox}
        >
          {(props.infoBoxProps.isOpen && props.infoBoxProps.key === key) && <InfoBox>
            <div style={{backgroundColor: "#FFFFFF", padding: "5px 10px"}}>
              <p>{'Vessel Speed: ' + waypointItem.SPEED}</p>
              <p>{'Vessel Course: ' + waypointItem.COURSE}</p>
              <p>{'Timestamp: ' + waypointItem.TIMESTAMP}</p>
            </div>
          </InfoBox>}
        </Marker>
      ))}
      <Polyline
        path={getTrackCoordinates()}
      />
    </GoogleMap>
  )
}
));

const MapPage = (props) => {
  const waypoints = props.waypoints;
  const infoBoxProps = props.infoBoxProps;
  const onRequestOpen = props.onRequestOpen;
  const closeInfoBox = props.closeInfoBox;

  return (
    <MTMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
      waypoints = {waypoints}
      infoBoxProps = {infoBoxProps}
      onRequestOpen = {onRequestOpen}
      closeInfoBox = {closeInfoBox}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: '100%' }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
};

export default MapPage;

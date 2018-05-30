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

  // console.log('coordsArray');
  // console.log(props.coordsArray);
  // console.log('counter');
  // console.log(props.counter);


  const animationPosition = () => {
    let positionObj = props.animatedPosition(props.coordsArray, props.counter);
    return positionObj;
  };

  let icon = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    size: new google.maps.Size(8, 9),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 8),
  };

  return (
    <div>
      <a href="#" onClick={props.animationStart}>START ANIMATION</a>
      <br />
      <a href="#" onClick={props.animationPause}>PAUSE ANIMATION</a>
      <GoogleMap
        defaultZoom={10}
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
        <Marker
          position = {{lat: parseFloat(animationPosition().lat), lng: parseFloat(animationPosition().lon)}} />
        <Polyline
          path = {getTrackCoordinates()}
        />
      </GoogleMap>
    </div>
  )
}
));

const MapPage = (props) => {
  const waypoints = props.waypoints;
  const animatedPosition = props.animatedPosition;
  const infoBoxProps = props.infoBoxProps;
  const onRequestOpen = props.onRequestOpen;
  const closeInfoBox = props.closeInfoBox;
  const animationStart = props.animationStart;
  const animationPause = props.animationPause;
  const coordsArray = props.coordsArray;
  const counter = props.counter;

  return (
    <MTMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
      waypoints = {waypoints}
      infoBoxProps = {infoBoxProps}
      animatedPosition = {animatedPosition}
      onRequestOpen = {onRequestOpen}
      closeInfoBox = {closeInfoBox}
      animationStart = {animationStart}
      animationPause = {animationPause}
      coordsArray = {coordsArray}
      counter = {counter}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: '100%' }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
};

export default MapPage;

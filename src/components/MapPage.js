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



    const animationPosition = () => {
      let positionObj = props.animatedPosition(props.coordsArray, props.counter);
      return positionObj;
    };

    let icon = {
      url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      size: new google.maps.Size(Math.round(Math.pow(1.5, props.zoom)), Math.round(Math.pow(1.6, props.zoom))),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 8+Math.pow(1.3, props.zoom)),
    };
    console.log('markerSize');
    console.log(Math.pow(2,props.zoom));

    return (
      <div className="mt-map">
        <div className="mt-map__controls">
          <a className="mt-map__button" href="#" onClick={props.animationStart}>
            <img className="btn-icon" src={require("../images/play_icon.png")}/>
          </a>
          <a className="mt-map__button" href="#" onClick={props.animationPause}>
            <img className="btn-icon" src={require("../images/pause_icon.png")}/>
          </a>
          <a className="mt-map__button--refresh" href="#" onClick={props.animationReset}>
            <img className="btn-icon" src={require("../images/refresh_icon.png")}/>
          </a>
        </div>
        <GoogleMap
          onZoomChanged={()=>props.onZoomChanged(props.updateMarker)}
          ref={props.onMapMounted}
          defaultZoom={7}
          defaultCenter={{lat: parseFloat(props.waypoints[0].LAT), lng: parseFloat(props.waypoints[0].LON)}}
        >
          {props.waypoints.map((waypointItem, key) => (
            <Marker
              position={{lat: parseFloat(waypointItem.LAT), lng: parseFloat(waypointItem.LON)}}
              key={key}
              icon={icon}
              onMouseOver={() => {
                props.onRequestOpen(key)
              }}
              onMouseOut={props.closeInfoBox}
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
            position={{lat: parseFloat(animationPosition().lat), lng: parseFloat(animationPosition().lon)}}/>
          <Polyline
            path={getTrackCoordinates()}
          />
        </GoogleMap>
      </div>
    )
  }
));

export class MapPage extends React.Component {
  constructor(props) {
    super(props);
  }

  onMapMounted = (mapRef) => {
    this.setState({ mapRef: mapRef });
  };

  onZoomChanged = (updateMarker) => {
    this.setState({ zoom: this.state.mapRef.getZoom() });
    updateMarker(this.state.zoom);
  };

  render() {
    const waypoints = this.props.waypoints;
    const animatedPosition = this.props.animatedPosition;
    const infoBoxProps = this.props.infoBoxProps;
    const onRequestOpen = this.props.onRequestOpen;
    const closeInfoBox = this.props.closeInfoBox;
    const animationStart = this.props.animationStart;
    const animationPause = this.props.animationPause;
    const animationReset = this.props.animationReset;
    const updateMarker = this.props.updateMarker;
    const coordsArray = this.props.coordsArray;
    const counter = this.props.counter;
    const zoom = this.props.zoom;


    return (
      <MTMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
        waypoints={waypoints}
        infoBoxProps={infoBoxProps}
        animatedPosition={animatedPosition}
        zoom={zoom}
        onRequestOpen={onRequestOpen}
        closeInfoBox={closeInfoBox}
        animationStart={animationStart}
        animationPause={animationPause}
        animationReset={animationReset}
        updateMarker={updateMarker}
        coordsArray={coordsArray}
        counter={counter}
        loadingElement={<div style={{height: `100%`}}/>}
        containerElement={<div style={{height: '100%'}}/>}
        mapElement={<div style={{height: `100%`}}/>}
        onMapMounted={this.onMapMounted}
        onZoomChanged={this.onZoomChanged}
      />
    );

  }
}

export default MapPage;

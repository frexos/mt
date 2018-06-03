import React from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline} from 'react-google-maps';
import {InfoBox} from 'react-google-maps/lib/components/addons/InfoBox';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
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

  const changeSpeed = (event) => {
    props.updateSpeed(event.target.value);
    if (props.running) {
      props.animationPause();
      props.animationResume(event.target.value);
    }
  };

  const markerSize = Math.round(Math.pow(1.5, props.zoom)) > 50 ? 50 : Math.round(Math.pow(1.5, props.zoom));

  let icon = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    scaledSize: new google.maps.Size(markerSize, markerSize),
    anchor: new google.maps.Point(0, markerSize),
  };

  //   SLIDER
  const progressPoint = Math.ceil(props.counter*100/(props.coordsArray.length-2));

  const handleSlider = (value) => {
    props.animationProgress(Math.ceil(value*(props.coordsArray.length-2)/100));
  };

  return (
    <div className="mt-map">
      <div className="mt-map__controls flex-col">
        <div className="flex-row">
          <a className="mt-map__button" href="#" onClick={()=>props.animationStart(props.speed)}>
            <img className="btn-icon" src={require("../images/play_icon.png")}/>
          </a>
          <a className="mt-map__button" href="#" onClick={props.animationPause}>
            <img className="btn-icon" src={require("../images/pause_icon.png")}/>
          </a>
          <a className="mt-map__button--refresh" href="#" onClick={props.animationReset}>
            <img className="btn-icon" src={require("../images/refresh_icon.png")}/>
          </a>
          <select className="mt-map__select" value={props.speed || 1} onChange={changeSpeed}>
            <option value={1000}>Normal (x60)</option>
            <option value={60}>Fast (x1000)</option>
            <option value={1}>Superfast (x60000)</option>
          </select>
        </div>
        <div className="flex-row">
          <Slider min={0} max={100} value={progressPoint} onChange={handleSlider} />
        </div>
        <div className="flex-row">
          <p>{props.counter > -1 ? props.coordsArray[props.counter].timePoint: ''}</p>
        </div>
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
}));

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
    const animationResume = this.props.animationResume;
    const animationProgress = this.props.animationProgress;
    const updateMarker = this.props.updateMarker;
    const updateSpeed = this.props.updateSpeed;
    const coordsArray = this.props.coordsArray;
    const counter = this.props.counter;
    const zoom = this.props.zoom;
    const speed = this.props.speed;
    const running = this.props.running;


    return (
      <MTMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
        waypoints={waypoints}
        infoBoxProps={infoBoxProps}
        animatedPosition={animatedPosition}
        zoom={zoom}
        speed={speed}
        running={running}
        onRequestOpen={onRequestOpen}
        closeInfoBox={closeInfoBox}
        animationStart={animationStart}
        animationPause={animationPause}
        animationReset={animationReset}
        animationResume={animationResume}
        animationProgress={animationProgress}
        updateMarker={updateMarker}
        updateSpeed={updateSpeed}
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

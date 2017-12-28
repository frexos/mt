import React from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

/*
 * returns {ReactElement} markup
 * @param {boolen} showMarker Wheather to render the marker
 * @param {array} whatToRender Array of objects with data we want to render
 * @param {object} position Position of the initial marker
 * @param {function} onMouseOverVessel Callback of mouse over event
 * @param {function} onMouseOutOfVessel Callback of mouse out nativeEvent
 * @param {boolen} showInfo Wheather to render vessels informations
 * @param {string} infoText Information for each position of the vessels
 * @param {function} onMarkerClick Callback for marker click nativeEvent
 * @param {function} handleRightClick Callback for right click event of the map
 */
const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={6}
    defaultCenter={{ lat: 36.368922, lng: 25.125593 }}
  >
    {props.showMarker &&
      <div >
        {props.whatToRender.map((val,idx)=>{
          return(
            <Marker
              key={idx}
              position={{lat:Number(val.pos.LAT),
                lng:Number(val.pos.LON)} }
              onMouseOver ={()=>props.onMouseOverVessel(val.pos)}
              onMouseOut={props.onMouseOutOfVessel}
              onClick = {props.onMarkerClick}
            />
          )
        })}
        {props.showInfo &&
          <span>
            {props.infoText}
          </span>
        }
      </div>
    }
  </GoogleMap>
)

export default MyMapComponent;

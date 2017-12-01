import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import { PositionMarker } from './Marker'

class Map extends PureComponent {

  static propTypes = {
    vesseltracks: PropTypes.array.isRequired,
  }

  // We render a map with each position retrieved as marker on it. 
  render() {
    const { vesseltracks } = this.props

    let vesseltracksCount = vesseltracks.length
    let positionList = []
    positionList = vesseltracks.map(function(position, index) {
        if (vesseltracksCount === index + 1) {
          return (
            <PositionMarker
              key={index}
              lat={position['$'].LAT}
              lng={position['$'].LON}
              position={position['$']}
              last={true}
            />
          )
        } else {
          return (
            <PositionMarker
              key={index}
              lat={position['$'].LAT}
              lng={position['$'].LON}
              position={position['$']}
              last={false}
            />
          )
        }
      })

    return (
      <div style={{width: '100%', height: '600px'}}>
        <GoogleMapReact
          center={{lat: 37.944330, lng: 23.638500}}
          zoom={8}
          scrollwheel='true'
          fullscreenControl='false'
          mapTypeControl='false'
        >
          {positionList}
        </GoogleMapReact>
      </div>
    )
  }

}

export default Map

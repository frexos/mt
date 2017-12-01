import React, { PureComponent } from 'react'
import ApiStore from '../api'
import Map from '../components/VesselTracking/Map'

class VesselTrackingPage extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      mmsi: 240389000,
      vesseltracks: [],
      intervalId: null
    }
  }

  componentDidMount() {
    const { mmsi } = this.state
    let intervalId = setTimeout(this.retrieveVesselTracks(mmsi), 3000)
    this.setState({intervalId})
  }

  componentWillUnmount() {
    clearTimeout(this.state.intervalId)
  }

  // Retrive data for Vessel Tracks using JSON API source.
  retrieveVesselTracks(mmsi) {
    console.log('on')
    ApiStore.getVesselTracks(mmsi).then((vesseltracks) => {
      this.setState({vesseltracks})
    }).catch((error) => {alert(error)})
  }

  // We keep the input in the state.
  handleInput(e) {
    this.setState({mmsi: e.target.value})
  }

  // We use the MMSI input for using it as parameter to the API call.
  handleClick(e) {
    const { mmsi } = this.state
    this.retrieveVesselTracks(mmsi)
  }

  render() {
    const { mmsi, vesseltracks } = this.state

    return (
      <div>
        <p>
          <input type="text" value={mmsi} placeholder="Insert a vessel MMSI number" onChange={(e) => this.handleInput(e)} />
          {' '}
          <button onClick={(e) => this.handleClick(e)}>Get Vessel Tracks</button>
          <br/>
          <small>(MMSI examples: 240389000, 241087000, 237029400)</small>
        </p>
        {Object.keys(vesseltracks).length !== 0 ?
            <Map vesseltracks={vesseltracks}/>
          :
            // Info Text: on not found Vessel Tracks item.
            <p>No vessel tracks retrieved.</p>
        }
      </div>
    )
  }

}

export default (VesselTrackingPage)

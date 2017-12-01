import React, { PureComponent } from 'react'
import moment from 'moment'

export class PositionMarker extends PureComponent {

  // Marker rendering. We take into account the last known position for different styling.
  render() {
    const { position, last } = this.props
    let vesselpositionClass = last ? 'vessel__position vessel__position--last' : 'vessel__position'

    return (
      <div className={vesselpositionClass}>
        <div className="vessel__tooltip">
          <span className="vessel__detail">MMSI: {position.MMSI}</span>
          <span className="vessel__detail">Ship ID: {position.SHIP_ID}</span>
          <span className="vessel__detail">Time: {moment(position.TIMESTAMP).format('DD/MM/YYYY • HH:mm')}</span>
          <span className="vessel__detail">Speed: {position.SPEED}</span>
          <span className="vessel__detail">Course: {position.COURSE}</span>
        </div>
      </div>
    )

  }
}

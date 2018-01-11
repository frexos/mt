import React from 'react';
import { Popup } from 'react-leaflet';
import PopupItem from './PopupItem.js';
import { Status, Time, Speed } from './Calculations.js'

class MyPopup extends React.Component {
	render() {
		return (
			<Popup className='popup'>
				<div>
					<PopupItem title={'Mssi: '} value={this.props.popupInfo.mssi} icon={'Mssi'}/>
					<PopupItem title={'Time: '} value={Time(this.props.popupInfo.timestamp)} icon={'Time'}/>
					<PopupItem title={'Status: '} value={Status(this.props.popupInfo.status)} icon={'Status'}/>
					<PopupItem title={'Speed: '} value={Speed(this.props.popupInfo.speed)} icon={'Velocity'}/>
				</div>
			</Popup>
		)
	}
}
export default MyPopup;

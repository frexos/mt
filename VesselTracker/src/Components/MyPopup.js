import React from 'react';
import { Popup } from 'react-leaflet';
import PopupItem from './PopupItem.js';
import { statusToString, timeFormat, speedMeasureUnit } from './Calculations.js';

class MyPopup extends React.Component {
	render() {
		return (
			<Popup className='popup'>
				<div>
					<PopupItem title={'Mssi: '} value={this.props.popupInfo.mssi} icon={'Mssi'}/>
					<PopupItem title={'Time: '} value={timeFormat(this.props.popupInfo.timestamp)} icon={'Time'}/>
					<PopupItem title={'Status: '} value={statusToString(this.props.popupInfo.status)} icon={'Status'}/>
					<PopupItem title={'Speed: '} value={speedMeasureUnit(this.props.popupInfo.speed)} icon={'Velocity'}/>
				</div>
			</Popup>
		)
	}
}
export default MyPopup;

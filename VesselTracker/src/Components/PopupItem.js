import React from 'react';
import Clock from '../assets/images/popupClock.png';
import Velocity from '../assets/images/popupVelocity.png';
import Vessel from '../assets/images/popupVessel.png';
import Hashtag from '../assets/images/popupHashtag.png';

class PopupItem extends React.Component {
	state = {
		icon: Clock
	}

	componentWillMount() {
		switch(this.props.icon) {
			case 'Velocity':
				this.setState({icon: Velocity});
				break;
			case 'Vessel':
				this.setState({icon: Vessel});
				break;
			case 'Time':
				this.setState({icon: Clock});
				break;
			case 'Mssi':
				this.setState({icon: Hashtag});
				break;	
			default :
				this.setState({icon: Vessel});
		}
	}

	render() {
		return (
			<div className='popupRow'>
				<div className='popupIcon'><img src={this.state.icon} alt='popupIcon'/></div>
				<div className='popupTitle'>{this.props.title}</div>
				<div className='popupValue' title={this.props.value}>{this.props.value}</div>
			</div>
		)
	}
}
export default PopupItem;
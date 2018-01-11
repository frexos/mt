import React from 'react';
import MyMarker from './MyMarker';
import { CircleIcon } from './MarkerIcon';

class Polyline extends React.Component {
	render () {
		const markers = this.props.data.map((x, i) => {
			return (
				<MyMarker key={i} data={this.props.data[i]} icon={CircleIcon}/>
			)
		});
		return (
			<div>
				{markers}
			</div>
		)
	}
}

export default Polyline;
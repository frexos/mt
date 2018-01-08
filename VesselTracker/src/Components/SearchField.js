import React from 'react';

class SearchField extends React.Component {
	render() {
		return (
			<div className='searchField'>
				<label>{this.props.title}</label>
				<input name={this.props.title} onChange={this.props.onchange} value={this.props.value}/>
			</div>
		)
	}
}
export default SearchField;
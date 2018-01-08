import React from 'react';
import SearchField from './SearchField';

class SearchForm extends React.Component {
	// default search form values
	state = {
		Mssi: '255805885',
		Period: 'hourly',
		Days: '1',
		Key: 'cf8f05df0b57bfae43e762cc61fd381239c4c042'
	}

	handleButtonClick = () => {
		const emptyField = this.validateForm();
		emptyField ? this.props.selectedOptions(emptyField) : this.props.selectedOptions(this.state);
	}

	handleOnChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
	}

	// A basic form validation
	// If an empty field exists, function returns field name
	validateForm = () => {
		for(let value in this.state) {
			if(!this.state[value]) {
				return value;
			}
		}
	}

	render() {
		return (
			<div className='searchForm'>
				<SearchField title='Mssi' onchange={this.handleOnChange} value={this.state.Mssi}/>
				<SearchField title='Period' onchange={this.handleOnChange} value={this.state.Period}/>
				<SearchField title='Days' onchange={this.handleOnChange} value={this.state.Days}/>
				<SearchField title='Key' onchange={this.handleOnChange} value={this.state.Key}/>
				<button onClick={this.handleButtonClick}>Search Vessel</button>
			</div>
		)
	}
}
export default SearchForm;
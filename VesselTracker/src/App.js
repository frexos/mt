import React from 'react';
import SearchForm from './Components/SearchForm';
import './App.css';

class App extends React.Component {
	state = {
		error: true,
		errorMessage: ''
	}

	evaluateForm = (formData) => {
		// typeof formData !== 'object' ? getVesselData(formData) : 
	}

	render() {
		return (
			<div className="App">
				<SearchForm selectedOptions={this.evaluateForm}/>
			</div>
		);
	}
}

export default App;

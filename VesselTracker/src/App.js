import React from 'react';
import SearchForm from './Components/SearchForm';
import { apiCall } from './Components/apiCall';
import './App.css';

class App extends React.Component {
	state = {
		data: [],
		error: false,
		errorMessage: ''
	}

	requestInformation = (formData) => {
		apiCall(formData).then((reponse)=> {
			reponse.error ? this.setState({error: true, errorMessage: reponse.errorMessage}) : 
											this.setState({error: false, data : reponse.data})
		});
	}

	render() {
		console.log(this.state)
		return (
			<div className="App">
				<SearchForm selectedOptions={this.requestInformation}/>
			</div>
		);
	}
}

export default App;

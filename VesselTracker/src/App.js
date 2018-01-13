import React from 'react';
import SearchForm from './Components/SearchForm';
import { apiCall } from './Components/apiCall';
import Modal from './Components/Modal';
import MyMap from './Components/MyMap';
import './App.css';


class App extends React.Component {
	state = {
		data: [],
		error: false,
		errorMessage: ''
	}

	requestInformation = (formData) => {
		this.setState({data: []});
		apiCall(formData)
		.then((reponse)=> {
			reponse.error ? this.setState({error: true, errorMessage: reponse.errorMessage}) : 
											this.setState({error: false, data : reponse.data})
		});
	}
	
	closeModal = () => {
		this.setState({error: false, errorMessage:''});
	}

	render() {
		let modal, map;
		this.state.error === true ? modal = <Modal click={this.closeModal} errorMessage={this.state.errorMessage}/> : void(0);
		this.state.data.length ? map = <MyMap data={this.state.data} /> : void(0);
		return (
			<div className="App">
				<SearchForm selectedOptions={this.requestInformation}/>
				{modal}
				{map}
			</div>
		);
	}
}

export default App;
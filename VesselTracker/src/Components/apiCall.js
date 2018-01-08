import axios from 'axios';

// A function that calls marine traffic api via axios 
// *****************************************************************************************************************
// If response is not valid , function returns an error signal and an additional informative error message to parent
// Parent (app.js), will then handle the error and present it in a modal
// An error can occur in 3 ways
// i - data from parent is not an object (a field from search form is missing)
// ii - user does not complete fields with proper/real data (server error desciption is presented)
// iii - user has no internet connection or server is under maintainance (a generic desciption is presented) 
// *****************************************************************************************************************
// If server response is valid organiseVesselInformation function will be called

const apiCall = (data) => {
	if (typeof data !== 'object') {
		this.setState({error: true, errorMessage: data + ' field is missing !!!'})
	} else {
		// url construction based on user choices
		const url = ' http://services.marinetraffic.com/api/exportvesseltrack/' + data.Key + '/v:2/period:'+ data.Period + '/days:'
								+ data.Days +'/mmsi:'+ data.Mssi + '/protocol:json';
		return axios.get(url)
			.then( reponse => {
				if (reponse.data.errors) {
					return {error: true, errorMessage: reponse.data.errors[0].detail};
				} else if (!reponse.data.errors) {
					return {error: false, data: organiseVesselInformation(reponse.data)}
				} 
			})
			.catch( error => {
				return {error: true, errorMessage: 'An error has occured. Please check you internet connection and try again !!!'};
			});
	}
}

// A function that gets a valid server reponse and organises information into an array of objects
// each object represents information about a specific vessel position
const organiseVesselInformation = (vesselData) => {
	let organisedInformation = [];
	for(let value of vesselData) {
		let vesselPerPeriod = {};
		vesselPerPeriod.mssi = value[0];
		vesselPerPeriod.status = value[1];
		vesselPerPeriod.speed = value[2];
		vesselPerPeriod.coords = [Number.parseFloat(value[4]), Number.parseFloat(value[3])]
		vesselPerPeriod.course = value[5];
		vesselPerPeriod.heading = value[6];
		vesselPerPeriod.timestamp = value[7];
		vesselPerPeriod.shipId = value[8];
		organisedInformation.push(vesselPerPeriod);
	}
	return organisedInformation;
}

export { apiCall };
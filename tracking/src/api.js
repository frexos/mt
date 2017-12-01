import xml2js from 'xml2js'

let parser = new xml2js.Parser()
let vesseltracks = []

const ApiStore = {

  getVesselTracks(mmsi = 240389000, days = 1) {
    const API_key = 'cf8f05df0b57bfae43e762cc61fd381239c4c042'
    return new Promise((resolve,reject) => {
      fetch(`http://services.marinetraffic.com/api/exportvesseltrack/${API_key}?mmsi=${mmsi}&days=${days}`, {
        method: 'GET'
      })
      .then(response => response.text())
      .then((response) => {
        // We parse the rensponse from XML to JS Object.
        parser.parseString(response, function (error, result) {
          // We check for possible errors on data retrieval.
          if (result.RESPONSE && result.RESPONSE.STATUS) {
            let responseStatus = result.RESPONSE.STATUS
            if (responseStatus[0].ERROR) {
              let responseErrors = responseStatus[0].ERROR
              let responseError = responseErrors[0]
              reject(responseError['$'].DESCRIPTION)
            }
          }
          // We return the vessel positions dataset and store it to the state.
          vesseltracks = result.VESSELTRACK.POSITION
        })
        resolve(vesseltracks)
      })
      .catch((error) => {reject(error)})

    })
  }

}

export default ApiStore

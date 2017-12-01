const vesseltracks = [
  {'$': {
    MMSI: 240389000,
    LON: 37,
    LAT: 23,
    SPEED: 15
  }},
  {'$': {
    MMSI: 240389000,
    LON: 37,
    LAT: 23,
    SPEED: 20
  }}
]

const ApiStore = {

  getVesselTracks() {
    return new Promise((resolve,reject) => {
      process.nextTick(
        () => vesseltracks ?
            resolve(vesseltracks)
          :
            reject({error: 'No vessel tracks were retrieved.',}),
      )
    })
  }

}

export default ApiStore

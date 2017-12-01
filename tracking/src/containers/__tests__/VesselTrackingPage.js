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

jest.mock('../../api')

import ApiStore from '../../api'

// The list object for a promise must be returned.
it('works with promises, retrieves vessel tracks list', () => {
  expect.objectContaining({
      x: expect.objectContaining(),
      y: expect.objectContaining(),
    })
  return ApiStore.getVesselTracks().then(data => expect(data).toMatchObject(vesseltracks))
})

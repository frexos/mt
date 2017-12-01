import React from 'react'
import {shallow} from 'enzyme'
import Map from '../Map'

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

it('renders without crashing', () => {
  shallow(<Map vesseltracks={vesseltracks} />)
})

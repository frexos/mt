import React from 'react'
import Header from '../components/Header'
import VesselTrackingPage from './VesselTrackingPage'

import './App.css'

const App = () => (
  <div className="App">
    <Header />
    <main>
      <VesselTrackingPage />
    </main>
  </div>
)

export default App;

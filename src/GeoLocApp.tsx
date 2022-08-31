import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { LugaresProvider } from './context/lugares/LugaresProvider';
import { HomePage, Login, Registro } from './screens';
import { MapProvider } from './context/mapa/MapaProvider';
import './styles.css'

export const GeoLocApp = () => {

  const [user, setUser] = useState(null)

  return (
    <LugaresProvider>
      <MapProvider>
        <Router>
          <Routes>
            <Route path='/registro' element={<Registro />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={user ? <HomePage /> : <Navigate to='/login' />} />
          </Routes>
        </Router>
      </MapProvider>
    </LugaresProvider>
  )
}

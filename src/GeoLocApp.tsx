import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { LugaresProvider } from './context/lugares/LugaresProvider';
import { HomePage, Login, Registro } from './screens';
import { MapProvider } from './context/mapa/MapaProvider';
import './styles.css'
import { LoginProvider } from './context/login/LoginProvider';
//import { LoginContext } from './context/login/LoginContext';

export const GeoLocApp = () => {
  return (
    <Router>
      <LoginProvider>
        <LugaresProvider>
          <MapProvider>
            <Routes>
              <Route path='/registro' element={<Registro />} />
              <Route path='/' element={<Login />} />
              <Route path='/mapa' element={ <HomePage /> } />
            </Routes>
          </MapProvider>
        </LugaresProvider>
      </LoginProvider>
    </Router>
  )
}

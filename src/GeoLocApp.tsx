import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { LugaresProvider } from './context/lugares/LugaresProvider';
import { HomePage, Login, Registro } from './screens';
import { MapProvider } from './context/mapa/MapaProvider';
import './styles.css'
import { LoginProvider } from './context/login/LoginProvider';
//import { LoginContext } from './context/login/LoginContext';

export const GeoLocApp = () => {

  //const { user } = useContext(LoginContext)
  //console.log('USER -> ', user)

  const [user, setUser] = useState({nombre: 'Emilio'})

  return (
    <Router>
      <LoginProvider>
        <LugaresProvider>
          <MapProvider>
            <Routes>
              <Route path='/registro' element={<Registro />} />
              <Route path='/login' element={<Login />} />
              <Route path='/' element={user ? <HomePage /> : <Navigate to='/login' />} />
            </Routes>
          </MapProvider>
        </LugaresProvider>
      </LoginProvider>
    </Router>
  )
}

import React from 'react'

import { LugaresProvider } from './context/lugares/LugaresProvider';
import { HomePage } from './screens';
import { MapProvider } from './context/mapa/MapaProvider';
import './styles.css'

export const GeoLocApp = () => {
  return (
    <LugaresProvider>
      <MapProvider>
          <HomePage />
      </MapProvider>
    </LugaresProvider>
  )
}

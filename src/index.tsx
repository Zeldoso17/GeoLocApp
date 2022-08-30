import React from 'react';
import ReactDOM from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import { GeoLocApp } from './GeoLocApp'
import './index.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiemVsZG9zbzE3IiwiYSI6ImNsNnZnejRkYjA5OXMzZHBnb280a2FrMW8ifQ.doU1mwipKBsRmjw6RBDdIw';

if( !navigator.geolocation ) {
  alert('Tu navegador no tiene acceso de Geolocalización')
  throw new Error('Tu navegador no tiene acceso de Geolocalización')
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GeoLocApp />
  </React.StrictMode>
);


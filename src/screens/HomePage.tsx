import React from 'react'
import { BtnMyLocation, MapView, SearchBar, SearchButton } from '../components';

export const HomePage = () => {
  return (
    <div>
        <MapView />
        <BtnMyLocation />
        <SearchBar placeholder="Buscar Lugares (ej. Farmacias)" class="search-container" />
        <SearchBar placeholder="Radio de búsqueda (metros)" class="radio-container" />
        <SearchButton />
    </div>
  )
}
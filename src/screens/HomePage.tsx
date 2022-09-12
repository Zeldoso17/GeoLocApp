import React from 'react'
import { BtnMyLocation, MapView, SearchBar, SearchButton, LogoutButton } from '../components';

export const HomePage = () => {

  const token = localStorage.getItem('token')

  return (
    <div>
        <MapView />
        <BtnMyLocation />
        <SearchBar placeholder="Buscar Lugares (ej. Farmacias)" class="search-container" />
        <SearchBar placeholder="Radio de búsqueda (metros)" class="radio-container" />
        <SearchButton />
        {token && <LogoutButton />}
    </div>
  )
}
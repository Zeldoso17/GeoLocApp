import React from 'react'
import { RegisterPlaceButton, AdvancedSearchButton, BtnMyLocation, MapView, SearchBar, SearchButton, LogoutButton } from '../components';

export const HomePage = () => {

  const token = localStorage.getItem('token')
  const isEmpresa = localStorage.getItem('isEmpresa')

  return (
    <div>
        <MapView />
        <BtnMyLocation />
        <SearchBar placeholder="Buscar Lugares (ej. Farmacias)" class="search-container" />
        <SearchBar placeholder="Radio de búsqueda (metros)" class="radio-container" />
        <SearchButton />
        <AdvancedSearchButton />
        {isEmpresa === 'true' && <RegisterPlaceButton />}
        {token && <LogoutButton />}
    </div>
  )
}
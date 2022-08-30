import React, { useContext } from 'react'
import { LugaresContext } from '../context'

export const SearchButton = () => {

  const { busqueda, rango, searchLugaresByQuery } = useContext(LugaresContext)

    const onClick = () => {
        searchLugaresByQuery( busqueda, rango )
    }

  return (
    <button className='btn btn-primary' onClick={ onClick }
        style={{
            position: 'fixed', 
            top: '25px', 
            left: '470px', 
            zIndex: 999,
            width: '100px',
        }}>
        Buscar
    </button>
  )
}

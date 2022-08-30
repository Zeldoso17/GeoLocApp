import React, { ChangeEvent, useContext } from 'react'
import { LugaresContext } from '../context/';

// Aqui creamos un type donde declaramos las props que utilizaremos
type Props = {
  placeholder: string,
  class: string
}

export const SearchBar = (props: Props) => {

  const { setBusqueda, setRango } = useContext(LugaresContext)

  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (props.class === 'search-container') {
      setBusqueda(event.target.value)
      return
    }
    setRango( event.target.value )
  }


  return (
    <div className={props.class}>
      <input type="text" className='form-control' placeholder={props.placeholder} onChange={onQueryChange} />
    </div>
  )
}

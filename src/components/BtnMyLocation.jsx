import React, { useContext } from 'react'
import { LugaresContext, MapaContext } from '../context'

export const BtnMyLocation = () => {

    // Aqui usamos el contexto del mapa para obtener sus atributos
    const { map, isMapReady } = useContext( MapaContext )
    // Aquí usamos el contexto de Lugares para obtener sus atributos
    const { userLocation } = useContext( LugaresContext )

    /*
        Creamos una función llamada onClick para poder irnos a las coordenadas del usuario
        si el usuario esta en otro lado y no encuentra su ubicación
    */
    const onClick = () => {
        // Validamos que el mapa esté listo
        if ( !isMapReady ) throw new Error('El mapa no está listo');

        // Validamos que el usuario haya dado su ubicación
        if ( !userLocation ) throw new Error('No hay ubicación de usuario');

        userLocation.reverse().join(',')

        // Hacemos que al presionar el botón se vaya automaticamente a la ubicación del usuario
        map.flyTo({
            zoom: 14, // Establecemos el Zoom del mapa a 14
            center: userLocation // Esteblecemos que el centro será la ubicación del usuario
        })
        userLocation.reverse().join(',')
    }

  return (
    <button className='btn btn-primary' onClick={ onClick } 
        style={{position: 'fixed', top: '20px', right: '20px', zIndex: 999}}>
        Mi Ubicación
    </button>
  )
}

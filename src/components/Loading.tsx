import React from 'react'

// Aquí creamos un pequeño componente para mostrar un carga hasta se obtenga la ubicación del usuario
export const Loading = () => {
  return (
    <div className="loading-map d-flex justify-content-center align-items-center">
        <div className='text-center'>
            <h3>Espere por favor</h3>
            <span>Localizando...</span>
        </div>
    </div>
  )
}

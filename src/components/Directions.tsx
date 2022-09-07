import React, { useContext } from 'react'
import { MapaContext } from '../context'

import './css/Directions.css'

type Props = {
    distancia: number,
    tiempo: number,
}

export const Directions = (props: Props) => {
    const { distancia, tiempo } = props;

    const { direcciones } = useContext(MapaContext)

    return (
        <>
            <div className="direcciones-container">
                <div className="distance-time">
                    <div className="distance">
                        <span className='texto'>Distancia</span>
                        <p className='numero'> {distancia} km</p>
                    </div>
                    <div className="time">
                        <span className='texto'>Tiempo</span>
                        <p className='numero'>{tiempo} min</p>
                    </div>
                </div>
                {direcciones.map((direccion, index) => <p className='directions' key={index}>{direccion}</p>)}
            </div>
        </>
    )
}
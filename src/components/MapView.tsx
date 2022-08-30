import React, { useContext, useRef, useLayoutEffect } from "react";

import mapboxgl from 'mapbox-gl';

import { LugaresContext, MapaContext } from '../context';
import { Loading } from "./";

export const MapView = () => {

    // Usamos el contexto que creamos "LugaresContext"
    const { isLoading, userLocation } = useContext(LugaresContext);

    // Aquí usamos el contexro del Mapa
    const { setMap } = useContext(MapaContext);
    
    /*
        Aqui creamos una referencia del contenedor del mapa 
        para no tener que volverlo a renderizar cada vez que lo necesitemos
    */
    const mapDiv = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!isLoading) {
            const map = new mapboxgl.Map({
                container: mapDiv.current!, // Accedemos a la referencia del mapa
                style: 'mapbox://styles/mapbox/outdoors-v11', // URL del estilo del mapa
                center: userLocation, // Establecemos que el centro será la ubicación del usuario
                zoom: 14, // Establecemos el zoom en 14
            });
            /* Aquí establecemos que el mapa ya se ha cargado */
            setMap( map )
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ isLoading ])
            
    if( isLoading ) {
        return ( <Loading /> )
    }
 
    return (
        <div ref={ mapDiv } // Aquí usamos esa referncia del mapa
            style={{
                //backgroundColor: 'red',
                height: '100vh',
                left: 0,
                position: 'fixed',
                top: 0,
                width: '100vw',
            }}
        >
        </div>
    )
}
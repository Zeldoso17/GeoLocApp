import { createContext } from 'react';
import { Map } from 'mapbox-gl'

// Aquí creamos una interfaz para poder saber que datos necesitaremos
interface MapContextProps {
    isMapReady: boolean
    map?: Map
    direcciones: Array<string>
    lugar: Array<Object>

    setMap: (map: Map) => void
    obtenerRuta: (start: [number, number], end: [number, number]) => Promise<void>
}

// Aquí se crea el Contexto, partiendo de la interfaz anterior y se exporta
export const MapaContext = createContext({} as MapContextProps );
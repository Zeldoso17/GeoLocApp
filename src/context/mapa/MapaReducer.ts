import { MapState } from "./MapaProvider";
import { Map, Marker } from 'mapbox-gl';

// Aquí creamos un type para saber que tipo de acciones haremos
type MapAction = 
| { type: 'setMap', payload: Map }
| { type: 'setMarkers', payload: Marker[] }
| { type: 'setDirections', payload: Array<string> }

// Aquí se crea la función pura, pasandole el estado y la acción a ejecutar
// Le ponemos que es de tipo LugaresState, para que se retorne un objeto igual
export const mapReducer = ( state:MapState, action: MapAction ): MapState => {
    // Aquí estamos viendo que accion se produjo
    switch (action.type) {
        case 'setMap':
            return {
                ...state, // Obtenemos todo lo que este en el state
                isMapReady: true, // Aqui establecemos en true mientras el mapa esta cargando
                map: action.payload // Estamos guardando la instancia del mapa en 'map'
            }
        case 'setMarkers':
            return {
                ...state, // Obtenemos todo lo que este en el state
                markers: action.payload // Estamos guardando todos los marcadores en un array del state
            }
        case 'setDirections':
            return {
                ...state,
                direcciones: action.payload
            }
        
        default:
            return state; // Se retorna el state como se encuentra en ese momento
    }
}
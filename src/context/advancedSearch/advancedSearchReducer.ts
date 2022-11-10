import { Marker } from 'mapbox-gl'

import { Lugares } from '../../interfaces/lugares';
import { AdvancedSearchState } from './advancedSearchProvider';

// Aquí creamos un type para saber que tipo de acciones haremos
type AdvancedSearchAction =
    | { type: 'setLoadingPlaces' }
    | { type: 'setPlaces', payload: Lugares[] }
    | { type: 'setMarkers', payload: Marker[] }

// Aquí se crea la función pura, pasandole el estado y la acción a ejecutar
// Le ponemos que es de tipo LugaresState, para que se retorne un objeto igual
export const AdvancedSearchReducer = (state: AdvancedSearchState, action: AdvancedSearchAction): AdvancedSearchState => {
    // Aquí estamos viendo que accion se produjo
    switch (action.type) {
        case 'setLoadingPlaces':
            return {
                ...state, // Obtenemos todo lo que este en el state
                isLoadingLugares: true, // Aqui establecemos en true mientras se obtienen los lugares
                lugares: [] // creamos el arreglo para guardar los lugares
            }
        case 'setPlaces':
            return {
                ...state, // Obtenemos todo lo que este en el state
                isLoadingLugares: false, // Aqui establecemos en true una vez que se obtuvieron todos los lugares
                lugares: action.payload // Estamos guardando los lugares obtenidos dentro del arreglo de lugares
            }
        case 'setMarkers':
            return {
                ...state, // Obtenemos todo lo que este en el state
                markers: action.payload // Estamos guardando los lugares obtenidos dentro del arreglo de lugares
            }
        default:
            return state // Se retorna el state como se encuentra en ese momento
    }
}
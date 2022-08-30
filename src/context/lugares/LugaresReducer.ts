import { Lugares } from '../../interfaces/lugares';
import { LugaresState } from './LugaresProvider';

// Aquí creamos un type para saber que tipo de acciones haremos
type LugaresAction =
    | { type: 'setUserLocation', payload: [number, number] }
    | { type: 'setLoadingPlaces' }
    | { type: 'setPlaces', payload: Lugares[] }
    | { type: 'setBusqueda', payload: string }
    | { type: 'setRango', payload: string }

// Aquí se crea la función pura, pasandole el estado y la acción a ejecutar
// Le ponemos que es de tipo LugaresState, para que se retorne un objeto igual
export const lugaresReducer = (state: LugaresState, action: LugaresAction): LugaresState => {
    // Aquí estamos viendo que accion se produjo
    switch (action.type) {
        case 'setUserLocation':
            return {
                ...state, // Obtenemos todo lo que este en el state
                isLoading: false, // Aqui establecemos en false una vez que se obtuvo la ubicación del usuario
                userLocation: action.payload // Estamos poniendo las coordenadas en userLocation
            }
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
        case 'setBusqueda':
            return {
                ...state,
                busqueda: action.payload
            }
        case 'setRango':
            return {
                ...state,
                rango: action.payload
            }
        default:
            return state // Se retorna el state como se encuentra en ese momento
    }
}
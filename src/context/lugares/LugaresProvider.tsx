import React, { useReducer, useEffect } from 'react';
import { LugaresContext } from './LugaresContext';
import { lugaresReducer } from './LugaresReducer';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { obtenerUbicacionUsuario } from '../../helpers';
import { searchApi } from '../../apis';
import { PlacesResponse, Lugares } from '../../interfaces/lugares';

// Interfaz para saber que información es la que necesitamos
export interface LugaresState {
    isLoading: boolean;
    userLocation?: [number, number];
    isLoadingLugares: boolean;
    lugares: Lugares[]
    busqueda: string,
    rango: string
}

// Estado inicial de la aplicación
const INITIAL_STATE: LugaresState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingLugares: false,
    lugares: [],
    busqueda: "",
    rango: "",
}

// Esta interfaz es para decirle al children que sera de tipo JSX.Element
interface Props {
    children: JSX.Element | JSX.Element[]
}

export const LugaresProvider = ({ children }: Props) => {

    // Aquí usamos el reducer que se creo en el archivo lugaresReducer
    const [state, dispatch] = useReducer(lugaresReducer, INITIAL_STATE)

    useEffect(() => {
        // Ejecutamos la función que esta en el helper que nos ayuda a obtener la ubicación del usuario
        obtenerUbicacionUsuario()
            // Aquí resolvemos la promesa que se retorno en la función anterior
            .then(lngLat => dispatch({ type: 'setUserLocation', payload: lngLat }))
    }, []);


    const searchLugaresByQuery = async (query: string, rango: string): Promise<Lugares[]> => {
        if (query.length === 0) return []; // Todo: Limpiar state

        /* Validamos que haya ubicación del usuario */
        if (!state.userLocation) throw new Error('No hay ubicación del usuario')

        // Disparamos el evento setLoadingPlaces para establecer que se cargaran los lugares
        dispatch({ type: 'setLoadingPlaces' })

        /* se invirten el arreglo para poder mandar las coordenadas como se necesitan en el Backend */
        let coords = state.userLocation.reverse().join(",")

        console.log("COORDS -> ", coords)

        /* Hacemos la petición al backend */
        searchApi.get<PlacesResponse>(`/api/getPlaces/${query}`, {
            /* Establecemos los paraemtros */
            params: {
                proximity: coords, // establecemos la ubicación del usuario
                metros: rango // Establecemos a cuantos metros a su alrededor desea buscar
            },
            headers: {
                Authorization: 'Token 8d9c4223baa9d5ed6e672a9e3e006a503bfdf3bc' // Establecemos el Token de autenticación
            },
        })
            /* Disparamos el evento setPlaces para guardar los lugares en el state */
            .then(response => { dispatch({ type: 'setPlaces', payload: response.data.lugares }) })
            .catch(() => {
                toast.error('No se encontró ningun lugar cerca de ti', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            })
            coords = state.userLocation.reverse().join(",")
        return []
    }

    const setBusqueda = ( query: string ): string => {

        dispatch({ type: 'setBusqueda', payload: query })
        return query
    }

    const setRango = ( rango: string ): string => {

        dispatch({ type: 'setRango', payload: rango })
        return rango
    }


    return (
        // Aquí hacemos uso del contexto del archivo LugaresContext
        // y le pasamos el valor que tenga el state del reducer
        <LugaresContext.Provider value={{
            ...state,
            searchLugaresByQuery,
            setBusqueda,
            setRango
        }}>
            {children}
            <ToastContainer />
        </LugaresContext.Provider>
    )
}

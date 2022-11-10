import React, { useReducer, useContext, useEffect } from 'react'

import { Marker, Map, Popup } from 'mapbox-gl'

import { Lugares, PlacesResponse } from '../../interfaces/lugares'
import { AdvancedSearchReducer } from './advancedSearchReducer';
import { LugaresContext } from '../lugares/LugaresContext'
import { searchSpecificPlaceApi } from '../../apis'
import { AdvancedSearchContext } from './advancedSearchContext';

export interface AdvancedSearchState {
    isLoading: boolean;
    isLoadingLugares: boolean;
    map?: Map,
    markers: Marker[],
    lugares: Lugares[];
    data: Object
}

// Estado inicial de la aplicación
const INITIAL_STATE: AdvancedSearchState = {
    isLoading: true,
    isLoadingLugares: false,
    map: undefined,
    markers: [],
    lugares: [],
    data: {}

}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const AdvancedSearchProvider = ({ children }: Props ) => {

    const [state, dispatch] = useReducer(AdvancedSearchReducer, INITIAL_STATE)

    //const { userLocation } = useContext(LugaresContext)
    //const { lugares } = useContext(AdvancedSearchContext)

    const searchLugares = async ( data: Lugares ): Promise<Lugares[]> => {

        console.log('HOLISSSS')

        //if (!userLocation) throw new Error('No hay ubicación del usuario')

        if ( Object.keys(data).length === 0 ) return []

        dispatch({ type: 'setLoadingPlaces' })

        const Token = localStorage.getItem('token')
        searchSpecificPlaceApi.get<PlacesResponse>('/api/getPlace/', { params: data, headers: { Authorization: `Token ${Token}` } })
        .then(response => {
            console.log('SET PLACES')
            dispatch({ type: 'setPlaces', payload: response.data.lugares })
        })
        


        return [];
    }

    return (
        <AdvancedSearchContext.Provider value={{
            ...state,
            searchLugares,
        }}>
            { children }
        </AdvancedSearchContext.Provider>
    )

}
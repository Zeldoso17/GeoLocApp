import React, { useState, useEffect, useReducer, useContext } from 'react'
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl'

import { MapaContext } from './MapaContext'
import { mapReducer } from './MapaReducer'
import { LugaresContext } from '../lugares/LugaresContext';
import { directionsApi, searchLugarApi } from '../../apis';
import { DirectionsResponse } from '../../interfaces/direcciones';
import { Lugares } from '../../interfaces/lugares';
import { Directions } from '../../components/Directions';
import { Button } from 'react-bootstrap'
import '../../components/css/Directions.css'
import { LocalResponse } from '../../interfaces/local';
import { ModalInfo } from '../../components'

// Interfaz para saber que información es la que necesitamos
export interface MapState {
    isMapReady: boolean;
    map?: Map;
    markers: Marker[];
    direcciones: Array<string>;
    lugar: Lugares[];
}

// Estado inicial de la aplicación
const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: [],
    direcciones: [],
    lugar: [],
}

// Esta interfaz es para decirle al children que sera de tipo JSX.Element
interface Props {
    children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {

    // Aquí usamos el reducer que se creo en el archivo MapReducer
    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

    const { lugares, userLocation } = useContext(LugaresContext);

    const [isRoute, setIsRoute] = useState(false)
    const [kms, setKms] = useState(0)
    const [mins, setMins] = useState(0)
    const [isInfo, setIsInfo] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [id, setId] = useState('')
    const [placeData, setPlaceData] = useState<LocalResponse[]>([]);

    let direcciones: Array<string> = [];

    const isModal = localStorage.getItem("isModal");

    const getRoute = (lugar: Lugares) => {
        if (!userLocation) return; // Validamos que tengamos la ubicación del usuario
        const longitud = parseFloat(lugar.Longitud); // obtenemos la longitud a partir de la interfaz creada
        const latitud = parseFloat(lugar.Latitud); // Obtenemos la Latitud a partir de la interfaz creada
        
        //userLocation.reverse().join(',') // Volteamos el arreglo, para obtener lo siguiente [ longitud, latitud ]
        console.log('User Location', userLocation)

        obtenerRuta(userLocation, [longitud, latitud]); // Hacemos la petición al api
        /*
            Volvemos a voltear el arreglo para obtener [ latitud, longitud ]
            para que cuando se vuelva a dar clic a un marcador
            se vuelva a invertir de tipo [ longitud, latitud ]
        */
        //userLocation.reverse().join(',')
    }

    const getPlaceInfo = async ( id: string ) => {
        const Token = localStorage.getItem('token')
        const respuesta = await searchLugarApi.get<LocalResponse[]>(`/api/getPlaceInfo/${id}`, {
            headers: {
                Authorization: `Token ${Token}` // Establecemos el Token de autenticación
            },
        });
        console.log(respuesta.data)
        setIsInfo(true)
        setShowModal(true)
        setPlaceData(respuesta.data)

        console.log("setIsInfo -> ", isInfo)
    }

    useEffect(() => {
        // Borramos todos los marcadores que tenga el array del state
        state.markers.forEach(marker => marker.remove());
        const newMarkers: Marker[] = []; // Creamos el array para guardar los marcadores

        // Recorremos los lugares que tenemos en el "LugaresContext"
        lugares.forEach(lugar => {
            const latitude = parseFloat(lugar.Latitud); // parseamos a Float la latitud que viene del backend
            const longitud = parseFloat(lugar.Longitud); // parseamos a Float la longitud que viene del backend
            const popup = new Popup() // creamos un popup para cada marcador
                .setHTML(`
                    <h6>${lugar.Nombre}</h6>
                    <p>Longitud ${lugar.Longitud}</p>
                    <p>Latitud ${lugar.Latitud}</p>
                `)
            // creamos un maracdor para cada lugar encontrado
            const newMarker = new Marker({
                color: 'red'
            })
            newMarker
                .setPopup(popup) // agregamos el popup
                .setLngLat([longitud, latitude]) // agregamos la longitud y la latitude
                .addTo(state.map!) // lo agregamos al mapa
                .getElement().addEventListener('click', () => { // Agregamos un evento clic para cada marcador
                    // Logica para mostar la ruta
                    setId(lugar.Id)
                    getRoute(lugar);
                })


            newMarkers.push(newMarker) // Agregamos cada marcador creado al arreglo newMarkers

        })

        // Todo: limpiar polyline

        dispatch({ type: 'setMarkers', payload: newMarkers });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lugares])


    // Creamos una función que recibe un parametro de tipo Map de mapbox
    const setMap = (map: Map) => {

        // Aquí se creó el popup para mostrar mensaje en el marcador
        const myLocationPopup = new Popup()
            .setHTML(`
                <h4>Estas aquí</h4>
                <p>Esta es tu ubicación</p>
            `)

        // Estamos colocando un marcador en la coordenadas del usuario
        new Marker({
            color: '#61DAFB'
        })
            .setPopup(myLocationPopup)
            .setLngLat(map.getCenter())
            .addTo(map)

        // Aquí disparamos la acción 'setMap' que tenemos en el MapReducer
        dispatch({ type: 'setMap', payload: map })
    }

    const obtenerRuta = async (start: [number, number], end: [number, number]) => {
        // Hacemos la petición al api de mapbox
        const respuesta = await directionsApi.get<DirectionsResponse>(`/${start};${end}`);
        // Desestructuramos las rutas de la respuesta
        const { distance, duration, geometry, legs } = respuesta.data.routes[0];
        const { coordinates: coords } = geometry // Obtenemos las coordenadas del geometry, para pintar la Ruta

        /*
            Obtenemos la distancia en kilometros que hay desde
            la ubicacion del usuario hasta el
            lugar donde quiere ir
        */
        let kms = distance / 1000;
        kms = Math.round(kms * 100);
        kms /= 100;
        setKms(kms)

        /*
            Obtenemos el tiempo en minutos que hay desde
            la ubicacion del usuario hasta el
            lugar donde quiere ir
        */
        const minutos = Math.floor(duration / 60);
        console.log({ kms, minutos })
        setMins(minutos)

        //setSteps( legs[0].steps )
        direcciones = []
        legs[0].steps.forEach(step => {
            direcciones.push(step.maneuver.instruction)
        })

        console.log( direcciones )

        dispatch({ type: 'setDirections', payload: direcciones })
        
        setIsRoute(true)

        /*
            Creamos el plano donde vamos a pintar
            la ruta
        */
        const bounds = new LngLatBounds(
            start,
            start
        );

        /*
            Se recorren todas las coordenadas obtenidas en el 
            geometry, se guarda en una constante y se añade al
            plano
        */
        for (const coord of coords) {
            const newCoord: [number, number] = [coord[0], coord[1]];
            bounds.extend(newCoord);
        }

        // Aquí le damos un padding al mapa, para que se vean los 2 puntos involucrados
        state.map?.fitBounds(bounds, {
            padding: 200
        });

        // Creamos la ruta a mostrar
        const sourceData: AnySourceData = {
            type: 'geojson', // Le decimos que la ruta será de tipo geojson (Es el tipo que elegimos en la pagina de mapbox)
            data: {
                type: 'FeatureCollection', // Le decimos que la data es de tipo colección de lugares (un arreglo -> [] )
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString', // Este es el tipo de línea a mostrar
                            coordinates: coords // Estas son las coordenadas que obtuvimos del llamado a la api

                        }
                    }
                ]
            }
        }

        /*
            Vemos si existe un Layer(Capa) llamada RouteString(Es el nombre que se le dio, se puede llamar de cualquier manera)
        */
        if (state.map?.getLayer('RouteString')) {
            /*
                Removemos el Layer y el Source para poder pintar otra ruta
            */
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
        }

        state.map?.addSource('RouteString', sourceData) // Agregamos el Source al map

        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                'line-color': 'black', // Le decimos el color que tendrá la linea de la ruta
                'line-width': 3 // Le decimos el ancho que tendrá la línea
            }
        })

    }


    return (
        // Aquí hacemos uso del contexto del archivo MapaContext
        // y le pasamos el valor que tenga el state del reducer
        <div>
            <MapaContext.Provider value={{
                ...state,
                setMap,
                obtenerRuta,
            }}>
                {children}
                { isRoute && <Directions distancia={kms} tiempo={mins} /> }
                { isRoute && <Button className='more-info' type="button" onClick={() => getPlaceInfo(id) }>Mas información</Button> }
                { isInfo && <ModalInfo info={placeData} showModal={showModal} setShowModal={setShowModal} />}
                { /*isModal && <ModalInfo info={placeData} showModal={showModal} setShowModal={setShowModal} />*/ }
            </MapaContext.Provider>
        </div>
    )
}
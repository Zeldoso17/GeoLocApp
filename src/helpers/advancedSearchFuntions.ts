import { Map, Marker, Popup } from 'mapbox-gl'

import { LocalResponse } from '../interfaces/local';

export const createMarkerAndPopup = (dataPlaces: LocalResponse[], map: Map): Array<string> => {
    const newMarkers: Marker[] = [] // Creamos el array para guardar los marcadores
    //newMarkers.splice(0, newMarkers.length)
    console.log('ANTES DEL FOREACH :V, NEW MARKERS -> ', newMarkers)
    newMarkers.forEach( marker => {
        console.log('ANTES DEL REMOVE :V ')
        marker.remove()
        console.log('DESPUES DEL REMOVE :V ')
    })
    console.log('NewMarkers -> ', newMarkers)
    console.log('dataPlaces -> ', dataPlaces)
    dataPlaces.forEach((lugar: LocalResponse) => {
        const latitude = parseFloat(lugar.Latitud) // parseamos a Float la latitud que viene del backend
        const longitud = parseFloat(lugar.Longitud) // parseamos a Float la longitud que viene del backend
        const popup = new Popup() // creamos un popup para cada marcador
            .setHTML(`
                <h6>${lugar.Nombre}</h6>
                <p>Longitud ${lugar.Longitud}</p>
                <p>Latitud ${lugar.Latitud}</p>
                <p>${lugar.Clase_actividad}</p>
            `)
        // creamos un maracdor para cada lugar encontrado
        const newMarker = new Marker({
            color: 'red'
        })
        newMarker
            .setPopup(popup) // agregamos el popup
            .setLngLat([longitud, latitude]) // agregamos la longitud y la latitude
            .addTo(map) // lo agregamos al mapa
            .getElement().addEventListener('click', () => { // Agregamos un evento clic para cada marcador
                // Logica para mostar la ruta
                console.log('le di clic jejeje')
            })
        console.log('NewMarker -> ', newMarker)
        console.log('ANTES DEL PUSH')
        newMarkers.push(newMarker); // Agregamos cada marcador creado al arreglo newMarkers
        console.log('Markers jeje -> ', newMarkers)
    })
    return []
}
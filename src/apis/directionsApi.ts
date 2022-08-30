import axios from "axios";

const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: true,
        geometries: 'geojson',
        language: 'es',
        overview: 'simplified',
        steps: true,
        access_token: 'pk.eyJ1IjoiemVsZG9zbzE3IiwiYSI6ImNsNnZnejRkYjA5OXMzZHBnb280a2FrMW8ifQ.doU1mwipKBsRmjw6RBDdIw'
    }
})

export default directionsApi
import { AnySourceData, Map, Marker, Popup } from 'mapbox-gl'


import { ModalInfo } from '../components';
import { LocalResponseBD } from '../interfaces/local';


export const createMarkerAndPopup = (dataPlaces: LocalResponseBD[], map: Map): Array<string> => {

    /*
    const [placeData, setPlaceData] = useState<LocalResponseBD[]>([]);
    const [id, SetId] = useState('');
    const [isInfo, setIsInfo] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const getPlaceInfo = async ( id: string ) => {
        const Token = localStorage.getItem('token')
        const respuesta = await searchLugarApi.get<LocalResponseBD[]>(`/api/getPlaceInfo/${id}`, {
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
    */
    console.log("Estoy en el createMarkerAndPopup -> ", dataPlaces)
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
    dataPlaces.forEach(lugar => {
        const latitude = parseFloat(lugar.Latitud) // parseamos a Float la latitud que viene del backend
        const longitud = parseFloat(lugar.Longitud) // parseamos a Float la longitud que viene del backend
        const popup = new Popup() // creamos un popup para cada marcador
            .setHTML(`
                <h4 class="Title">${lugar.Nombre}</h4>
                <h6><b>Calle: </b> ${lugar.Calle}</h6>
                <h6><b>Colonia: </b> ${lugar.Colonia}</h6>
                <h6><b>Correo: </b> ${lugar.Correo_e} <h6>
                <h6><b>Sitio de internet: </b> ${lugar.Sitio_internet}</h6>
                <h6><b>Telefono: </b> ${lugar.Telefono}</h6>
                <h6><b>Ubicación: </b> ${lugar.Ubicacion}</h6>
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
                /*SetId(lugar.id)
                getPlaceInfo(id)
                return <ModalInfo info={lugar} showModal={showModal} setShowModal={setShowModal} />*/
                localStorage.setItem("isModal", "true")
            })
        console.log('NewMarker -> ', newMarker)
        console.log('ANTES DEL PUSH')
        newMarkers.push(newMarker); // Agregamos cada marcador creado al arreglo newMarkers
        console.log('Markers jeje -> ', newMarkers)
    })
    return []
}


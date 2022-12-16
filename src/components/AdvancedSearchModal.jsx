import React, { useState, useContext } from 'react'

import { Marker, Popup } from 'mapbox-gl'
import { Modal, Form, ButtonGroup, Button } from 'react-bootstrap'

import { searchSpecificPlaceApi } from '../apis'
import { MapaContext, AdvancedSearchContext } from '../context'
import { createMarkerAndPopup } from '../helpers/'

import './css/AdvancedSearch.css'


export const AdvancedSearchModal = (props) => {

    const { showModal, setShowModal, data } = props;

    const closeModal = () => {
        setShowModal(false);
        setDataSearch(initialData())
    }

    const [dataSearch, setDataSearch] = useState(initialData());

    const [dataPlaces, setDataPlaces] = useState([])

    const { map } = useContext(MapaContext)
    //const { searchLugares, lugares } = useContext(AdvancedSearchContext)

    const searchPlace = async () => {
        const Token = localStorage.getItem('token')
        await searchSpecificPlaceApi.get('/api/getPlace/', { params: dataSearch, headers: { Authorization: `Token ${Token}` } })
        .then( response => {
            console.log("Respuesta -> ", response)
            setDataPlaces(() => response.data.data)
            console.log("DATINGA -> ", response.data.data)
        })
    }
 
    const buscar = () => {
        console.log('Buscando....')
        validarObjeto(dataSearch)
        console.log("Data Search -> ", dataSearch)
        searchPlace()
        console.log("DATA -> ", dataPlaces);
        createMarkerAndPopup( dataPlaces, map )
        console.log('jejeje')
        setShowModal(false);
        setDataSearch(initialData())
        console.log("DATA 2 -> ", dataPlaces);
    }

    const handleChange = (event) => {
        setDataSearch({ ...dataSearch, [event.target.name]: event.target.value });
    }
    
    return (
        <>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title><h3>Búsqueda Avanzada</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body className="bodyModal">
                    <Form className="form">
                        <Form.Group>
                            <Form.Label>Nombre: </Form.Label>
                            <Form.Control onChange={handleChange} name="Nombre" type="text" placeholder="Ingresa el nombre del lugar a buscar" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Clase de Actividad: </Form.Label>
                            <Form.Select onChange={handleChange} name="Clase_actividad">
                                <option hidden={true}>Selecciona una opción</option>
                                {
                                    data[0].map((opt, key) => {
                                        return(
                                            <option key={key} value={opt.Clase_actividad}>{opt.Clase_actividad}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Calle: </Form.Label>
                            <Form.Control onChange={handleChange} name="Calle" type="text" placeholder="Ingresa el nombre de la calle" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Colonia: </Form.Label>
                            <Form.Control onChange={handleChange} name="Colonia" type="text" placeholder="Ingresa el nombre de la colonia" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Código Postal: </Form.Label>
                            <Form.Control onChange={handleChange} name="CP" type="text" placeholder="Ingresa el código postal" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Ubicación: </Form.Label>
                            <Form.Control onChange={handleChange} name="Ubicacion" type="text" placeholder="Ingresa la Ubicación" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='modal-footer'>
                    <ButtonGroup className="grupo-botones">
                        <Button className="cancelButton" variant="danger" onClick={() => setShowModal(false)}>Cancelar</Button>
                        <Button className="successButton" variant="success" onClick={buscar}>Buscar</Button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
        </>
    )
}

function initialData() {
    return {
      Nombre: '',
      Clase_actividad: '',
      Calle: '',
      Colonia: '',
      CP: '',
      Ubicacion: '',
    }
}

function validarObjeto( dataSearch ){
    for(let clave in dataSearch) {
        if(dataSearch[clave] === "" || dataSearch[clave] === 'Vacio'){
            delete dataSearch[clave]
        }
    }
}

/*function createMarkerAndPopup( dataPlaces, map ){
    const newMarkers = [] // Creamos el array para guardar los marcadores
    //newMarkers.splice(0, newMarkers.length)
    map.removeAllAnnotations()
    console.log('NewMarkers -> ', newMarkers)
    console.log('dataPlaces -> ', dataPlaces)
    dataPlaces.forEach(lugar => {
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
}*/


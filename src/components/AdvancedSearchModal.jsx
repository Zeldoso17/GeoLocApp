import React, { useEffect } from 'react'
import { Modal, Form, ButtonGroup, Button } from 'react-bootstrap'

import { getClaseActividadApi } from '../apis'

import './css/AdvancedSearch.css'


export const AdvancedSearchModal = (props) => {

    const { showModal, setShowModal, data } = props;

    const closeModal = () => setShowModal(false)
    

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
                            <Form.Control type="text" placeholder="Ingresa el nombre del lugar a buscar" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Clase de Actividad: </Form.Label>
                            <Form.Select>
                                <option>Selecciona una opción</option>
                                {
                                    data[0].map((opt, key) => {
                                        return(
                                            <option key={key}>{opt.Clase_actividad}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Calle: </Form.Label>
                            <Form.Control type="text" placeholder="Ingresa el nombre de la calle" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Colonia: </Form.Label>
                            <Form.Control type="text" placeholder="Ingresa el nombre de la colonia" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Código Postal: </Form.Label>
                            <Form.Control type="text" placeholder="Ingresa el código postal" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Ubicación: </Form.Label>
                            <Form.Control type="text" placeholder="Ingresa la Ubicación" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='modal-footer'>
                    <ButtonGroup className="grupo-botones">
                        <Button className="cancelButton" variant="danger" onClick={() => setShowModal(false)}>Cancelar</Button>
                        <Button className="successButton" variant="success">Buscar</Button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
        </>
    )
}

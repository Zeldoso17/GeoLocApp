import { toString } from "lodash";
import React, { ChangeEvent, KeyboardEvent, useState, Dispatch, SetStateAction } from "react";
import { Modal, Form, ButtonGroup, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { registerPlaceApi } from '../apis';

import "./css/registerPlaceModal.css"

interface Props {
    showModal: boolean,
    setShowModal: Dispatch<SetStateAction<boolean>>,
}

export const RegisterPlaceModal = (props: Props) => {
    const { showModal, setShowModal } = props;

    const [modalData, setModalData] = useState(initialData);

    const closeModal = () => {
        setShowModal(false);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setModalData({ ...modalData, [event.target.name]: event.target.value });
    }

    const registerPlace = () => {
        const Token = localStorage.getItem('token')
        registerPlaceApi.post('/api/registerPlace/', modalData, {
            headers: {
                'Authorization': `Token ${Token}`
            }
        })
        .then(response => {
            toast.success(response.data.message);
        })
    }


    return (
        <>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title><h3>Registro de Lugar</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="modal-Register">
                        <div className="izq">
                        { /* Inputs para el nombre y la razón social */}
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control onChange={handleChange} name="nombre" placeholder="ej. Vidriera Rosales"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Razón Social</Form.Label>
                                <Form.Control onChange={handleChange} name="razonSocial" placeholder=""></Form.Control>
                            </Form.Group>
                        { /* Inputs para la clase Actividad y el estrato */}
                        <Form.Group>
                            <Form.Label>Clase de Actividad</Form.Label>
                            <Form.Control onChange={handleChange} name="claseActividad" placeholder="ej. comercio al por menor de vidrios"></Form.Control>
                        </Form.Group>
                        <div className="doble">
                            <Form.Group className="primero">
                                <Form.Label>Estrato</Form.Label>
                                <Form.Control onChange={handleChange} name="estrato" placeholder="ej.0 a 5 personas"></Form.Control>
                            </Form.Group>
                                { /* Inputs para el tipo de vialidad y el nombre de la calle */}
                            <Form.Group>
                                <Form.Label>Tipo de vialidad</Form.Label>
                                <Form.Control onChange={handleChange} name="tipoVialidad" placeholder="ej. Calle"></Form.Control>
                            </Form.Group>
                        </div>
                        <Form.Group>
                            <Form.Label>Calle</Form.Label>
                            <Form.Control onChange={handleChange} name="calle" placeholder="ej. Paseo Rosales"></Form.Control>
                        </Form.Group>
                        { /* Inputs para el tipo de vialidad y el nombre de la calle */}
                        <div className="doble">
                            <Form.Group className="primero">
                                <Form.Label>Número exterior</Form.Label>
                                <Form.Control onChange={handleChange} name="numExterior" placeholder="ej. 125"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Número interior</Form.Label>
                                <Form.Control onChange={handleChange} name="numInterior" placeholder="ej. 9"></Form.Control>
                            </Form.Group>
                        </div>
                        { /* Inputs para el tipo de vialidad y el nombre de la calle */}
                        <div className="doble">
                            <Form.Group className="primero">
                                <Form.Label>Colonia</Form.Label>
                                <Form.Control onChange={handleChange} name="colonia" placeholder="ej. Los lobos"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Código Postal</Form.Label>
                                <Form.Control onChange={handleChange} name="cp" placeholder="ej. 11647"></Form.Control>
                            </Form.Group>
                        </div>
                    </div>
                    <div className="der">
                    { /* Inputs para el tipo de vialidad y el nombre de la calle */}
                            <div className="doble">
                            <Form.Group className="primero">
                                <Form.Label>Ubicación</Form.Label>
                                <Form.Control onChange={handleChange} name="ubicacion" placeholder="ej. Tijuana"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control onChange={handleChange} name="telefono" placeholder="ej. 6641264598"></Form.Control>
                            </Form.Group>
                            </div>
                        { /* Inputs para el tipo de vialidad y el nombre de la calle */}
                            <Form.Group>
                                <Form.Label>Correo Electronico</Form.Label>
                                <Form.Control onChange={handleChange} name="email" placeholder="ej. info@vidrieraRosales.com"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Sitio de internet</Form.Label>
                                <Form.Control onChange={handleChange} name="sitioWeb" placeholder="ej. www.vidrierarosales.com"></Form.Control>
                            </Form.Group>
                        { /* Inputs para el tipo de vialidad y el nombre de la calle */}
                            <Form.Group>
                                <Form.Label>Tipo de establecimiento</Form.Label>
                                <Form.Control onChange={handleChange} name="tipoEstablecimiento" placeholder="Ej. fijo"></Form.Control>
                            </Form.Group>
                            { /* Inputs para el tipo de vialidad y el nombre de la calle */}
                            <Form.Group>
                                <Form.Label>Longitud</Form.Label>
                                <Form.Control onChange={handleChange} name="Longitud" placeholder="ej. -116.88340550422564"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Latitud</Form.Label>
                                <Form.Control onChange={handleChange} name="Latitud" placeholder="ej. 32.49662288602232"></Form.Control>
                            </Form.Group>
                        { /* Inputs para el tipo de vialidad y el nombre de la calle */}
                        <div className="doble">
                            <Form.Group className="primero">
                                <Form.Label>Centro Comercial</Form.Label>
                                <Form.Control onChange={handleChange} name="centroComercial" placeholder="ej. MacroPlaza"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Número de local</Form.Label>
                                <Form.Control onChange={handleChange} name="numLocal" placeholder="ej. 20"></Form.Control>
                            </Form.Group>
                        </div>
                    </div>
                        </div>   
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-danger" onClick={closeModal}>Cancelar</Button>
                    <Button className="btn btn-success" onClick={registerPlace}>Registrar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const initialData = () => {
    return {
        nombre: "",
        razonSocial: "",
        claseActividad: "",
        estrato: "",
        tipoVialidad: "",
        calle: "",
        numExterior: "",
        numInterior: "",
        colonia: "",
        cp: "",
        ubicacion: "",
        telefono: "",
        email: "",
        sitioWeb: "",
        tipoEstablecimiento: "",
        Longitud: "",
        Latitud: "",
        centroComercial: "",
        numLocal: "",
    }
}

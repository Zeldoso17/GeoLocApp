import React, { Dispatch, SetStateAction } from "react";
import { Modal, Form, ButtonGroup, Button } from 'react-bootstrap'

import "./css/registerPlaceModal.css"

interface Props {
    showModal: boolean,
    setShowModal: Dispatch<SetStateAction<boolean>>,
}

export const RegisterPlaceModal = (props: Props) => {
    const { showModal, setShowModal } = props;

    const closeModal = () => {
        setShowModal(false);
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
                                <Form.Control placeholder="ej. Vidriera Rosales"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Razón Social</Form.Label>
                                <Form.Control placeholder=""></Form.Control>
                            </Form.Group>
                        { /* Inputs para la clase Actividad y el estrato */}
                        <Form.Group>
                            <Form.Label>Clase de Actividad</Form.Label>
                            <Form.Control placeholder="ej. comercio al por menor de vidrios"></Form.Control>
                        </Form.Group>
                        <div className="doble">
                            <Form.Group className="primero">
                                <Form.Label>Estrato</Form.Label>
                                <Form.Control placeholder="ej. 30"></Form.Control>
                            </Form.Group>
                                { /* Inputs para el tipo de vialidad y el nombre de la calle */}
                            <Form.Group>
                                <Form.Label>Tipo de vialidad</Form.Label>
                                <Form.Control placeholder="ej. Calle"></Form.Control>
                            </Form.Group>
                        </div>
                        <Form.Group>
                            <Form.Label>Calle</Form.Label>
                            <Form.Control placeholder="ej. Paseo Rosales"></Form.Control>
                        </Form.Group>
                        { /* Inputs para el tipo de vialidad y el nombre de la calle */}
                        <div className="doble">
                            <Form.Group className="primero">
                                <Form.Label>Número exterior</Form.Label>
                                <Form.Control placeholder="ej. 125"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Número interior</Form.Label>
                                <Form.Control placeholder="ej. 9"></Form.Control>
                            </Form.Group>
                        </div>
                        { /* Inputs para el tipo de vialidad y el nombre de la calle */}
                        <div className="doble">
                            <Form.Group className="primero">
                                <Form.Label>Colonia</Form.Label>
                                <Form.Control placeholder="ej. Los lobos"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Código Postal</Form.Label>
                                <Form.Control placeholder="ej. 11647"></Form.Control>
                            </Form.Group>
                        </div>
                    </div>
                    <div className="der">
                    { /* Inputs para el tipo de vialidad y el nombre de la calle */}
                            <div className="doble">
                            <Form.Group className="primero">
                                <Form.Label>Ubicación</Form.Label>
                                <Form.Control placeholder="ej. Tijuana"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control placeholder="ej. 6641264598"></Form.Control>
                            </Form.Group>
                            </div>
                        { /* Inputs para el tipo de vialidad y el nombre de la calle */}
                            <Form.Group>
                                <Form.Label>Correo Electronico</Form.Label>
                                <Form.Control placeholder="ej. info@vidrieraRosales.com"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Sitio de internet</Form.Label>
                                <Form.Control placeholder="ej. www.vidrierarosales.com"></Form.Control>
                            </Form.Group>
                        { /* Inputs para el tipo de vialidad y el nombre de la calle */}
                            <Form.Group>
                                <Form.Label>Tipo de establecimiento</Form.Label>
                                <Form.Control placeholder="Ej. fijo"></Form.Control>
                            </Form.Group>
                            { /* Inputs para el tipo de vialidad y el nombre de la calle */}
                            <Form.Group>
                                <Form.Label>Longitud</Form.Label>
                                <Form.Control placeholder="ej. -116.88340550422564"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Latitud</Form.Label>
                                <Form.Control placeholder="ej. 32.49662288602232"></Form.Control>
                            </Form.Group>
                        { /* Inputs para el tipo de vialidad y el nombre de la calle */}
                        <div className="doble">
                            <Form.Group className="primero">
                                <Form.Label>Centro Comercial</Form.Label>
                                <Form.Control placeholder="ej. MacroPlaza"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Número de local</Form.Label>
                                <Form.Control placeholder="ej. 20"></Form.Control>
                            </Form.Group>
                        </div>
                    </div>
                        </div>   
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-danger">Cancelar</Button>
                    <Button className="btn btn-success">Registrar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
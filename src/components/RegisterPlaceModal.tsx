import React, { Dispatch, SetStateAction } from "react";
import { Modal, Form, ButtonGroup, Button } from 'react-bootstrap'

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
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control placeholder="Ingresa el nombre"></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control placeholder="Ingresa el nombre"></Form.Control>
                        </Form.Group>
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
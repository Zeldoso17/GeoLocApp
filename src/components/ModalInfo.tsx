import React, { Dispatch } from 'react'
import { Modal } from 'react-bootstrap'
import { LocalResponse } from '../interfaces/local'

interface Props {
    info: Array<LocalResponse>,
    showModal: boolean,
    setShowModal: Dispatch<React.SetStateAction<boolean>>
}

export const ModalInfo = (props: Props) => {

    const { info, showModal, setShowModal } = props;
    /*const [isShow, setIsShow] = useState(true)*/
    const closeModal = () => setShowModal(false)

  return (
    <>
        <Modal show={ showModal } onHide={ closeModal }>
            <Modal.Header closeButton>
               <Modal.Title> <h2>{ info[0].Nombre }</h2> </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>CALLE: { info[0].Calle ? info[0].Calle:'No se encontró ningun resultado'}</p>
                <p>COLONIA: { info[0].Colonia ? info[0].Colonia : 'No se encontró ningun resultado' }</p>
                <p>CORREO ELECTORNICO: { info[0].Correo_e ? info[0].Correo_e : 'No se encontró ningun resultado' }</p>
                <p>NUMERO DE LOCAL: { info[0].NumLocal ? info[0].NumLocal : 'No se encontró ningun resultado' }</p>
                <p>NUMERO EXTERIOR: { info[0].Num_Exterior ? info[0].Num_Exterior : 'No se encontró ningun resultado' }</p>
                <p>NUMERO INTERIOR: { info[0].Num_Interior ? info[0].Num_Interior : 'No se encontró ningun resultado' }</p>
                <p>SITIO DE INTERNET: { info[0].Sitio_internet ? info[0].Sitio_internet : 'No se encontró ningun resultado' }</p>
                <p>TELEFONO: { info[0].Telefono ? info[0].Telefono : 'No se encontró ningun resultado' }</p>
                <p>UBICACION: { info[0].Ubicacion ? info[0].Ubicacion : 'No se encontró ningun resultado' }</p> 
            </Modal.Body>
        </Modal>
    </>
  )
}

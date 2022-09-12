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
                {info[0].Calle && <p>CALLE: { info[0].Calle }</p>}
                {info[0].Colonia && <p>COLONIA: { info[0].Colonia }</p>}
                {info[0].Correo_e && <p>CORREO ELECTORNICO: { info[0].Correo_e }</p>}
                {info[0].NumLocal && <p>NUMERO DE LOCAL: { info[0].NumLocal }</p>}
                {info[0].Num_Exterior && <p>NUMERO EXTERIOR: { info[0].Num_Exterior }</p>}
                {info[0].Num_Interior && <p>NUMERO INTERIOR: { info[0].Num_Interior }</p>}
                {info[0].Sitio_internet && <p>SITIO DE INTERNET: { info[0].Sitio_internet }</p>}
                {info[0].Telefono && <p>TELEFONO: { info[0].Telefono }</p>}
                {info[0].Ubicacion && <p>UBICACION: { info[0].Ubicacion }</p> }
            </Modal.Body>
        </Modal>
    </>
  )
}

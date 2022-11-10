import React, { useState } from 'react';

import { RegisterPlaceModal } from './RegisterPlaceModal';

import './css/registerPlaceButton.css';

export const RegisterPlaceButton = () => {

    const [openModal, setOpenModal] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [claseActividadData, setClaseActividadData] = useState([]);

    const registerPlace = async () => {
        //await getData()
        console.log('Advanced Search...')
        setOpenModal(true)
        setShowModal(true)
    }

    return (
        <>
            <button className='register-place btn btn-primary' onClick={registerPlace}
                style={{
                    position: 'fixed',
                    top: '25px',
                    left: '650px',
                    zIndex: 999,
                    width: '170px',
                }}>
                Registrar Lugar
            </button>
            {openModal && <RegisterPlaceModal showModal={showModal} setShowModal={setShowModal} />}
        </>
    )
}
import React, { useState } from 'react'

import { getClaseActividadApi } from '../apis'
import { AdvancedSearchModal } from './AdvancedSearchModal'

export const AdvancedSearchButton = () => {

    const [openModal, setOpenModal] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [claseActividadData, setClaseActividadData] = useState([]);

    const advancedSearch = async () => {
        await getData()
        console.log('Advanced Search...')
        setOpenModal(true)
        setShowModal(true)
        console.log('YO SOY JEJEJE 2 -> ', claseActividadData)
    }

    const getData = async () => {
        const Token = localStorage.getItem('token')
        const res = await getClaseActividadApi.get('/api/getClaseActividad/', {
            headers: {
                Authorization: `Token ${Token}`
            }
        })
        setClaseActividadData([...claseActividadData, res.data.data])
        /*response.data((element: Datum) => {
            console.log(element)
        });*/
        console.log('CONCAT -> ', claseActividadData.concat(res.data.data))
        console.log('ARRAY -> ', res.data.data)
        console.log('YO SOY JEJEJE -> ', claseActividadData)
    }

    return (
        <>
            <button className='btn btn-primary' onClick={advancedSearch}
                style={{
                    position: 'fixed',
                    top: '25px',
                    left: '650px',
                    zIndex: 999,
                    width: '170px',
                }}>
                Busqueda Avanzada
            </button>
            {openModal && <AdvancedSearchModal showModal={showModal} setShowModal={setShowModal} data={claseActividadData} />}
        </>
    )
}


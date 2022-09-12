import React from 'react'

import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { logoutApi } from '../apis'

import './css/Logout.css'

export const LogoutButton = () => {

    const navigate = useNavigate();

    const Logout = () => {
        const Token = localStorage.getItem('token')
        logoutApi.post('/api/auth/logout/', {}, {
            headers: {
                Authorization: `Token ${Token}` // Establecemos el Token de autenticación
            }
        })
        .then(response => {
            localStorage.removeItem('token')
            navigate('/')
        })
    }

  return (
    <>
        <Button className="btnLogout" onClick={ Logout }>Cerrar Sesión</Button>
    </>
  )
}

import React, { useState, useContext, ChangeEvent, FormEvent } from 'react'
import Globe from 'react-globe.gl'
import { Link } from 'react-router-dom'
import { values, size } from 'lodash'

import '../screens/css/login.css'
import { LoginContext } from '../context/login/LoginContext';
import { toast } from 'react-toastify';
//import { User } from '../interfaces/login';

type initialDataLogin = {
  username: string,
  password: string
}

export const Login = () => {

  const { login } = useContext(LoginContext)
  const [data, setData] = useState(initialData())

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isValidated(data)) {
      login(data.username, data.password)
    }
  }

  return (
    <>
      <div className="conte">
        <div className="contenedor-formulario contenedor">
          <div className="imagen-formulario">
            <Globe
              height={640}
              width={720}
              globeImageUrl="https://unpkg.com/three-globe@2.24.7/example/img/earth-day.jpg"
              backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            />
          </div>

          <form onSubmit={handleSubmit} className="formulario">
            <div className="texto-formulario">
              <h2>Bienvenido de nuevo</h2>
              <p>Inicia sesión con tu cuenta</p>
            </div>
            <div className="input">
              <label htmlFor="usuario">Nombre de Usuario</label>
              <input onChange={handleInputChange} placeholder="Ingresa tu usuario" name='username' type="text" id="usuario" />
            </div>
            <div className="input">
              <label htmlFor="contraseña">Contraseña</label>
              <input onChange={handleInputChange} placeholder="Ingresa tu contraseña" name="password" type="password" id="contraseña" />
            </div>
            
            <div className="input">
              <input type="submit" value="Iniciar Sesión" />
              <span> ¿No tienes una cuenta? </span><Link to={'/registro'}>Crea una aquí</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

function initialData() {
  return {
    username: '',
    password: ''
  }
}

function isValidated(data: initialDataLogin) {
  let validCount = 0;

  values(data).some(value => {
    value && validCount++;
    return null;
  })

  if (validCount !== size(data)) {
    toast.warning('Completa todos los campos')
    return false
  }

  if (size(data.password) < 6) {
    toast.warning("La contraseña debe tener al menos 6 caracteres")
    return false
  }
  return true
}


  

import React, { useState, ChangeEvent, FormEvent } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import Globe from 'react-globe.gl'
import { values, size } from 'lodash'
import { toast } from 'react-toastify'
import { registerApi } from '../apis'

import './css/registro.css'

type initialDataRegister = {
    nombre: string,
    apellido: string,
    username: string,
    email: string,
    telefono: string,
    password: string,
    password2: string
}

export const Registro = () => {

  const [data, setData] = useState(initialData())
  const navigate = useNavigate()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setData({ ...data, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(data)
    if (isValidated(data)) {
      registrarUsuario( data )
      navigate('/')
    }
  }

  const onCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked)
    setData({ ...data, [e.target.name]: e.target.checked })
  }

  return (
    <>
      <section className="contenedor-register">
        <div className="register-box">
          <div className="mapa">
            <Globe
              height={635}
              width={690}
              globeImageUrl="https://unpkg.com/three-globe@2.24.7/example/img/earth-day.jpg"
              backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            />
          </div>
          <div className="register">
            <h1>Crea tu cuenta gratis</h1>
            <p>Ingresa la siguiente información para registrarte.</p>
            <form onSubmit={handleSubmit}>
              { /* Inputs para el NOMBRE y los APELLIDOS */}
              <div className="double">
                <div className="first-container">
                  <label htmlFor="name">Nombre: </label>
                  <input type="text" onChange={handleInputChange} placeholder='Introduce tu nombre' name="nombre" id="" />
                </div>
                <div className="second-container">
                  <label htmlFor="name">Apellidos: </label>
                  <input type="text" onChange={handleInputChange} placeholder='Introduce tus apellidos' name="apellido" id="" />
                </div>
              </div>
              { /* Inputs para el USERNAME y el Telefono */}
              <div className="double username-phone">
                <div className="first-container">
                  <label htmlFor="name">Nombre de Usuario: </label>
                  <input type="text" onChange={handleInputChange} placeholder='Introduce tu usuario' name="username" id="" />
                </div>
                <div className="second-container">
                  <label htmlFor="name">Telefono: </label>
                  <input type="text" onChange={handleInputChange} placeholder='Introduce tu telefono' name="telefono" id="" />
                </div>
              </div>
              { /* Input para el CORREO */}
              <div className="one email-checkBox">
                <div className="first-container email-container">
                  <label htmlFor="name">Correo Electrónico: </label>
                  <input type="email" onChange={handleInputChange} placeholder='Introduce tu email' name="email" id="" />
                </div>
              </div>
              { /* Inputs para la CONTRASEÑA y la confirmación de CONTRASEÑA */}
              <div className="double password-confirm">
                <div className="first-container">
                  <label htmlFor="name">Contraseña: </label>
                  <input type="text" onChange={handleInputChange} placeholder='Introduce tu contraseña' name="password" id="" />
                </div>
                <div className="second-container">
                  <label htmlFor="name">Confirmar contraseña: </label>
                  <input type="text" onChange={handleInputChange} placeholder='Repite tu contraseña' name="password2" />
                </div>
              </div>

              { /* CheckBox */}
              <div className="form-check">
                <input className="form-check-input check-input" onChange={onCheckChange} type="checkbox" name="isEmpresa" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  ¿Tu cuenta es de empresa?
                </label>
              </div>


              {/* Boton de registrate */}
              <input type="submit" className='boton' value={'Registrarme'} />
            </form>
            <p className='iniciaSesion'>¿Ya tienes una cuenta? <Link to='/'>inicia sesión aquí</Link></p>
          </div>
        </div>
      </section>
    </>
  )
}

function initialData() {
  return {
    nombre: '',
    apellido: '',
    username: '',
    email: '',
    telefono: '',
    password: '',
    password2: ''

  }
}

function isValidated(data: initialDataRegister) {
  let validCount = 0;

  values(data).some(value => {
    value && validCount++;
    return null;
  })

  if (validCount !== size(data)) {
    toast.warning('Completa todos los campos')
    return false
  }

  if (data.telefono.length < 10 || data.telefono.length > 10) {
    toast.warning('El telefono debe tener 10 caracteres')
    return false
  }

  if  (!isEmailValid(data.email)) {
    toast.error('El correo no es válido')
    return false
  }

  if (size(data.password) < 6) {
    toast.warning("La contraseña debe tener al menos 6 caracteres")
    return false
  }

  if (data.password !== data.password2) {
    toast.error("Las contraseñas no coinciden")
    return false
  }
  return true
}

function isEmailValid(email: string) {
  // eslint-disable-next-line no-useless-escape
  const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return emailValid.test(String(email).toLowerCase());
}

function registrarUsuario(data: initialDataRegister) {
  registerApi.post('api/auth/createUser/', data)
    .then(response => { toast.success(response.data.message) })
}

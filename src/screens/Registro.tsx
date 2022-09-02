import React, { useState, ChangeEvent, /*FormEvent*/ } from 'react'

import Globe from 'react-globe.gl'
import { Link } from 'react-router-dom'

import './css/registro.css'

export const Registro = () => {

  const [data, setData] = useState(initialData())

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  const handleSubmit = () => {
  }

  return (
    <>
      <section className="contact-box">
        <div className="row no-gutters bg-dark">
          
          <div className="col-xl-7 col-lg-12 d-flex">
            <div className="container align-self-center p-6">
              <h1 className="font-weight-bold mb-3 titulo">Crea tu cuenta gratis</h1>
              <p className="text-muted mb-5">Ingresa la siguiente información para registrarte.</p>
              <form onSubmit={handleSubmit}>
                <div className="form-row mb-2 name-lastname">
                  <div className="form-group col-md-6">
                    <label className="font-weight-bold name">Nombre <span className="text-danger">*</span></label>
                    <input type="text" className="form-control nameInput" placeholder="Tu nombre" />
                  </div>
                  <div className="form-group col-md-6">
                    <label className="font-weight-bold lastname">Apellido <span className="text-danger">*</span></label>
                    <input type="text" className="form-control lastnameInput" placeholder="Tu apellido" />
                  </div>
                </div>
                <div className="form-group mb-3 d-flex">
                  <div className="form-group col-md-9 emialInput">
                    <label className="font-weight-bold">Correo electrónico <span className="text-danger">*</span></label>
                    <input type="email" className="form-control" placeholder="Ingresa tu correo electrónico" />
                  </div>
                  <div className="form-group col-md-9 phoneInput">
                    <label className="font-weight-bold">Telefono <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" placeholder="Ingresa tu telefono" />
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label className="font-weight-bold">Contraseña <span className="text-danger">*</span></label>
                  <input type="password" className="form-control" placeholder="Ingresa una contraseña" />
                </div>
                <div className="form-group mb-5">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label text-muted">Al seleccionar esta casilla aceptas nuestro aviso de privacidad y los términos y condiciones</label>
                  </div>
                </div>
                <button className="btn btn-primary width-100">Regístrate</button>
              </form>
              <small className="d-inline-block text-muted mt-5">Todos los derechos reservados | © 2019 Templune</small>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function initialData() {
  return {

  }
}

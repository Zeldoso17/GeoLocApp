import React from 'react'
import Globe from 'react-globe.gl'
import { Link } from 'react-router-dom'

import '../screens/css/login.css'

export const Login = () => {
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

          <form className="formulario">
            <div className="texto-formulario">
              <h2>Bienvenido de nuevo</h2>
              <p>Inicia sesión con tu cuenta</p>
            </div>
            <div className="input">
              <label htmlFor="usuario">Correo Electrónico</label>
              <input placeholder="Ingresa tu correo" type="email" id="usuario" />
            </div>
            <div className="input">
              <label htmlFor="contraseña">Contraseña</label>
              <input placeholder="Ingresa tu contraseña" type="password" id="contraseña" />
            </div>
            <div className="password-olvidada">
              <Link to={''}>Olvidé mi contraseña</Link>
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

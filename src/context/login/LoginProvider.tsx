import React, { useReducer } from "react";

import { useNavigate } from 'react-router-dom'

import { LoginContext } from "./LoginContext";
import { loginReducer } from './LoginReducer'
import loginApi from '../../apis/loginApi';
import { LoginResponse } from "../../interfaces/login";
import { toString } from 'lodash';

export interface LoginState {
    user: Object,
    token: string
}

const INITIAL_STATE: LoginState = {
    user: {},
    token: ''
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const LoginProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(loginReducer, INITIAL_STATE);
    const navigate = useNavigate()


    const login = ( username: string, password: string ): string => {

        const data = {
            username,
            password
        }

        loginApi.post<LoginResponse>('/api/auth/login/', data)
        .then(response => {
            dispatch({ type: 'setUser', payload: response.data.user })
            localStorage.setItem('token', response.data.access_token)
            localStorage.setItem('isEmpresa', response.data.user.isEmpresa.toString())
            navigate('/mapa')
        })

        return ''
    }

    /*const setUser = ( user: object ): object => {

        dispatch({ type: 'setUser', payload: user })

        return user
    }
    */

  return (
    <LoginContext.Provider value={{
        ...state,
        login,
        //setUser,
    }}>
        { children }
    </LoginContext.Provider>
  )
}



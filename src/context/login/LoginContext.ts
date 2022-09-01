import { createContext } from 'react';

export interface LoginContextProps {
    user: object
    token: string

    login: (username: string, password: string) => string
    //setUser: ( user: object ) => object
}

export const LoginContext = createContext<LoginContextProps>({} as LoginContextProps)
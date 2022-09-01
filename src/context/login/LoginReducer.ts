import { LoginState } from './LoginProvider';

type LoginAction = 
    | { type: 'setUser', payload: object }
    | { type: 'setToken', payload: string }

export const loginReducer = (state: LoginState, action: LoginAction): LoginState => {

    switch( action.type ) {
        case 'setUser':
            return {
                ...state,
                user: action.payload
            }
        case 'setToken':
            return {
                ...state,
                token: action.payload
            }
        default:
            return state
    }
}

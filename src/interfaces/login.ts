export interface LoginResponse {
    user:         User;
    access_token: string;
}

export interface User {
    id:                    number;
    password:              string;
    last_login:            Date;
    nombre:                string;
    apellido:              string;
    username:              string;
    email:                 string;
    telefono:              string;
    usuario_administrador: boolean;
    activo:                boolean;
}
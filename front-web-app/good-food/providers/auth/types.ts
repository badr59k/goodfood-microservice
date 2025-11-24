/**
Objet pour l'authentification
**/
export type LoginSend = {
    email: string
    password: string
}

export type LoginResponse = {
    token: string
}

export type RegisterSend = {
    firstName: string
    email: string
    password: string
}
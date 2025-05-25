export interface ICreateUser {
    loginName: string
    password: string
    firstName: string
    lastName: string
    location?: string
    description?: string
    occupation?: string
}

export interface ILoginUser {
    loginName: string
    password: string
}

export interface ILgoutUser {
    refreshToken: string
}
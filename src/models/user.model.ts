
export interface UserBase {
    name: string
    email: string
}

export interface User extends UserBase {
    id : string
}
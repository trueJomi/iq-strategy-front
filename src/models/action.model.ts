export interface ActionBase {
    name: string
    image: string
    price?: number
}

export interface Action extends ActionBase {
    id: string
}
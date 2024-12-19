import { Action } from "./action.model"

export interface MessageIA {
    text: string
    action?: Action
    type: 'user' | 'bot'
}
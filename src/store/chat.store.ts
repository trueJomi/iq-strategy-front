import { create } from "zustand"
import { MessageIA } from "../models/message.model"

interface StoreChat {
    messages: MessageIA[]
    strategy: string
    loading: boolean
    setLoading: (loading: boolean) => void
    addMessage: (message: MessageIA) => void
    setStrategy: (strategy: string) => void
}

export const chatStore = create<StoreChat>((set) => ({
    messages: [{
        text: 'Hola!, ¿en que puedo ayudarte?',
        type: 'bot'
    }],
    loading: false,
    strategy: 'wyckoff',
    setLoading: (loading: boolean) => set({ loading }),
    addMessage: (message: MessageIA) => set((state) => ({ messages: [...state.messages, message] })),
    setStrategy: (strategy: string) => set({ strategy })
}))
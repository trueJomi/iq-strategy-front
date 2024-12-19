import { create } from 'zustand'
import { Action } from '../models/action.model'
import { ResultAlpaca } from '../models/utils/ResultAlpaca'
import { Predictions } from '../models/utils/Predictions'

interface ActionStore {
    actions?: Action[]
    currentAction: Action
    barsData?: ResultAlpaca[]
    predictions?: Predictions[]
    setPredictions: (predictions?: Predictions[]) => void
    setActions: (action?: Action[]) => void
    setCurrentAction: (action?: Action) => void
    setBarsData: (barsData?: ResultAlpaca[]) => void
}

export const useActionStore = create<ActionStore>((set) => ({
    actions: undefined,
    currentAction: {
        id: 'MSFT',
        name: 'Microsoft',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png',
        price: undefined
    },
    predictions: undefined,
    barsData: undefined,
    setActions: (actions) => set({ actions }),
    setPredictions: (predictions) => set({ predictions }),
    setCurrentAction: (currentAction) => set({ currentAction }),
    setBarsData: (barsData) => set({ barsData })
}))
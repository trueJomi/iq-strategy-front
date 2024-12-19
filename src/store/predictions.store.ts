import { create } from "zustand"
import { Predictions } from "../models/utils/Predictions"

interface ModalStore {
    predictions: Predictions[]
    setPredictions: (predictions: Predictions[]) => void
}

export const usePredictionsStore = create<ModalStore>((set) => ({
    predictions: [],
    setPredictions: (predictions) => set({ predictions })
}))
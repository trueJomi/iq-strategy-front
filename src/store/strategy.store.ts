import { create } from "zustand";
import { Strategy } from "../models/strategy.model";

interface StrategyStore {
    strategys: Strategy[];
    setStrategy: (strategy: Strategy[]) => void;
}

export const useStrategyStore = create<StrategyStore>((set) => ({
    strategys: [
        {
            id: 'wyckoff',
            name: 'Wyckoff'
        }
    ],
    setStrategy: (strategys: Strategy[]) => set(() => ({ strategys }))
}))
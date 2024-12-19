import { create } from "zustand"

interface ModalStore {
    open: boolean
    mode: 'buy' | 'sell'
    setOpen: (open: boolean, mode: 'buy' | 'sell') => void
}

export const useBuySellStore = create<ModalStore>((set) => ({
    open: false,
    mode: "buy" as 'buy' | 'sell',
    setOpen: (open, mode) => set({ open, mode })
}))
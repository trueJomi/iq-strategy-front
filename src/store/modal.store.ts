import { create } from "zustand"

interface ModalStore {
    actionsOpen: boolean
    setActionsOpen: (open: boolean) => void
}

export const useModalStore = create<ModalStore>((set) => ({
    actionsOpen: false,
    setActionsOpen: (actionsOpen) => set({ actionsOpen })
}))
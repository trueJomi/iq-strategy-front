import { create } from "zustand";
import { Folder } from "../models/forlder.model";

interface FolderStore {
    folders?: Folder[]
    setFolders: (folders: Folder[]) => void
}

export const useFolderStore = create<FolderStore>((set) => ({
    folders: undefined,
    setFolders: (folders) => set({ folders })
}))
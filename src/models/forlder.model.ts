import { DocumentData, DocumentReference } from "firebase/firestore";
import { Action } from "./action.model";

export interface FolderBase {
    action: Action
    countActions: number
    accionesCompara: number
    totalValue?: number
    accionesVenta: number
}

export interface Folder extends FolderBase {
    id: string
}

export interface FolderFire {
    action: DocumentReference<DocumentData, DocumentData>
    countActions: number
    totalValue?: number
    accionesCompara: number
    accionesVenta: number
}
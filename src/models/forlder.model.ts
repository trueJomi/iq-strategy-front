import { DocumentData, DocumentReference } from "firebase/firestore";
import { Action } from "./action.model";

export interface FolderBase {
    action: Action | DocumentReference<DocumentData, DocumentData>
    countActions: number
    totalValue?: number
}

export interface Folder extends FolderBase {
    id: string
}

export interface FolderFire {
    action: DocumentReference<DocumentData, DocumentData>
    countActions: number
    totalValue?: number
}
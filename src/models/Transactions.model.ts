import { DocumentData, DocumentReference, Timestamp } from "firebase/firestore"
import { Action } from "./action.model"

export interface TransactionBase {
    date: Date
    amount?: number
    value: number
    action: Action
}

export interface Transaction extends TransactionBase {
    id: string
}

export interface TransactionFire {
    date: Timestamp
    amount?: number
    value: number
    action: DocumentReference<DocumentData, DocumentData>
}

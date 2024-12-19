import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { adapterFirebaseToTransactions } from "../adapters/Transactions.adapter";
import { Action } from "../models/action.model";
import { Transaction, TransactionBase } from "../models/Transactions.model";
import { getUser } from "./AuthService";
import { createDocument, getCollectionCallbackOrderDate } from "./comonService";
import { updateFolder } from "./folderService";

export function getHistorial( actions:Action[] ,fun: ( data: Transaction[] ) => void ) {
    const user = getUser()
    return getCollectionCallbackOrderDate(user.uid, 'historial', (document) => {
        const listData: QueryDocumentSnapshot<DocumentData, DocumentData>[] = []
        document.forEach((doc) => {
            listData.push(doc)
        })
        const data = listData.map((doc) => adapterFirebaseToTransactions(doc, actions))
        fun(data)
    })
}

export async function createTransaction( data: TransactionBase ) {
    const user = getUser()
    await createDocument(`User/${user.uid}/historial`, data)
    await updateFolder(data)
}
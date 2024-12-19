import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { Action } from "../models/action.model";
import { Transaction, TransactionFire } from "../models/Transactions.model";

export function adapterFirebaseToTransactions(data: DocumentSnapshot<DocumentData, DocumentData>, actions: Action[]): Transaction {
    const body = data.data() as TransactionFire
    const action = actions.find(action => action.id === body.action.id)
    return {
        id: data.id,
        date: body.date.toDate(),
        amount: body.amount,
        value: body.value,
        action: action!
    }
}
import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { Action } from "../models/action.model";
import { Folder, FolderFire } from "../models/forlder.model";

export function adapterFirebaseToFolder(data: DocumentSnapshot<DocumentData, DocumentData> , actions: Action[]): Folder {
    const body = data.data() as FolderFire
    const action = actions.find(action => action.id === body.action.id);
    return {
        id: data.id,
        action: action!,
        countActions: body.countActions,
        totalValue: body.totalValue
    };
}
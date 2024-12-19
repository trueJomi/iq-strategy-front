import { adapterFirebaseToFolder } from "../adapters/folder.adapter";
import { Action } from "../models/action.model";
import { Folder, FolderBase } from "../models/forlder.model";
import { TransactionBase } from "../models/Transactions.model";
import { getUser } from "./AuthService";
import { createDocumentWithId, getCollectionCallback, getData, refDocument, updateData } from "./comonService";

export function getFolders(actions: Action[],fun:(data: Folder[]) => void) {
    const user = getUser()
    getCollectionCallback(user.uid, 'folder', (result) => {
        const data: Folder[] = []
        result.forEach((doc) => {
            const temp = adapterFirebaseToFolder(doc, actions)
            data.push(temp)
        })
        console.log(data)
        fun(data)
    })
    
}

export async function getFolder( id: string ) {
    const user = getUser()
    const result = await getData(user.uid, id, 'folder')
    const data: Folder = {
        ...result.data() as FolderBase,
        id: result.id
    }
    return data
}

export async function createFolder(id:string, data: FolderBase ) {
    const user = getUser()
    await createDocumentWithId(`User/${user.uid}/folder`, id, data)
}


export async function updateFolder( data: TransactionBase ) {
    const user = getUser()
    try {
        const currentFolder = await getFolder(data.action.id)
        const newFolder:Folder = {
            ...currentFolder,
            countActions: currentFolder.countActions + data.value,
        }
        await updateData(user.uid, `folder`, newFolder, data.action.id)

    } catch {
        createFolder( data.action.id, {
            action: refDocument(`User/${user.uid}/folder`, data.action.id),
            countActions: data.value,
            totalValue: data.amount,
        })
    }

}
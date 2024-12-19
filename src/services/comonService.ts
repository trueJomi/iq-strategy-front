/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    type DocumentSnapshot,
    doc,
    getDoc,
    getFirestore,
    onSnapshot,
    updateDoc,
    addDoc,
    collection,
    type QuerySnapshot,
    type DocumentData,
    orderBy,
    query,
    deleteDoc,
    setDoc,
    getDocs
} from 'firebase/firestore'
import { app } from '../constants/firebase.constant'
  
const db = getFirestore(app)

export function refDocument(path: string, id: string) {
    return doc(db, path, id)
}

export async function existDocument(path: string, id: string) {
    const documentRef = doc(db, `${path}/${id}`)
    const ref = await getDoc(documentRef)
    return ref.exists()
}

export const createDocument = async (path: string, data: any) => {
    const documentRef = collection(db, path)
    const result = await addDoc(documentRef, data)
    return result
}

export const createDocumentWithId = async (path: string, id: string , data: any) => {
    const documentRef = doc(db, `${path}/${id}`)
    await setDoc(documentRef, data)
}

export async function getCollection( path: string ) {
    const collectionsRef = collection(db, path)
    return await getDocs(collectionsRef)
}

export const updateData = async (id: string, path: string, data: any, uid: string) => {
    const documentRef = doc(db, `User/${id}/${path}`, uid)
    await updateDoc(documentRef, data)
}

export const getData = async (id: string, uid: string, path: string) => {
    const documentRef = doc(db, `User/${id}/${path}`, uid)
    const docSnap = await getDoc(documentRef)
    return docSnap
}

export const getDataCalback = (id: string, uid: string, path: string, fun: (document: DocumentSnapshot) => void) => {
    const documentRef = doc(db, `User/${id}/${path}`, uid)
    return onSnapshot(documentRef, fun)
}

export const getCollectionData = async (id: string, path: string) => {
    const documentRef = collection(db, `User/${id}/${path}`)
    const docSnap = await getDocs(documentRef)
    return docSnap
}

export const getCollectionCallback = (id: string, path: string, fun: (document: QuerySnapshot<DocumentData>) => void) => {
    const documentRef = collection(db, `User/${id}/${path}`)
    onSnapshot(documentRef, fun)
}

export const getCollectionCallbackOrderDate = (id: string, path: string, fun: (document: QuerySnapshot<DocumentData>) => void) => {
    const documentRef = collection(db, `User/${id}/${path}`)
    const q = query(documentRef, orderBy('date', 'desc'))
    onSnapshot(q, fun)
}

export const deleteData = async (id: string, uid: string, path: string) => {
    const documentRef = doc(db, `User/${id}/${path}`, uid)
    await deleteDoc(documentRef)
}
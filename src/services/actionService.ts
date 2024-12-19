import { Action, ActionBase } from "../models/action.model";
import { getCollection } from "./comonService";

export async function getActions() {
    const accionesRef = await getCollection('/acciones')
    const acciones: Action[] = []
    accionesRef.forEach((doc) => {
        const data = doc.data()
        const id = doc.id
        const accion: Action = { id, ...data as ActionBase }
        acciones.push(accion)
    })
    return acciones
}
import { UserBase, User } from "../models/user.model"
import { createDocumentWithId } from "./comonService"

export function createUser(id: string, data: UserBase): User {
    createDocumentWithId('User', id, data)
    return {
        id: id,
        ...data
    }
}
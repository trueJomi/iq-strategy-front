import {
  getAuth,
  signOut,
  getIdToken,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { app } from '../constants/firebase.constant'

export const auth = getAuth(app)

void auth.setPersistence(browserSessionPersistence)

export const logIn = async (email: string, password: string) => {
  const userCredentials = await signInWithEmailAndPassword(auth, email, password)
  return userCredentials
}

export const register = async (email: string, password: string) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  return user
}

export const logOut = async () => {
  await signOut(auth)
}

export const getToken = async (): Promise<string> => {
  if (auth.currentUser === null) {
    throw new Error('User not logged in')
  }
  const token = await getIdToken(auth.currentUser)
  return token
}

export const getUser = () => {
  if (auth.currentUser === null) {
    throw new Error('User not logged in')
  }
  return auth.currentUser
}

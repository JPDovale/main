import { create } from 'zustand'
import { type FirebaseApp, initializeApp } from 'firebase/app'
import { type Auth, type User, getAuth } from 'firebase/auth'

interface UseFirebaseStore {
  firebaseApp: FirebaseApp
  getFirebaseAuth: () => Auth
  user: User | null

  setUser: (user: User | null) => void
}

export const useFirebaseStore = create<UseFirebaseStore>((set, get) => {
  return {
    firebaseApp: initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    }),

    getFirebaseAuth: () => {
      return getAuth(get().firebaseApp)
    },

    user: null,

    setUser: (user) => set({ user }),
  }
})

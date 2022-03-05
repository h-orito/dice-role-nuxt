import config from '#config'
import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const getFirebaseApp = (apps: FirebaseApp[]) => {
  if (apps.length) return apps[0]
  return initializeApp({
    databaseURL: config.firebaseDatabaseUrl,
    apiKey: config.firebaseApiKey,
    authDomain: config.firebaseAuthDomain,
    projectId: config.firebaseProjectId,
    storageBucket: config.firebaseStorageBucket,
    messagingSenderId: config.firebaseMessagingSenderId,
    appId: config.firebaseAppId
  })
}

export const useDatabase = async () => {
  if (process.client) return undefined
  const firebase: FirebaseApp = getFirebaseApp(getApps())
  return getDatabase(firebase)
}

//   const fetchGame = async (key: string): Promise<Game | null> => {
//     const snapshotGame = (await get(ref(db, `games/${key}`))).val()
//     if (snapshotGame == null) return null
//     return {
//       ...snapshotGame,
//       key
//     }
//   }

//   const registerGame = async (game: Game): Promise<Game> => {
//     const newGameRef = await push(child(ref(db), 'games'))
//     set(newGameRef, game)
//     return {
//       ...game,
//       key: newGameRef.key
//     }
//   }

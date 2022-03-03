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

export const useDatabase = () => {
  if (process.client) return undefined
  const firebase: FirebaseApp = getFirebaseApp(getApps())
  return getDatabase(firebase)
}

// import {
//   ref,
//   get,
//   set,
//   query,
//   push,
//   child,
//   orderByChild,
//   limitToLast,
//   Database,
//   getDatabase
// } from 'firebase/database'
// import firebase from '~~/src/plugins/firebase.server'

// export const useDatabase = () => {
//   const db: Database = getDatabase(firebase)
//   // const db = useState('database').value as Database

//   const fetchGame = async (key: string): Promise<Game | null> => {
//     const snapshotGame = (await get(ref(db, `games/${key}`))).val()
//     if (snapshotGame == null) return null
//     return {
//       ...snapshotGame,
//       key
//     }
//   }

//   const fetchGames = async (): Promise<Game[]> => {
//     const snapshotGames = (
//       await get(
//         query(ref(db, 'games'), orderByChild('created'), limitToLast(10))
//       )
//     ).val()
//     if (snapshotGames == null) return []
//     return Object.entries(snapshotGames).map(([key, value]) => {
//       const g = value as Game
//       return {
//         ...g,
//         key: key
//       } as Game
//     })
//   }

//   const registerGame = async (game: Game): Promise<Game> => {
//     const newGameRef = await push(child(ref(db), 'games'))
//     set(newGameRef, game)
//     return {
//       ...game,
//       key: newGameRef.key
//     }
//   }

//   return {
//     fetchGame,
//     fetchGames,
//     registerGame
//   }
// }

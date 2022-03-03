import {
  ref,
  get,
  query,
  orderByChild,
  limitToLast,
  getDatabase
} from 'firebase/database'
import firebase from '~~/src/plugins/firebase.server'

export const useGames = async () => {
  const db = getDatabase(firebase)

  const snapshotGames = (
    await get(query(ref(db, 'games'), orderByChild('created'), limitToLast(10)))
  ).val()
  if (snapshotGames == null) return []
  return Object.entries(snapshotGames).map(([key, value]) => {
    const g = value as Game
    return {
      ...g,
      key: key
    } as Game
  })
}

import { ref, get, query, orderByChild, limitToLast } from 'firebase/database'
import { useDatabase } from './useDatabase'

export const useGames = async () => {
  if (process.client) return []
  const db = await useDatabase()
  if (!db) return []
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

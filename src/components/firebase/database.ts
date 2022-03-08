import { ref, get, query, orderByChild, limitToLast } from 'firebase/database'
import { useDatabase } from '~/composables/useDatabase'
import { useFirebaseAdminDatabase } from '~/composables/useFirebaseAdminDatabase'

const fetchGames = async () => {
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

const fetchGame = async (key: string): Promise<Game | null> => {
  if (process.client) return null
  const db = await useDatabase()
  if (!db) return null
  const snapshotGame = (await get(ref(db, `games/${key}`))).val()
  if (snapshotGame == null) return null
  return {
    ...snapshotGame,
    key
  }
}

const registerGame = async (game: Game): Promise<Game> => {
  if (process.client) return game
  const db = await useFirebaseAdminDatabase()
  if (!db) return game
  const newGameRef = await db.ref('games').push()
  await newGameRef.set(game)
  return {
    ...game,
    key: newGameRef.key
  }
}

export { fetchGames, fetchGame, registerGame }

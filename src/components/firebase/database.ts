import { ref, get, query, orderByChild, limitToLast } from 'firebase/database'
import { useDatabase } from '~/composables/useDatabase'
import { useFirebaseAdminDatabase } from '~/composables/useFirebaseAdminDatabase'

export const fetchGames = async () => {
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

export const fetchGame = async (key: string): Promise<Game | null> => {
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

export const registerGame = async (game: Game): Promise<Game> => {
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

export const fetchUser = async (
  userId: string
): Promise<DiceRoleUser | null> => {
  if (process.client) return null
  const db = await useDatabase()
  if (!db) return null
  const snapshotGame = (await get(ref(db, `users/${userId}`))).val()
  if (snapshotGame == null)
    return {
      userName: ''
    } as DiceRoleUser
  return snapshotGame
}

export const updateUser = async (
  userId: string,
  user: DiceRoleUser
): Promise<void> => {
  if (process.client) return
  const db = await useFirebaseAdminDatabase()
  if (!db) return
  await db.ref(`users/${userId}`).set(user)
}

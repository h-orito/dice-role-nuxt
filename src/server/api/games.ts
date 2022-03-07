import type { IncomingMessage, ServerResponse } from 'http'
import { fetchGames } from '~/components/firebase/database'

export default async (req: IncomingMessage, res: ServerResponse) => {
  return await fetchGames()
}

import type { IncomingMessage, ServerResponse } from 'http'
import { useGames } from '~/composables/useGames'

export default async (req: IncomingMessage, res: ServerResponse) => {
  return await useGames()
}

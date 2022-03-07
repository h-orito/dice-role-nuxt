import type { IncomingMessage, ServerResponse } from 'http'
import { useBody } from 'h3'
import { registerGame } from '~/components/firebase/database'

export default async (req: IncomingMessage, res: ServerResponse) => {
  const { game }: Body = await useBody(req)
  return await registerGame(game)
}

type Body = {
  game: Game
}

import type { IncomingMessage, ServerResponse } from 'http'
import { useBody } from 'h3'
import { registerGame, fetchUser } from '~/components/firebase/database'
import { getUserIdBySession } from '~~/src/components/auth/server-auth'

export default async (req: IncomingMessage, res: ServerResponse) => {
  const { game }: Body = await useBody(req)
  const userId = await getUserIdBySession(req, res)
  if (!userId) return
  const user = await fetchUser(userId)
  if (!user) return
  return await registerGame({
    ...game,
    creator: user
  })
}

type Body = {
  game: Game
}

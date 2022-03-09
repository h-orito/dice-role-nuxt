import type { IncomingMessage, ServerResponse } from 'http'
import { useBody } from 'h3'
import { updateUser } from '~/components/firebase/database'
import { getUserIdBySession } from '~~/src/components/auth/server-auth'

export default async (req: IncomingMessage, res: ServerResponse) => {
  const { user }: Body = await useBody(req)
  const userId = await getUserIdBySession(req, res)
  if (!userId) return
  return await updateUser(userId, user)
}

type Body = {
  user: DiceRoleUser
}

import type { IncomingMessage, ServerResponse } from 'http'
import { getUserIdBySession } from '~~/src/components/auth/server-auth'
import { fetchUser } from '~/components/firebase/database'

export default async (req: IncomingMessage, res: ServerResponse) => {
  const userId = await getUserIdBySession(req, res)
  if (!userId) return
  return await fetchUser(userId)
}

import type { IncomingMessage, ServerResponse } from 'http'
import { useBody } from 'h3'
import { setSession } from '~/components/auth/server-auth'

export default async (req: IncomingMessage, res: ServerResponse) => {
  const { token }: Request = await useBody(req)
  await setSession(req, res, token)
  return {}
}

type Request = {
  token: string
}

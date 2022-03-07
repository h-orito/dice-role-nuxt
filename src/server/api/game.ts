import type { IncomingMessage, ServerResponse } from 'http'
import { useQuery } from 'h3'
import { fetchGame } from '~/components/firebase/database'

export default async (req: IncomingMessage, res: ServerResponse) => {
  const key = useQuery(req).key as string
  return await fetchGame(key)
}

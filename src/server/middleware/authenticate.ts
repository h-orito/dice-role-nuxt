import type { IncomingMessage, ServerResponse } from 'http'
import { isAuthenticated, getUserId } from '~~/src/components/auth/server-auth'

export default async (req: IncomingMessage, res: ServerResponse) => {
  // 期限が切れている場合にrefresh tokenでtokenを更新したほうが良いが、
  // しばらくは期限が切れていても永遠にログイン状態を維持できているものとする
  //   console.log(`authenticated: ${await isAuthenticated(req)}`)
  //   console.log(`uid: ${await getUserId(req)}`)
}

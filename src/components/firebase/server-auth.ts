import { IncomingMessage } from 'http'
import Cookies from 'universal-cookie'
import { getAuth, DecodedIdToken } from 'firebase-admin/auth'
import { useFirebaseAdmin } from '~/composables/useFirebaseAdmin'
import { cookieKeys } from './auth-cookie'
// import dayjs from 'dayjs'

export const isAuthenticated = async (req: IncomingMessage) => {
  const accessToken = getAccessToken(req)
  if (!accessToken) return false
  const decodedToken = await decodeAccessToken(accessToken)
  if (!decodedToken) return false
  // しばらくは有効期限検証を行わない
  return true
  // const exp = decodedToken.exp
  // const now = dayjs().unix()
  // return now < exp
}

const getAccessToken = (req: IncomingMessage) => {
  const cookies = getCookiesInstance(req)
  return cookies.get(cookieKeys.accessToken)
}

export const getUserId = async (
  req: IncomingMessage
): Promise<string | null> => {
  const accessToken = getAccessToken(req)
  if (!accessToken) return null
  const decodedToken = await decodeAccessToken(accessToken)
  if (!decodedToken) return null
  return decodedToken.uid
}

// server側でCookieの変更がない前提
// ある場合は https://qiita.com/tomoeine/items/91163ec5a674d697bc75 を参考に変える
const getCookiesInstance = (req: IncomingMessage) => {
  if (process.server) {
    return new Cookies(req.headers.cookie)
  } else {
    return new Cookies()
  }
}

const decodeAccessToken = async (
  token: string
): Promise<DecodedIdToken | null> => {
  try {
    return await getAuth(useFirebaseAdmin()).verifyIdToken(token)
  } catch (e) {
    console.log(`failed to decode accessToken. ${e}`)
    return null
  }
}

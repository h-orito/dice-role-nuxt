import { IncomingMessage, OutgoingMessage } from 'http'
import { serialize } from 'cookie'
import Cookies, { CookieChangeOptions } from 'universal-cookie'
import { getAuth, DecodedIdToken } from 'firebase-admin/auth'
import { useFirebaseAdmin } from '~/composables/useFirebaseAdmin'
import { cookieKeys, setSessionCookie } from './auth-cookie'

// idTokenが有効か
export const isAuthenticated = async (
  req: IncomingMessage,
  res: OutgoingMessage
) => {
  const accessToken = getAccessToken(req, res)
  if (!accessToken) return false
  const decodedToken = await decodeAccessToken(accessToken)
  return !!decodedToken
}

// sessionが有効か
export const isAuthenticatedBySession = async (
  req: IncomingMessage,
  res: OutgoingMessage
) => {
  const sessionToken = await getSessionToken(req, res)
  if (!sessionToken) return false
  const decodedToken = await decodeSessionToken(sessionToken)
  return !!decodedToken
}

export const getUserId = async (
  req: IncomingMessage,
  res: OutgoingMessage
): Promise<string | null> => {
  const accessToken = getAccessToken(req, res)
  if (!accessToken) return null
  const decodedToken = await decodeAccessToken(accessToken)
  if (!decodedToken) return null
  return decodedToken.uid
}

export const getUserIdBySession = async (
  req: IncomingMessage,
  res: OutgoingMessage
): Promise<string | null> => {
  const sessionToken = await getSessionToken(req, res)
  if (!sessionToken) return null
  const decodedToken = await decodeSessionToken(sessionToken)
  if (!decodedToken) return null
  return decodedToken.uid
}

export const setSession = async (
  req: IncomingMessage,
  res: OutgoingMessage,
  token: string
): Promise<void> => {
  const sessionCookie = await createSessionCookie(token)
  const cookies = getCookiesInstance(req, res)
  setSessionCookie(cookies, sessionCookie)
}

const getAccessToken = (req: IncomingMessage, res: OutgoingMessage) => {
  const cookies = getCookiesInstance(req, res)
  return cookies.get(cookieKeys.accessToken)
}

const getSessionToken = async (
  req: IncomingMessage,
  res: OutgoingMessage
): Promise<string> => {
  const cookies = getCookiesInstance(req, res)
  return cookies.get(cookieKeys.sessionCookie)
}

const getCookiesInstance = (req: IncomingMessage, res: OutgoingMessage) => {
  if (process.server) {
    return createServerCookie(req.headers.cookie, res)
  } else {
    return new Cookies()
  }
}

const createServerCookie = (
  cookie: string | undefined,
  res: OutgoingMessage
): Cookies => {
  const universalCookie = new Cookies(cookie)
  universalCookie.addChangeListener((change: CookieChangeOptions) => {
    if (res.headersSent) {
      return
    }
    let cookieHeader = res.getHeader('Set-Cookie')
    if (typeof cookieHeader === 'string') {
      cookieHeader = [cookieHeader]
    } else if (typeof cookieHeader === 'number') {
      cookieHeader = [cookieHeader.toString()]
    }
    cookieHeader = (cookieHeader as string[]) || []
    if (change.value === undefined) {
      cookieHeader.push(serialize(change.name, '', change.options))
    } else {
      cookieHeader.push(serialize(change.name, change.value, change.options))
    }
    res.setHeader('Set-Cookie', cookieHeader)
  })
  return universalCookie
}

const decodeAccessToken = async (
  token: string
): Promise<DecodedIdToken | null> => {
  try {
    return await getAuth(useFirebaseAdmin()).verifyIdToken(token, true)
  } catch (e) {
    console.log(`failed to decode accessToken. ${e}`)
    return null
  }
}

const createSessionCookie = async (token: string): Promise<string> => {
  return await getAuth(useFirebaseAdmin()).createSessionCookie(token, {
    expiresIn: 1000 * 60 * 60 * 24 * 14
  })
}

const decodeSessionToken = async (
  token: string
): Promise<DecodedIdToken | null> => {
  try {
    return await getAuth(useFirebaseAdmin()).verifySessionCookie(token, true)
  } catch (e) {
    console.log(`failed to decode sessionCookie. ${e}`)
    return null
  }
}

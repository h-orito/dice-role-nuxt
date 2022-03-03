import Cookies from 'universal-cookie'
import { IncomingMessage } from 'http'

const cookieKeys = {
  accessToken: 'ACCESS_TOKEN'
}

export const isAuthenticated = (req: IncomingMessage) => {
  // JWT の有無しか見ていないけど、期限のチェックも入れるべき
  return !!getAccessToken(req)
}

export const getAccessToken = (req: IncomingMessage) => {
  const cookies = getCookiesInstance(req)
  return cookies.get(cookieKeys.accessToken)
}

export const setAccessToken = (token: string) => {
  const cookies = new Cookies()
  cookies.set(cookieKeys.accessToken, token)
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

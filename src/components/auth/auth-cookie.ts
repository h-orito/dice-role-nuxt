import Cookies from 'universal-cookie'

export const cookieKeys = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token',
  sessionCookie: '_session'
}

export const setAccessToken = (token: string) => {
  const cookies = new Cookies()
  cookies.set(cookieKeys.accessToken, token)
}

export const setRefreshToken = (token: string) => {
  const cookies = new Cookies()
  cookies.set(cookieKeys.refreshToken, token)
}

export const setSessionCookie = (cookies: Cookies, token: string) => {
  cookies.set(cookieKeys.sessionCookie, token, {
    maxAge: 60 * 60 * 24 * 14,
    httpOnly: true
  })
}

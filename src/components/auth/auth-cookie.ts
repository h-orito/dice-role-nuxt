import Cookies from 'universal-cookie'

export const cookieKeys = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token'
}

export const setAccessToken = (token: string) => {
  const cookies = new Cookies()
  cookies.set(cookieKeys.accessToken, token)
}

export const setRefreshToken = (token: string) => {
  const cookies = new Cookies()
  cookies.set(cookieKeys.refreshToken, token)
}

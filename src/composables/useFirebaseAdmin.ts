import config from '#config'
import {
  applicationDefault,
  initializeApp,
  getApps,
  App
} from 'firebase-admin/app'

const getFirebaseAdmin = (apps: App[]) => {
  if (apps.length) return apps[0]
  return initializeApp({
    credential: applicationDefault(),
    databaseURL: config.firebaseDatabaseUrl
  })
}

export const useFirebaseAdmin = () => {
  if (process.client) return undefined
  return getFirebaseAdmin(getApps())
}

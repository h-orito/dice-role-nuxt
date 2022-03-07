import { getDatabase } from 'firebase-admin/database'
import { useFirebaseAdmin } from './useFirebaseAdmin'

export const useFirebaseAdminDatabase = () => {
  if (process.client) return undefined
  return getDatabase(useFirebaseAdmin())
}

import { getDatabase } from 'firebase-admin/database'
import { useFirebaseAdmin } from './useFirebaseAdmin'

export const useFirebaseAdminDatabase = async () => {
  if (process.client) return undefined
  return await getDatabase(await useFirebaseAdmin())
}

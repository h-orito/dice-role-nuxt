import { Ref } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import {
  setAccessToken,
  setRefreshToken
} from '~~/src/components/auth/auth-cookie'

export const useAuth = async () => {
  const authState: Ref<AuthState> = useState('authState', () => ({
    isSignedIn: false,
    userId: undefined,
    userName: null
  }))
  onMounted(async () => {
    const { $firebaseAuth } = useNuxtApp()
    onAuthStateChanged($firebaseAuth, async (user) => {
      const newState: AuthState = {
        isSignedIn: user != null,
        userId: user?.uid,
        userName: user?.displayName
      }
      authState.value = newState
      const token = await user?.getIdToken(true)
      setAccessToken(token ?? '')
      setRefreshToken(user?.refreshToken ?? '')
    })
  })
  return authState
}

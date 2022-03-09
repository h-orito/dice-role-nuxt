export const useRoot = () => {
  return process.dev || process.server ? '/' : '/dice-role/'
}

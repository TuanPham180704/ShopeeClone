import type { User } from 'src/types/user.type'
import type { SuccessResponseApi } from 'src/types/utils.type'

export type AuthResponse = SuccessResponseApi<{
  access_token: string
  expires: number
  user: User  
}>

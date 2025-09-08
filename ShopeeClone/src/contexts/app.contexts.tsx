import { getAccessTokenFromLS, getProfileFromLs } from 'src/utils/auth'
import { createContext, useState } from 'react'
import type { User } from 'src/types/user.type'
import type { ExtendedPurchase } from 'src/types/purchase.type'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>,
  extendedPurchases : ExtendedPurchase[],
  setExtendePurchases :React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>,
  reset :() => void
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLs(),
  setProfile: () => null,
  extendedPurchases : [],
  setExtendePurchases : () => null,
  reset : () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [extendedPurchases, setExtendePurchases] = useState<ExtendedPurchase[]>(initialAppContext.extendedPurchases)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const reset = () => {
    setExtendePurchases([])
    setIsAuthenticated(false)
    setProfile(null)
  }
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendePurchases,
        reset

      }}
    >
      {children}
    </AppContext.Provider>
  )
}

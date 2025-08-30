import { useSearchParams } from 'react-router-dom'

export default function useQueryParams() {
  const [serchParams] = useSearchParams()
  return Object.fromEntries([...serchParams])
}

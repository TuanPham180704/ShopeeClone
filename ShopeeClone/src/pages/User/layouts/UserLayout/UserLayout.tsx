import { Outlet } from 'react-router-dom'
import UserSideNar from 'src/pages/User/components/UserSideNav'

export default function UserLayout() {
  return (
    <div>
      <UserSideNar />
      <Outlet />
    </div>
  )
}

import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.contexts'
import MainLayout from 'src/layouts/MainLayout'
import RegisterLayout from 'src/layouts/RegisterLayout'
import Login from 'src/pages/Login'
import ProductList from 'src/pages/ProductList'
import Profile from 'src/pages/ProductList/components/Profile'
import Register from 'src/pages/ProductList/components/Register'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path:path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return routeElements
}

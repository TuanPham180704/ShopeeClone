import { useContext, lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
// import Cart from 'src/components/Cart'

import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.contexts'
import CartLayout from 'src/layouts/CartLayout'
import UserLayout from 'src/pages/User/layouts/UserLayout'
import MainLayout from 'src/layouts/MainLayout'
import RegisterLayout from 'src/layouts/RegisterLayout'
// import Login from 'src/pages/Login'
// import ProducDetail from 'src/pages/ProducDetail'
// import ProductList from 'src/pages/ProductList'
// import Profile from 'src/pages/User/pages/Profile'
// import Register from 'src/pages/Register'

// import ChangePassword from 'src/pages/User/pages/ChangePassword'
// import HistoryPurchase from 'src/pages/User/pages/HistoryPurchase'
// import NotFound from 'src/pages/NotFound'

const Login = lazy(() => import('src/pages/Login'))
const ProducDetail = lazy(() => import('src/pages/ProducDetail'))
const ProductList = lazy(() => import('src/pages/ProductList'))
const Profile = lazy(() => import('src/pages/User/pages/Profile'))
const ChangePassword = lazy(() => import('src/pages/User/pages/ChangePassword'))
const HistoryPurchase = lazy(() => import('src/pages/User/pages/HistoryPurchase'))
const NotFound = lazy(() => import('src/pages/NotFound'))
const Cart = lazy(() => import('src/components/Cart'))
const Register = lazy(() => import('src/pages/Register'))

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
          <Suspense>
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <ProducDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '*',
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <NotFound />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Suspense>
                <Cart />
              </Suspense>
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: (
                <Suspense>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.historyPurchase,
              element: (
                <Suspense>
                  <HistoryPurchase />
                </Suspense>
              )
            },
            {
              path: path.changePassword,
              element: (
                <Suspense>
                  <ChangePassword />
                </Suspense>
              )
            }
          ]
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
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return routeElements
}

import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import LoginPage from './pages/Login'
import OnlyPublicRoute from './hooks/OnlyPublicRoute.hook'
// import RegisterPage from './pages/Register'
import HomePage from './pages/Home'
import PrivateRoute from './hooks/PrivateRoute.hook'
import Layout from './components/Layout'
import { LayoutNav } from './models/utils/Layout.model'
import { MdBarChart, MdHistory } from 'react-icons/md'
import HistoryPage from './pages/History'

const nav: LayoutNav[] = [
  {
    name: 'Aciones',
    path: '/',
    icon: MdBarChart
  },
  {
    name: 'Historial',
    path: '/history',
    icon: MdHistory
  }

]


function Router () {
  return (
    <Routes>
      <Route path="" element={
        <PrivateRoute>
          <Layout routes={nav} >
            <Outlet/>
          </Layout>
        </PrivateRoute>
      }
      >
        <Route path='/' element={<HomePage/>} />
        <Route path='/history' element={<HistoryPage/>} />
      </Route>
      <Route path='/login'
      element={<OnlyPublicRoute>
        <LoginPage/>
      </OnlyPublicRoute>} />
      {/* <Route path='/register' element={<OnlyPublicRoute>
        <RegisterPage/>
      </OnlyPublicRoute>} /> */}
      <Route path='*' element={<Navigate to={'/'} />} />
    </Routes>
  )
}

export default Router

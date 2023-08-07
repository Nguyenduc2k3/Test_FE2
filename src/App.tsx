import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import AddProduct from './pages/add'
import UpdateProductPage from './pages/update'

const router = createBrowserRouter([
  {
    path: '/', element: <Dashboard/>
  },
  {
    path: '/add', element: <AddProduct/>
  },
  {
    path: '/update/:id', element: <UpdateProductPage/>
  }
])
function App() {
  return <RouterProvider router={router} />
}

export default App

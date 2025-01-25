import { RouterProvider, createBrowserRouter } from 'react-router'
import './App.css'

import Layout from './Component/Layout/Layout'
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login'
import { Toaster } from 'react-hot-toast'
import Notfound from './Pages/Notfound/Notfound'
import Home from './Pages/Home/Home'
import Categories from './Pages/Categories/Categories'
import Brands from './Pages/Brands/Brands'
import Products from './Pages/Products/Products'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute'
import UserProvider from "./Context/user.context"
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import Cart from './Pages/Cart/Cart'
import CartProvider from './Context/cart.context'
import WishListProvider from './Context/wishList.context'
import WishList from './Pages/WishList/WishList'
import Orders from './Pages/Orders/Orders'
import CreateOrder from './Pages/Checkout/Checkout'
import Checkout from './Pages/Checkout/Checkout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


function App() {
  const queryClient = new QueryClient();
  const routes = createBrowserRouter([
    {
      path: "/", element:
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      , children: [
        { index: true, element: <Home /> },
        { path: "/*", element: <Notfound /> },
        { path: "/categories", element: <Categories /> },
        { path: "/brands", element: <Brands /> },
        { path: "/products", element: <Products /> },
        { path: "/products/:id", element: <ProductDetails /> },
        { path: "/cart", element: <Cart /> },
        { path: "/wishlist", element: <WishList/> },
        { path: "/checkout", element: <Checkout/> },
        { path: "/allorders", element: <Orders/> },
        { path: "/categories/:id", element: <h2>Categories</h2> },


      ]
    },
    {
      path: "/auth", element: <Layout />, children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> }
      ]
    }
  ])
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <UserProvider>
      <WishListProvider>
        <CartProvider>
          <RouterProvider router={routes}></RouterProvider>
          <ReactQueryDevtools>
          </ReactQueryDevtools>
        </CartProvider>
        </WishListProvider>
      </UserProvider>
      <Toaster />
    </QueryClientProvider>
    </>
  )
}

export default App

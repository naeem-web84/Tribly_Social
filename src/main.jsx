import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './router/Router.jsx'
import AuthProvider from './context/AuthContext/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist'>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
    </div>
  </StrictMode>,
)

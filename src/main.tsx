import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { FeedPage } from './pages/FeedPage'
import { PostPage } from './pages/PostPage'
import { NewPostPage } from './pages/NewPostPage'
import { ProfilePage } from './pages/ProfilePage'
import { ConfirmationPage } from './ConfirmationPage'
import { SearchPage } from './pages/SearchPage'

function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <Outlet />
      <footer className="site-footer">
        Gopher<span>Social</span> · by Felipe Eguia Cima
        <a
          href="https://gophersocial.onrender.com/v1/swagger/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-docs-link"
        >
          Documentación
          <span className="footer-arrow">↝</span>
          <svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="26" height="32" rx="3" stroke="currentColor" strokeWidth="2"/>
            <path d="M7 10h14M7 16h14M7 22h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M18 1v7h7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </a>
      </footer>
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute><FeedPage /></ProtectedRoute>,
      },
      {
        path: '/posts/new',
        element: <ProtectedRoute><NewPostPage /></ProtectedRoute>,
      },
      {
        path: '/posts/:postID',
        element: <ProtectedRoute><PostPage /></ProtectedRoute>,
      },
      {
        path: '/users/:userID',
        element: <ProtectedRoute><ProfilePage /></ProtectedRoute>,
      },
      {
        path: '/search',
        element: <ProtectedRoute><SearchPage /></ProtectedRoute>,
      },
      {
        path: '/confirm/:token',
        element: <ConfirmationPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)

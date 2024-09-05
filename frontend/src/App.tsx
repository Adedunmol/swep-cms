import { useLayoutEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import useAuthStore from "./stores/useAuthStore"
import Emergency from "./pages/Emergency"
import Appointment from "./pages/Appointment"
import Reception from "./pages/Reception"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { user, authenticate, logout } = useAuthStore()

  useLayoutEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      authenticate(token)
    } else {
      logout()
    }
  }, [])

  return (
    <BrowserRouter>
      <ToastContainer />
      <Route element={<Landing />} path="/" />
      {user ? (
        <Routes>
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<Emergency />} path="/emergency" />
          <Route element={<Appointment />} path="/appointment" />
          <Route element={<Reception />} path="/reception" />
        </Routes>
      ) : (
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Signup />} path="/sign-up" />
        </Routes>
      )}

    </BrowserRouter>
  )
}

export default App
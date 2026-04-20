import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { login, logout, setLoading } from './app/features/authSlice'
import api from './configs/api'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Login from './pages/Login'
import Preview from './pages/Preview'
import ResumeBuilder from './pages/ResumeBuilder'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const dispatch = useDispatch()

  const getUserData = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      dispatch(setLoading(false))
      return
    }

    try {
      const { data } = await api.get('/api/users/data', {
        headers: { Authorization: token },
      })

      if (data.user) {
        dispatch(login({ token, user: data.user }))
      } else {
        localStorage.removeItem('token')
        dispatch(setLoading(false))
      }
    } catch (error) {
      localStorage.removeItem('token')
      dispatch(logout())
      dispatch(setLoading(false))
      console.log(error.message)
    }
  }
  useEffect(() => {

    getUserData()
  }, [dispatch])

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/app' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>
        <Route path='/view/:resumeId' element={<Preview />} />
      </Routes>
    </>
  )
}

export default App

import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Modal from './Components/Modal/Modal'
import Loader from './Components/Loader/Loader'
import { UserContextFunc } from './Context/UserContext'
import './App.css'
function App() {
  const { isLoader } = UserContextFunc()

  return (
    <>
      {isLoader ? <Loader /> : ''}
      <Modal />
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App

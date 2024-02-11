import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Modal from './Components/Modal/Modal'
import Loader from './Components/Loader/Loader'
import { UserContextFunc } from './Context/UserContext'
import './App.css'
function App() {
  const { loginApi, registrationApi, isAuth, setIsAuth, loginUserAuth, userFirstName, isFirstName, exitUser, isLoader, setIsLoader } = UserContextFunc()
  //const [count, setCount] = useState(0)
  const [toggleModal, setToggleModal] = useState(false)

  return (
    <>
      {isLoader ? <Loader /> : ''}
      <Modal toggleModal={toggleModal} setToggleModal={setToggleModal} />
      <Header setToggleModal={setToggleModal} />
      <Outlet />
      <Footer />
    </>
  )
}

export default App

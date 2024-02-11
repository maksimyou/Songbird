import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'


const UserContextt = React.createContext();

export function UserContextFunc() {
  return useContext(UserContextt)
}

const UserContext = ({ children }) => {

  const [isAuth, setIsAuth] = useState(false)
  const [isLoader, setIsLoader] = useState(false)
  const [isRole, setIsRole] = useState()
  const [isUsers, setIsUsers] = useState()
  const [isGoods, setIsGoods] = useState()
  const [isCategory, setIsCategory] = useState()


  const [isFirstName, setIsFirstName] = useState('Аноним')


  const loginUserAuth = () => {
    const token = JSON.parse(localStorage.getItem('token'))

    axios.get('http://localhost:5000/api/user/auth', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        return res.data
      })
      .then(data => {
        console.log("Токены совпадают: ", data.token === token)
      })
      .catch(err => {
        console.log(err, "Токены не совпадают")
      })
  }

  const userFirstName = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    console.log(token)
    axios.get('http://localhost:5000/api/user/first-name', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        return res.data
      })
      .then(data => {
        console.log(data)
        setIsFirstName(data.firstName)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const userRole = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    setIsLoader(true)
    console.log(token)
    axios.get('http://localhost:5000/api/user/get-role', {

      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        return res.data
      })
      .then(data => {
        console.log(data)
        setIsRole(data.role)
        setIsLoader(false)

      })
      .catch(err => {
        console.log(err)
        setIsLoader(false)
      })
  }

  const getUsers = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    setIsLoader(true)
    console.log(token)
    axios.get('http://localhost:5000/api/user/get-users', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        return res.data
      })
      .then(data => {
        console.log(data)
        setIsUsers(data)
        setIsLoader(false)

      })
      .catch(err => {
        console.log(err)
        setIsLoader(false)

      })
  }




  const registrationApi = (userData) => {
    setIsLoader(true)
    axios.post('http://localhost:5000/api/user/registration', userData)
      .then(res => res.data)
      .then(data => {
        console.log(data)
        localStorage.setItem('token', JSON.stringify(data.token))
        setIsAuth(true)
        setIsLoader(false)
        userRole()
      })
      .catch(error => {
        console.log(error.message)
        setIsLoader(false)
      })
  }



  const loginApi = (userData) => {
    console.log(userData)
    setIsLoader(true)
    axios.post('http://localhost:5000/api/user/login', userData)
      .then(res => res.data)
      .then(data => {
        console.log(data)
        localStorage.setItem('token', JSON.stringify(data.token))
        setIsAuth(true)
        setIsLoader(false)
        userRole()
      })
      .catch(error => {
        console.log(error.message)
        setIsAuth(false)
        setIsLoader(false)
      })
  }

  //const registrationApiStepLogin = (userData) => {
  //  axios.post('http://localhost:5000/api/user/step-login', userData)
  //      .then(res => res.data)
  //      .then(data => {
  //          console.log(data)
  //      })
  //      .catch(error => {
  //          console.log(error.message)
  //      })
  //}


  //const registrationApiStepEmail = (userData) => {
  //  axios.post('http://localhost:5000/api/user/step-email', userData)
  //      .then(res => res.data)
  //      .then(data => {
  //          console.log(data)
  //      })
  //      .catch(error => {
  //          console.log(error.message)
  //      })
  //}


  const exitUser = () => {
    localStorage.removeItem('token')
    setIsAuth(false)
  }


  const addGoodsApi = (goodsData) => {
    const token = JSON.parse(localStorage.getItem('token'))
    console.log(userData)
    setIsLoader(true)
    axios.post('http://localhost:5000/api/goods/add-goods', goodsData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setIsLoader(false)
      })
      .catch(error => {
        console.log(error.message)
        setIsLoader(false)
      })
  }

  const getAllGoodsApi = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    console.log()
    setIsLoader(true)
    axios.get('http://localhost:5000/api/goods/get-all-goods', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setIsGoods(data)
        setIsLoader(false)
      })
      .catch(error => {
        console.log(error.message)
        setIsLoader(false)
      })
  }


  const getAllCategoryApi = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    console.log()
    setIsLoader(true)
    axios.get('http://localhost:5000/api/goods/get-category', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setIsCategory(data)
        setIsLoader(false)
      })
      .catch(error => {
        console.log(error.message)
        setIsLoader(false)
      })
  }




  const editCategoryApi = (categoryData) => {
    const token = JSON.parse(localStorage.getItem('token'))
    console.log()
    setIsLoader(true)
    axios.post('http://localhost:5000/api/goods/edit-category', categoryData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setIsLoader(false)
      })
      .catch(error => {
        console.log(error.message)
        setIsLoader(false)
      })
  }

  const deleteCategoryApi = (categoryData) => {
    const token = JSON.parse(localStorage.getItem('token'))
    console.log()
    setIsLoader(true)
    axios.post('http://localhost:5000/api/goods/delete-category', categoryData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setIsLoader(false)
      })
      .catch(error => {
        console.log(error.message)
        setIsLoader(false)
      })
  }


  const addCategoryApi = (categoryData) => {
    const token = JSON.parse(localStorage.getItem('token'))
    console.log()
    setIsLoader(true)
    axios.post('http://localhost:5000/api/goods/add-category', categoryData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setIsGoods(data)
        setIsLoader(false)
      })
      .catch(error => {
        console.log(error.message)
        setIsLoader(false)
      })
  }


  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('token'));
    if (token) setIsAuth(true); userRole()

  }, [])



  return (
    <UserContextt.Provider value={{ loginApi, registrationApi, isAuth, setIsAuth, loginUserAuth, userFirstName, isFirstName, exitUser, isLoader, isRole, userRole, isUsers, getUsers, addGoodsApi, getAllGoodsApi, isGoods, addCategoryApi, isCategory, getAllCategoryApi, editCategoryApi, deleteCategoryApi }}>
      {children}
    </UserContextt.Provider>
  )
}

export default UserContext

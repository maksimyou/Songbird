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
  const [isSetting, setIsSetting] = useState()
  const [isUserId, setIsUserId] = useState()
  const [isMessageError, setIsMessageError] = useState()
  const [isFavorites, setIsFavorites] = useState({ lists: "[]" })
  const [isIdReceived, setIsIdReceived] = useState(false)
  const [isIdReceivedCard, setIsIdReceivedCard] = useState(false)
  const [isCountFavorites, setIsCountFavorites] = useState(0)

  const [isUsers, setIsUsers] = useState([])
  const [isGoods, setIsGoods] = useState([])
  const [isGoodsOne, setIsGoodsOne] = useState([])
  const [isCategoryGoods, setIsCategoryGoods] = useState([])
  const [isCategory, setIsCategory] = useState([])
  const [isCategoryBread, setIsCategoryBread] = useState({})
  const [toggleModal, setToggleModal] = useState(false)
  const [isSwitchCategory, setIsSwitchCategory] = useState()
  const [isRoleEff, setIsRoleEff] = useState(false)
  const [isFirstName, setIsFirstName] = useState('Аноним')
  const [confirmMail, setConfirmMail] = useState(false)
  const [confirmMail2, setConfirmMail2] = useState(false)
  const [checkLike, setCheckLike] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [tokenDepend, setTokenDepend] = useState(true)


  function createCategoruBread(data) {
    let obj = {};
    data.forEach(e => obj[e.route] = e.name)
    return obj
  }


  const loginUserAuth = () => {
    const token = JSON.parse(localStorage.getItem('token'))

    axios.get('http://89.104.66.35:5000/api/user/auth', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        return res.data
      })
      .then(data => {
        setIsAuth(true)
        console.log("Токены совпадают: ", data.token === token)
      })
      .catch(err => {
        setIsAuth(false)
        console.log(err, "Токены не совпадают")
      })
  }


  const deleteUserApi = (userData) => {
    const token = JSON.parse(localStorage.getItem('token'))

    setIsLoader(true)
    axios.post('http://89.104.66.35:5000/api/user/delete', userData, {
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

  const editUserApi = (userData) => {
    const token = JSON.parse(localStorage.getItem('token'))

    setIsLoader(true)
    axios.post('http://89.104.66.35:5000/api/user/edit-user', userData, {
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




  const getCategoryGoods = (goodsData) => {
    setIsLoader(true)
    axios.post('http://89.104.66.35:5000/api/goods/get-category-goods', goodsData)
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setIsCategoryGoods(data)
        setIsLoader(false)
        setIsGoods(data)
      })
      .catch(error => {
        console.log(error.message)
        setIsLoader(false)
      })
  }




  const userFirstName = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    console.log(token)
    axios.get('http://89.104.66.35:5000/api/user/first-name', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        return res.data
      })
      .then(data => {
        console.log(data)
        setIsFirstName(data.name)
      })
      .catch(err => {
        console.log(err)
      })
  }


  const userRole = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    //setIsLoader(true)
    console.log(token)
    axios.get('http://89.104.66.35:5000/api/user/get-role', {

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
        //setIsLoader(false)

      })
      .catch(err => {
        console.log(err)
        //setIsLoader(false)
      })
  }

  const getUsers = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    setIsLoader(true)
    console.log(token)
    axios.get('http://89.104.66.35:5000/api/user/get-users', {
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

  const addFavorites = (favoritesData) => {
    //idUser, idGoods 
    const token = JSON.parse(localStorage.getItem('token'))
    //setIsLoader(true)
    console.log(token)
    axios.post('http://89.104.66.35:5000/api/favorites/add', favoritesData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        return res.data
      })
      .then(data => {
        console.log(data)
        setIsIdReceivedCard(true);
        //setIsLoader(false)

      })
      .catch(err => {
        console.log(err)
        //setIsLoader(false)

      })
  }

  const deleteFavorites = (favoritesData) => {
    const token = JSON.parse(localStorage.getItem('token'))

    //setIsLoader(true)
    axios.post('http://89.104.66.35:5000/api/favorites/delete', favoritesData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setIsIdReceivedCard(true);
        //setIsLoader(false)
      })
      .catch(error => {
        console.log(error)
        //setIsLoader(false)
      })

  }

  const getGoodsFavorites = () => {
    const token = JSON.parse(localStorage.getItem('token'))

    setIsLoader(true)
    axios.get('http://89.104.66.35:5000/api/favorites/get-goods', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setFavorites(data)
        setIsLoader(false)
      })
      .catch(error => {
        console.log(error)
        setIsLoader(false)
      })

  }


  const getFavorites = (favoritesData) => {
    const token = JSON.parse(localStorage.getItem('token'))
    setIsLoader(true)
    console.log(token)
    axios.post('http://89.104.66.35:5000/api/favorites/get', favoritesData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        return res.data
      })
      .then(data => {
        console.log(data)
        setIsFavorites(data)
        let arr = JSON.parse(data.lists)
        setIsCountFavorites(arr.length)
        setIsLoader(false)
        setCheckLike(true)
      })
      .catch(err => {
        console.log(err)
        setIsLoader(false)

      })
  }


  const registrationApi = (userData) => {
    setIsLoader(true)
    axios.post('http://89.104.66.35:5000/api/user/registration', userData)
      .then(res => res.data)
      .then(data => {
        console.log(data)
        //localStorage.setItem('token', JSON.stringify(data.token))
        //setIsAuth(true)
        setIsUserId(data)
        setIsLoader(false)
        setConfirmMail(true)
        //setIsRoleEff(true)
      })
      .catch(error => {
        console.log(error.message)
        setIsMessageError(error.response.data.message)
        setIsLoader(false)
      })
  }

  const generationCodeApi = (userData) => {
    setIsLoader(true)
    axios.post('http://89.104.66.35:5000/api/user/generation-code', userData)
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




  const postConfirmationApi = (userData) => {
    setIsLoader(true)
    axios.post('http://89.104.66.35:5000/api/user/confirm-mail', userData)
      .then(res => res.data)
      .then(data => {
        console.log(data)
        if (data.token) {
          localStorage.setItem('token', JSON.stringify(data.token))
          setConfirmMail(false)
          setConfirmMail2(false)
          setToggleModal(false);
          getFavorites()
          setIsAuth(true)
          setIsRoleEff(true)
        }
        setIsLoader(false)
      })
      .catch(error => {
        console.log(error.message)
        setIsMessageError(error.response.data.message)
        setIsLoader(false)
      })
  }


  const loginApi = (userData) => {
    console.log(userData)
    setIsLoader(true)
    axios.post('http://89.104.66.35:5000/api/user/login', userData)
      .then(res => res.data)
      .then(data => {
        console.log(data)
        if (data.confir) {
          setConfirmMail2(true)
          setIsUserId({ id: data.id })
        } else {
          localStorage.setItem('token', JSON.stringify(data.token))
          setConfirmMail(false)
          setConfirmMail2(false)
          setIsAuth(true)
          getFavorites()
          setIsRoleEff(true)
          setToggleModal(false);
        }
        setIsLoader(false)
      })
      .catch(error => {
        console.log(error.response.data.message)
        setIsAuth(false)
        setIsLoader(false)
        setIsMessageError(error.response.data.message)
      })
  }


  const getUserId = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    setIsLoader(true)
    console.log(token)
    axios.get('http://89.104.66.35:5000/api/user/get-id', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        return res.data
      })
      .then(data => {
        console.log(data)
        setIsUserId({ id: data })
        setIsIdReceived(true)
        setIsLoader(false)

      })
      .catch(err => {
        console.log(err)
        setIsLoader(false)

      })
  }



  const exitUser = () => {
    localStorage.removeItem('token')
    setIsAuth(false)
  }


  const addGoodsApi = (goodsData) => {
    const token = JSON.parse(localStorage.getItem('token'))
    console.log(goodsData)
    setIsLoader(true)
    axios.post('http://89.104.66.35:5000/api/goods/add-goods', goodsData, {
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
    axios.get('http://89.104.66.35:5000/api/goods/get-all-goods', {
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

  const getOneGoodsApi = (goodsData) => {

    setIsLoader(true)
    axios.post('http://89.104.66.35:5000/api/goods/get-one-goods', goodsData)
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setIsGoodsOne(data)
        setIsLoader(false)
      })
      .catch(error => {
        console.log(error.message)
        setIsLoader(false)
      })
  }


  const getAllCategoryApi = () => {

    console.log()
    setIsLoader(true)
    axios.get('http://89.104.66.35:5000/api/goods/get-category')
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setIsCategory(data)
        setIsCategoryBread(createCategoruBread(data))
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
    axios.post('http://89.104.66.35:5000/api/goods/edit-category', categoryData, {
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
    axios.post('http://89.104.66.35:5000/api/goods/delete-category', categoryData, {
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

  const deleteGoodsApi = (categoryData) => {
    const token = JSON.parse(localStorage.getItem('token'))
    console.log()
    setIsLoader(true)
    axios.post('http://89.104.66.35:5000/api/goods/delete-goods', categoryData, {
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
    axios.post('http://89.104.66.35:5000/api/goods/add-category', categoryData, {
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

  const updateAddSettingApi = (settingData) => {
    const token = JSON.parse(localStorage.getItem('token'))

    console.log()
    setIsLoader(true)
    axios.post('http://89.104.66.35:5000/api/setting/set', settingData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setIsLoader(false)
        getSettingApi()
      })
      .catch(error => {
        console.log(error.message)
        setIsLoader(false)
      })
  }


  const getSettingApi = () => {
    setIsLoader(true)
    axios.get('http://89.104.66.35:5000/api/setting/get')
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setIsSetting(data[0])
        setIsLoader(false)
      })
      .catch(error => {
        console.log(error.message)
        setIsLoader(false)
      })
  }



  useEffect(() => {

    let token = JSON.parse(localStorage.getItem('token'));
    getSettingApi()
    if (isIdReceivedCard) getFavorites(); setIsIdReceivedCard(false)
    if (isIdReceived) getFavorites()
    if (token && tokenDepend) loginUserAuth(); getUserId(); userRole(); setTokenDepend(false)
    if (isRoleEff) userRole(); setIsRoleEff(false);
  }, [isRoleEff, isIdReceived, isIdReceivedCard, tokenDepend])



  return (
    <UserContextt.Provider value={{
      generationCodeApi,
      confirmMail2,
      setConfirmMail2,
      setConfirmMail,
      toggleModal,
      setToggleModal,
      isUserId,
      postConfirmationApi,
      confirmMail,
      updateAddSettingApi,
      isSetting,
      getOneGoodsApi,
      isGoodsOne,
      setIsGoods,
      isCategoryBread,
      isSwitchCategory,
      setIsSwitchCategory,
      loginApi,
      registrationApi,
      isAuth,
      setIsAuth,
      loginUserAuth,
      exitUser,
      isLoader,
      isRole,
      userRole,
      isUsers,
      getUsers,
      addGoodsApi,
      getAllGoodsApi,
      isGoods,
      addCategoryApi,
      isCategory,
      getAllCategoryApi,
      editCategoryApi,
      deleteCategoryApi,
      deleteGoodsApi,
      getCategoryGoods,
      isCategoryGoods,
      setIsCategoryGoods,
      isMessageError,
      setIsMessageError,
      deleteUserApi,
      editUserApi,
      addFavorites,
      deleteFavorites,
      isFavorites,
      getFavorites,
      isIdReceivedCard,
      setIsIdReceivedCard,
      checkLike,
      setCheckLike,
      favorites,
      setFavorites,
      getGoodsFavorites,
      isCountFavorites,
      setIsCountFavorites,
      userFirstName,
      isFirstName,
      setIsFavorites
    }}>
      {children}
    </UserContextt.Provider>
  )
}

export default UserContext

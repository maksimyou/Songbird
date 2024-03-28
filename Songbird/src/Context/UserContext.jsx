import React, { useContext, useState, useEffect, useMemo } from 'react'
import axios from 'axios'


const UserContextt = React.createContext();

export function UserContextFunc() {
  return useContext(UserContextt)
}


const UserContext = ({ children }) => {
  const [tokenDepend, setTokenDepend] = useState(true)
  const [formSecces, setFormSecces] = useState(true)
  const [switchOrderModal, setSwitchOrderModal] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [isLoader, setIsLoader] = useState(false)
  const [isRole, setIsRole] = useState()
  const [isSetting, setIsSetting] = useState()
  const [isUserId, setIsUserId] = useState()
  const [isMessageError, setIsMessageError] = useState()
  const [isFavorites, setIsFavorites] = useState({ lists: "[]" })
  const [isBasket, setIsBasket] = useState({ lists: "[]" })
  const [sumBaske, setSumBaske] = useState(0)
  const [GoodsBasketDep, setGoodsBasketDep] = useState(false)

  const [isIdReceived, setIsIdReceived] = useState(false)
  const [isIdReceivedCard, setIsIdReceivedCard] = useState(false)
  const [isIdReceivedCard2, setIsIdReceivedCard2] = useState(false)
  const [GoodsFavoriteDep, setGoodsFavoriteDep] = useState(false)
  const [isCountFavorites, setIsCountFavorites] = useState(0)
  const [isCountBasket, setIsCountBasket] = useState(0)
  //const [sumBasketGoodsDev, setSumBasketGoodsDev] = useState(false)

  const [isUser, setIsUser] = useState({ adress: "[]" })
  const [isEffectUser, setIsEffectUser] = useState(false)
  const [settingDepend, setSettingDepend] = useState(true)
  const [isUsers, setIsUsers] = useState([])
  const [isGoods, setIsGoods] = useState([])
  const [isGoodsOne, setIsGoodsOne] = useState([])
  const [isCategoryGoods, setIsCategoryGoods] = useState([])
  const [isCategory, setIsCategory] = useState([])
  const [isCategoryBread, setIsCategoryBread] = useState({})
  const [toggleModal, setToggleModal] = useState(false)
  const [isSwitchCategory, setIsSwitchCategory] = useState()
  const [isRoleEff, setIsRoleEff] = useState(false)
  //const [isFirstName, setIsFirstName] = useState('Аноним')
  const [confirmMail, setConfirmMail] = useState(false)
  const [confirmMail2, setConfirmMail2] = useState(false)
  const [checkLike, setCheckLike] = useState(false)
  const [checkBasket, setCheckBasket] = useState(false)
  const [getOneGoodsDev, setGetOneGoodsDev] = useState()

  const [getSumGoodsDev, setGetSumGoodsDev] = useState()

  const [favorites, setFavorites] = useState([])
  const [basket, setBasket] = useState({ goods: [], list: [] })
  const [orders, setOrders] = useState([])
  const [order, setOrder] = useState([])

  const [currentImg, setCurrentImg] = useState('')
  const [categoryDepend, setCategoryDepend] = useState(false)

  const [messageAdmin, setMessageAdmin] = useState('')
  const [messageAdminShow, setMessageAdminShow] = useState(false)
  const [users, setUsers] = useState()
  const [category, setCategory] = useState()
  const [goods, setGoods] = useState()

  const loginUserAuth = () => {
    const token = JSON.parse(localStorage.getItem('token'))

    axios.get('https://songbird21.ru:5000/api/user/auth', {
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
    axios.post('https://songbird21.ru:5000/api/user/delete', userData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setMessageAdmin(data)
        setMessageAdminShow(true)
        setUsers(true)
        setIsLoader(false)
      })
      .catch(error => {
        setMessageAdmin(error.messagea)
        setMessageAdminShow(true)
        console.log(error.message)
        setIsLoader(false)
      })

  }

  const editUserApi = (userData) => {
    const token = JSON.parse(localStorage.getItem('token'))

    setIsLoader(true)
    axios.post('https://songbird21.ru:5000/api/user/edit-user', userData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setMessageAdmin(data)
        setUsers(true)
        setMessageAdminShow(true)
        setIsLoader(false)
      })
      .catch(error => {
        setMessageAdmin(error.messagea)
        setMessageAdminShow(true)
        console.log(error.message)
        setIsLoader(false)
      })

  }

  const editUserDataApi = (userData) => {
    const token = JSON.parse(localStorage.getItem('token'))

    setIsLoader(true)
    axios.post('https://songbird21.ru:5000/api/user/edit-data-user', userData, {
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



  const userRole = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    //setIsLoader(true)
    console.log(token)
    axios.get('https://songbird21.ru:5000/api/user/get-role', {

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
    axios.get('https://songbird21.ru:5000/api/user/get-users', {
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

  const getUsersData = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    setIsLoader(true)
    console.log(token)
    axios.get('https://songbird21.ru:5000/api/user/get-user', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        return res.data
      })
      .then(data => {
        console.log(data)
        setIsUser(data)
        setIsEffectUser(true)
        setIsLoader(false)

      })
      .catch(err => {
        console.log(err)
        setIsLoader(false)

      })
  }


  const registrationApi = (userData) => {
    setIsLoader(true)
    axios.post('https://songbird21.ru:5000/api/user/registration', userData)
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
    axios.post('https://songbird21.ru:5000/api/user/generation-code', userData)
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
    axios.post('https://songbird21.ru:5000/api/user/confirm-mail', userData)
      .then(res => res.data)
      .then(data => {
        console.log(data)
        if (data.token) {
          localStorage.setItem('token', JSON.stringify(data.token))
          setConfirmMail(false)
          setConfirmMail2(false)
          setToggleModal(false);
          getFavorites()
          getBasket()

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
    axios.post('https://songbird21.ru:5000/api/user/login', userData)
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
          getBasket()
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
    axios.get('https://songbird21.ru:5000/api/user/get-id', {
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
    axios.post('https://songbird21.ru:5000/api/goods/add-goods', goodsData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setMessageAdmin(data)
        setMessageAdminShow(true)
        setIsLoader(false)
      })
      .catch(error => {
        setMessageAdmin(error.messagea)
        setMessageAdminShow(true)
        console.log(error.message)
        setIsLoader(false)
      })
  }


  function createCategoruBread(data) {
    let obj = {};
    data.forEach(e => obj[e.route] = e.name)
    return obj
  }



  const getCategoryGoods = (goodsData) => {
    setIsLoader(true)
    axios.post('https://songbird21.ru:5000/api/goods/get-category-goods', goodsData)
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

  const getCategoryGoodsNoload = (goodsData) => {
    //setIsLoader(true)
    axios.post('https://songbird21.ru:5000/api/goods/get-category-goods', goodsData)
      .then(res => res.data)
      .then(data => {
        console.log(data)

        setIsCategoryGoods(data)
        //setIsLoader(false)
        setIsGoods(data)
      })
      .catch(error => {
        console.log(error.message)
        //setIsLoader(false)
      })
  }



  //const userFirstName = () => {
  //  const token = JSON.parse(localStorage.getItem('token'))
  //  console.log(token)
  //  axios.get('https://songbird21.ru:5000/api/user/first-name', {
  //    headers: {
  //      Authorization: 'Bearer ' + token
  //    }
  //  })
  //    .then(res => {
  //      return res.data
  //    })
  //    .then(data => {
  //      console.log(data)
  //      setIsFirstName(data.name)
  //    })
  //    .catch(err => {
  //      console.log(err)
  //    })
  //}


  const addFavorites = (favoritesData) => {
    //idUser, idGoods 
    const token = JSON.parse(localStorage.getItem('token'))
    //setIsLoader(true)
    console.log(token)
    axios.post('https://songbird21.ru:5000/api/favorites/add', favoritesData, {
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
    axios.post('https://songbird21.ru:5000/api/favorites/delete', favoritesData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setGoodsFavoriteDep(true);
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
    axios.get('https://songbird21.ru:5000/api/favorites/get-goods', {
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
    axios.post('https://songbird21.ru:5000/api/favorites/get', favoritesData, {
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


  const getAllGoodsApi = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    console.log()
    setIsLoader(true)
    axios.get('https://songbird21.ru:5000/api/goods/get-all-goods', {
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
    axios.post('https://songbird21.ru:5000/api/goods/get-one-goods', goodsData)
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setIsGoodsOne(data)
        setCurrentImg(data.imageURL[0])
        setIsLoader(false)
      })
      .catch(error => {
        console.log(error.message)
        setIsLoader(false)
      })
  }


  const getOneGoodsUserApi = (goodsData) => {
    const token = JSON.parse(localStorage.getItem('token'))
    setIsLoader(true)
    axios.post('https://songbird21.ru:5000/api/goods/get-one-goods-user', goodsData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setIsGoodsOne(data)
        setCurrentImg(data.imageURL[0])
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
    axios.get('https://songbird21.ru:5000/api/goods/get-category')
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
    axios.post('https://songbird21.ru:5000/api/goods/edit-category', categoryData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setMessageAdmin(data)
        setCategory(true)
        setMessageAdminShow(true)
        setIsLoader(false)
      })
      .catch(error => {
        setMessageAdmin(error.messagea)
        setMessageAdminShow(true)
        console.log(error.message)
        setIsLoader(false)
      })
  }

  const deleteCategoryApi = (categoryData) => {
    const token = JSON.parse(localStorage.getItem('token'))
    console.log()
    setIsLoader(true)
    axios.post('https://songbird21.ru:5000/api/goods/delete-category', categoryData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setMessageAdmin(data)
        setCategory(true)
        setMessageAdminShow(true)
        setIsLoader(false)
      })
      .catch(error => {
        setMessageAdmin(error.messagea)
        setMessageAdminShow(true)
        console.log(error.message)
        setIsLoader(false)
      })
  }

  const deleteGoodsApi = (categoryData) => {
    const token = JSON.parse(localStorage.getItem('token'))
    console.log()
    setIsLoader(true)
    axios.post('https://songbird21.ru:5000/api/goods/delete-goods', categoryData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setMessageAdmin(data)
        setGoods(true)
        setMessageAdminShow(true)
        setIsLoader(false)
      })
      .catch(error => {
        setMessageAdmin(error.messagea)
        setMessageAdminShow(true)
        console.log(error.message)
        setIsLoader(false)
      })
  }




  const addCategoryApi = (categoryData) => {
    const token = JSON.parse(localStorage.getItem('token'))
    console.log()
    setIsLoader(true)
    axios.post('https://songbird21.ru:5000/api/goods/add-category', categoryData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setIsGoods(data)
        setMessageAdmin(data)
        setMessageAdminShow(true)
        setCategoryDepend(true)
        setIsLoader(false)
      })
      .catch(error => {
        setMessageAdmin(error.messagea)
        setMessageAdminShow(true)
        console.log(error.message)
        setIsLoader(false)
      })
  }

  const updateAddSettingApi = (settingData) => {
    const token = JSON.parse(localStorage.getItem('token'))

    console.log()
    setIsLoader(true)
    axios.post('https://songbird21.ru:5000/api/setting/set', settingData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setMessageAdmin(data)
        setMessageAdminShow(true)
        setIsLoader(false)
        getSettingApi()
      })
      .catch(error => {
        console.log(error.message)
        setMessageAdmin(error.message)
        setMessageAdminShow(true)
        setIsLoader(false)
      })
  }
  const sendMessageTelegram = (telegramData) => {
    setIsLoader(true)
    axios.post('https://songbird21.ru:5000/api/mail/send-telegram', telegramData)
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setIsLoader(false)
        setFormSecces(false)
      })
      .catch(error => {
        console.log(error.message)
        setIsLoader(false)
      })
  }



  const getSettingApi = () => {
    setIsLoader(true)
    axios.get('https://songbird21.ru:5000/api/setting/get')
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




  //----------------------------------------------Basket----------------------------------------------------------------------------------------------------------------------------------

  const addBasket = (basketData) => {
    //idUser, idGoods 
    const token = JSON.parse(localStorage.getItem('token'))
    //setIsLoader(true)
    console.log(token)
    axios.post('https://songbird21.ru:5000/api/basket/add', basketData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        return res.data
      })
      .then(data => {
        console.log(data)
        //setIsLoader(false)
        setGetOneGoodsDev(true)
        setIsIdReceivedCard2(true);



      })
      .catch(err => {
        console.log(err)
        //setIsLoader(false)

      })
  }


  const updateBasket = (basketData) => {
    //idUser, idGoods 
    const token = JSON.parse(localStorage.getItem('token'))
    //setIsLoader(true)
    console.log(token)
    axios.post('https://songbird21.ru:5000/api/basket/update', basketData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        return res.data
      })
      .then(data => {
        console.log(data)
        //setIsLoader(false)
        setGetSumGoodsDev(true)
      })
      .catch(err => {
        console.log(err)
        //setIsLoader(false)

      })
  }


  const deleteBasket = (basketData) => {
    const token = JSON.parse(localStorage.getItem('token'))

    //setIsLoader(true)
    axios.post('https://songbird21.ru:5000/api/basket/delete', basketData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        //setIsLoader(false)
        setGoodsBasketDep(true)
        setGetOneGoodsDev(true)
        setIsIdReceivedCard2(true);
        //if (dep) {
        //  setIsIdReceivedCard2(true);
        //} else {
        //  setGetOneGoodsDev(true)
        //}

      })
      .catch(error => {
        console.log(error)
        //setIsLoader(false)
      })

  }


  const sumBasketGoods = (data) => {
    console.log(data)
    let list = data.list.sort((a, b) => a.idGoods - b.idGoods)
    console.log(list)
    let sum = 0;
    data.goods.forEach((e, i) => { sum += list[i].count * e.price })
    setSumBaske(sum)
  }


  const getGoodsBasket = (loader) => {
    const token = JSON.parse(localStorage.getItem('token'))

    if (loader) setIsLoader(true)
    axios.get('https://songbird21.ru:5000/api/basket/get-goods', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setBasket(data)
        setIsCountBasket(data.list.length)
        sumBasketGoods(data)
        setIsLoader(false)
      })
      .catch(error => {
        console.log(error)
        setIsLoader(false)
      })

  }





  const getBasket = (basketData) => {
    const token = JSON.parse(localStorage.getItem('token'))

    //setIsLoader(true)
    console.log(token)
    axios.post('https://songbird21.ru:5000/api/basket/get', basketData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        return res.data
      })
      .then(data => {
        console.log(data)
        setIsBasket(data)
        let arr = JSON.parse(data.lists)
        setIsCountBasket(arr.length)
        //setIsLoader(false)
        setCheckBasket(true)
      })
      .catch(err => {
        console.log(err)
        //setIsLoader(false)

      })
  }






  //------------------------------------------------------------------------------------Order--------------------------------------------------------------


  const addOrder = (orderData) => {
    //idUser, idGoods 
    const token = JSON.parse(localStorage.getItem('token'))
    setIsLoader(true)
    console.log(token)
    axios.post('https://songbird21.ru:5000/api/order/add', orderData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        return res.data
      })
      .then(data => {
        console.log(data)
        setIsIdReceivedCard2(true)
        setIsLoader(false)

      })
      .catch(err => {
        console.log(err)
        setIsLoader(false)

      })
  }


  const getOrders = () => {
    const token = JSON.parse(localStorage.getItem('token'))

    axios.get('https://songbird21.ru:5000/api/order/get-orders', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setOrders(data)
        setIsLoader(false)
      })
      .catch(error => {
        console.log(error)
        setIsLoader(false)
      })

  }
  const getOrder = () => {
    const token = JSON.parse(localStorage.getItem('token'))

    axios.get('https://songbird21.ru:5000/api/order/get-order', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setOrder(data)
        setIsLoader(false)
      })
      .catch(error => {
        console.log(error)
        setIsLoader(false)
      })

  }

  const setStatusOrder = (orderData) => {
    //idUser, idGoods 
    const token = JSON.parse(localStorage.getItem('token'))
    setIsLoader(true)
    console.log(token)
    axios.post('https://songbird21.ru:5000/api/order/set-status', orderData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        return res.data
      })
      .then(data => {
        console.log(data)
        setIsLoader(false)

      })
      .catch(err => {
        console.log(err)
        setIsLoader(false)

      })
  }




  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('token'));
    if (settingDepend) { getSettingApi(); setSettingDepend(false) }
    if (isIdReceivedCard) { getFavorites(); setIsIdReceivedCard(false) } //???????????????????????????????????????????????
    if (isIdReceivedCard2) { getBasket(); setIsIdReceivedCard2(false) } //???????????????????????????????????????????????

    if (isIdReceived) { getFavorites(); getBasket(); setIsIdReceived(false) }
    //if (token && tokenDepend) console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'); loginUserAuth(); getUserId(); getUsersData(); userRole(); setTokenDepend(false)
    if (isRoleEff) { userRole(); setIsRoleEff(false); }
    if (categoryDepend) { getAllCategoryApi(); setCategoryDepend(false) }
    if (getSumGoodsDev) { getGoodsBasket(false), setGetSumGoodsDev(false) }
  }, [isRoleEff, isIdReceived, isIdReceivedCard, isIdReceivedCard2, tokenDepend, settingDepend, categoryDepend, getSumGoodsDev])

  useMemo(() => {
    let token = JSON.parse(localStorage.getItem('token'));
    if (token && tokenDepend) {
      console.log('sdfssssss')

      loginUserAuth();
      getUserId();
      getUsersData();
      userRole();
      setTokenDepend(false)
    }

  }, [tokenDepend])

  return (
    <UserContextt.Provider value={{
      setStatusOrder,
      getOrder,
      getOrders,
      addOrder,
      orders,
      order,
      updateBasket,
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
      getCategoryGoodsNoload,
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
      setIsFavorites,
      editUserDataApi,
      isUser,
      getUsersData,
      isEffectUser,
      setIsEffectUser,
      switchOrderModal,
      setSwitchOrderModal,
      sendMessageTelegram,
      formSecces,
      setFormSecces,
      checkBasket,
      setCheckBasket,
      basket,
      isBasket,
      isCountBasket,
      addBasket,
      deleteBasket,
      setIsIdReceivedCard2,
      getGoodsBasket,
      sumBaske,
      GoodsBasketDep,
      setGoodsBasketDep,
      GoodsFavoriteDep,
      setGoodsFavoriteDep,
      getOneGoodsUserApi,
      getOneGoodsDev,
      setGetOneGoodsDev,
      currentImg,
      setCurrentImg,
      setCategoryDepend,
      messageAdmin,
      setMessageAdmin,
      messageAdminShow,
      setMessageAdminShow,
      users,
      setUsers,
      category,
      setCategory,
      goods,
      setGoods
    }}>
      {children}
    </UserContextt.Provider>
  )
}

export default UserContext

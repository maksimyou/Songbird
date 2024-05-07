import { createSlice, createAsyncThunk, thunkAPI } from '@reduxjs/toolkit'
import { setIsLoader } from './globalSlice'
import axios from 'axios'
import { setIsLoader } from './globalSlice'
import { useDispatch } from 'react-redux'
const initialState = {
    IsAuth: false,
    isPassword: false,
}

const fetchLoginUserAuth = createAsyncThunk(
    'IsAuth/fetchByIdStatus',
    async (_, { rejectWithValue, dispatch, getState }) => {
        const token = JSON.parse(localStorage.getItem('token'))


        axios.get('https://songbird21.ru/api/user/auth', {
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
                rejectWithValue(err.response.message)
            })
    },
)

const fetchPassswordConfirm = createAsyncThunk(
    'password/fetchPassswordConfirm',
    async (passwordData, { rejectWithValue, dispatch, getState }) => {
        const token = JSON.parse(localStorage.getItem('token'))
        dispatch(setIsLoader(true))
        axios.post('https://songbird21.ru/api/user/passsword-confirm', passwordData, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => res.data)
            .then(data => {
                console.log(data)
                dispatch(setIsPassword(data.ok))
                dispatch(setIsLoader(false))
            })
            .catch(error => {
                console.log(error.message)
                dispatch(setIsLoader(false))

            })
    },


)


const deleteUserApi = (userData) => {
    const token = JSON.parse(localStorage.getItem('token'))

    setIsLoader(true)
    axios.post('https://songbird21.ru/api/user/delete', userData, {
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



export const useSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setIsPassword: (state, action) => {
            state.isPassword = action.payload
        },

        deleteUserApi: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
        },
        editUserApi: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
        },
        editUserDataApi: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
        },
        userRole: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
        },
        getUsers: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
        },
        getUsersData: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
        },
        registrationApi: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
        },
        generationCodeApi: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
        },
        postConfirmationApi: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
        },
        loginApi: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
        },
        getUserId: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
        },
        exitUser: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
        },

    },
    extraReducers: {
        [fetchLoginUserAuth.pending]: (state) => {
            state.IsAuth = false
        },
        [fetchLoginUserAuth.fulfilled]: (state, action) => {
            state.IsAuth = true
        },
        [fetchPassswordConfirm.fulfilled]: (state, action) => {
            if (state.IsAuth) {
                state.IsAuth = false
                localStorage.removeItem('token')
            }
        },
        [fetchLoginUserAuth.rejected]: (state, action) => {
            state.IsAuth = false
        },

    }
})





//const loginUserAuth = () => {
//    const token = JSON.parse(localStorage.getItem('token'))

//    axios.get('https://songbird21.ru/api/user/auth', {
//        headers: {
//            Authorization: 'Bearer ' + token
//        }
//    })
//        .then(res => {
//            return res.data
//        })
//        .then(data => {
//            setIsAuth(true)
//            console.log("Токены совпадают: ", data.token === token)
//        })
//        .catch(err => {
//            setIsAuth(false)
//            console.log(err, "Токены не совпадают")
//        })
//}


//const passswordConfirm = (passwordData) => {


//    const token = JSON.parse(localStorage.getItem('token'))

//    setIsLoader(true)
//    axios.post('https://songbird21.ru/api/user/passsword-confirm', passwordData, {
//        headers: {
//            Authorization: 'Bearer ' + token
//        }
//    })
//        .then(res => res.data)
//        .then(data => {
//            console.log(data)
//            setIsPassword(data.ok)
//            localStorage.removeItem('token')
//            setIsAuth(false)
//            setIsLoader(false)
//        })
//        .catch(error => {
//            console.log(error.message)
//            setIsLoader(false)
//        })

//}


const deleteUserApi = (userData) => {
    const token = JSON.parse(localStorage.getItem('token'))

    setIsLoader(true)
    axios.post('https://songbird21.ru/api/user/delete', userData, {
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
    axios.post('https://songbird21.ru/api/user/edit-user', userData, {
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
    axios.post('https://songbird21.ru/api/user/edit-data-user', userData, {
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
    axios.get('https://songbird21.ru/api/user/get-role', {

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
    axios.get('https://songbird21.ru/api/user/get-users', {
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
    axios.get('https://songbird21.ru/api/user/get-user', {
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
    axios.post('https://songbird21.ru/api/user/registration', userData)
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
    axios.post('https://songbird21.ru/api/user/generation-code', userData)
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
    axios.post('https://songbird21.ru/api/user/confirm-mail', userData)
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
    axios.post('https://songbird21.ru/api/user/login', userData)
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
    axios.get('https://songbird21.ru/api/user/get-id', {
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










// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = useSlice.actions

export default useSlice.reducer
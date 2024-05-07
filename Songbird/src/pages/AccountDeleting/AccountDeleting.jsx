import React, { useEffect, useState } from 'react'
import './AccountDeleting.scss'
import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs'
import { UserContextFunc } from '../../Context/UserContext'
function AccountDeleting() {


    const { isAuth, isPassword, passswordConfirm } = UserContextFunc()

    const [password, setPasword] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const [devPass, setDevPass] = useState(false)

    const [error, setError] = useState(false)



    useEffect(() => {
        document.title = 'Удаление аккаунта | Певчий Сластник' || 'songbird21.ru'

    }, [])

    const validationApiPassword = async () => {
        if (password.trim().length) {
            await passswordConfirm({ password })
            await showMessageFunc()
            setError(false)
        } else {
            setError(true)
        }

    }
    const showMessageFunc = async () => {
        if (!isPassword) { setShowMessage(true) } else {
            setShowMessage(false)
        }
    }

    useEffect(() => {
        console.log('sssssssssssssssss')
        if (devPass) {
            validationApiPassword()
            setDevPass(false)
        }
    }, [devPass])


    //useEffect(() => {
    //    console.log('dsssssssssssssdfgs')

    //    if (!isPassword) { setShowMessage(true) } else {
    //        setShowMessage(false)
    //    }
    //}, [isPassword])



    return (
        isAuth ? <div className='account-deleting-container'>
            <div className="account-deleting-content">
                <BreadCrumbs textLink={['Удаление аккаунта', '']} location={location} />
                <h1 className="account-deleting-title">Удаление аккаунта</h1>
                <>
                    <div className="account-deleting-text">Для обеспечения безопасности, пожалуйста, введите свой пароль, чтобы подтвердить удаление аккаунта.</div>
                    <input style={error ? { border: '1px solid red' } : {}} value={password} onChange={(e) => setPasword(e.target.value)} className='account-deleting-input' type="password" placeholder='Введите пароль' />
                    {showMessage && <div className="account-deleting-text2">Неправильный пароль. Пожалуйста, попробуйте еще раз.</div>}
                    <button onClick={() => { setDevPass(true) }} className='account-deleting-btn'>Подтвердить</button>
                </>
            </div>
        </div> :
            <> {
                isPassword ?
                    <div className="account-deleting-success">Ваш аккаунт успешно удален. Спасибо за то, что пользовались нашим сайтом!</div>
                    :
                    <div className="account-deleting-empty">У вас нет доступа для продолжения пожалуйста авторизуйтесь</div>
            }</>
    )
}

export default AccountDeleting
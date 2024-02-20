import React, { useEffect, useState } from 'react'
import './Header.scss'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import UserPanel from '../UserPanel/UserPanel'
import { UserContextFunc } from '../../Context/UserContext'


function Header() {
    const { setIsFavorites, setIsCountFavorites, isCountFavorites, setToggleModal, isSetting, setIsSwitchCategory, getAllGoodsApi, getAllCategoryApi, loginApi, registrationApi, isAuth, setIsAuth, loginUserAuth, userFirstName, isFirstName, exitUser, isRole, isCategory } = UserContextFunc()
    const [exit, setExit] = useState()
    const [navShow, setNavShow] = useState(false)
    useEffect(() => {
        getAllCategoryApi()
        if (exit) exitUser(); setExit(); setIsCountFavorites(0); setIsFavorites({ lists: "[]" })
    }, [exit])

    const formatPhone = (str) => {
        return `+${str.slice(0, 1)} (${str.slice(1, 4)}) ${str.slice(4, 7)} ${str.slice(7, 9)} ${str.slice(9, 11)}`
    }


    console.log(isSetting)
    return (
        <div className='header-container'>
            <div className="header-content-1">
                <div className="header-logo">
                    <Link to="/"><img src={logo} alt="" /></Link>
                    <div className="header-logo-text">
                        <div className="header-logo-title">Певчий сластник</div>
                        <div className="header-logo-subtitle">Кондитерские изделия,торты</div>
                    </div>
                    <div className="header-navigation">
                        <ul>
                            <li className='header-nav-link'><Link to="/">Главная</Link></li>
                            <li onMouseEnter={() => setNavShow(true)} onMouseLeave={() => setNavShow(false)} className='header-nav-link'><a href="#">Продукция</a></li>
                            <div onMouseEnter={() => setNavShow(true)} onMouseLeave={() => setNavShow(false)} className={navShow ? "submenu submenu-show " : "submenu"}>
                                <ul>
                                    {
                                        isCategory.map(e => {
                                            return <li onClick={() => { setIsSwitchCategory(true) }} key={e.id}><Link to={`products/${e.route}`}>{e.name}</Link></li>
                                        })
                                    }
                                </ul>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className="contacts-address-registration">
                    <a className='contacts' href={isSetting ? `tel:${isSetting.phone}` : "tel+72345678904"}>{isSetting ? formatPhone(isSetting.phone) : "+7 (234) 567 89 04"}</a>
                    <div className="address">{isSetting ? isSetting.address : "г. Москва, Ленинский проспект"}</div>
                    {isAuth ? <UserPanel isCountFavorites={isCountFavorites} isRole={isRole} setExit={setExit} /> : <div onClick={() => setToggleModal(true)} className="registration">Вход / Регистрация</div>}
                </div>
            </div>
        </div>
    )
}

export default Header


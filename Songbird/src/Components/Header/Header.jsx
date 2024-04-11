import React, { useEffect, useState } from 'react'
import './Header.scss'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import UserPanel from '../UserPanel/UserPanel'
import Burger from '../Burger/Burger'
import { UserContextFunc } from '../../Context/UserContext'
import resize from '../../Hooks/resize'

function Header() {
    const { isCountBasket, setIsFavorites, setIsCountFavorites, isCountFavorites, setToggleModal, isSetting, setIsSwitchCategory, getAllGoodsApi, getAllCategoryApi, loginApi, registrationApi, isAuth, setIsAuth, loginUserAuth, isFirstName, exitUser, isRole, isCategory } = UserContextFunc()
    const [exit, setExit] = useState()
    const [navShow, setNavShow] = useState(false)
    const [burgerToggle, setBurgerToggle] = useState(true)

    const [width, hight] = resize();

    useEffect(() => {
        getAllCategoryApi()
        if (exit) exitUser(); setExit(); setIsCountFavorites(0); setIsFavorites({ lists: "[]" })
    }, [exit])

    //const formatPhone = (str) => {
    //    return `+${str.slice(0, 1)} (${str.slice(1, 4)}) ${str.slice(4, 7)} ${str.slice(7, 9)} ${str.slice(9, 11)}`
    //}

    return (
        <div className='header-container'>
            <div className="header-content-1">
                <div className="header-logo">
                    <Link to="/"><img src={logo} alt="" /></Link>
                    {width >= 500 && <div className="header-logo-text">
                        <div className="header-logo-title">Певчий сластник</div>
                        <div className="header-logo-subtitle">Кондитерские изделия,торты</div>
                    </div>}
                    {width >= 1051 ? <div className="header-navigation">
                        <ul>
                            <li className='header-nav-link'><Link to="/">Главная</Link></li>
                            <li onMouseEnter={() => setNavShow(true)} onMouseLeave={() => setNavShow(false)} className='header-nav-link'><a href="#">Продукция</a></li>
                            <div onMouseEnter={() => setNavShow(true)} onMouseLeave={() => setNavShow(false)} className={navShow ? "submenu submenu-show animate__animated animate__fadeIn" : "submenu"}>
                                <ul>
                                    {
                                        isCategory.map(e => {
                                            return <li onClick={() => { setIsSwitchCategory(true) }} key={e.id}><Link to={`products/${e.route}`}>{e.name}</Link></li>
                                        })
                                    }
                                </ul>
                            </div>
                        </ul>
                    </div> : ''}
                </div>
                <div className="contacts-address-registration">
                    {width >= 901 && <>
                        <a className='contacts' href={isSetting ? `tel:${isSetting.phone.replace(/[\(|\)|_|\-|\+)]/g, '')}` : "tel+72345678904"}>{isSetting ? isSetting.phone : "+7 (234) 567 89 04"}</a>
                        <div className="address">{isSetting ? isSetting.address : "г. Москва, Ленинский проспект"}</div>
                        {isAuth ? <UserPanel isCountBasket={isCountBasket} isCountFavorites={isCountFavorites} isRole={isRole} setExit={setExit} /> : <div onClick={() => setToggleModal(true)} className="registration">Вход / Регистрация</div>}
                    </>}
                </div>

                {width <= 1050 ? <div className='header-user-panel-burger'>
                    {width <= 900 ? isAuth ? <UserPanel isCountBasket={isCountBasket} isCountFavorites={isCountFavorites} isRole={isRole} setExit={setExit} /> : <div onClick={() => setToggleModal(true)} className="registration">Вход / Регистрация</div> : ''}
                    <div style={{ marginTop: '25px' }} onClick={() => { setBurgerToggle(!burgerToggle) }} className={burgerToggle ? "burger-btn" : "burger-btn active"}></div>
                </div> : ''}
                {width <= 1050 ? <Burger isSetting={isSetting} width={width} burgerToggle={burgerToggle} setBurgerToggle={setBurgerToggle} setNavShow={setNavShow} isCategory={isCategory} setIsSwitchCategory={setIsSwitchCategory} navShow={navShow} /> : ''}
            </div>
        </div>
    )
}

export default Header


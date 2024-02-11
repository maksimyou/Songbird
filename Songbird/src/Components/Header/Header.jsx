import React, { useEffect, useState } from 'react'
import './Header.scss'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import UserPanel from '../UserPanel/UserPanel'
import { UserContextFunc } from '../../Context/UserContext'

function Header({ setToggleModal }) {
    const { loginApi, registrationApi, isAuth, setIsAuth, loginUserAuth, userFirstName, isFirstName, exitUser, isRole } = UserContextFunc()
    const [exit, setExit] = useState()
    const [navShow, setNavShow] = useState(false)
    useEffect(() => {
        if (exit) exitUser(); setExit();
    }, [exit])
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
                                    <li><Link to="products/cakes">Торты</Link></li>
                                    <li><Link to="products/dessert">Десерты</Link></li>
                                    <li><Link to="products/capture">Капкейки</Link></li>
                                    <li><Link to="products/biscuit">Печенье</Link></li>
                                </ul>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className="contacts-address-registration">
                    <a className='contacts' href="tel:+1234567890"> +7 (234) 567 89 04 </a>
                    <div className="address">г. Москва, Ленинский проспект</div>
                    {isAuth ? <UserPanel isRole={isRole} setExit={setExit} /> : <div onClick={() => setToggleModal(true)} className="registration">Регистрация</div>}
                </div>
            </div>
        </div>
    )
}

export default Header


import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Burger.scss'
import { UserContextFunc } from '../../Context/UserContext'
import arrowr from '../../assets/arrow-right.png'

function Burger({ isSetting, width, burgerToggle, setBurgerToggle, setNavShow, isCategory, setIsSwitchCategory, navShow }) {
    const [submenuProduct, setSubmenuProduct] = useState(true)
    return (
        <div className={burgerToggle ? 'burger-container' : 'burger-container burger-container-active '}>
            <div className="burger-content">
                <div onClick={() => { setBurgerToggle(!burgerToggle) }} className={burgerToggle ? "burger-btn" : "burger-btn active"}></div>
                {burgerToggle ? '' : <div className="burger-menu">
                    <ul>
                        <li onClick={() => { setBurgerToggle(!burgerToggle) }} className='header-nav-link-burger'><Link to="/">Главная</Link></li>
                        <li onClick={() => { setNavShow(!navShow) }} className='header-nav-link-burger'>
                            <a href="#">Продукция</a>
                            <img className={submenuProduct ? '' : 'active-arrow'} onClick={() => setSubmenuProduct(!submenuProduct)} src={arrowr} alt="" />
                        </li>
                        {submenuProduct ? '' : <div className={navShow ? "submenu-burger submenu-show-burger " : "submenu-burger"}>
                            <ul>
                                {
                                    isCategory.map(e => {
                                        return <li className='submenu-burger-link' onClick={() => { setSubmenuProduct(!submenuProduct); setBurgerToggle(!burgerToggle); setIsSwitchCategory(true) }} key={e.id}><Link to={`products/${e.route}`}>{e.name}</Link></li>
                                    })
                                }
                            </ul>
                        </div>}
                        <li onClick={() => { setBurgerToggle(!burgerToggle) }} className='header-nav-link-burger'><Link to="/contacts">Контакты</Link></li>
                    </ul>
                    {width <= 900 && <div className='setting-burger-block'>
                        <a className='contacts' href={isSetting ? `tel:${isSetting.phone.replace(/[\(|\)|_|\-|\+)]/g, '')}` : "tel+72345678904"}>{isSetting ? isSetting.phone : "+7 (234) 567 89 04"}</a>
                        <div className="address">{isSetting ? isSetting.address : "г. Москва, Ленинский проспект"}</div>
                    </div>}
                </div>}

            </div>
        </div>
    )
}

export default Burger


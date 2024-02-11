import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './UserPanel.scss'
import person from '../../assets/person-outline.svg'
import heart from '../../assets/heart-outline.svg'
import bag from '../../assets/bag-outline.svg'


function UserPanel({ setExit, isRole }) {
    const [personShow, setPersonShow] = useState(false)
    return (
        <div className='user-panel-container'>
            <div className="user-panel-content">
                <div onMouseLeave={() => { setPersonShow(false) }} onMouseEnter={() => { setPersonShow(true) }} className="user-panel-link"><img src={person} alt="" /></div>
                <div className="user-panel-link"><Link to='favorites'><img src={heart} alt="" /></Link></div>
                <div className="user-panel-link"><Link to='basket-of-goods'><img src={bag} alt="" /></Link></div>
                {personShow ? <div onMouseLeave={() => { setPersonShow(false) }} onMouseEnter={() => { setPersonShow(true) }} className="person-menu">
                    <ul>
                        <li><Link className='person-menu-link' to='personal-area'>Личный кабинет</Link></li>
                        {isRole === "ADMIN" ? <li><Link className='person-menu-link' to='admin'>Админка</Link></li> : ''}
                        <li><Link className='person-menu-link' to='basket-of-goods'>Корзина</Link></li>
                        <li onClick={() => { setExit(true) }}><Link className='person-menu-link-exit' to=''>Выход</Link></li>

                    </ul>
                </div> : ''}
                <div className="heart-menu"></div>
                <div className="bag-menu"></div>

            </div>
        </div >
    )
}

export default UserPanel

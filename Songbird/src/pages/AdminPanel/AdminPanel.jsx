import React, { useEffect } from 'react'

import { Link, Outlet } from 'react-router-dom'
import { UserContextFunc } from '../../Context/UserContext'
import './AdminPanel.scss'
function AdminPanel() {

    const { getAllCategoryApi, getAllGoodsApi, loginApi, registrationApi, isAuth, setIsAuth, loginUserAuth, userFirstName, isFirstName, exitUser, isRole, setIsRole, userRole, isUsers, getUsers } = UserContextFunc()

    useEffect(() => {
        getUsers()
        getAllGoodsApi()
    }, [])
    return (
        <div className='admin-panel-container'>
            <div className="admin-panel-content">
                < div className="admin-panel-content" >
                    <div className="admin-panel-title">Админка</div>
                    <div className="admin-panel-interaction">
                        <div className="admin-panel-sidebar">
                            <ul>
                                <li><Link className='admin-panel-sidebar-list' to='settings-site'>Настройки сайта</Link></li>
                                <li><Link className='admin-panel-sidebar-list' to='adding-goods'>Добавление товара</Link></li>
                                <li><Link className='admin-panel-sidebar-list' to='adding-category'>Добавление категорий</Link></li>
                                <li><Link className='admin-panel-sidebar-list' to='list-user'>Список пользователей</Link></li>
                                <li><Link className='admin-panel-sidebar-list' to='list-category'>Список категорий</Link></li>
                                <li><Link className='admin-panel-sidebar-list' to='list-goods'>Список всех товаров</Link></li>
                            </ul>
                        </div>
                        <Outlet />
                    </div>
                </div >
            </div>
        </div>
    )
}

export default AdminPanel
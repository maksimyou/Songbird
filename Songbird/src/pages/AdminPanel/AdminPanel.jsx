import React, { useEffect } from 'react'

import { Link, NavLink, Outlet } from 'react-router-dom'
import { UserContextFunc } from '../../Context/UserContext'

import ModalAdmin from '../../Components/ModalAdmin/ModalAdmin'
import './AdminPanel.scss'
function AdminPanel() {

    const { getOrders, orders, messageAdminShow, getAllCategoryApi, getAllGoodsApi, loginApi, registrationApi, isAuth, setIsAuth, loginUserAuth, isFirstName, exitUser, isRole, setIsRole, userRole, isUsers, getUsers } = UserContextFunc()

    useEffect(() => {
        if (isAuth) {
            getUsers()
            getAllGoodsApi()
            getOrders()
        }
        document.title = 'Админка | Певчий Сластник' || 'songbird21.ru'
    }, [])
    return (
        isAuth ? <div className='admin-panel-container'>
            {messageAdminShow ? <ModalAdmin /> : ''}
            <div className="admin-panel-content">
                < div className="admin-panel-content" >
                    <div className="admin-panel-title">Админка</div>
                    <div className="admin-panel-interaction">
                        <div className="admin-panel-sidebar">
                            <ul>
                                <li>
                                    <NavLink className={({ isActive }) =>
                                        isActive
                                            ? "admin-panel-sidebar-list-active"
                                            : "admin-panel-sidebar-list-pending"

                                    } to='settings-site'>Настройки сайта</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) =>
                                        isActive
                                            ? "admin-panel-sidebar-list-active"
                                            : "admin-panel-sidebar-list-pending"

                                    } to='settings-main-page'>Настройка главной страницы</NavLink>
                                </li>

                                <li>
                                    <NavLink className={({ isActive }) =>
                                        isActive
                                            ? "admin-panel-sidebar-list-active"
                                            : "admin-panel-sidebar-list-pending"

                                    } to='adding-goods'>Добавление товара</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) =>
                                        isActive
                                            ? "admin-panel-sidebar-list-active"
                                            : "admin-panel-sidebar-list-pending"

                                    } to='adding-category'>Добавление категорий</NavLink></li>
                                <li><NavLink className={({ isActive }) =>
                                    isActive
                                        ? "admin-panel-sidebar-list-active"
                                        : "admin-panel-sidebar-list-pending"

                                } to='list-user'>Список пользователей</NavLink></li>
                                <li><NavLink className={({ isActive }) =>
                                    isActive
                                        ? "admin-panel-sidebar-list-active"
                                        : "admin-panel-sidebar-list-pending"

                                } to='list-category'>Список категорий</NavLink></li>
                                <li><NavLink className={({ isActive }) =>
                                    isActive
                                        ? "admin-panel-sidebar-list-active"
                                        : "admin-panel-sidebar-list-pending"

                                } to='list-goods'>Список всех товаров</NavLink></li>
                                <li><NavLink className={({ isActive }) =>
                                    isActive
                                        ? "admin-panel-sidebar-list-active"
                                        : "admin-panel-sidebar-list-pending"

                                } to='list-orders'>Список заказов</NavLink></li>
                                <li><NavLink className={({ isActive }) =>
                                    isActive
                                        ? "admin-panel-sidebar-list-active"
                                        : "admin-panel-sidebar-list-pending"

                                } to='bonuses'>Бонусы</NavLink></li>
                            </ul>
                        </div>
                        <Outlet />
                    </div>
                </div >
            </div>
        </div> :
            <div className="admin-panel-empty-list ">У вас нет доступа</div>
    )
}

export default AdminPanel
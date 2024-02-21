import React, { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './PersonalArea.scss'
import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs'

import { UserContextFunc } from '../../Context/UserContext'

function PersonalArea() {

    const { isUser, loginApi, registrationApi, isAuth, setIsAuth, loginUserAuth, exitUser, isRole, setIsRole, userRole } = UserContextFunc()

    useEffect(() => {

    }, [])

    return (<>
        {isAuth ? <div className='personal-area-container'>
            < div className="personal-area-content" >
                <BreadCrumbs textLink={['Личный кабинет']} location={location} />

                <div className="personal-area-title-greetings">
                    <div className="personal-area-title">Личный кабинет.</div><div className="personal-area-greetings">{`Привет ${isUser.name} !`}</div>
                </div>
                <div className="personal-area-interaction">
                    <div className="personal-area-sidebar">
                        <ul>
                            <li><NavLink className={({ isActive }) =>
                                isActive
                                    ? "personal-area-sidebar-active"
                                    : "personal-area-sidebar-pending"

                            } to='my-data'>Мои данные</NavLink></li>
                            <li><NavLink className={({ isActive }) =>
                                isActive
                                    ? "personal-area-sidebar-active"
                                    : "personal-area-sidebar-pending"

                            } to='history-of-orders'>История заказов</NavLink></li>
                            <li><NavLink className={({ isActive }) =>
                                isActive
                                    ? "personal-area-sidebar-active"
                                    : "personal-area-sidebar-pending"

                            } to='bonus-account'>Бонусный счет</NavLink></li>
                            <li><NavLink className={({ isActive }) =>
                                isActive
                                    ? "personal-area-sidebar-active"
                                    : "personal-area-sidebar-pending"

                            } to='want-to-try'>Хочу попробовать</NavLink></li>
                        </ul>
                    </div>
                    <Outlet />
                </div>
            </div >
        </div > : <div className='no-access'>У вас не доcтупа к этой странице</div>
        }
    </>)
}



export default PersonalArea


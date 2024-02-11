import React, { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import './PersonalArea.scss'

import { UserContextFunc } from '../../Context/UserContext'

function PersonalArea() {
    const { loginApi, registrationApi, isAuth, setIsAuth, loginUserAuth, userFirstName, isFirstName, exitUser, isRole, setIsRole, userRole } = UserContextFunc()

    return (<>
        {isAuth ? <div className='personal-area-container'>
            < div className="personal-area-content" >
                <div className="personal-area-title">Личный кабинет пользователя</div>
                <div className="personal-area-interaction">
                    <div className="personal-area-sidebar">
                        <ul>
                            <li><Link to=''>Мои данные</Link></li>
                            <li><Link to='history-of-orders'>История заказов</Link></li>
                            <li><Link to=''>Бонусный счет</Link></li>
                            <li><Link to=''>Хочу попробовать</Link></li>
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


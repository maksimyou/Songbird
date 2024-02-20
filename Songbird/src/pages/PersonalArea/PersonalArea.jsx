import React, { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import './PersonalArea.scss'
import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs'

import { UserContextFunc } from '../../Context/UserContext'

function PersonalArea() {
    const { loginApi, registrationApi, isAuth, setIsAuth, loginUserAuth, userFirstName, isFirstName, exitUser, isRole, setIsRole, userRole } = UserContextFunc()

    useEffect(() => {
        userFirstName()
    }, [])

    return (<>
        {isAuth ? <div className='personal-area-container'>
            < div className="personal-area-content" >
                <BreadCrumbs textLink={['Личный кабинет']} location={location} />

                <div className="personal-area-title-greetings">
                    <div className="personal-area-title">Личный кабинет.</div><div className="personal-area-greetings">{`Привет ${isFirstName} !`}</div>
                </div>
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


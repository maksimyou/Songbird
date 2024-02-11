import React, { useEffect } from 'react'
import './ListUser.scss'
import { UserContextFunc } from '../../Context/UserContext'

function ListUser() {

    const { loginApi, registrationApi, isAuth, setIsAuth, loginUserAuth, userFirstName, isFirstName, exitUser, isRole, setIsRole, userRole, isUsers, getUsers } = UserContextFunc()
    console.log(isUsers)
    return (
        <div className='list-user'>
            <table>
                {
                    isUsers.map(e =>
                        <tr key={e.id}>
                            <td>идентификатор: {e.id}</td>
                            <td>имя: {e.name}</td>
                            <td>Почта: {e.email}</td>
                            <td>Пароль: {e.password}</td>
                            <td>Роль: {e.role}</td>
                        </tr>
                    )
                }
            </table>

        </div>
    )
}

export default ListUser
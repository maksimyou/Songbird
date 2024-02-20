import React, { useEffect, useState } from 'react'
import './ListUser.scss'
import { UserContextFunc } from '../../Context/UserContext'
import ListUserItem from '../ListUserItem/ListUserItem'

function ListUser() {
    const [users, setUsers] = useState()

    const { deleteUserApi, editUserApi, loginApi, registrationApi, isAuth, setIsAuth, loginUserAuth, userFirstName, isFirstName, exitUser, isRole, setIsRole, userRole, isUsers, getUsers } = UserContextFunc()
    console.log(isUsers)
    useEffect(() => {
        getUsers();
    }, [])
    useEffect(() => {
        if (users) getUsers(); setUsers(false);
    }, [users])
    return (
        <div className="list-user-container">
            <div className="list-user-title-refresh">
                <div className="list-user-title">Список пользователей</div>
                <div onClick={() => { setUsers(true) }} className="list-user-refresh">Обновить</div>
            </div>
            <div className='list-user'>
                <div className="list-user-header">
                    <div className="list-user-header-id">Ид:</div>
                    <div className="list-user-header-name">Имя:</div>
                    <div className="list-user-header-mail">Почта:</div>
                    <div className="list-user-header-confirmed">Состояние:</div>
                    <div className="list-user-header-role">Роль:</div>
                    <div className="list-user-header-setting">Настройки:</div>

                </div>
                {
                    isUsers.map(e =>
                        <ListUserItem deleteUserApi={deleteUserApi} editUserApi={editUserApi} key={e.id} id={e.id} name={e.name} mail={e.email} confirmed={e.confirmed} role={e.role} />
                    )
                }
            </div>
        </div>
    )
}

export default ListUser
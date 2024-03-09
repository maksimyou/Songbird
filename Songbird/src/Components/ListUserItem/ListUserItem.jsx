import React, { useEffect, useState } from 'react'
import './ListUserItem.scss'

import resize from '../../Hooks/resize'

function ListUserItem({ deleteUserApi, editUserApi, id, name, mail, confirmed, role }) {
    const [width, hight] = resize();

    const [mode, setMode] = useState(false);
    const [rolle, setRole] = useState(role);
    const [edit, setEdit] = useState();
    const [deletee, setDelete] = useState();



    useEffect(() => {
        if (deletee) deleteUserApi({ id }); setDelete(false)
        if (edit) editUserApi({ id: id, role: rolle }); setEdit(false)
    }, [edit, deletee])

    return (
        width >= 1260 ?
            <div className='list-user-item-container'>
                <div className="list-user-item-content">
                    <div className="list-user-id">{id}</div>
                    <div className="list-user-name">{name}</div>
                    <div className="list-user-mail">{mail}</div>
                    <div className={confirmed ? "user-active list-user-confirmed" : "user-inactive list-user-confirmed"}>{confirmed ? 'Активен' : 'Не активен'}</div>
                    <div className="list-user-role">{mode ?
                        <select onChange={(e) => { setRole(e.target.value) }} className='list-user-name-input' defaultValue={rolle} type="text" >
                            <option value="ADMIN">Администратор</option>
                            <option value="MODERATOR">Модератор</option>
                            <option value="USER">Пользователь</option>
                        </select>
                        : role}</div>
                    <div onClick={() => {
                        if (mode) { setEdit(true) }
                        setMode(!mode)
                    }} className="list-user-edit">{mode ? 'Сохранить роль' : 'Изменить роль'}</div>
                    {/*{mode && <div onClick={() => { setMode(false) }} className="list-category-item-cancel">Отмена</div>}*/}

                    <div onClick={() => setDelete(true)} className="list-user-delete">Удалить</div>
                </div>
            </div>
            :
            <div className='list-user-item-card-container'>
                <div className="list-user-item-card-content">
                    <div className="list-user-id-card"><span className='list-user-item-card-section'>Ид:</span> {id}</div>
                    <div className="list-user-name-card"><span className='list-user-item-card-section'>Имя:</span> {name}</div>
                    <div className="list-user-mail-card"><span className='list-user-item-card-section'>Почта:</span>{mail}</div>
                    <div className={confirmed ? "user-active list-user-confirmed-card" : "user-inactive list-user-confirmed-card"}>{confirmed ? <><span className='list-user-item-card-section'>Статус:</span> Активен</> : <><span className='list-user-item-card-section'>Статус:</span> Не активен</>}</div>
                    <div className="list-user-role-card">{mode ?
                        <select onChange={(e) => { setRole(e.target.value) }} className='list-user-name-input-card' defaultValue={rolle} type="text" >
                            <option value="ADMIN">Администратор</option>
                            <option value="MODERATOR">Модератор</option>
                            <option value="USER">Пользователь</option>
                        </select>
                        : <><span className='list-user-item-card-section'>Роль:</span> {role}</>}</div>
                    <div onClick={() => {
                        if (mode) { setEdit(true) }
                        setMode(!mode)
                    }} className="list-user-edit-card">{mode ? 'Сохранить роль' : 'Изменить роль'}</div>

                    <div onClick={() => setDelete(true)} className="list-user-delete-card">Удалить</div>
                </div>
            </div>
    )
}


export default ListUserItem
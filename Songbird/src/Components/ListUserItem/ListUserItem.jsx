import React, { useEffect, useState } from 'react'
import './ListUserItem.scss'
function ListUserItem({ deleteUserApi, editUserApi, id, name, mail, confirmed, role }) {

    const [mode, setMode] = useState(false);
    const [rolle, setRole] = useState(role);
    const [edit, setEdit] = useState();
    const [deletee, setDelete] = useState();



    useEffect(() => {
        if (deletee) deleteUserApi({ id }); setDelete(false)
        if (edit) editUserApi({ id: id, role: rolle }); setEdit(false)
    }, [edit, deletee])

    return (
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
    )
}

export default ListUserItem
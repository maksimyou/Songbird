import React, { useState } from 'react'

import './ListOrdersItem.scss'
import resize from '../../Hooks/resize'
function ListOrdersItem({ setStatusOrder, setToggleMoreOrder, filterSetOrdersData, updatedAt, name, id, paymentBonus, typeDelivery, priceGoods, idStatus }) {

    const [width, hight] = resize();
    const [selectedStatus, setSelectedStatus] = useState(idStatus)
    const [editStatus, setEditStatus] = useState(false)
    const status = {
        1: 'Новый',
        2: 'В обработке',
        3: 'Ожидает оплаты',
        4: 'Отправлен',
        5: 'Доставлен',
        6: 'Отменен',
    }


    return (
        width >= 1260 ?
            <div className='list-orders-item-container'>
                <div className="list-orders-item-content">
                    <div className="list-orders-id">{id}</div>
                    <div className="list-orders-name">{name}</div>
                    <div className="list-orders-status">
                        {
                            editStatus
                                ?
                                <select
                                    value={selectedStatus} // ...force the select's value to match the state variable...
                                    onChange={e => { setSelectedStatus(e.target.value) }} // ... and update the state variable on any change!
                                >
                                    <option value="1">Новый</option>
                                    <option value="2">В обработке</option>
                                    <option value="3">Ожидает оплаты</option>
                                    <option value="4">Отправлен</option>
                                    <option value="5">Доставлен</option>
                                    <option value="6">Отменен</option>
                                </select>
                                :
                                <div style={selectedStatus <= 4 ? { color: "blue" } : Number(selectedStatus) === 5 ? { color: "green" } : { color: "red" }} className="">{status[selectedStatus]}</div>
                        }

                    </div>
                    <div className="list-orders-created">{`Дата: ${updatedAt.slice(0, 10)} Время: ${updatedAt.slice(12, -5)}`}</div>
                    <div className="list-orders-all">{typeDelivery ? (priceGoods - paymentBonus) + 450 + ' ₽' : priceGoods - paymentBonus + ' ₽'}</div>

                    <div className="list-orders-action">
                        <div onClick={() => { filterSetOrdersData(id); setToggleMoreOrder(true) }} className="list-orders-action-more"></div>
                        <div className="list-orders-action-delete"></div>
                        {editStatus
                            ?
                            <div className="list-orders-action-save-cancel">
                                <div onClick={() => { setStatusOrder({ idStatus: selectedStatus, idOrder: id }); setEditStatus(!editStatus) }} className="">Сохранить</div>
                                <div onClick={() => { setEditStatus(!editStatus) }} className="">Отмена</div>
                            </div>
                            :
                            <div onClick={() => { setEditStatus(!editStatus) }} className="list-orders-action-edit">-</div>
                        }
                    </div>

                </div>
            </div >
            :
            //<div className='list-user-item-card-container'>
            //    <div className="list-user-item-card-content">
            //        <div className="list-user-id-card"><span className='list-user-item-card-section'>Ид:</span> {id}</div>
            //        <div className="list-user-name-card"><span className='list-user-item-card-section'>Имя:</span> {name}</div>
            //        <div className="list-user-mail-card"><span className='list-user-item-card-section'>Почта:</span>{mail}</div>
            //        <div className={confirmed ? "user-active list-user-confirmed-card" : "user-inactive list-user-confirmed-card"}>{confirmed ? <><span className='list-user-item-card-section'>Статус:</span> Активен</> : <><span className='list-user-item-card-section'>Статус:</span> Не активен</>}</div>
            //        <div className="list-user-role-card">{mode ?
            //            <select onChange={(e) => { setRole(e.target.value) }} className='list-user-name-input-card' defaultValue={rolle} type="text" >
            //                <option value="ADMIN">Администратор</option>
            //                <option value="MODERATOR">Модератор</option>
            //                <option value="USER">Пользователь</option>
            //            </select>
            //            : <><span className='list-user-item-card-section'>Роль:</span> {role}</>}</div>
            //        <div onClick={() => {
            //            if (mode) { setEdit(true) }
            //            setMode(!mode)
            //        }} className="list-user-edit-card">{mode ? 'Сохранить роль' : 'Изменить роль'}</div>

            //        <div onClick={() => setDelete(true)} className="list-user-delete-card">Удалить</div>
            //    </div>
            //</div>
            ''
    )
}

export default ListOrdersItem
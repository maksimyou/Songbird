import React from 'react'
import './HistoryOfOrdersItem.scss'


function HistoryOfOrdersItem({ noPayment, paymentMethod, coordination, setIdOrder, setToggleCancelOrder, setToggleMoreOrder, filterSetOrdersData, id, idStatus, list, chargedBonuses, paymentBonus, priceGoods, typeDelivery }) {
    const status = {
        1: 'Новый',
        2: 'В обработке',
        3: 'Ожидает оплаты',
        4: 'Отправлен',
        5: 'Доставлен',
        6: 'Отменен',
    }


    return (
        <div className='history-of-orders-item-container'>
            <div className="history-of-orders-item-content">
                <div className="history-of-orders-item-text">№ <span>{id}</span></div>
                <div className="history-of-orders-item-text">Общая цена: <span>{priceGoods} ₽</span></div>
                <div className="history-of-orders-item-text">Получено бонусов: <span>{chargedBonuses} ₽</span></div>
                <div className="history-of-orders-item-text">Списано бонусов: <span>{paymentBonus} ₽</span></div>
                <div style={{ display: "flex", flexDirection: "column" }} className="history-of-orders-item-text">Способ оплаты: <span>{noPayment ? 'По согласованию' : paymentMethod}</span></div>
                <div className="history-of-orders-item-text">Тип доставки: <span>{coordination ? 'По согласованию' : typeDelivery}</span></div>
                <div className="history-of-orders-item-text">Статус: <span style={idStatus <= 4 ? { color: "blue" } : Number(idStatus) === 5 ? { color: "green" } : { color: "red" }}>{status[idStatus]}</span></div>
                <button onClick={() => { setToggleMoreOrder(true); filterSetOrdersData(id) }} className='history-of-orders-item-btn'>Подробнее</button>
                {idStatus !== 6 && <button onClick={() => { setToggleCancelOrder(true); setIdOrder(id) }} className='history-of-orders-item-btn'>Отменить заказ</button>}
                <button className='history-of-orders-item-btn'>Оставить отзыв</button>
            </div>
        </div>
    )
}

export default HistoryOfOrdersItem
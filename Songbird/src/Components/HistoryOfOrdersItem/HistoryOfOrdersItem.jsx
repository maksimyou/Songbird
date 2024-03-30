import React from 'react'
import './HistoryOfOrdersItem.scss'


function HistoryOfOrdersItem({ setToggleMoreOrder, filterSetOrdersData, id, idStatus, list, chargedBonuses, paymentBonus, priceGoods, typeDelivery }) {
    const status = {
        1: 'Новый',
        2: 'В обработке',
        3: 'Ожидает оплаты',
        4: 'Отправлен',
        5: 'Доставлен',
        6: 'Отменен',
    }
    //{
    //    "email": "admin@mail.ru",
    //    "phone": "79196543804",
    //    "name": "Максим",

    //    "id": 3,
    //    "idUser": 1,
    //    "list": "[{\"idGoods\":19,\"count\":1},{\"idGoods\":20,\"count\":1}]",
    //    "adress": "{\"city\":\"\",\"street\":\"\",\"house\":\"\",\"entrance\":\"\",\"floor\":\"\",\"apartmentt\":\"\",\"comments\":\"\",\"date\":\"\",\"time\":\"\"}",
    //    "paymentMethod": "Наличными",
    //    "paymentBonus": 150,
    //    "typeDelivery": "Курьер",
    //    "chargedBonuses": 80,
    //    "priceGoods": 2464,
    //    "idStatus": 1,
    //  }



    return (
        <div className='history-of-orders-item-container'>
            <div className="history-of-orders-item-content">
                <div className="history-of-orders-item-text">№ <span>{id}</span></div>
                <div className="history-of-orders-item-text">Общая цена: <span>{priceGoods} ₽</span></div>
                <div className="history-of-orders-item-text">Получено бонусов: <span>{chargedBonuses} ₽</span></div>
                <div className="history-of-orders-item-text">Списано бонусов: <span>{paymentBonus} ₽</span></div>
                <div className="history-of-orders-item-text">Тип доставки: <span>{typeDelivery}</span></div>
                <div className="history-of-orders-item-text">Статус: <span style={idStatus <= 4 ? { color: "blue" } : Number(idStatus) === 5 ? { color: "green" } : { color: "red" }}>{status[idStatus]}</span></div>
                <button onClick={() => { setToggleMoreOrder(true); filterSetOrdersData(id) }} className='history-of-orders-item-btn'>Подробннее</button>
                <button className='history-of-orders-item-btn'>Оставить отзыв</button>
            </div>
        </div>
    )
}

export default HistoryOfOrdersItem
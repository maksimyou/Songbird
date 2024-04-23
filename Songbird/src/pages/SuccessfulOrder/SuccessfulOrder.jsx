import React from 'react'
import { Link } from 'react-router-dom'
import './SuccessfulOrder.scss'

import { UserContextFunc } from '../../Context/UserContext'
import { useEffect } from 'react'

function SuccessfulOrder() {
    const { isAuth, infoOrder, isSetting } = UserContextFunc()

    console.log(infoOrder)
    useEffect(() => {
        document.title = 'Заказ оформлен | Певчий Сластник' || 'songbird21.ru'
    }, [])
    return (
        isAuth ?
            <div className='successful-order-container'>
                <div className="successful-order-content">
                    <h1 className='successful-order-title'>Ваш заказ успешно оформлен!</h1>
                    <p className='successful-order-text'>Номер заказа: <strong>{infoOrder.id}</strong></p>
                    <p className='successful-order-text'>Дата заказа: <strong>{infoOrder.updatedAt.slice(0, 10)}</strong></p>
                    <p className='successful-order-text'>Сумма заказа: <strong>{infoOrder.priceGoods}  ₽</strong></p>
                    <p className='successful-order-text'>Способ оплаты: <strong>{infoOrder.noPayment ? 'По согласованию' : infoOrder.paymentMethod}</strong></p>
                    <p className='successful-order-text'>Способ доставки: <strong>{infoOrder.coordination ? 'По согласованию' : infoOrder.typeDelivery}</strong></p>
                    <br />
                    <p className='successful-order-text'>Спасибо за ваш заказ! Мы рады, что вы выбрали наш магазин.</p>
                    <p className='successful-order-text'>Ваш заказ успешно оформлен. В ближайшее время с вами свяжется наш сотрудник.</p>
                    <p className='successful-order-text'>Вы получите после оплаты <strong>{infoOrder.chargedBonuses}  ₽</strong> бонусных баллов за этот заказ.</p>
                    <p className='successful-order-text'>Используйте ваши бонусные баллы для получения скидки на будущие покупки.</p>
                    <p className='successful-order-text'>Мы сообщим вам по электронной почте, когда ваш заказ будет отправлен.</p>
                    <p className='successful-order-text'>Вы можете отслеживать статус вашего заказа по электронной почте или в <Link className='successful-order-link' to={'/personal-area/history-of-orders'}>Личном кабинете.</Link></p>
                </div>
            </div>
            :
            <div className="successful-order-empty">У вас нет доступа</div>
    )
}

export default SuccessfulOrder
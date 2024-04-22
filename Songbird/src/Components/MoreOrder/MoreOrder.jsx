import React, { useEffect, useState } from 'react'
import './MoreOrder.scss'



function MoreOrder({ setToggleMoreOrder, dataMoreOrder }) {
    const [adress, setAdress] = useState({
        city: '',
        street: '',
        house: '',
        apartmentt: '',
        comments: ''
    })

    useEffect(() => {
        setAdress(dataMoreOrder.adress)
    }, [])


    return (
        <div onClick={() => setToggleMoreOrder(false)} className='more-order-container  animate__animated animate__fadeIn'>
            <div onClick={(e) => e.stopPropagation()} className="more-order-content">
                <div onClick={() => setToggleMoreOrder(false)} className="more-order-close"></div>
                <div className="more-order-info">
                    <h2 className='more-order-info-user'>Информация о покупателе</h2>
                    <div className="more-order-info-name">Имя:<span className=''>{dataMoreOrder.name}</span></div>
                    <div className="more-order-info-email">Почта:<span>{dataMoreOrder.email}</span></div>
                    <div className="more-order-info-phone">Телефон:<span>{dataMoreOrder.phone}</span></div>
                    <h2 className='more-order-info-user'>Информация о доставке</h2>

                    <div className="more-order-info-delivery">Способ доставки: <span>{dataMoreOrder.coordination ? 'По соглосованию' : dataMoreOrder.typeDelivery}</span></div>
                    {dataMoreOrder.typeDelivery === 'Курьер'
                        ?
                        <div className="adres-wrap">
                            <div className="more-order-info-adress">Адрес доставки:</div>
                            <ul className="more-order-info-adress-list">
                                <li>Город: <span>{adress.city}</span></li>
                                <li>Улица: <span>{adress.street}</span></li>
                                <li>Дом: <span>{adress.house}</span></li>
                                <li>Квартира:  <span>{adress.apartmentt}</span></li>
                            </ul>
                        </div>

                        :
                        ''}
                    <h2 className='more-order-info-user'>Другая информация</h2>

                    {adress.comments ? <div className="more-order-info-comments">Комментарии: <span>{adress.comments}</span></div> : ''}
                    <div className="more-order-info-payment-method">Способ оплаты:<span> {dataMoreOrder.paymentMethod}</span></div>
                    <div className="more-order-info-payment-bonus">Оплачено бонусами: <span>{`${dataMoreOrder.paymentBonus} ₽`}</span></div>
                    <div className="more-order-info-payment-bonus">Стоимость товара(-ов): <span>{`${dataMoreOrder.priceGoods} ₽`}</span></div>

                    <div className="more-order-info-charged-bonus">Будет начислено бонусов:<span>{`${dataMoreOrder.chargedBonuses} ₽`}</span></div>
                    <div className="more-order-info-charged-bonus">

                        {dataMoreOrder.typeDelivery == 'Курьер'
                            ?
                            `Итоговая сумма после вычета бонусов, с включением стоимости доставки:`
                            :
                            `Итоговая сумма после вычета бонусов:`}
                        {dataMoreOrder.typeDelivery == 'Курьер'
                            ?
                            <span>{`${dataMoreOrder.priceGoods - dataMoreOrder.paymentBonus + 450} ₽`}</span>
                            :
                            <span>{`${dataMoreOrder.priceGoods - dataMoreOrder.paymentBonus} ₽`}</span>
                        }
                    </div>
                </div>
                <div className="more-order-order-list">
                    <h2 className='more-order-info-user'>Информация о товаре</h2>

                    <ul>
                        {dataMoreOrder.list.map(e => {
                            return <>
                                <div className="more-order-order-list-item">
                                    <div className="more-order-order-list-img">
                                        <img src={`https://songbird21.ru/img/${e.imageURL[0]}`} alt="" />
                                    </div>
                                    <div className="more-order-order-list-item-item">№ <span>{e.idGoods}</span></div>
                                    <div className="more-order-order-list-item-item">Название: <span>{e.name}</span></div>
                                    <div className="more-order-order-list-item-item">Количество: <span>{e.count}</span>
                                        {e.quantity
                                            ?
                                            <div className="">шт</div>
                                            :
                                            <div className="">кг</div>
                                        }
                                    </div>
                                    <div className="more-order-order-list-item-item">Цена: <span>{`${e.price} ₽`}</span></div>
                                </div>
                            </>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MoreOrder
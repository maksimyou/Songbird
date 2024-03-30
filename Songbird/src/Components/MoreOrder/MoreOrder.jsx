import React, { useState } from 'react'
import './MoreOrder.scss'



function MoreOrder({ setToggleMoreOrder, dataMoreOrder }) {
    const [adress, setAdress] = useState(dataMoreOrder.adress)


    console.log(adress)
    //email={email} phone name id list adress paymentMethod paymentBonus typeDelivery chargedBonuses priceGoods idStatus
    //"{\"city\":\"\",\"street\":\"\",\"house\":\"\",\"entrance\":\"\",\"floor\":\"\",\"apartmentt\":\"\",\"comments\":\"\",\"date\":\"\",\"time\":\"\"}",





    //{
    //    "idGoods": 19,
    //    "count": 1,
    //    "name": "dfgdfgd345345",
    //    "quantity": true,
    //    "price": 1232,
    //    "imageURL": "[\"1b015978-df2d-426e-b093-8ff2e798cd70.png\",\"c1904e78-eb60-43a3-94c3-fe1868e9872b.png\",\"147d6439-5d20-451b-a3e9-74bb53e9e230.png\"]"
    //  }


    //`https://songbird21.ru/img/

    return (
        <div className='more-order-container  animate__animated animate__fadeIn'>
            <div className="more-order-content">
                <div onClick={() => setToggleMoreOrder(false)} className="more-order-close"></div>
                <div className="more-order-info">
                    <h2 className='more-order-info-user'>Информация о покупателе</h2>
                    <div className="more-order-info-name">Имя:<span className=''>{dataMoreOrder.name}</span></div>
                    <div className="more-order-info-email">Почта:<span>{dataMoreOrder.email}</span></div>
                    <div className="more-order-info-phone">Телефон:<span>{dataMoreOrder.phone}</span></div>
                    <h2 className='more-order-info-user'>Информация о доставке</h2>

                    <div className="more-order-info-delivery">Способ доставки: <span>{dataMoreOrder.typeDelivery ? 'Курьером' : 'Самовывоз'}</span></div>
                    {dataMoreOrder.typeDelivery
                        ?
                        <div className="adres-wrap">
                            <div className="more-order-info-adress">Адрес доставки:</div>
                            <ul className="more-order-info-adress-list">
                                <li>Город: <span>{adress.city}</span></li>
                                <li>Улица: <span>{adress.street}</span></li>
                                <li>Дом: <span>{adress.entrance}</span></li>
                                <li>Подъезд: <span>{adress.house}</span></li>
                                <li>Этаж:  <span>{adress.floor}</span></li>
                                <li>Квартира:  <span>{adress.apartmentt}</span></li>
                            </ul>
                        </div>

                        :
                        ''}
                    <h2 className='more-order-info-user'>Другая информация</h2>

                    {adress.comments ? <div className="more-order-info-comments">Комментарии: <span>{adress.comments}</span></div> : ''}
                    <div className="more-order-info-payment-method">Способ оплаты:<span> {dataMoreOrder.paymentMethod}</span></div>
                    <div className="more-order-info-payment-bonus">Оплачено бонусами: <span>{`${dataMoreOrder.paymentBonus} ₽`}</span></div>
                    <div className="more-order-info-charged-bonus">Будет начислено бонусов:<span>{`${dataMoreOrder.chargedBonuses} ₽`}</span></div>
                    <div className="more-order-info-charged-bonus">

                        {dataMoreOrder.typeDelivery
                            ?
                            `Финальная сумма после вычета бонусов, с включением стоимости доставки:`
                            :
                            `Финальная сумма после вычета бонусов:`}
                        {dataMoreOrder.typeDelivery
                            ?
                            <span>{`${dataMoreOrder.priceGoods - dataMoreOrder.paymentBonus + 450} ₽`}</span>
                            :
                            <span>{`${dataMoreOrder.chargedBonuses - dataMoreOrder.paymentBonus} ₽}`}</span>
                        }
                    </div>


                </div>
                <div className="more-order-order-list">
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
                                            <div className="">кг</div>
                                            :
                                            <div className="">шт</div>
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
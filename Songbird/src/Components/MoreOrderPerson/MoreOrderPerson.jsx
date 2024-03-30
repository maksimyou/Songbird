import React from 'react'
import './MoreOrderPerson.scss'



function MoreOrderPerson({ setToggleMoreOrder, dataMoreOrder }) {


    return (
        <div className='more-order-person-container'>
            <div className="more-order-person-content">
                <div onClick={() => setToggleMoreOrder(false)} className="more-order-person-close"></div>
                <div className="more-order-person-list-item2">
                    <div className="more-order-person-list-img">
                    </div>
                    <div className="more-order-person-list-item-item">№</div>
                    <div className="more-order-person-list-item-item">Название</div>
                    <div className="more-order-person-list-item-item">Количество</div>
                    <div className="more-order-person-list-item-item">Цена</div>
                </div>
                < ul >
                    {
                        dataMoreOrder.map(e => {
                            return <>

                                <div className="more-order-person-list-item">
                                    <div className="more-order-person-list-img">
                                        <img src={`https://songbird21.ru/img/${e.imageURL[0]}`} alt="" />
                                    </div>
                                    <div className="more-order-person-list-item-item"><span>{e.idGoods}</span></div>
                                    <div className="more-order-person-list-item-item"><span>{e.name}</span></div>
                                    <div className="more-order-person-list-item-item"><span>{e.count} {e.quantity
                                        ?
                                        'кг'
                                        :
                                        'шт'
                                    }</span>

                                    </div>
                                    <div className="more-order-person-list-item-item"><span>{`${e.price} ₽`}</span></div>
                                </div>
                            </>
                        })
                    }
                </ul >
            </div>
        </div>
    )
}

export default MoreOrderPerson


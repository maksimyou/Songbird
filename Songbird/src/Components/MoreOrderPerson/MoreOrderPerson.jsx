import React from 'react'
import './MoreOrderPerson.scss'
import resize from '../../Hooks/resize'

function MoreOrderPerson({ setToggleMoreOrder, dataMoreOrder }) {
    const [width, hight] = resize();


    return (
        <div onClick={() => { setToggleMoreOrder(false) }} className='more-order-person-container'>
            <div onClick={(e) => { e.stopPropagation(); }} className="more-order-person-content">
                <div onClick={() => setToggleMoreOrder(false)} className="more-order-person-close"></div>
                {width > 1070 && < div className="more-order-person-list-item2">
                    <div className="more-order-person-list-img">
                    </div>
                    {/*<div className="more-order-person-list-item-item">№</div>*/}
                    <div className="more-order-person-list-item-item">Название</div>
                    <div className="more-order-person-list-item-item">Количество/Вес</div>
                    <div className="more-order-person-list-item-item">Цена</div>
                </div>}
                < ul >
                    {width > 1070 ?
                        dataMoreOrder.map(e => {
                            return <>

                                <div className="more-order-person-list-item">
                                    <div className="more-order-person-list-img">
                                        <img src={`https://songbird21.ru/img/${e.imageURL[0]}`} alt="" />
                                    </div>
                                    {/*<div className="more-order-person-list-item-item"><span>{e.idGoods}</span></div>*/}
                                    <div className="more-order-person-list-item-item"><span>{e.name}</span></div>
                                    <div className="more-order-person-list-item-item"><span>{e.count} {e.quantity
                                        ?
                                        'шт'
                                        :
                                        'кг'
                                    }</span>
                                    </div>
                                    <div className="more-order-person-list-item-item"><span>{`${e.price} ₽`}</span></div>
                                </div>
                            </>
                        })
                        :
                        dataMoreOrder.map(e => {
                            return <>

                                <div className="more-order-person-list-item">
                                    <div className="more-order-person-list-img">
                                        <img src={`https://songbird21.ru/img/${e.imageURL[0]}`} alt="" />
                                    </div>
                                    {/*<div className="more-order-person-list-item-item">№ <span>{e.idGoods}</span></div>*/}
                                    <div className="more-order-person-list-item-item">Название <span>{e.name}</span></div>
                                    <div className="more-order-person-list-item-item">Количество/Вес <span>{e.count} {e.quantity
                                        ?
                                        'шт'
                                        :
                                        'кг'
                                    }</span>

                                    </div>
                                    <div className="more-order-person-list-item-item">Цена <span>{`${e.price} ₽`}</span></div>
                                </div>
                            </>
                        })
                    }
                </ul >
            </div>
        </div >
    )
}

export default MoreOrderPerson


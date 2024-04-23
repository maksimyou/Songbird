import React, { useEffect } from 'react'
import './ListOrders.scss'
import { UserContextFunc } from '../../Context/UserContext'
import resize from '../../Hooks/resize'
import ListOrdersItem from '../ListOrdersItem/ListOrdersItem'
import MoreOrder from '../MoreOrder/MoreOrder'
import { useState } from 'react'
function ListOrders() {
    const { orders, getOrders, setStatusOrder, isSetting } = UserContextFunc()
    const [width, hight] = resize();
    const [toggleMoreOrder, setToggleMoreOrder] = useState(false)
    const [dataMoreOrder, setDataMoreOrder] = useState({})

    const [actual, setActual] = useState(true)
    const [completed, setCompleted] = useState(true)

    console.log(orders);
    const filterSetOrdersData = (num) => {
        let dataOrder = orders.filter(e => e.id === num)[0]
        console.log(dataOrder)
        setDataMoreOrder(dataOrder)
    }


    useEffect(() => {
        document.title = 'Список заказов | Певчий Сластник' || 'songbird21.ru'

        getOrders()
    }, [])


    return (
        <div className='list-orders-container'>
            {toggleMoreOrder ? <MoreOrder isSetting={isSetting} setToggleMoreOrder={setToggleMoreOrder} dataMoreOrder={dataMoreOrder} /> : ''}
            <div className="list-orders-content">
                <div className="list-orders-title">Список заказов</div>
                <div className="list-orders-btns">
                    <button onClick={() => setActual(!actual)} className={actual ? 'list-orders-btn' : 'list-orders-btn-disabled'}>Актуальные</button>
                    <button onClick={() => setCompleted(!completed)} className={completed ? 'list-orders-btn' : 'list-orders-btn-disabled'}> Завершенные</button>
                </div>
                <div className='list-orders'>
                    {width >= 1260 &&
                        <div className="list-orders-header">
                            <div className="list-orders-header-id">Заказ №</div>
                            <div className="list-orders-header-buyer">Покупатель</div>
                            <div className="list-orders-header-status">Статус</div>
                            <div className="list-orders-header-all">Создан</div>
                            <div className="list-orders-header-created">Всего</div>
                            <div className="list-orders-header-action">Действие</div>
                        </div>}
                    {
                        orders.map(e =>
                            completed && e.idStatus >= 5 ?
                                <ListOrdersItem
                                    key={e.id}
                                    setStatusOrder={setStatusOrder}
                                    name={e.name}
                                    id={e.id}
                                    paymentBonus={e.paymentBonus}
                                    typeDelivery={e.typeDelivery}
                                    priceGoods={e.priceGoods}
                                    idStatus={e.idStatus}
                                    updatedAt={e.updatedAt}
                                    filterSetOrdersData={filterSetOrdersData}
                                    setToggleMoreOrder={setToggleMoreOrder}
                                />
                                : actual && e.idStatus <= 4 ?
                                    <ListOrdersItem
                                        key={e.id}
                                        setStatusOrder={setStatusOrder}
                                        name={e.name}
                                        id={e.id}
                                        paymentBonus={e.paymentBonus}
                                        typeDelivery={e.typeDelivery}
                                        priceGoods={e.priceGoods}
                                        idStatus={e.idStatus}
                                        updatedAt={e.updatedAt}
                                        filterSetOrdersData={filterSetOrdersData}
                                        setToggleMoreOrder={setToggleMoreOrder}
                                    />
                                    :
                                    ''
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ListOrders
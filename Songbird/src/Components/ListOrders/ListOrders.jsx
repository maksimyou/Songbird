import React, { useEffect } from 'react'
import './ListOrders.scss'
import { UserContextFunc } from '../../Context/UserContext'
import resize from '../../Hooks/resize'
import ListOrdersItem from '../ListOrdersItem/ListOrdersItem'
import MoreOrder from '../MoreOrder/MoreOrder'
import { useState } from 'react'
function ListOrders() {
    const { orders, getOrders, setStatusOrder } = UserContextFunc()
    const [width, hight] = resize();
    const [toggleMoreOrder, setToggleMoreOrder] = useState(false)
    const [dataMoreOrder, setDataMoreOrder] = useState({})
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
            {toggleMoreOrder ? <MoreOrder setToggleMoreOrder={setToggleMoreOrder} dataMoreOrder={dataMoreOrder} /> : ''}
            <div className="list-orders-content">
                <div className="list-orders-title">Список заказов</div>
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
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ListOrders
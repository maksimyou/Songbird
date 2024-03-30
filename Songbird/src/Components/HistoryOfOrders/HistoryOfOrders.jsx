import React, { useState } from 'react'
import './HistoryOfOrders.scss'
import { UserContextFunc } from '../../Context/UserContext'
import HistoryOfOrdersItem from '../HistoryOfOrdersItem/HistoryOfOrdersItem'
import MoreOrderPerson from '../MoreOrderPerson/MoreOrderPerson'

import { useEffect } from 'react'
function HistoryOfOrders() {
    const { getOrder, order, isUser } = UserContextFunc()
    const [toggleMoreOrder, setToggleMoreOrder] = useState(false)
    const [dataMoreOrder, setDataMoreOrder] = useState({})

    const filterSetOrdersData = (num) => {
        let dataOrder = order.filter(e => e.id === num)[0]
        console.log(dataOrder)
        setDataMoreOrder(dataOrder)
    }

    //getOrder({ id: isUser.id })
    useEffect(() => {



    }, [])

    console.log(order)
    return (
        <div className='history-of-orders-container'>
            {toggleMoreOrder ? <MoreOrderPerson setToggleMoreOrder={setToggleMoreOrder} dataMoreOrder={dataMoreOrder.list} /> : ''}
            <div className="history-of-orders-content">
                <h1 className='history-of-orders-title'>История заказов</h1>
                <div className="history-of-orders-items">
                    {order.map(e => {
                        return <HistoryOfOrdersItem setToggleMoreOrder={setToggleMoreOrder} filterSetOrdersData={filterSetOrdersData} id={e.id} idStatus={e.idStatus} list={e.list} chargedBonuses={e.chargedBonuses} paymentBonus={e.paymentBonus} priceGoods={e.priceGoods} typeDelivery={e.typeDelivery} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default HistoryOfOrders
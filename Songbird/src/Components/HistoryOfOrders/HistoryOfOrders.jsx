import React, { useState } from 'react'
import './HistoryOfOrders.scss'
import { UserContextFunc } from '../../Context/UserContext'
import HistoryOfOrdersItem from '../HistoryOfOrdersItem/HistoryOfOrdersItem'
import MoreOrderPerson from '../MoreOrderPerson/MoreOrderPerson'
import ModalOrderCancell from '../ModalOrderCancell/ModalOrderCancell'


import { useEffect } from 'react'
function HistoryOfOrders() {
    const { getOrder, order, isUser, setStatusOrder, isSetting } = UserContextFunc()
    const [toggleMoreOrder, setToggleMoreOrder] = useState(false)
    const [toggleCancelOrder, setToggleCancelOrder] = useState(false)
    const [devOrder, setDevOrder] = useState(false)

    const [idOrder, setIdOrder] = useState(0)

    const [dataMoreOrder, setDataMoreOrder] = useState({})
    const [actual, setActual] = useState(true)
    const [completed, setCompleted] = useState(true)
    const filterSetOrdersData = (num) => {
        let dataOrder = order.filter(e => e.id === num)[0]
        console.log(dataOrder)
        setDataMoreOrder(dataOrder)
    }


    useEffect(() => {

        if (devOrder) { setStatusOrder({ idStatus: '6', idOrder: idOrder }); setDevOrder(false) }

    }, [devOrder])


    useEffect(() => {
        document.title = 'История заказов | Певчий Сластник' || 'songbird21.ru'
    }, [])

    console.log(order)
    return (
        <div className='history-of-orders-container'>
            {toggleCancelOrder && <ModalOrderCancell setToggleCancelOrder={setToggleCancelOrder} setDevOrder={setDevOrder} />}
            {toggleMoreOrder ? <MoreOrderPerson setToggleMoreOrder={setToggleMoreOrder} dataMoreOrder={dataMoreOrder.list} /> : ''}
            <div className="history-of-orders-content">
                <h1 className='history-of-orders-title'>История заказов</h1>

                <div className="history-of-orders-btns">
                    <button onClick={() => setActual(!actual)} className={actual ? 'history-of-orders-btn' : 'history-of-orders-btn-disabled'}>Актуальные</button>
                    <button onClick={() => setCompleted(!completed)} className={completed ? 'history-of-orders-btn' : 'history-of-orders-btn-disabled'}> Завершенные</button>
                </div>
                <div className="history-of-orders-items">
                    {order.map(e => {
                        return completed && e.idStatus >= 5 ?
                            <HistoryOfOrdersItem noPayment={e.noPayment} setIdOrder={setIdOrder} setToggleCancelOrder={setToggleCancelOrder} setToggleMoreOrder={setToggleMoreOrder} filterSetOrdersData={filterSetOrdersData} id={e.id} idStatus={e.idStatus} list={e.list} chargedBonuses={e.chargedBonuses} paymentBonus={e.paymentBonus} priceGoods={e.priceGoods} typeDelivery={e.typeDelivery} paymentMethod={e.paymentMethod} coordination={e.coordination} />
                            : actual && e.idStatus <= 4 ?
                                <HistoryOfOrdersItem noPayment={e.noPayment} setIdOrder={setIdOrder} setToggleCancelOrder={setToggleCancelOrder} setToggleMoreOrder={setToggleMoreOrder} filterSetOrdersData={filterSetOrdersData} id={e.id} idStatus={e.idStatus} list={e.list} chargedBonuses={e.chargedBonuses} paymentBonus={e.paymentBonus} priceGoods={e.priceGoods} typeDelivery={e.typeDelivery} paymentMethod={e.paymentMethod} coordination={e.coordination} />
                                :
                                ''
                    })}
                </div>
            </div>
        </div>
    )
}

export default HistoryOfOrders
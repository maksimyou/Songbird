import React from 'react'
import './ModalOrderCancell.scss'
import { UserContextFunc } from '../../Context/UserContext'

function ModalOrderCancell({ setToggleCancelOrder, setDevOrder }) {

    return (
        <div className='modal-order-cancell-container animate__animated animate__fadeIn animate__faster'>
            <div className="modal-order-cancell-content">
                <div className="modal-order-cancell-message">Вы точно хотите отменить заказ?</div>
                <div className="modal-order-cancell-btns">
                    <button className='modal-order-cancell-btn' onClick={() => { setDevOrder(true); setToggleCancelOrder(false) }}>Да</button>
                    <button className='modal-order-cancell-btn' onClick={() => { setToggleCancelOrder(false) }}>Нет</button>
                </div>

            </div>
        </div>
    )
}

export default ModalOrderCancell
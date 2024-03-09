import React, { useState } from 'react'
import './OrderModal.scss'
import close from '../../assets/close.png'
import { UserContextFunc } from '../../Context/UserContext'


function OrderModal() {
    const { switchOrderModal, setSwitchOrderModal,sendMessageTelegram,formSecces,setFormSecces } = UserContextFunc()
    const [value1, setValue1] = useState(false)
    const [agree, setAgree] = useState(false)
    const [message, setMessage] = useState(false)



    const [orderData, setOrderData] = useState({
        name: '',
        phone: '',
        text: '',
    })

    const CheckingPhone = (str) => {
        if (str.length >= 1) {
            setValue1(true)
            setOrderData({ ...orderData, phone: str })
        } else {
            setValue1(false)
        }

    }
    
  return (
    switchOrderModal?<div className='order-modal-container animate__animated animate__fadeIn'>
        <div className="order-modal-content">
            <img onClick={()=>{setSwitchOrderModal(false);setFormSecces(true)}} className='order-modal-close' src={close} alt="" />
            {formSecces?<>
                <div className="order-modal-title">Заказать</div>
                <div className="order-modal-subtitle">Мы перезвоним вам в течении 10 минут</div>
                <form className='order-modal-form' action="">
                    <input onChange={(e)=>setOrderData({ ...orderData, name: e.target.value })} placeholder='Введите имя' className='order-modal-input' type="text" />
                    <input onChange={(e)=>CheckingPhone(e.target.value)} placeholder='Введите номер телефона' className='order-modal-input' type="text" />
                {message&&!value1?<div className="order-modal-info">Обязательное поле для заполнения</div>:''}
                    <textarea onChange={(e)=>setOrderData({ ...orderData, text: e.target.value })} placeholder='Введите текст' className='order-modal-text' name="" id="" ></textarea>
                { message&&!agree?<div className="order-modal-info">Обязательное поле для заполнения</div>:''}
                    <label className="order-modal-agree"><input onChange={(e)=>setAgree(e.target.checked)} type="checkbox" name="" id="" />Я согласен(а) с обработкой персональных данных</label>
                    <button className='order-modal-btn' onClick={(e)=>{if(value1&&agree){setMessage(false);e.preventDefault();setFormSecces(true);sendMessageTelegram(orderData)}else{e.preventDefault();setMessage(true)}}}>Отправить</button>
                </form>
            </>:<div className='order-modal-secces'>Спасибо! Форма  отправлена.</div> }
        </div>
    </div>:''
  )
} 

export default OrderModal
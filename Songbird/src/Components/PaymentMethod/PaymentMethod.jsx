import React, { useState } from 'react'
import './PaymentMethod.scss'



function PaymentMethod({ setDevOrder, paymentBonus, setPaymentBonus, bonusAccount, typeDelivery, bonuses, sumBaske, paymentMethod, setPaymentMethod }) {


    const [bonusesPaid, setBonusesPaid] = useState(false)

    const filterSetPaymentBonus = (str) => {
        console.log(str)
        let str2 = str;
        const regex = new RegExp(/^0/g);
        if (regex.test(str2)) {
            str2 = str2.replace(/^0/g, '')
        }
        if (Number(str2) > Number(bonusAccount)) {
            return bonusAccount
        } else {
            return str2
        }

    }


    return (
        <div className='payment-method-container'>
            <div className="payment-method-content">
                <div className="payment-method-title">Способ оплаты</div>
                <div className="payment-method-options">
                    <button onClick={() => { setPaymentMethod(true) }} className={paymentMethod ? 'payment-method-options-btn' : 'payment-method-options-btn payment-method-options-btn-disabled'}>Наличными</button>
                    <button onClick={() => { setPaymentMethod(false) }} className={paymentMethod ? 'payment-method-options-btn payment-method-options-btn-disabled' : 'payment-method-options-btn'}>Картой онлайн</button>
                </div>
                <div className="payment-method-title">Мои бонусы</div>
                <div className="payment-method-your-bonus">У вас на бонусном счету: <span>{`${bonusAccount} ₽`}</span> </div>
                <div className="payment-method-bonuses">
                    <input value={paymentBonus} onChange={(e) => { setPaymentBonus(filterSetPaymentBonus(e.target.value)) }} min='0' max={bonusAccount} className='payment-method-bonuses-paid-input' type="number" />
                    <button onClick={() => { if (bonusAccount > 0) { setBonusesPaid(true) } }} className={bonusAccount > 0 ? "payment-method-bonuses-paid-btn" : "payment-method-bonuses-paid-btn payment-method-bonuses-paid-btn-disabled"}>Оплатить бонусами</button>
                </div>
                <div className="payment-method-bonuses-donate">
                    <div className="payment-method-bonuses-donate-text">Подарим бонусов:</div>
                    <div className="payment-method-bonuses-donate-money">{`${bonuses} ₽`}</div>
                </div>
                <div className="payment-method-delivery">
                    <div className="payment-method-delivery-text">Доставка:</div>
                    <div className="payment-method-delivery-money">{typeDelivery ? '450 ₽' : '0  ₽'}</div>
                </div>
                <div className="payment-method-paid-bonuses">
                    <div className="payment-method-paid-bonuses-text">Оплачено бонусами:</div>
                    <div className="payment-method-paid-bonuses-money">450 ₽</div>
                </div>
                <div className="payment-method-paid-all">
                    <div className="payment-method-paid-all-text">Всего*:</div>
                    <div className="payment-method-paid-all-money">{`${typeDelivery ? bonusesPaid ? (sumBaske - Number(paymentBonus)) + 450 : sumBaske + 450 : bonusesPaid ? (sumBaske - Number(paymentBonus)) : sumBaske} ₽`}</div>
                </div>
                <div className="">* Приблизительная стоимость заказа</div>
                <button onClick={() => setDevOrder(true)} className='payment-method-put-order-btn'>Оформить заказ</button>
                <div className="payment-method-privacy-policies">Нажимая на кнопку «оплатить заказ», я принимаю условия публичной оферты и политики конфиденциальности</div>
            </div>
        </div >
    )
}


export default PaymentMethod
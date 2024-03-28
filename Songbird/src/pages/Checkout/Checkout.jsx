import React, { useState, useEffect } from 'react'
import './Checkout.scss'
import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs'
import PaymentMethod from '../../Components/PaymentMethod/PaymentMethod'
import { UserContextFunc } from '../../Context/UserContext'

function Checkout() {
    const { setStatusOrder,
        getOrder,
        getOrders,
        addOrder,
        orders,
        basket,
        order, isAuth, isSetting, isUser, editUserDataApi, getUsersData, isEffectUser, sumBaske, setIsEffectUser } = UserContextFunc()
    const [fullAdress, setFullAdress] = useState([]);
    const [typeDelivery, setTypeDelivery] = useState(true)
    const [bonuses, setBonuses] = useState(0)
    const [paymentBonus, setPaymentBonus] = useState(0)

    const [devOrder, setDevOrder] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState(true)
    const [myData, setMyData] = useState({
        name: '',
        phone: '',
        bonusAccount: 0
    })

    //адреса
    const [adress, setAdress] = useState({
        city: '',
        street: '',
        house: '',
        entrance: '',
        floor: '',
        apartmentt: '',
        comments: '',
        date: '',
        time: '',
    })

    const filterAdress = (id) => {
        let adresss = fullAdress.filter((e, i) => i === id)
        let arr = adresss[0].split(' ').slice(1).map(e => e.split('.')[1])
        console.log(adresss, arr)
        setAdress({
            ...adress,
            city: arr[0],
            street: arr[1],
            house: arr[2],
            entrance: arr[3],
            floor: arr[4],
            apartmentt: arr[5],
        })
    }

    const countingBonuses = () => {

        setBonuses(Math.floor(sumBaske / 500) * 20)
    }



    useEffect(() => {
        if (isAuth) { getUsersData() }

    }, [])

    useEffect(() => {
        setMyData({
            name: isUser.name,
            phone: isUser.phone,
            bonusAccount: isUser.bonusAccount,
        });
        countingBonuses()
        setFullAdress(JSON.parse(isUser.adress));
        setIsEffectUser(false)
    }, [isEffectUser])

    useEffect(() => {
        if (devOrder) { addOrder({ name: myData.name, phone: myData.phone, adress: adress, paymentMethod, paymentBonus, typeDelivery }); setDevOrder(false) }
    }, [devOrder])

    return (
        isAuth ?
            <div className='checkout-container'>
                <div className="checkout-content">
                    <BreadCrumbs textLink={['Форма заказа', '']} location={location} />
                    <div className="checkout-title">Оформление заказа</div>
                    <div className="checkout-forms">
                        <div className="checkout-left">
                            <div className="checkout-subtitle">Личные данные</div>
                            <div className="checkout-left-wrap-input">
                                <input value={myData.name} onChange={(e) => { setMyData({ ...myData, name: e.target.value }) }} className='checkout-personal-data-input' type="text" placeholder='Имя' />
                                <input value={myData.phone} onChange={(e) => { setMyData({ ...myData, phone: e.target.value }) }} className='checkout-personal-data-input' type="text" placeholder='Телефон' />

                            </div>
                            <div className="checkout-subtitle">Информация по доставке</div>
                            <div className="checkout-left-wrap-btn">
                                <button onClick={() => setTypeDelivery(true)} className={typeDelivery ? 'checkout-btn' : 'checkout-btn checkout-btn-disabled'}>Курьер</button>
                                <button onClick={() => setTypeDelivery(false)} className={typeDelivery ? 'checkout-btn checkout-btn-disabled' : 'checkout-btn'}>Самовывоз</button>
                            </div>

                            {typeDelivery
                                ?
                                <div className="checkout-left-courier">
                                    <div className="checkout-personal-data-title">Выберите адрес доставки:</div>
                                    <select className='checkout-personal-data-select' onChange={(e) => {
                                        filterAdress(Number(e.target.value))
                                    }} name="" id="">
                                        <option required selected disabled hidden value=''>Выберите адрес</option>
                                        {fullAdress.map((e, id) => {
                                            return <><option value={id}>{e.split(' ').slice(1).join(' ')}</option></>
                                        })}
                                    </select>
                                    <div className="checkout-personal-data-title">Или введите новый адрес доставки:</div>
                                    <div className="checkout-left-wrap-input">
                                        <input value={adress.city} onChange={(e) => { setAdress({ ...adress, city: e.target.value }) }} className='checkout-select-address-input' type="text" placeholder='Город' />
                                        <input value={adress.street} onChange={(e) => { setAdress({ ...adress, street: e.target.value }) }} className='checkout-select-address-input' type="text" placeholder='Улица' />
                                    </div>
                                    <div className="checkout-left-wrap-input">
                                        <input value={adress.house} onChange={(e) => { setAdress({ ...adress, house: e.target.value }) }} className='checkout-select-address-input-min' type="text" placeholder='Дом' />
                                        <input value={adress.entrance} onChange={(e) => { setAdress({ ...adress, entrance: e.target.value }) }} className='checkout-select-address-input-min' type="text" placeholder='Подъезд' />
                                        <input value={adress.floor} onChange={(e) => { setAdress({ ...adress, floor: e.target.value }) }} className='checkout-select-address-input-min' type="text" placeholder='Этаж' />
                                        <input value={adress.apartmentt} onChange={(e) => { setAdress({ ...adress, apartmentt: e.target.value }) }} className='checkout-select-address-input-min' type="text" placeholder='Квартира' />
                                    </div>
                                    <textarea className='checkout-select-address-textarea' onChange={(e) => { setAdress({ ...adress, comments: e.target.value }) }} name="" id="" cols="100" rows="500" placeholder='Комментарий  (не обязательно)'></textarea>
                                    {/*<div className="checkout-left-wrap-input">
                                        <lable className='checkout-select-address-date'>
                                            Дата доставки:
                                            <input min="2018-07-01" max="2018-12-31" value={adress.date} onChange={(e) => { setAdress({ ...adress, date: e.target.value }) }} type="date" placeholder='' />
                                        </lable>
                                        <lable className='checkout-select-address-time'>
                                            Время:
                                            <input value={adress.time} onChange={(e) => { setAdress({ ...adress, time: e.target.value }) }} className='' type="time" placeholder='' />
                                        </lable>
                                    </div>*/}
                                </div>
                                :
                                <div className="checkout-left-pickup">
                                    <div className='checkout-select-address-shipment'>
                                        Адрес для самовывоза: <span>{isSetting.address}</span>
                                    </div>
                                    <div className="checkout-select-address-map">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d345.4176693146578!2d47.282315554158366!3d56.07215168292683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sru!2sus!4v1711154706572!5m2!1sru!2sus" width="100%" height="250" allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                    </div>
                                    {/*<div className="">
                                    <lable>
                                        Дата доставки:
                                        <input value={'dfrgdfg'} onChange={(e) => { }} className='' type="date" placeholder='' />
                                    </lable>
                                    <lable>
                                        Время:
                                        <input value={'dfrgdfg'} onChange={(e) => { }} className='' type="time" placeholder='' />
                                    </lable>
                                </div>*/}
                                </div>}
                        </div>
                        <div className="checkout-right">
                            <PaymentMethod setDevOrder={setDevOrder} paymentBonus={paymentBonus} setPaymentBonus={setPaymentBonus} bonusAccount={myData.bonusAccount} typeDelivery={typeDelivery} bonuses={bonuses} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} sumBaske={sumBaske} />
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="checkout-empty">У вас нет доступа</div>
    )
}

export default Checkout
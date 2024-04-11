import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Checkout.scss'
import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs'
import PaymentMethod from '../../Components/PaymentMethod/PaymentMethod'
import { UserContextFunc } from '../../Context/UserContext'
import OrderfGoodsItem from '../../Components/OrderfGoodsItem/OrderfGoodsItem'


function Checkout() {
    const { getGoodsBasket,
        setStatusOrder,
        getOrder,
        getOrders,
        addOrder,
        orders,
        basket,
        order, isAuth, isSetting, isUser, getUsersData, isEffectUser, sumBaske, setIsEffectUser, GoodsBasketDep, setGoodsBasketDep } = UserContextFunc()


    const [fullAdress, setFullAdress] = useState([]);
    const [typeDelivery, setTypeDelivery] = useState(true)
    const [errorInput, setErrorInput] = useState(false)
    const [errorInput2, setErrorInput2] = useState(false)

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
        //entrance: '',
        //floor: '',
        apartmentt: '',
        comments: '',
        date: '',
        time: '',
    })

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/successful-order');
    };



    const filterAdress = (id) => {
        let adresss = fullAdress.filter((e, i) => i === id)
        //let arr = adresss[0].split(' ').slice(1).map(e => e.split('.')[1])
        console.log(adresss)
        setAdress({
            ...adress,
            city: adresss[0].city,
            street: adresss[0].street,
            house: adresss[0].house,
            apartmentt: adresss[0].apartmentt,
        })
    }

    const countingBonuses = () => {
        console.log('sdfsdf1231231', sumBaske)
        setBonuses(Math.floor(sumBaske / 500) * 20)
    }

    const validationOrderPersonalData = () => {
        let val = true;
        Object.values(myData).forEach(e => {
            if (e.length === 0) val = false;
        })
        if (!val) {
            setErrorInput(true)
        } else {
            setErrorInput(false)
        }
        return val;
    }

    const validationOrderDeliveryInfo = () => {
        setErrorInput2(true)

        let val = true;
        if (adress.city.length === 0 || adress.street.length === 0 || adress.house.length === 0) val = false;
        if (!val) {
            setErrorInput2(true)
        } else {
            setErrorInput2(false)
        }
        return val;
    }






    useEffect(() => {
        getGoodsBasket(false, true);

        if (isAuth) {
            getUsersData()
        }

        console.log(isSetting.pickup)
        if (isSetting.pickup) {
            setTypeDelivery(true)
        } else if (isSetting.courier) {
            setTypeDelivery(false)
        }

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
        if (devOrder) { addOrder({ name: myData.name, phone: myData.phone, adress: adress, paymentMethod, paymentBonus, typeDelivery }); handleClick(); setDevOrder(false) }
    }, [devOrder])

    useEffect(() => {
        if (GoodsBasketDep) getGoodsBasket(false); setGoodsBasketDep(false)
    }, [GoodsBasketDep])

    useEffect(() => {
        countingBonuses()
    }, [sumBaske])



    return (
        isAuth ?
            <div className='checkout-container'>
                <div className="checkout-content">
                    <BreadCrumbs textLink={['Форма заказа', '']} location={location} />
                    <div className="checkout-title">Оформление заказа</div>
                    <div className="checkout-forms">
                        <div className="checkout-left">

                            <div className="checkout-left-order-list">
                                <div className="checkout-subtitle">Состав заказа</div>
                                {basket.goods.map(e => <OrderfGoodsItem key={e.id} countingBonuses={countingBonuses} quantity={e.quantity} setGoodsBasketDep={setGoodsBasketDep} id={e.id} image={e.imageURL[0]} name={e.name} price={e.price} list={basket.list} category={e.category} />)}
                            </div>
                            <div className="checkout-left-personal-data">
                                <div className="checkout-subtitle">Личные данные</div>
                                <div className="checkout-left-wrap-input">

                                    <input value={myData.name} onChange={(e) => { setMyData({ ...myData, name: e.target.value }) }} className={errorInput && myData.name.length === 0 ? 'checkout-personal-data-input checkout-error' : 'checkout-personal-data-input'} type="text" placeholder='Имя' />
                                    <input value={myData.phone} onChange={(e) => { setMyData({ ...myData, phone: e.target.value }) }} className={errorInput && myData.phone.length === 0 ? 'checkout-personal-data-input checkout-error' : 'checkout-personal-data-input'} type="text" placeholder='Телефон' />
                                </div>
                                {errorInput && <div className="error-message">Заполните все обязательные поля ввода</div>}
                            </div>

                            {isSetting.courier || isSetting.pickup ?
                                <div className="checkout-left-delivery-info">
                                    <div className="checkout-subtitle">Информация по доставке</div>
                                    <div className="checkout-left-wrap-btn">
                                        {isSetting.courier && isSetting.pickup
                                            ?
                                            <> <button onClick={() => setTypeDelivery(true)} className={typeDelivery ? 'checkout-btn' : 'checkout-btn checkout-btn-disabled'}>Самовывоз</button>
                                                <button onClick={() => setTypeDelivery(false)} className={typeDelivery ? 'checkout-btn checkout-btn-disabled' : 'checkout-btn'}>Курьер</button></>
                                            :
                                            isSetting.pickup ? <button className='checkout-btn'>Самовывоз</button>
                                                :
                                                isSetting.courier ? <button className='checkout-btn'>Курьер</button>
                                                    : ''
                                        }
                                    </div>
                                    {
                                        !typeDelivery
                                            ?
                                            <div className="checkout-left-courier">
                                                <div className="checkout-personal-data-title">Выберите адрес доставки:</div>
                                                <select className='checkout-personal-data-select' onChange={(e) => {
                                                    filterAdress(Number(e.target.value))
                                                }} name="" id="">
                                                    <option required selected disabled hidden value=''>Выберите адрес</option>
                                                    {fullAdress.map((e, id) => {
                                                        return <><option value={id}>{`г.${e.city} ул.${e.street} д.${e.house} кв.${e.apartmentt}`}</option></>
                                                    })}
                                                </select>
                                                <div className="checkout-personal-data-title">Или введите новый адрес доставки:</div>
                                                <div className="checkout-left-wrap-input">
                                                    <input value={adress.city} onChange={(e) => { setAdress({ ...adress, city: e.target.value }) }} className={errorInput2 && adress.city.length === 0 ? 'checkout-select-address-input checkout-error' : 'checkout-select-address-input'} type="text" placeholder='Город' />
                                                    <input value={adress.street} onChange={(e) => { setAdress({ ...adress, street: e.target.value }) }} className={errorInput2 && adress.street.length === 0 ? 'checkout-select-address-input checkout-error' : 'checkout-select-address-input'} type="text" placeholder='Улица' />
                                                </div>
                                                <div className="checkout-left-wrap-input">
                                                    <input value={adress.house} onChange={(e) => { setAdress({ ...adress, house: e.target.value }) }} className={errorInput2 && adress.house.length === 0 ? 'checkout-select-address-input-min checkout-error' : 'checkout-select-address-input-min'} type="text" placeholder='Дом' />
                                                    {/*<input value={adress.entrance} onChange={(e) => { setAdress({ ...adress, entrance: deleteSpace(e.target.value) }) }} className='checkout-select-address-input-min' type="text" placeholder='Подъезд' />*/}
                                                    {/*<input value={adress.floor} onChange={(e) => { setAdress({ ...adress, floor: deleteSpace(e.target.value) }) }} className='checkout-select-address-input-min' type="text" placeholder='Этаж' />*/}
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
                                                {errorInput2 && <div className="error-message">Заполните все обязательные поля ввода</div>}
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
                                            </div>
                                    }

                                </div> : ''}
                        </div>
                        <div className="checkout-right">
                            <PaymentMethod validationOrderDeliveryInfo={validationOrderDeliveryInfo} validationOrderPersonalData={validationOrderPersonalData} setDevOrder={setDevOrder} paymentBonus={paymentBonus} setPaymentBonus={setPaymentBonus} bonusAccount={myData.bonusAccount} typeDelivery={typeDelivery} bonuses={bonuses} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} sumBaske={sumBaske} />
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="checkout-empty">У вас нет доступа</div>
    )
}

export default Checkout
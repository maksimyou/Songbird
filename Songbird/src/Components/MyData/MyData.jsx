import React, { useState, useEffect } from 'react'
import PersonalData from '../PersonalData/PersonalData'
import AdressData from '../AdressData/AdressData'

import { UserContextFunc } from '../../Context/UserContext'

import './MyData.scss'
function MyData() {
    const { isUser, editUserDataApi, getUsersData, isEffectUser, setIsEffectUser } = UserContextFunc()
    const [apiData, setApiData] = useState(false);


    const [fullAdress, setFullAdress] = useState([]);
    //личные даннаые
    const [myData, setMyData] = useState({
        name: '',
        phone: '',
        birthday: '',
        email: '',
    })

    //адреса
    const [adress, setAdress] = useState({
        name: '',
        city: '',
        street: '',
        house: '',
        //entrance: '',
        //floor: '',
        apartmentt: ''
    })

    const [notifications, setNotifications] = useState({
        sms: true,
        email: true,
    })

    const createFullAdress = () => {
        //let str = `${adress.name} г.${adress.city} ул.${adress.street} д.${adress.house} п.${adress.entrance} эт.${adress.floor} кв.${adress.apartmentt}`

        //let str = `${adress.name} г.${adress.city} ул.${adress.street} д.${adress.house}} кв.${adress.apartmentt}`
        let arr = { name: adress.name, city: adress.city, street: adress.street, house: adress.house, apartmentt: adress.apartmentt }

        //setFullAdress(fullAdress.concat([str]));
        setFullAdress(fullAdress.concat([arr]));

    }

    const filterAdress = (id) => {
        let adress = fullAdress.filter((e, i) => i !== id)
        setFullAdress(adress);
    }

    useEffect(() => {
        getUsersData()
    }, [])

    useEffect(() => {
        if (isEffectUser) {
            setMyData({
                name: isUser.name,
                phone: isUser.phone,
                birthday: isUser.birthday,
                email: isUser.email,
            });
            setFullAdress(JSON.parse(isUser.adress));
            setNotifications({
                sms: isUser.notific.sms,
                email: isUser.notific.email,
            });
            setIsEffectUser(false)
        }
        if (apiData) editUserDataApi({ ...myData, adress: JSON.stringify(fullAdress), notifications: JSON.stringify(notifications) }); setApiData(false)
    }, [apiData, isEffectUser])


    return (
        <div className='my-data-container'>
            <div className="my-data-content">
                <div className="my-data-title-person">Личные данные</div>
                <PersonalData notifications={notifications} setNotifications={setNotifications} myData={myData} setMyData={setMyData} />
                <div className="my-data-title-adress">Мои адреса</div>
                <AdressData filterAdress={filterAdress} adress={adress} createFullAdress={createFullAdress} fullAdress={fullAdress} setAdress={setAdress} />
                <button onClick={(e) => { e.preventDefault(); setApiData(true) }} className='my-data-btn'>Сохранить изменения</button>
            </div>
        </div>
    )
}

export default MyData


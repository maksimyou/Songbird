import React, { useEffect, useState } from 'react'
import './Contacts.scss'

import { UserContextFunc } from '../../Context/UserContext'
import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs'
import resize from '../../Hooks/resize'


function Contacts() {
    const { isSetting, sendMessageTelegramContact } = UserContextFunc()
    const [width, hight] = resize();


    useEffect(() => {

        document.title = 'Контакты | Певчий Сластник' || 'songbird21.ru'
    }, [])

    const [message, setMessage] = useState(false)


    const [contactData, setContactData] = useState({
        name: '',
        email: '',
        text: '',
        phone: '',
    })

    const CheckingForm = () => {
        let val = false
        let arr = Object.values(contactData)
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === '') {
                val = true
                break;
            }
        }
        if (!val) { sendMessageTelegramContact(contactData) }
    }





    return (
        <div className='contacts-container'>
            <BreadCrumbs textLink={['Контакты']} location={location} />

            <div className="contacts-content">
                <div className="contacts-left-sections">
                    <div className="">
                        <div className="contacts-left-title">Адрес</div>
                        <div className="contacts-left-text">{isSetting.address}</div>
                    </div>
                    <div className="">
                        <div className="contacts-left-title">Телефон</div>
                        <div className="contacts-left-text">{isSetting.phone}</div>
                    </div>
                    <div className="">
                        <div className="contacts-left-title">E-mail</div>
                        <div className="contacts-left-text">{isSetting.email}</div>
                    </div>
                    <div className="">
                        <div className="contacts-left-title">Часы работы</div>
                        <div className="contacts-left-text">Мы работаем ежедневно с 8:00 до 20:00</div>
                    </div>
                    <div className="">
                        <div className="contacts-left-title">Реквизиты</div>
                        <div className="contacts-left-text">
                            {/*ИП Плешка Сержиу Федорович
                            ИНН 504414360182; ОГРНИП 319774600134655
                            ОКПО 0147523249*/}
                        </div>
                    </div>
                </div>
                {width > 1500 && < div className="contacts-address-map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d345.4176693146578!2d47.282315554158366!3d56.07215168292683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sru!2sus!4v1711154706572!5m2!1sru!2sus" width="600" height="350" allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>}
                <div className="contacts-right-sections">
                    <form onSubmit={e => e.preventDefault()} className="contacts-right-form">
                        <div className="contacts-right-form-title">Напишите нам</div>
                        <input onChange={(e) => setContactData({ ...contactData, name: e.target.value, })} className='contacts-right-form-input' type="text" placeholder='Имя' />
                        <input onChange={(e) => setContactData({ ...contactData, phone: e.target.value, })} className='contacts-right-form-input' type="text" placeholder='Телефон' />
                        <input onChange={(e) => setContactData({ ...contactData, email: e.target.value, })} className='contacts-right-form-input' type="text" placeholder='E-mail' />
                        <textarea onChange={(e) => setContactData({ ...contactData, text: e.target.value, })} className='contacts-right-form-area' name="" id="" cols="30" rows="10" placeholder='Сообщение'></textarea>
                        <button onClick={(e) => { CheckingForm(); e.preventDefault() }} className='contacts-right-form-btn'>Отправить</button>
                    </form>
                </div>
                {width <= 1500 && < div className="contacts-address-map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d345.4176693146578!2d47.282315554158366!3d56.07215168292683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sru!2sus!4v1711154706572!5m2!1sru!2sus" width={width <= 420 ? 360 : width <= 540 ? 400 : width <= 640 ? 500 : width <= 840 ? 600 : width <= 1050 ? 800 : 1000} height="350" allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>}
            </div >
        </div >
    )
}

export default Contacts
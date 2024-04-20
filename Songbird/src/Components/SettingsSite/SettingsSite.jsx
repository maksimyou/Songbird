import React, { useEffect, useState } from 'react'
import './SettingsSite.scss'
import { UserContextFunc } from '../../Context/UserContext'


function SettingsSite() {
    const { updateAddSettingApi, isSetting, gettingGev, setGettingGev } = UserContextFunc()

    const [valPhone, setvVlPhone] = useState(true)
    const [phone, setPhone] = useState(isSetting.phone);
    const [address, setAddress] = useState(isSetting.address);
    const [instagram, setInstagram] = useState(isSetting.instagram);
    const [youtube, setYoutube] = useState(isSetting.youtube);
    const [telegram, setTelegram] = useState(isSetting.telegram);
    const [vkontakte, setVkontakte] = useState(isSetting.vkontakte);
    const [setting, setSetting] = useState(isSetting.setting);
    const [email, setEmail] = useState(isSetting.email);
    const [courier, setCourier] = useState(isSetting.courier);
    const [pickup, setPickup] = useState(isSetting.pickup);
    const [cash, setCash] = useState(isSetting.cash);
    const [card, setCard] = useState(isSetting.card);

    const setSetiingState = () => {

        setPhone(isSetting.phone);
        setAddress(isSetting.address);
        setInstagram(isSetting.instagram);
        setYoutube(isSetting.youtube);
        setTelegram(isSetting.telegram);
        setVkontakte(isSetting.vkontakte);
        setSetting(isSetting.setting);
        setEmail(isSetting.email);
        setCourier(isSetting.courier);
        setPickup(isSetting.pickup);
        setCash(isSetting.cash);
        setCard(isSetting.card);
    }



    const formatPhone = (strr) => {
        let str = strr.replace(/[\(|\)|_|\-|\+)]/g, '')
        console.log(str)
        if (str.slice(0, 1) === '7') {

            let mask = '7__________';
            let number = `${str}${mask.slice(str.length)}`
            return `+${number.slice(0, 1)}(${number.slice(1, 4)})${number.slice(4, 7)}-${number.slice(7, 9)}-${number.slice(9, 11)}`

        } else if (str.slice(0, 1) === '8') {
            let mask = '___________';
            let number = `${str}${mask.slice(str.length)}`
            return `+${7}(${number.slice(1, 4)})${number.slice(4, 7)}-${number.slice(7, 9)}-${number.slice(9, 11)}`
        } else {

            let mask = '__________';
            let number = `${str}${mask.slice(str.length)}`
            return `+${7}(${number.slice(0, 3)})${number.slice(3, 6)}-${number.slice(6, 8)}-${number.slice(8, 10)}`
        }
    }

    const validationNumber = () => {
        let str = phone.replace(/[\(|\)|_|\-|\+)]/g, '')
        if (str.length === 11) {
            setvVlPhone(true)
        } else {
            setvVlPhone(false)
        }
    }

    const createFormData = () => {
        const formData = new FormData();

        formData.append('phone', phone)
        formData.append('address', address)
        formData.append('instagram', instagram)
        formData.append('youtube', youtube)
        formData.append('telegram', telegram)
        formData.append('vkontakte', vkontakte)
        formData.append('email', email)
        formData.append('courier', courier)
        formData.append('pickup', pickup)
        formData.append('cash', cash)
        formData.append('card', card)
        console.log(formData)
        return formData
    }

    useEffect(() => {
        if (gettingGev) setSetiingState(); setGettingGev(false)
    }, [gettingGev])

    useEffect(() => {
        if (setting) updateAddSettingApi(createFormData()); setSetiingState(); setSetting(false)
    }, [setting])

    useEffect(() => {
        document.title = 'Настройки сайта | Певчий Сластник' || 'songbird21.ru'
    }, [])

    return (
        <div className='settings-site-container'>
            <div className="settings-site-title">Настройки сайта</div>
            <div className="settings-site-content">
                <div className="settings-site-content-input">
                    <div className="settings-site-content-left">
                        <div className="settings-site-content-right-social">Социальные сети</div>
                        <div className="settings-site-input">
                            <span className='settings-site-input-title'>Инстаграм: </span>
                            <input value={instagram} onChange={(e) => { setInstagram(e.target.value) }} placeholder='Введите название' type="text" />
                        </div>   <div className="settings-site-input">
                            <span className='settings-site-input-title'>Youtube: </span>
                            <input value={youtube} onChange={(e) => { setYoutube(e.target.value) }} placeholder='Введите название' type="text" />
                        </div>   <div className="settings-site-input">
                            <span className='settings-site-input-title'>Telegram: </span>
                            <input value={telegram} onChange={(e) => { setTelegram(e.target.value) }} placeholder='Введите название' type="text" />
                        </div>   <div className="settings-site-input">
                            <span className='settings-site-input-title'>Vkontakte: </span>
                            <input value={vkontakte} onChange={(e) => { setVkontakte(e.target.value) }} placeholder='Введите название' type="text" />
                        </div>
                    </div>
                    <div className="settings-site-content-right">
                        <div className="settings-site-input">
                            <span className='settings-site-input-title'>Телефон: </span>
                            <input className={valPhone ? '' : 'settings-site-active'} value={phone} onChange={e => setPhone(e.target.value)} onFocus={e => { setPhone(e.target.value.replace(/[\(|\)|_|\-|\+)]/g, '')) }} onBlur={(e) => { setPhone(formatPhone(e.target.value)); validationNumber() }} placeholder='+7(000)000-00-00' type="text" />
                        </div>
                        {valPhone ? '' : <div className="error-settings-site-message">Введите верный формат телефона</div>}
                        <div className="settings-site-input">
                            <span className='settings-site-input-title'>Адрес: </span>
                            <input value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder='Введите адрес' type="text" />
                        </div>
                        <div className="settings-site-input">
                            <span className='settings-site-input-title'>Почта: </span>
                            <input value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Введите email' type="text" />
                        </div>
                        <div className="settings-site-order">
                            <div className="">
                                <div className="settings-site-input-title">Доставка</div>
                                <div className="settings-site-input">
                                    <div className="settings-site-input-wrap">
                                        <div className="settings-site-input-check">
                                            <input checked={courier} onChange={(e) => { setCourier(e.target.checked) }} type="checkbox" id='courier' />
                                            <label htmlFor='courier' className='settings-site-input-subtitle'> Курьер</label>
                                        </div>
                                        <div className="settings-site-input-check">
                                            <input checked={pickup} onChange={(e) => { setPickup(e.target.checked) }} type="checkbox" id='pickup' />
                                            <label htmlFor='pickup' className='settings-site-input-subtitle'> Самовывоз</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="settings-site-input-title">Способ оплаты</div>
                                <div className="settings-site-input">
                                    <div className="settings-site-input-wrap">
                                        <div className="settings-site-input-check">
                                            <input checked={cash} onChange={(e) => { setCash(e.target.checked) }} type="checkbox" id='cash' />
                                            <label htmlFor='cash' className='settings-site-input-subtitle'> Наличными</label>
                                        </div>
                                        <div className="settings-site-input-check">
                                            <input checked={card} onChange={(e) => { setCard(e.target.checked) }} type="checkbox" id='card' />
                                            <label htmlFor='card' className='settings-site-input-subtitle'> Картой онлайн</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
                <button onClick={() => { if (valPhone) setSetting(true) }} className='settings-site-add-btn'>Изменить</button>
            </div>
        </div >
    )
}

export default SettingsSite
import React, { useEffect, useState } from 'react'
import './SettingsSite.scss'
import { UserContextFunc } from '../../Context/UserContext'



function SettingsSite() {
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [instagram, setInstagram] = useState();
    const [youtube, setYoutube] = useState();
    const [telegram, setTelegram] = useState();
    const [vkontakte, setVkontakte] = useState();
    const [setting, setSetting] = useState();
    const [email, setEmail] = useState();


    const { updateAddSettingApi } = UserContextFunc()

    const createFormData = () => {
        const formData = new FormData();

        formData.append('phone', phone)
        formData.append('address', address)
        formData.append('instagram', instagram)
        formData.append('youtube', youtube)
        formData.append('telegram', telegram)
        formData.append('vkontakte', vkontakte)
        formData.append('email', email)
        console.log(formData)
        return formData
    }
    useEffect(() => {
        if (setting) updateAddSettingApi(createFormData()); setSetting(false)
    }, [setting])

    return (
        <div className='settings-site-container'>
            <div className="settings-site-title">Настройки сайта</div>
            <div className="settings-site-content">
                <div className="settings-site-content-input">
                    <div className="settings-site-content-left">
                        <div className="settings-site-content-right-social">Социальные сети</div>
                        <div className="settings-site-input">
                            <span className='settings-site-input-title'>Инстаграм: </span>
                            <input onBlur={(e) => { setInstagram(e.target.value) }} placeholder='Введите название' type="text" />
                        </div>   <div className="settings-site-input">
                            <span className='settings-site-input-title'>Youtube: </span>
                            <input onBlur={(e) => { setYoutube(e.target.value) }} placeholder='Введите название' type="text" />
                        </div>   <div className="settings-site-input">
                            <span className='settings-site-input-title'>Telegram: </span>
                            <input onBlur={(e) => { setTelegram(e.target.value) }} placeholder='Введите название' type="text" />
                        </div>   <div className="settings-site-input">
                            <span className='settings-site-input-title'>Vkontakte: </span>
                            <input onBlur={(e) => { setVkontakte(e.target.value) }} placeholder='Введите название' type="text" />
                        </div>
                    </div>
                    <div className="settings-site-content-right">
                        <div className="settings-site-input">
                            <span className='settings-site-input-title'>Телефон: </span>
                            <input onBlur={(e) => { setPhone(e.target.value) }} placeholder='Введите номер телефона' type="text" />
                        </div>
                        <div className="settings-site-input">
                            <span className='settings-site-input-title'>Адрес: </span>
                            <input onBlur={(e) => { setAddress(e.target.value) }} placeholder='Введите адрес' type="text" />
                        </div>
                        <div className="settings-site-input">
                            <span className='settings-site-input-title'>Почта: </span>
                            <input onBlur={(e) => { setEmail(e.target.value) }} placeholder='Введите email' type="text" />
                        </div>
                    </div>

                </div>
                <button onClick={() => { setSetting(true) }} className='settings-site-add-btn'>Изменить</button>
            </div>
        </div>
    )
}

export default SettingsSite
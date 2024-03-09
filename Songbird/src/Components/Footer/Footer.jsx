import React from 'react'
import './Footer.scss'

import telephone from '../../assets/telephone.png'
import geo from '../../assets/geo.png'
import mail from '../../assets/mail.png'


import instagram from '../../assets/instagram.png'
import youtube from '../../assets/youtube.png'
import telegram from '../../assets/telegram.png'
import vk from '../../assets/vk.png'
import { UserContextFunc } from '../../Context/UserContext'

function Footer() {
    const { isSetting } = UserContextFunc()
    const formatPhone = (str) => {
        return `+${str.slice(0, 1)} (${str.slice(1, 4)}) ${str.slice(4, 7)} ${str.slice(7, 9)} ${str.slice(9, 11)}`
    }

    return (
        <div className='footer-container'>
            <div className="footer-content">
                <div className="footer-number-place-mail">
                    <div className="footer-content-items">
                        <img src={telephone} alt="" />
                        <div className="footer-item">
                            <div className="footer-item-title">Звоните по номеру</div>
                            <a className='footer-item-subtitle' href={isSetting ? `tel:${isSetting.phone}` : "tel+72345678904"}>{isSetting ? formatPhone(isSetting.phone) : "+7 (234) 567 89 04"}</a>
                        </div>
                    </div>
                    <div className="footer-content-items">
                        <img src={geo} alt="" />
                        <div className="footer-item">
                            <div className="footer-item-title">Мы находимся</div>
                            <div className='footer-item-subtitle'>{isSetting ? isSetting.address : "196247, Россия, Санкт-Петербург, Ленинский просп., 151, офис 711"}</div>
                        </div>
                    </div>
                    <div className="footer-content-items">
                        <img src={mail} alt="" />
                        <div className="footer-item">
                            <div className="footer-item-title">Пишите сюда</div>
                            <div className='footer-item-subtitle'>{isSetting ? isSetting.email : "test@mail.ru"}</div>
                        </div>
                    </div>
                </div>
                <div className="footer-social">
                    <a className='footer-social-link' target='blank' href={isSetting ? `https://www.instagram.com/${isSetting.instagram}/` : ''}><img src={instagram} alt="" /></a>
                    <a className='footer-social-link' target='blank' href={isSetting ? `https://www.youtube.com/@${isSetting.youtube}/` : ''}><img src={youtube} alt="" /></a>
                    <a className='footer-social-link' target='blank' href={isSetting ? `https://t.me/${isSetting.telegram}/` : ''}><img src={telegram} alt="" /></a>
                    <a className='footer-social-link' target='blank' href={isSetting ? `https://vk.com/${isSetting.vkontakte}/` : ''}><img src={vk} alt="" /></a>
                </div>
            </div>
        </div>
    )
}

export default Footer
import React from 'react'
import './Footer.scss'

import telephone from '../../assets/telephone.png'
import geo from '../../assets/geo.png'
import mail from '../../assets/mail.png'


import instagram from '../../assets/instagram.png'
import youtube from '../../assets/youtube.png'
import telegram from '../../assets/telegram.png'
import vk from '../../assets/vk.png'

function Footer() {
    return (
        <div className='footer-container'>
            <div className="footer-content">
                <div className="footer-content-items">
                    <img src={telephone} alt="" />
                    <div className="footer-item">
                        <div className="footer-item-title">Звоните по номеру</div>
                        <a className='footer-item-subtitle' href="tel:+71234566787">+7 (954) 654 87 54</a>
                    </div>
                </div>
                <div className="footer-content-items">
                    <img src={geo} alt="" />
                    <div className="footer-item">
                        <div className="footer-item-title">Мы находимся</div>
                        <div className='footer-item-subtitle'>196247, Россия, Санкт-Петербург, Ленинский просп., 151, офис 711</div>
                    </div>
                </div>
                <div className="footer-content-items">
                    <img src={mail} alt="" />
                    <div className="footer-item">
                        <div className="footer-item-title">Пишите сюда</div>
                        <div className='footer-item-subtitle'>test@mail.ru</div>
                    </div>
                </div>
                <div className="footer-social">

                    <a className='footer-social-link' href=""><img src={instagram} alt="" /></a>
                    <a className='footer-social-link' href=""><img src={youtube} alt="" /></a>
                    <a className='footer-social-link' href=""><img src={telegram} alt="" /></a>
                    <a className='footer-social-link' href=""><img src={vk} alt="" /></a>

                </div>
            </div>
        </div>
    )
}

export default Footer